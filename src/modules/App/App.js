import { Redirect, Route, Switch } from 'react-router-dom';

import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import RootWrapper from '../common/components/RootWrapper';
import Menu from '../Menu/Menu';
import routes from '../common/routes';
import { globalTheme } from '../common/theme';
import Footer from '../common/components/Footer';
import Spacing from '../common/components/Spacing';

const App = () => {
  const pages = Object.entries(routes).map(([key, data]) => {
    const { name = null, to, component: Component, redirectTo, exact } = data;

    return (
      <Route
        exact={exact}
        key={key}
        path={to}
        render={(props) => {
          return redirectTo ? (
            <Redirect to={redirectTo} />
          ) : (
            <Component {...props} titleName={name} />
          );
        }}
      />
    );
  });

  return (
    <ThemeProvider theme={globalTheme}>
      <CssBaseline />

      <RootWrapper>
        <Menu />

        <Switch>{pages}</Switch>

        <Spacing />

        <Footer />
      </RootWrapper>
    </ThemeProvider>
  );
};

export default App;
