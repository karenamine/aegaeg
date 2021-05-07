import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import types from '~common/types';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',

    '& > :not(:last-child)': {
      marginRight: '10px',
    },
  },

  spacing: {
    marginBottom: '6px',
  },
});

const SelectorContainer = ({ children, isSpacing = true }) => {
  const classes = useStyles();

  const rootClasses = classNames(classes.container, {
    [classes.spacing]: isSpacing,
  });

  return <div className={rootClasses}>{children}</div>;
};

SelectorContainer.propTypes = {
  children: types.containerChildren,
};

export default SelectorContainer;
