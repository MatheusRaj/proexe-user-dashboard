import React from 'react';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import { ColorModeContext } from 'components/Container';

const Header = () => {
    const theme = useTheme();

    const colorMode = React.useContext(ColorModeContext);

    const useStyles = makeStyles({
        root: {
            display: 'flex',
            alignItems: 'center',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.getContrastText(theme.palette.primary.main),
            height: 56
        },

        row: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',

            '& span': {
                fontSize: 18,
                fontWeight: 600
            }
        }
    });

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Container>
                <div className={classes.row}>
                    <span>Proexe - User Management</span>
                    <div>
                        {theme.palette.mode} mode
                        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Header;
