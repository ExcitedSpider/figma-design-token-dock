import * as React from 'react';
import { Button } from 'ui/components/button/button';

import styles from './index.module.css';

export const Main = (prop: {}) => {
  const onClickTranverse = () => {
    parent.postMessage({ pluginMessage: { type: 'tranverse-nodes' } }, '*');
  };

  const onClickClose = () => {
    parent.postMessage(
      { pluginMessage: { type: 'plugin-close', current: new Date().toString() } },
      '*',
    );
  };

  return (
    <div className={styles.index}>
      <div className={styles.index__title}>欢迎使用 token dock</div>
      <div>
        点击 tranverse, 遍历当前选中的节点;
        <br />
        点击 close, 关闭插件;
      </div>
      <div className={styles['index__button-bar']}>
        <Button theme="primary" className={styles['index__button']} onClick={onClickTranverse}>
          遍历
        </Button>
        <Button onClick={onClickClose}>关闭</Button>
      </div>
    </div>
  );
};
