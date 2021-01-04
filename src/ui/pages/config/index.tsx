import * as React from 'react';
import { Button } from 'ui/components/button/button';
import { UserSetting } from '@/type';

import styles from './index.module.scss';

export const Config: React.FC<{
  setPath: (path: string) => void;
  defaultConfig: Partial<UserSetting>;
}> = prop => {
  const onClickSave = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: 'save-config',
          data: {
            tokenNameSource,
            githubToken,
          },
        },
      },
      '*',
    );
    prop.setPath('/');
  };

  const onClickCancel = () => {
    prop.setPath('/');
  };

  const [tokenNameSource, setTokenNameSource] = React.useState<string>('name');

  const [githubToken, setGithubToken] = React.useState<string>('');

  React.useEffect(() => {
    setTokenNameSource(prop.defaultConfig.tokenNameSource);
    setGithubToken(prop.defaultConfig.githubToken);
  }, [prop.defaultConfig.tokenNameSource, prop.defaultConfig.githubToken]);

  return (
    <div className={styles.config}>
      <div className={styles['config__main-list']}>
        <div className={styles.config__section_title}>Token naming</div>
        <section className={styles['config__list-item']}>
          <input
            type="radio"
            id="name"
            name="source"
            value="name"
            checked={tokenNameSource === 'name'}
            onChange={() => setTokenNameSource('name')}
          />
          <label htmlFor="name" className={styles['config__input-label']}>
            By style name.
          </label>
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
        <div className={styles.config__section_title}>Github Intergration</div>
        <section className={styles['config__list-item']}>
          <label htmlFor="token">Github Access Token: </label>
          <input
            type="text"
            id="token"
            name="source"
            value={githubToken}
            onChange={val => setGithubToken(val.target.value)}
          />
          <a
            href="https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token"
            target="_blank"
          >
            how to get?
          </a>
        </section>
      </div>
      <div className={styles['config__button-bar']}>
        <Button theme="primary" className={styles.config__button} onClick={onClickSave}>
          Save
        </Button>
        <Button theme="normal" className={styles.config__button} onClick={onClickCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
