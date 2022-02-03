import React, { memo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import ContainerMUI from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Footer from 'components/Footer';
import Header from 'components/Header';

interface IProps {
    children: React.ReactNode;
}

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const Container = memo(({ children }: IProps) => {
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');

    const colorMode = React.useMemo(
      () => ({
        toggleColorMode: () => {
          setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
      }),
      [],
    );
  
    const theme = React.useMemo(
      () =>
        createTheme({
          palette: {
            mode,
          },
        }),
      [mode],
    );

    const useStyles = makeStyles({
      root: {
        display: 'flex',
        flexDirection: 'column'
      },
    
      containerMUI: {
        minHeight: 'calc(100vh - 112px)',
        background: theme.palette.background.paper
      }
    });

    const classes = useStyles();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className={classes.root}>
                  <Header />
                  <ContainerMUI className={classes.containerMUI}>
                    <Typography sx={{ color: 'text.primary', fontSize: 24, fontWeight: 'medium', margin: '24px 0 48px 0' }} variant="h1" component="div">
                      Dashboard
                    </Typography>
                    { children }
                  </ContainerMUI>
                  <Footer />
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
});

export default Container;
