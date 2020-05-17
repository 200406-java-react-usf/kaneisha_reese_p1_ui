import React, { useState } from "react";
import { Redirect } from "react-router";

import { User } from "../../dtos/user";
import { Button, FormControl, InputLabel, Input, AppBar, Typography, Divider } from "@material-ui/core";
import TypoGraphy from '@material-ui/core/Typography'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
interface IHomeProps {
    authUser:User;
    
}

const useStyles = makeStyles({
    homeContainer: {
        display: "flex",
        justifyContent: "center",
        margin: 20,
        marginTop: 40,
        padding: 20
    },
    homeGrid: {
        width: "100%",
        textAlign: "center"
    },
    link: {
        textDecoration: 'none',
        color: 'blue'
    },
    list: {
        textAlign: "left"
    },
    paper: {
        padding: 20, 
        marginTop: 10, 
        marginBottom: 10,
        whiteSpace: "nowrap",
        textAlign: "center"
    },
    gridTitle: {
        padding: 30
    }
  });
  


const HomeComponent = (props: IHomeProps) => {
    const classes = useStyles();

    return (
        !props.authUser ? <Redirect to='/login' />:
        (props.authUser.role==='admin')?
            <div className={classes.homeContainer}>   
                
                <Paper className={classes.paper}>    
                    <Grid container className={classes.homeGrid}>
                        <Grid item sm = {12} className={classes.gridTitle}>
                        <List className={classes.list}>
                                <ListItemText inset>
                                    <TypoGraphy color="inherit" variant="h6">
                                        Username: {props.authUser.username}
                                    </TypoGraphy> 
                                </ListItemText>
                                <ListItemText inset>
                                    <TypoGraphy color="inherit" variant="h6">
                                        Email: {props.authUser.email}
                                    </TypoGraphy> 
                                </ListItemText>
                                <ListItemText inset>
                                    <TypoGraphy color="inherit" variant="h6">
                                        Role: {props.authUser.role}
                                    </TypoGraphy>
                                </ListItemText>
                        </List>
                        </Grid>

                        <Grid item sm = {12} className={classes.gridTitle}>
                            <Typography variant="h4">Employee</Typography>
                        </Grid>
                        
                        <Grid item sm = {4} >
                            <Typography variant="button">
                                <Button>
                                    <Link to='/update' className={classes.link}>Update Password</Link>
                                </Button>    
                            </Typography>    
                        </Grid>
                        <Grid item sm={4} >
                        <Typography variant="h6">
                                <Button>
                                    View Reimbursements
                                </Button>    
                            </Typography> 
                        </Grid>
                        <Grid item sm={4} >
                        <Typography variant="h6">
                                <Button>
                                    Submit Reimbursement
                                </Button>    
                            </Typography> 
                        </Grid>

                        

                        <Grid item sm = {12} className={classes.gridTitle}>
                            <Typography variant="h4">Finance Manager</Typography>
                        </Grid>
                        <Grid item sm = {4} >
                            <Typography variant="button">
                                <Button>
                                    View All Reimbursements
                                </Button>    
                            </Typography>    
                        </Grid>

                        <Grid item sm = {12} className={classes.gridTitle}>
                            <Typography variant="h4">Administrator</Typography>
                        </Grid>
                        <Grid item sm = {4} >
                            <Typography variant="button">
                                <Button>
                                <Link to='/employees' className={classes.link}>View All Employees</Link>
                                </Button>    
                            </Typography>    
                        </Grid>
                        <Grid item sm = {4} >
                            <Typography variant="button">
                                <Button>
                                    Add New Employee
                                </Button>    
                            </Typography>    
                        </Grid>
                    </Grid>
                </Paper>
            
            </div> 
        : (props.authUser.role==='manager')?
        <div className={classes.homeContainer}>   
                
            <Paper className={classes.paper}>    
                <Grid container className={classes.homeGrid}>
                    <Grid item sm = {12} className={classes.gridTitle}>
                    <List className={classes.list}>
                            <ListItemText inset>
                                <TypoGraphy color="inherit" variant="h6">
                                    Username: {props.authUser.username}
                                </TypoGraphy> 
                            </ListItemText>
                            <ListItemText inset>
                                <TypoGraphy color="inherit" variant="h6">
                                    Email: {props.authUser.email}
                                </TypoGraphy> 
                            </ListItemText>
                            <ListItemText inset>
                                <TypoGraphy color="inherit" variant="h6">
                                    Role: {props.authUser.role}
                                </TypoGraphy>
                            </ListItemText>
                    </List>
                    </Grid>
                    <Grid item sm = {12} className={classes.gridTitle}>
                        <Typography variant="h4">Employee</Typography>
                    </Grid>
                    
                    <Grid item sm = {4} >
                        <Typography variant="button">
                            <Button>
                                Update Password
                            </Button>    
                        </Typography>    
                    </Grid>
                    <Grid item sm={4} >
                    <Typography variant="h6">
                            <Button>
                                View Reimbursements
                            </Button>    
                        </Typography> 
                    </Grid>
                    <Grid item sm={4} >
                    <Typography variant="h6">
                            <Button>
                                Submit Reimbursement
                            </Button>    
                        </Typography> 
                    </Grid>

                    

                    <Grid item sm = {12} className={classes.gridTitle}>
                        <Typography variant="h4">Finance Manager</Typography>
                    </Grid>
                    <Grid item sm = {4} >
                        <Typography variant="button">
                            <Button>
                                View All Reimbursements
                            </Button>    
                        </Typography>    
                    </Grid>
                </Grid>
            </Paper>
        
        </div> 
        : 
        <div className={classes.homeContainer}>   
                
            <Paper className={classes.paper}>    
                <Grid container className={classes.homeGrid}>
                    <Grid item sm = {12} className={classes.gridTitle}>
                    <List className={classes.list}>
                            <ListItemText inset>
                                <TypoGraphy color="inherit" variant="h6">
                                    Username: {props.authUser.username}
                                </TypoGraphy> 
                            </ListItemText>
                            <ListItemText inset>
                                <TypoGraphy color="inherit" variant="h6">
                                    Email: {props.authUser.email}
                                </TypoGraphy> 
                            </ListItemText>
                            <ListItemText inset>
                                <TypoGraphy color="inherit" variant="h6">
                                    Role: {props.authUser.role}
                                </TypoGraphy>
                            </ListItemText>
                    </List>
                    </Grid>
                    <Grid item sm = {12} className={classes.gridTitle}>
                        <Typography variant="h4">Employee</Typography>
                    </Grid>
                    
                    <Grid item sm = {4} >
                        <Typography variant="button">
                            <Button>
                                Update Password
                            </Button>    
                        </Typography>    
                    </Grid>
                    <Grid item sm={4} >
                    <Typography variant="h6">
                            <Button>
                                View Reimbursements
                            </Button>    
                        </Typography> 
                    </Grid>
                    <Grid item sm={4} >
                    <Typography variant="h6">
                            <Button>
                                Submit Reimbursement
                            </Button>    
                        </Typography> 
                    </Grid>
                </Grid>
            </Paper>
    
        </div>
    )
}

export default HomeComponent;