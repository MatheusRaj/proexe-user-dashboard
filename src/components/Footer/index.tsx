import React from 'react';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
    const theme = useTheme();

    const useStyles = makeStyles({
        root: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.getContrastText(theme.palette.primary.main),
        },

        centralize: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 56
        }
    });

    const classes = useStyles();

    const date = new Date();

    return (
        <div className={classes.root}>
            <Container> 
                <div className={classes.centralize}>
                    Proexe Dashboard &copy; All rights reserved - {date.getFullYear()}
                </div>
            </Container>
        </div>
    )
}

export default Footer;
