import { debounce } from 'lodash';

import { MessageHandler } from '@/service/handler/handler';
import { PLUGIN_CONFIG } from '@/config/config';
import { tranverseSelectNodes, captureUniqueStyle } from '@/service/util/index';
import { StyleCollection, UserSetting } from '@/type';
import StyleDock from '@/service/dock/dock';

const handler = new MessageHandler();
const styleDock = new StyleDock();

handler.use(figma.ui);
handler.on('plugin-start', async msg => {
  const userSetting = await figma.clientStorage.getAsync('user-setting');

  figma.ui.postMessage({
    type: 'load-user-setting',
    data: JSON.parse(userSetting),
  });
});

handler.on('save-config', async msg => {
  const existSetting = await figma.clientStorage.getAsync('user-setting');

  const newSetting = { ...JSON.parse(existSetting), ...msg.data };
  await figma.clientStorage.setAsync('user-setting', JSON.stringify(newSetting));

  // 目前这个通知没有必要
  // figma.ui.postMessage({
  //   type: 'save-complete',
  // });
});

handler.on('export-style', async () => {
  const userSetting: UserSetting = JSON.parse(await figma.clientStorage.getAsync('user-setting'));

  const token = styleDock.getTokenObject(userSetting);
  figma.ui.postMessage({
    type: 'token-exported',
    token,
  });
});

handler.on('copy-style', () => {
  const token = styleDock.getTokenObject();
  figma.ui.postMessage({
    type: 'token-copied',
    token,
  });
});

handler.on('preview-json', () => {
  const token = styleDock.getTokenObject();
  figma.ui.postMessage({
    type: 'token-preview',
    tokenString: JSON.stringify(token, null, 2),
  });
});

handler.on('resize-window', (resizeData: { height: number; width: number }) => {
  figma.ui.resize(resizeData.width, resizeData.height);
});

handler.on('message-notify', message => {
  figma.notify(message.message);
});

const onSelectionChange = async () => {
  styleDock.removeStyles();

  const selectionStyles: StyleCollection = {
    fillStyle: [],
    effectStyle: [],
    strokeStyle: [],
    textStyle: [],
  };
  tranverseSelectNodes(node => {
    captureUniqueStyle(selectionStyles, node);
  }, figma.currentPage.selection);

  Object.keys(selectionStyles).forEach(styleName => {
    styleDock.addStyle(selectionStyles[styleName]);
  });

  figma.ui.postMessage({
    type: 'styles-select',
    styles: styleDock.getStyles().map(style => {
      let icon = '';
      if (style.type === 'PAINT') {
        const paintStyle = style as PaintStyle;
        const [paint] = paintStyle.paints;
        if (paint.type === 'SOLID') {
          icon = { ...(style as any)?.paints?.[0]?.color, a: (style as any)?.paints?.[0]?.opacity };
        } else {
          icon = 'gradient_icon';
        }
      } else if (style.type === 'EFFECT') {
        icon = 'effect_icon';
      } else if (style.type === 'TEXT') {
        icon = 'text_icon';
      }

      return {
        id: style.id,
        name: style.name,
        icon,
        type: style.type,
      };
    }),
  });
};

figma.on('selectionchange', debounce(onSelectionChange, 100));

figma.showUI(__html__, PLUGIN_CONFIG.DEFAULT_PAGE_SIZE);

switch (figma.command) {
  case 'config-plugin':
    figma.ui.postMessage({ type: 'redirect', path: '/config' });
    break;

  default:
    break;
}
