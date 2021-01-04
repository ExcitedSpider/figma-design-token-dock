import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { StyleDisplay, UserSetting } from '@/type';
import { downloadContent, copyContent } from 'ui/util/index';
import { Main } from '@/ui/pages/main/index';
import { Config } from '@/ui/pages/config/index';
import { CreatePR } from '@/ui/pages/create-pr/index';
import { PLUGIN_CONFIG } from '@/config/config';

import './ui.scss';

let avaliableStyles: StyleDisplay[];
let setAvaliableStyles: (styles: []) => void;

let path = '';
let setPath: (path: string) => void;

let userSetting: UserSetting;
let setUserSetting: (setting: UserSetting) => void;

const App = () => {
  React.useEffect(() => {
    parent.postMessage({ pluginMessage: { type: 'plugin-start' } }, '*');
  }, []);

  [avaliableStyles, setAvaliableStyles] = React.useState<StyleDisplay[]>([]);
  [path, setPath] = React.useState('');

  const setPathWithResize = (path: string) => {
    const pathPageSizeConfig = PLUGIN_CONFIG.PATH_PAGE_SIZE[path];
    if (pathPageSizeConfig) {
      parent.postMessage({ pluginMessage: { type: 'resize-window', ...pathPageSizeConfig } }, '*');
    }
    setPath(path);
  };

  [userSetting, setUserSetting] = React.useState<UserSetting>({
    tokenNameSource: 'name',
    githubToken: '',
  });

  return (
    <HashRouter>
      <Switch location={{ pathname: path, search: '', state: '', hash: '' }}>
        <Route path="/config">
          <Config defaultConfig={userSetting} setPath={setPathWithResize}></Config>
        </Route>
        <Route path="/create-pr">
          <CreatePR
            accessToken={userSetting.githubToken}
            avaliableStyles={avaliableStyles}
            setPath={setPathWithResize}
          ></CreatePR>
        </Route>
        <Route>
          <Main
            accessToken={userSetting.githubToken}
            avaliableStyles={avaliableStyles}
            setPath={setPathWithResize}
          ></Main>
        </Route>
      </Switch>
    </HashRouter>
  );
};

// 接受 service 传来的 message
onmessage = message => {
  const { pluginMessage } = message.data;
  if (pluginMessage.type === 'styles-select') {
    setAvaliableStyles(pluginMessage.styles);
  } else if (pluginMessage.type === 'token-copied') {
    copyContent(JSON.stringify(pluginMessage.token, null, 2));
    parent.postMessage(
      {
        pluginMessage: { type: 'message-notify', message: 'Copy Success~' },
      },
      '*',
    );
  } else if (pluginMessage.type === 'token-exported') {
    const cur = new Date();
    const tokenFileName = `Token_${
      cur.getMonth() + 1
    }_${cur.getDate()}_${cur.getHours()}_${cur.getMinutes()}_${cur.getSeconds()}.json`;
    downloadContent(tokenFileName, JSON.stringify(pluginMessage.token, null, 2));
  } else if (pluginMessage.type === 'redirect') {
    const { path } = pluginMessage;
    setPath(path);
  } else if (pluginMessage.type === 'load-user-setting') {
    const { data } = pluginMessage;

    setUserSetting(data);
  }
};

ReactDOM.render(<App />, document.getElementById('react-page'));
