import * as React from 'react';
import { Button } from 'ui/components/button/button';
import { StyleItem } from 'ui/components/style-item/style-item';
import { StyleDisplay } from '@/type';

import styles from './index.module.scss';

export const Main: React.FC<{
  avaliableStyles: StyleDisplay[];
  setPath: (path: string) => void;
  accessToken: string;
}> = prop => {
  const onClickExport = () => {
    parent.postMessage({ pluginMessage: { type: 'export-style' } }, '*');
  };

  const onClickCopy = () => {
    parent.postMessage({ pluginMessage: { type: 'copy-style' } }, '*');
  };

  const onClickPR = () => {
    if (prop.accessToken) {
      prop.setPath('/create-pr');
    } else {
      parent.postMessage({ pluginMessage: { type: 'message-notify', message: 'Please provide token first' } }, '*');
      prop.setPath('/config');
    }
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
        <Button theme="normal" className={styles.index__button} onClick={onClickCopy}>
          Copy as Text
        </Button>
        <Button theme="normal" className={styles.index__button} onClick={onClickPR}>
          Make a PR
        </Button>
      </div>
    </div>
  );
};
