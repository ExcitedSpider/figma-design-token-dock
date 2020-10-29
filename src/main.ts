import { MessageHandler } from '@/service/handler/handler';
import { PLUGIN_CONFIG } from '@/config/config';
import { tranverseSelectNodes, captureUniqueStyle } from '@/service/util/index';
import { StyleCollection } from '@/type';
import StyleDock from '@/service/dock/dock';
import { debounce } from 'lodash';

const handler = new MessageHandler();
const styleDock = new StyleDock();

handler.use(figma.ui);
handler.on('plugin-start', msg => {
  // noop
});

handler.on('export-style', () => {
  const token = styleDock.getTokenObject();
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

handler.on('message-notify', message => {
  figma.notify(message.message);
});

const onSelectionChange = () => {
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
        icon = { ...(style as any)?.paints?.[0]?.color, a: (style as any)?.paints?.[0]?.opacity };
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

figma.showUI(__html__, PLUGIN_CONFIG.PAGE_SIZE);
