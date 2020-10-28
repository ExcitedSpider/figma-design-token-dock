import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Main } from '@/ui/pages/main/index';

import './ui.css';

const App = () => {
  React.useEffect(() => {
    parent.postMessage({ pluginMessage: { type: 'plugin-start' } }, '*');
    return () => {};
  }, []);

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

onmessage = message => {};

ReactDOM.render(<App />, document.getElementById('react-page'));
