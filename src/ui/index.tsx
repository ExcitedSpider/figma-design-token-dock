import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, useHistory } from 'react-router-dom';
import { Main } from '@/ui/pages/main/index';

import './ui.css';

const App = () => {
  React.useEffect(() => {
    parent.postMessage({ pluginMessage: { type: 'plugin-start' } }, '*');
    return () => {};
  }, []);

  // const history = useHistory();
  // history.push('/index');

  return (
    <HashRouter>
      <Switch>
        <Route>
          <Main></Main>
        </Route>
      </Switch>
    </HashRouter>
  );
};

// 接受 service 传来的 message
onmessage = message => {};

ReactDOM.render(<App />, document.getElementById('react-page'));
