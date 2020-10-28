import { MessageHandler } from '@/service/handler/handler';
import { PLUGIN_CONFIG } from '@/config/config';
import { tranverseSelectNodes } from './service/util/index';

const handler = new MessageHandler();

handler.on('plugin-start', msg => {
  console.log('welcome~');
});

handler.on('tranverse-nodes', msg => {
  const current = figma.currentPage.selection;
  if (!Array.isArray(current) || current.length === 0) {
    console.warn('未选中任何节点');
  } else {
    tranverseSelectNodes(console.log, current);
  }
});

handler.on('plugin-close', msg => {
  console.log('再见~', msg.current);
  figma.closePlugin();
});

handler.catch(error => {
  figma.ui.postMessage({ type: 'plugin-error', error });
  console.warn('error happened :', error);
});

handler.use(figma.ui);

figma.showUI(__html__, PLUGIN_CONFIG.PAGE_SIZE);
