import * as React from 'react';
import { Button } from 'ui/components/button/button';
import { StyleDisplay } from '@/type';
import SyntaxHighlighter from 'react-syntax-highlighter';
import a11yStyle from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';

import styles from './index.module.scss';
import repoIcon from './assets/repo.svg';
import tokenIcon from './assets/token.svg';

export const CreatePR: React.FC<{
  avaliableStyles: StyleDisplay[];
  setPath: (path: string) => void;
  accessToken: string;
  tokenString: string;
}> = props => {
  const [owner, setOwner] = React.useState('');
  const [repo, setRepo] = React.useState('');
  const [accessToken, setAccessToken] = React.useState(props.accessToken);

  React.useEffect(() => {
    setAccessToken(props.accessToken);
  }, [props.accessToken]);

  React.useEffect(() => {
    parent.postMessage({ pluginMessage: { type: 'preview-json' } }, '*');
  }, [props.avaliableStyles, props.avaliableStyles.length]);

  return (
    <div className={styles['create-pr']}>
      <div className={styles['create-pr__title--content']}>
        <div className={styles['create-pr__title']}>PR Repo Config</div>
        <div>
          <section className={styles['create-pr__repo-config']}>
            <img src={repoIcon} className={styles['create-pr__icon']}></img>
            https://github.com
            <span className={styles['create-pr__slash-divider']} />
            <input
              type="text"
              id="owner"
              name="source"
              value={owner}
              className={styles['create-pr__input--half']}
              onChange={val => setOwner(val.target.value)}
              placeholder="owner"
            />
            <span className={styles['create-pr__slash-divider']} />
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
          <section className={styles['create-pr__repo-config']}>
            <img src={tokenIcon} className={styles['create-pr__icon']}></img>
            <input
              type="text"
              id="accessToken"
              name="source"
              value={accessToken}
              className={styles['create-pr__input']}
              onChange={val => setAccessToken(val.target.value)}
              placeholder="github access token"
              disabled
            />
          </section>
        </div>
        <div className={styles['create-pr__title']}>Token Data Preview</div>
        <div className={styles['create-pr__json-preview']}>
          <SyntaxHighlighter
            customStyle={{ margin: '0' }}
            language="json"
            showLineNumbers
            style={a11yStyle}
          >
            {props.tokenString || ''}
          </SyntaxHighlighter>
        </div>
      </div>
      <div className={styles['create-pr__button-bar']}>
        <Button theme="normal" className={styles['create-pr__button']}>
          Cancel
        </Button>
        <Button theme="primary" className={styles['create-pr__button']}>
          Create PR
        </Button>
      </div>
    </div>
  );
};
