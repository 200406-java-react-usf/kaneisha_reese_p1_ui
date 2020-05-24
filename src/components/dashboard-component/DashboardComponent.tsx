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
import ListItemText from '@material-ui/core/ListItemText';
interface IDashboardProps {
    authUser:User;
}

const useStyles = makeStyles({
    dashboardContainer: {
        display: "flex",
        justifyContent: "center",
        margin: 20,
        marginTop: 40,
        padding: 20
    },
    dashboardGrid: {
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
 
  


const DashboardComponent = (props: IDashboardProps) => {
    const classes = useStyles();
    return (
        !props.authUser ? <Redirect to='/login' />:
        (props.authUser.role==='admin')?
            <div className={classes.dashboardContainer}>   
                
                <Paper className={classes.paper}>    
                    <Grid container className={classes.dashboardGrid}>
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
                        
                        <Grid item sm={4} >
                        <Typography variant="h6">
                                <Button>
                                <Link to='/reimbs' className={classes.link}>View Reimbursements</Link>
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
                            <Typography variant="h4">Administrator</Typography>
                        </Grid>
                        <Grid item sm = {4} >
                            <Typography variant="button">
                                <Button>
                                <Link to='/users' className={classes.link}>View All Employees</Link>
                                </Button>    
                            </Typography>    
                        </Grid>
                        <Grid item sm = {4} >
                            <Typography variant="button">
                                <Button>
                                    <Link to='/newuser' className={classes.link}> Add New Employee</Link>
                                </Button>    
                            </Typography>    
                        </Grid>
                    </Grid>
                </Paper>
            
            </div> 
        : (props.authUser.role==='manager')?
        <div className={classes.dashboardContainer}>   
                
            <Paper className={classes.paper}>    
                <Grid container className={classes.dashboardGrid}>
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
                    
                    <Grid item sm={4} >
                        <Typography variant="h6">
                                <Button>
                                <Link to='/reimbs' className={classes.link}>View Reimbursements</Link>
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
                                <Link to='/managerreimbs' className={classes.link}>View All Reimbursements</Link>  
                            </Button>    
                        </Typography>    
                    </Grid>
                </Grid>
            </Paper>
        
        </div> 
        : 
        <div className={classes.dashboardContainer}>   
                
            <Paper className={classes.paper}>    
                <Grid container className={classes.dashboardGrid}>
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
                    
                    <Grid item sm={4} >
                        <Typography variant="h6">
                                <Button>
                                <Link to='/reimbs' className={classes.link}>View Reimbursements</Link>
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

export default DashboardComponent;