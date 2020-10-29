import { MessageHandler } from '@/service/handler/handler';
import { PLUGIN_CONFIG } from '@/config/config';
import { tranverseSelectNodes, captureUniqueStyle } from '@/service/util/index';
import { StyleCollection } from '@/type';
import StyleDock from '@/service/dock/dock';

const handler = new MessageHandler();

handler.use(figma.ui);
handler.on('plugin-start', msg => {
  // noop
});

figma.on('selectionchange', () => {
  const selectionStyles: StyleCollection = {
    fillStyle: [],
    effectStyle: [],
    strokeStyle: [],
    textStyle: [],
  };
  tranverseSelectNodes(node => {
    captureUniqueStyle(selectionStyles, node);
  }, figma.currentPage.selection);

  const styleDock = new StyleDock();

  Object.keys(selectionStyles).forEach(styleName => {
    styleDock.addStyle(selectionStyles[styleName]);
  });

  console.log(styleDock.getTokenObject());
});

figma.showUI(__html__, PLUGIN_CONFIG.PAGE_SIZE);
