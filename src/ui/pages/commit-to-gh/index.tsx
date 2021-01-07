import * as React from 'react';
import { Button } from 'ui/components/button/button';
import { StyleDisplay } from '@/type';
import SyntaxHighlighter from 'react-syntax-highlighter';
import a11yStyle from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';
import { createIssue } from '@/ui/api/github';

import styles from './index.module.scss';
import repoIcon from './assets/repo.svg';
import tokenIcon from './assets/token.svg';
import notVisibleIcon from './assets/not_visible.svg';
import visibleIcon from './assets/visible.svg';

const mockCreateIssue = (opt: any) =>
  new Promise(res => {
    setTimeout(() => res(opt), 1000);
  });

export const CommitToGH: React.FC<{
  avaliableStyles: StyleDisplay[];
  setPath: (path: string) => void;
  accessToken: string;
  tokenString: string;
}> = props => {
  const [owner, setOwner] = React.useState('');
  const [repo, setRepo] = React.useState('');
  const [tokenVisible, setTokenVisible] = React.useState(false);

  React.useEffect(() => {
    parent.postMessage({ pluginMessage: { type: 'preview-json' } }, '*');
  }, [props.avaliableStyles, props.avaliableStyles.length]);

  const onClickVisible = () => {
    setTokenVisible(!tokenVisible);
  };

  const onClickCancel = () => {
    props.setPath('/');
  };

  const [committing, setCommitting] = React.useState(false);

  const onClickCommit = async () => {
    setCommitting(true);
    const res = await createIssue({
    // const res = await mockCreateIssue({
      issueData: {
        body: props.tokenString,
      },
      githubData: {
        repo,
        owner,
        accessToken: props.accessToken,
      },
    });

    setCommitting(false);

    console.log(res);
  };

  return (
    <div className={styles['commit-to-gh']}>
      <div className={styles['commit-to-gh__content']}>
        <div className={styles['commit-to-gh__title']}>PR Repo Config</div>
        <div>
          <section className={styles['commit-to-gh__repo-config']}>
            <img src={repoIcon} className={styles['commit-to-gh__icon']}></img>
            https://github.com
            <span className={styles['commit-to-gh__slash-divider']} />
            <input
              type="text"
              id="owner"
              name="source"
              value={owner}
              className={styles['commit-to-gh__input--half']}
              onChange={val => setOwner(val.target.value)}
              placeholder="owner"
            />
            <span className={styles['commit-to-gh__slash-divider']} />
            <input
              type="text"
              id="repo"
              name="source"
              value={repo}
              className={styles['commit-to-gh__input--half']}
              onChange={val => setRepo(val.target.value)}
              placeholder="repo"
            />
          </section>
          <section className={styles['commit-to-gh__repo-config']}>
            <img src={tokenIcon} className={styles['commit-to-gh__icon']}></img>
            <div className={styles['commit-to-gh__access-token']}>
              {tokenVisible
                ? props.accessToken
                : new Array(props.accessToken.length).fill('*').join('')}
              <img
                onClick={onClickVisible}
                src={tokenVisible ? visibleIcon : notVisibleIcon}
                className={styles['commit-to-gh__icon--float-right']}
              ></img>
            </div>
          </section>
        </div>
        <div className={styles['commit-to-gh__title']}>Token Data Preview</div>
        <div className={styles['commit-to-gh__json-preview']}>
          <SyntaxHighlighter
            customStyle={{ margin: '0', padding: '5px 0', height: 'calc(100% - 10px)' }}
            language="json"
            showLineNumbers
            style={a11yStyle}
          >
            {props.tokenString || ''}
          </SyntaxHighlighter>
        </div>
      </div>
      <div className={styles['commit-to-gh__button-bar']}>
        <Button theme="normal" className={styles['commit-to-gh__button']} onClick={onClickCancel}>
          Cancel
        </Button>
        <Button
          loading={committing}
          disabled={props.avaliableStyles.length === 0}
          theme="primary"
          className={styles['commit-to-gh__button']}
          onClick={onClickCommit}
        >
          Commit Issue
        </Button>
      </div>
    </div>
  );
};
