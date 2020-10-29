import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Main } from '@/ui/pages/main/index';
import { StyleDisplay } from '@/type';
import { downloadContent, copyContent } from 'ui/util/index';

import './ui.css';

let avaliableStyles: StyleDisplay[];
let setAvaliableStyles = (styles: []) => {};

const App = () => {
  React.useEffect(() => {
    parent.postMessage({ pluginMessage: { type: 'plugin-start' } }, '*');
    return () => {};
  }, []);

  [avaliableStyles, setAvaliableStyles] = React.useState<StyleDisplay[]>([]);

  return (
    <HashRouter>
      <Switch>
        <Route>
          <Main avaliableStyles={avaliableStyles}></Main>
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
        pluginMessage: { type: 'message-notify', message: '已复制样式～' },
      },
      '*',
    );
  } else if (pluginMessage.type === 'token-exported') {
    const cur = new Date();
    const tokenFileName = `Token_${
      cur.getMonth() + 1
    }_${cur.getDate()}_${cur.getHours()}_${cur.getMinutes()}_${cur.getSeconds()}.json`;
    downloadContent(tokenFileName, JSON.stringify(pluginMessage.token, null, 2));
  }
};

ReactDOM.render(<App />, document.getElementById('react-page'));
