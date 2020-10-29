import * as React from 'react';
import { Button } from 'ui/components/button/button';
import { StyleItem } from 'ui/components/style-item/style-item';
import { StyleDisplay } from '@/type';

import styles from './index.module.css';

export const Main: React.FC<{ avaliableStyles: StyleDisplay[] }> = prop => {
  const onClickExport = () => {
    parent.postMessage({ pluginMessage: { type: 'export-style' } }, '*');
  };

  const onClickCopy = () => {
    parent.postMessage({ pluginMessage: { type: 'copy-style' } }, '*');
  };

  return (
    <div className={styles.index}>
      <div className={styles.index__title}>已选择的样式</div>
      <div className={styles['index__style-list']}>
        {prop.avaliableStyles.length !== 0 ? (
          prop.avaliableStyles.map(style => <StyleItem key={style.id} {...style}></StyleItem>)
        ) : (
          <div className={styles['index__style-list--empty']}>🥺 没有选择任何样式</div>
        )}
      </div>
      <div className={styles['index__button-bar']}>
        <Button theme="primary" className={styles['index__button']} onClick={onClickExport}>
          导出样式
        </Button>
        <Button theme="primary" className={styles['index__button']} onClick={onClickCopy}>
          复制样式
        </Button>
      </div>
    </div>
  );
};
