import { Switch, useLocation } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import routesConfig from '~common/routesConfig';
import { globalTheme } from '~common/theme';

import Menu from '~features/App/components/Menu';
import Footer from './components/Footer';
import Spacer from '~components/Spacer';
import RootWrapper from './components/RootWrapper';
import Routes from './components/Routes';
import { ROUTE_NAMES } from '~common/constants';
import { SEARCH_PATHS } from '~common/tmdb-config';

const App = () => {
  const location = useLocation();

  return (
    <ThemeProvider theme={globalTheme}>
      <CssBaseline />

      <RootWrapper>
        <Menu
          searchBasePath={`/${ROUTE_NAMES.search}`}
          locationPathname={location.pathname}
          routes={routesConfig}
          searchPaths={SEARCH_PATHS}
        />

        <Switch>{<Routes config={routesConfig} />}</Switch>

        <Spacer />

        <Footer />
      </RootWrapper>
    </ThemeProvider>
  );
};

export default App;
