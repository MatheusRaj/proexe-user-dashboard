import React, { memo } from 'react';

import ContainerMUI from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Footer from 'components/Footer';
import Header from 'components/Header';

interface IProps {
  children: React.ReactNode;
}

const Container = memo(({ children }: IProps) => {
  const theme = useTheme();

  const useStyles = makeStyles({
    root: {
      display: 'flex',
      flexDirection: 'column'
    },

    containerMUI: {
      minHeight: 'calc(100vh - 160px)',
      background: theme.palette.background.paper
    }
  });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <ContainerMUI className={classes.containerMUI}>
        <Typography
          sx={{ color: 'text.primary', fontSize: 24, fontWeight: 'medium', margin: '24px 0 48px 0' }}
          variant='h1'
          component='div'
        >
          Dashboard
        </Typography>
        {children}
      </ContainerMUI>
      <Footer />
    </div>
  );
});

export default Container;
