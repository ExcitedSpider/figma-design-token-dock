import * as React from 'react';
import { Button } from 'ui/components/button/button';
import { StyleItem } from 'ui/components/style-item/style-item';
import { StyleDisplay } from '@/type';

import styles from './index.module.scss';

export const Main: React.FC<{ avaliableStyles: StyleDisplay[] }> = (prop) => {
  const onClickExport = () => {
    parent.postMessage({ pluginMessage: { type: 'export-style' } }, '*');
  };

  const onClickCopy = () => {
    parent.postMessage({ pluginMessage: { type: 'copy-style' } }, '*');
  };

  return (
    <div className={styles.index}>
      <div className={styles.index__title}>Style Selected:</div>
      <div className={styles['index__style-list']}>
        {prop.avaliableStyles.length !== 0 ? (
          prop.avaliableStyles.map(style => <StyleItem key={style.id} {...style}></StyleItem>)
        ) : (
          <div className={styles['index__style-list--empty']}>🥺 No Selected Style</div>
        )}
      </div>
      <div className={styles['index__button-bar']}>
        <Button theme="primary" className={styles.index__button} onClick={onClickExport}>
          Export File
        </Button>
        <Button theme="primary" className={styles.index__button} onClick={onClickCopy}>
          Copy
        </Button>
      </div>
    </div>
  );
};
