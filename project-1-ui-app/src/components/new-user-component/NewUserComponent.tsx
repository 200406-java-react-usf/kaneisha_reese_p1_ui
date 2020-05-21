import React, { useState } from 'react';
import { Typography, FormControl, InputLabel, Input, Button, makeStyles, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { Redirect } from 'react-router';
import { Alert } from '@material-ui/lab';
import { NewUser } from '../../dtos/new-user';
import { User } from '../../dtos/user';

interface INewUserProps {
    authUser: User;
    errorMessage: string;
    newUserAction:(newUser: NewUser) => void;
}

const useStyles = makeStyles({
    newUserContainer: {
        display: "flex",
        justifyContent: "center",
        margin: 20,
        marginTop: 40,
        padding: 20
    },
    newUserForm: {
        width: "50%"
    }
});

const NewUserComponent = (props: INewUserProps) => {
    const classes = useStyles();

    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[email, setEmail] = useState('');
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[role, setRole] = useState('');



    let updateFormField = (e: any) => {
        console.log('Triggerign update with ' + e.target.value + ' on ' + e.currentTarget.id);
        switch (e.currentTarget.id) {
            case 'firstName':
                setFirstName(e.target.value);
                break;
            case 'lastName':
                setLastName(e.target.value);
                break;
            case 'email':
                setEmail(e.currentTarget.value);
                break;
            case 'username':
                setUsername(e.currentTarget.value);
                break;
            case 'password':
                setPassword(e.currentTarget.value);
                break;
            default:
                console.warn(`Improper binding detected on element with id: ${e.currentTarget.id}`);
        }
    }

    let addNew = async() => {
        props.newUserAction(new NewUser(firstName, lastName, email, username, password, role))
    }

    return (
        !props.authUser ? <Redirect to="/login" /> :
        <div className={classes.newUserContainer}>
            <form className={classes.newUserForm}>
                <Typography align="center" variant="h4">Enter new employees information below:</Typography>

                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="firstName">First Name</InputLabel>
                    <Input 
                        onChange={updateFormField} 
                        value={firstName} 
                        id="firstName" type="text" 
                        placeholder="Enter your first name" />
                </FormControl>

                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="lastName">Last Name</InputLabel>
                    <Input 
                        onChange={updateFormField} 
                        value={lastName} 
                        id="lastName" type="text" 
                        placeholder="Enter your last name" />
                </FormControl>

                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input 
                        onChange={updateFormField} 
                        value={email} 
                        id="email" type="text" 
                        placeholder="Enter your email address" />
                </FormControl>

                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input 
                        onChange={updateFormField} 
                        value={username} 
                        id="username" type="text" 
                        placeholder="Enter your username" />
                </FormControl>

                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input 
                        onChange={updateFormField}
                        value={password}
                        id="password" type="password"
                        placeholder="Enter your password"/>
                </FormControl>

                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="password">Role</InputLabel>
                    <RadioGroup aria-label="role" name="role" value={role} onChange={updateFormField}>
                        <FormControlLabel value="employee" control={<Radio />} label="Employee" />
                        <FormControlLabel value="manager" control={<Radio />} label="Manager" />
                        <FormControlLabel value="admin" control={<Radio />} label="Administrator" />
                    </RadioGroup>
                        
                </FormControl>
                <br/><br/>
                <Button 
                    onClick={addNew} 
                    variant="contained" 
                    color="primary" 
                    size="medium">Register
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
    );

}

export default NewUserComponent;