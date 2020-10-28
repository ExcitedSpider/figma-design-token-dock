import { MessageHandler } from '@/service/handler/handler';
import { PLUGIN_CONFIG } from '@/config/config';

const handler = new MessageHandler();

handler.on('plugin-start', msg => {
  console.log('welcome~');
});

handler.catch(error => {
  figma.ui.postMessage({ type: 'plugin-error', error });
  console.warn('error happened :', error);
});

handler.use(figma.ui);

figma.showUI(__html__, PLUGIN_CONFIG.PAGE_SIZE);
