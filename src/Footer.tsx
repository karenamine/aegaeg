import { Link, Paper, SvgIcon, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MainContainer } from './shared/components';

const useStyles = makeStyles({
  container: {
    display: 'grid',
    justifyItems: 'center',
    gap: '15px',
    paddingTop: '20px',
    paddingBottom: '20px',
  },

  logo: {
    marginRight: '2px',
    width: '120px',
    verticalAlign: '-20%',
  },

  creditIcon: {
    marginRight: '1px',
    verticalAlign: 'top',
  },
});

export const Footer = () => {
  const classes = useStyles();

  return (
    <Paper square component="footer">
      <MainContainer className={classes.container}>
        <Typography align="center" variant="caption" color="textSecondary" component="p">
          <SvgIcon viewBox="0 0 273.42 35.52" titleAccess="TMDB logo" className={classes.logo}>
            <defs>
              <linearGradient
                id="linear-gradient"
                y1="17.76"
                x2="273.42"
                y2="17.76"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#90cea1" />
                <stop offset=".56" stopColor="#3cbec9" />
                <stop offset="1" stopColor="#00b3e5" />
              </linearGradient>
            </defs>


          </SvgIcon>{' '}

        </Typography>

        <Typography align="center" variant="caption" color="textSecondary" component="p">

          .
        </Typography>
      </MainContainer>
    </Paper>
  );
};
