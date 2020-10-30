import * as React from 'react';
import { Button } from 'ui/components/button/button';
import { UserSetting } from '@/type';

import styles from './index.module.css';

export const Config: React.FC<{ setPath: (path: string) => void; defaultConfig: Partial<UserSetting> }> = (prop) => {
  const onClickSave = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: 'save-config',
          data: {
            tokenNameSource,
          },
        },
      },
      '*',
    );
    prop.setPath('/');
  };

  const [tokenNameSource, setTokenNameSource] = React.useState<string>('name');

  React.useEffect(() => {
    setTokenNameSource(prop.defaultConfig.tokenNameSource);
  }, [prop.defaultConfig.tokenNameSource]);

  return (
    <div className={styles.config}>
      <div className={styles.config__title}>Plugin Config</div>
      <div className={styles['config__main-list']}>
        <div className={styles.config__section_title}>Token named ...</div>
        <section className={styles['config__list-item']}>
          <input
            type="radio"
            id="name"
            name="source"
            value="name"
            checked={tokenNameSource === 'name'}
            onChange={() => setTokenNameSource('name')}
          />
          <label htmlFor="name">By style name.</label>
        </section>
        <section className={styles['config__list-item']}>
          <input
            type="radio"
            id="description"
            name="source"
            value="description"
            checked={tokenNameSource === 'description'}
            onChange={() => setTokenNameSource('description')}
          />
          <label htmlFor="description">By style description.</label>
        </section>
      </div>
      <div className={styles['config__button-bar']}>
        <Button theme="primary" className={styles.config__button} onClick={onClickSave}>
          保存配置
        </Button>
      </div>
    </div>
  );
};
