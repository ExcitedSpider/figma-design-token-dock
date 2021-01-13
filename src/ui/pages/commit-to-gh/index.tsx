import * as React from 'react';
import { Button } from 'ui/components/button/button';
import { StyleDisplay } from '@/type';
import SyntaxHighlighter from 'react-syntax-highlighter';
import a11yStyle from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';
import { getMaster, createBranch, getPackage, updatePackage, createPr } from '@/ui/api/github';

import styles from './index.module.scss';
import repoIcon from './assets/repo.svg';
import tokenIcon from './assets/token.svg';
import notVisibleIcon from './assets/not_visible.svg';
import visibleIcon from './assets/visible.svg';
import versionIcon from './assets/version-icon.svg';

const showToast = (msg: string) => {
  parent.postMessage(
    {
      pluginMessage: {
        type: 'message-notify',
        message: msg,
      },
    },
    '*',
  );
};

function useDefault<T>(setAction: (value: T) => any, defaultValue: T) {
  React.useEffect(() => {
    setAction(defaultValue);
  }, [defaultValue]);
}

export const CommitToGH: React.FC<{
  avaliableStyles: StyleDisplay[];
  setPath: (path: string) => void;
  accessToken: string;
  tokenString: string;
  defaultOwner: string;
  defaultRepo: string;
}> = props => {
  const [owner, setOwner] = React.useState(props.defaultOwner);
  const [repo, setRepo] = React.useState(props.defaultRepo);
  const [tokenVisible, setTokenVisible] = React.useState(false);
  const [pkg, setPackage] = React.useState({ version: 'loading' });
  const [version, setVersion] = React.useState('');

  useDefault(setOwner, props.defaultOwner);
  useDefault(setRepo, props.defaultRepo);
  useDefault(setVersion, pkg?.version);

  React.useEffect(() => {
    const githubData = {
      repo,
      owner,
      accessToken: props.accessToken,
    };
    getPackage({
      githubData,
    }).then(res => {
      const pkg = JSON.parse(res.data.content);
      setPackage(pkg);
    });
  }, [owner, repo]);

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

  const saveGithubConfig = (options: { prRepo: string; prOwner: string }) => {
    parent.postMessage(
      {
        pluginMessage: {
          type: 'save-config',
          data: options,
        },
      },
      '*',
    );
  };

  const onClickCommit = async () => {
    setCommitting(true);
    saveGithubConfig({
      prRepo: repo,
      prOwner: owner,
    });
    const githubData = {
      repo,
      owner,
      accessToken: props.accessToken,
    };
    await submitPullRequest({ githubData, pkg, version, props });
    setCommitting(false);
  };

  const disableCommit = props.avaliableStyles.length === 0 || !owner || !repo;

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
          <section className={styles['commit-to-gh__repo-config']}>
            <img src={versionIcon} className={styles['commit-to-gh__icon']}></img>
            <div className={styles['commit-to-gh__version-pane']}>
              <input
                type="text"
                id="version"
                name="source"
                value={version}
                className={styles['commit-to-gh__input--version']}
                onChange={val => setVersion(val.target.value)}
                placeholder="version"
              />
              <div>
                <span>{`${pkg.version} `}</span>
                <span className={styles['commit-to-gh__info']}>current</span>
              </div>
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
          disabled={disableCommit}
          theme="primary"
          className={styles['commit-to-gh__button']}
          onClick={onClickCommit}
        >
          Create PR
        </Button>
      </div>
    </div>
  );
};
async function submitPullRequest(options: {
  githubData: { repo: string; owner: string; accessToken: string };
  pkg: { version: string };
  version: string;
  props: React.PropsWithChildren<{
    avaliableStyles: StyleDisplay[];
    setPath: (path: string) => void;
    accessToken: string;
    tokenString: string;
    defaultOwner: string;
    defaultRepo: string;
  }>;
}) {
  const { githubData, pkg, version, props } = options;
  try {
    const {
      data: {
        object: { sha },
      },
    } = await getMaster({
      githubData,
    });

    const newBranch = `design-token-${new Date().getTime()}`;

    const res = await createBranch({
      githubData,
      sha,
      branchName: newBranch,
    });

    if (res.status === 201) {
      const newPkg = { ...pkg, version };
      const newPackage = JSON.stringify(newPkg, null, 2);
      const res = await getPackage({
        githubData,
        branch: newBranch,
      });

      await updatePackage({
        githubData,
        branch: newBranch,
        content: newPackage,
        message: '[figma automation]: update version',
        sha: res.data.sha,
      });

      const { url } = await createPr({
        githubData,
        branchName: newBranch,
        base: 'master',
        body: props.tokenString,
        title: `[figma automation] design token ${version}`,
      });

      showToast(`commit success: ${url}`);
    }
  } catch (error) {
    console.error(error);
    showToast(`commit failed: ${error}`);
  }
}
