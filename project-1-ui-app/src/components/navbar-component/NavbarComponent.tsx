import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TypoGraphy from '@material-ui/core/Typography'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

interface INavbarProps {
    username: string;
    firstName: string;
    lastName: string;
}

const useStyles = makeStyles({
    link: {
        textDecoration: 'none',
        color: 'white'
    }
});

const NavbarComponent = (props: INavbarProps) => {

    const classes = useStyles();

    return (
        <div>
            <List component="nav">
                <ListItem component="div" >
                    <TypoGraphy color="inherit" variant="h5">ERS</TypoGraphy>
                    <ListItemText inset>
                    <TypoGraphy color="inherit" variant="h6">
                            <Link to='/home' className={classes.link}>Home</Link>
                        </TypoGraphy> 
                    </ListItemText>
                    <ListItemText inset>
                        <TypoGraphy color="inherit" variant="h6">
                            <Link to='/login' className={classes.link}>Login</Link>
                        </TypoGraphy>
                    </ListItemText>
                    <ListItemText inset>
                        <TypoGraphy color="inherit" variant="h6">
                             {props.firstName} {props.lastName} 
                        </TypoGraphy>
                    </ListItemText> 
                </ListItem >
            </List>
        </div>
    );
}

export default NavbarComponent;