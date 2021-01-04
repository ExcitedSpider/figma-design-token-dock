import * as React from 'react';
import { Button } from 'ui/components/button/button';
import { StyleDisplay } from '@/type';

import styles from './index.module.scss';

export const CreatePR: React.FC<{
  avaliableStyles: StyleDisplay[];
  setPath: (path: string) => void;
  accessToken: string;
}> = props => {
  const [owner, setOwner] = React.useState('');
  const [repo, setRepo] = React.useState('');

  return (
    <div className={styles['create-pr']}>
      <div className={styles['create-pr__title--content']}>
        <div className={styles['create-pr__title']}>PR Repo Config</div>
        <section className={styles['create-pr__repo-config']}>
          github.com/
          <input
            type="text"
            id="owner"
            name="source"
            value={owner}
            className={styles['create-pr__input--half']}
            onChange={val => setOwner(val.target.value)}
            placeholder="owner"
          />
          <span>/</span>
          <input
            type="text"
            id="repo"
            name="source"
            value={repo}
            className={styles['create-pr__input--half']}
            onChange={val => setRepo(val.target.value)}
            placeholder="repo"
          />
        </section>
        <div className={styles['create-pr__title']}>PR Data Preview</div>
      </div>
      <div className={styles['create-pr__button-bar']}>
        <Button theme="primary" className={styles['create-pr__button']}>
          Export
        </Button>
        <Button theme="normal" className={styles['create-pr__button']}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
