import React, { useState } from "react";

import { Redirect } from "react-router";
import { 
    makeStyles, 
    Typography, 
    FormControl, 
    InputLabel, 
    Input, 
    Button 
} from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import classes from "*.module.css";
import { User } from "../../dtos/user";


interface ILoginProps {
    authUser: User;
    errorMessage: string;
    loginAction: (username: string, password:string) => void;
}

const useStyles = makeStyles({
    loginContainer: {
        display: "flex",
        justifyContent: "center",
        margin: 20,
        marginTop: 40,
        padding: 20
    },
    loginForm: {
        width: "50%"
    }
});

const LoginComponent = (props: ILoginProps) => {
    const classees = useStyles();

    const [username, setUsername] = useState('');
    const [password,setPassword] = useState('');

    let updateFormField = (e:any) => {
        switch (e.target.id) {
            case 'username':
                setUsername(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            default:
                console.warn(`Improper binding detected on element with id: ${e.target.id}`);
        }
    }

    let login = async () => {
        props.loginAction(username, password);
    }

    return (
        props.authUser ? <Redirect to='/home' />:
        <div className = {classes.loginContainer}>
            <form className = {classes.loginForm}>
                <Typography align="center" variant = "h4">Expense Reimbursement System Login</Typography>
                
                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input
                        onChange={updateFormField}
                        value={username}
                        id="username" type="text"
                        placeholder="Enter your username"
                    />
                </FormControl>
                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="password">Username</InputLabel>
                    <Input
                        onChange={updateFormField}
                        value={password}
                        id="password" type="text"
                        placeholder="Enter your password"
                    />
                </FormControl>
                <br/><br/>
                <Button 
                    onClick={login} 
                    variant="contained" 
                    color="primary" 
                    size="medium">Login
                </Button>
                <br/><br/>
                {
                    props.errorMessage 
                        ? 
                    <Alert severity="error">{props.errorMessage}</Alert>
                        :
                    <></>
                }

            </form>
        </div>
    )
}

export default LoginComponent;