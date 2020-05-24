import React from 'react';
import { makeStyles, List, ListItem, Typography, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { User } from '../../dtos/user';


interface INavbarProps {
    authUser: User;
    errorMessage: string;
    logoutAction: () => void;
}

const useStyles = makeStyles({
    link: {
        textDecoration: "none",
        color: "white"
    },
    logout: {
        background: 'lightgrey',
        border: 2,
        borderRadius: 5,
        color: 'black',
        height: 48,
        padding: '10px 30px'
    }
});

function NavbarComponent (props: INavbarProps)  { 

    const classes = useStyles();

    let userLogout = async () => {
        props.logoutAction();
        localStorage.clear();
    }

    return(
        <>
            <List component="nav">
                <ListItem component="div">
                    <Typography color="inherit" variant="h5">ERS Portal</Typography>
                    {
                        props.authUser
                        ?
                        <>
                            <ListItemText inset>
                                <Typography color="inherit" variant="h6">
                                    <Link to="/dashboard" className={classes.link}>Home</Link>
                                </Typography>
                            </ListItemText>

                            <ListItemText inset>
                                <Typography color="inherit" variant="h6">
                                    Welcome, <span className={classes.link}>{props.authUser.firstName}</span>
                                </Typography>
                             </ListItemText>

                             
                            <ListItemText inset>
                                <Typography color="secondary" variant="h6">
                                    <Link to="/login" className={classes.logout} onClick={userLogout}>Logout</Link>
                                </Typography>
                            </ListItemText>
                        </>
                        :
                        <>
                        </>
                    }
                    

                    {
                        !props.authUser
                        ?
                        <>
                        <ListItemText inset>
                            <Typography color="inherit" variant="h6">
                                <Link to="/login" className={classes.link}>Login</Link>
                            </Typography>
                        </ListItemText>
                        </> 
                        :
                        <>
                        </>
                    }

                </ListItem>
            </List>
        </>
    )
}

export default NavbarComponent;