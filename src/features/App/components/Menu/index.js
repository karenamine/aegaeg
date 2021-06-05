import { AppBar, Link as MUILink, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';

import HideOnScroll from '~components/HideOnScroll';
import MainContainer from '~components/MainContainer';
import IconBtn from './IconBtn';
import Logo from './Logo';
import Drawer, { useDrawer } from './Drawer';
import Search, { useSearch } from './Search';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.paper,
  },

  toolBar: {
    '& >:first-child': {
      marginRight: theme.spacing(2),
    },

    '& >:last-child': {
      marginLeft: 'auto',
    },
  },
}));

const Menu = ({ locationPathname, routes, logoRoute, searchBasePath }) => {
  const classes = useStyles();
  const { isDrawerOpened, closeDrawerHandler, openDrawerHandler } = useDrawer();
  const {
    isSearchVisible,
    toggleSearchHandler,
    inputSearchHandler,
    submitSearchHandler,
    clearSearchHandler,
    searchValue,
  } = useSearch({ searchBasePath });

  return (
    <>
      <HideOnScroll>
        <AppBar elevation={1} className={classes.appBar} position="sticky">
          <MainContainer>
            <Toolbar className={classes.toolBar}>
              <IconBtn
                ariaLabel="open drawer"
                clickHandler={openDrawerHandler}
                edge="start"
                icon={MenuOpenIcon}
              />

              <MUILink underline="none" component={Link} to={logoRoute}>
                <Logo />
              </MUILink>

              <IconBtn
                ariaLabel="search"
                clickHandler={toggleSearchHandler}
                edge="end"
                icon={isSearchVisible ? CloseIcon : SearchIcon}
              />
            </Toolbar>
          </MainContainer>

          <Search
            isSearchVisible={isSearchVisible}
            inputSearchHandler={inputSearchHandler}
            submitSearchHandler={submitSearchHandler}
            clearSearchHandler={clearSearchHandler}
            value={searchValue}
          />
        </AppBar>
      </HideOnScroll>

      <Drawer
        locationPathname={locationPathname}
        routes={routes}
        isOpened={isDrawerOpened}
        closeDrawerHandler={closeDrawerHandler}
      />
    </>
  );
};

export default Menu;