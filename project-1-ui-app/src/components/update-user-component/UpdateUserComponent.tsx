import React, { useState } from 'react'
import { NewUser } from '../../dtos/new-user'
import { User } from '../../dtos/user'
import { makeStyles, Button, Typography, FormControl, InputLabel, Input } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export interface IUpdateProps {
   authUser: User ;
   errorMessage: string;
   updateAction: (newUser: NewUser) => void; 
}

const useStyles = makeStyles({
    updateContainer: {
        display: "flex",
        justifyContent: "center",
        margin: 20,
        marginTop: 40,
        padding: 20
    },
    updateForm: {
        width: "50%"
    }
});

const UpdateUserComponent = (props: IUpdateProps) => {
    const classes = useStyles();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    let updateFormField = (e: any) => {
        switch (e.currentTarget.id) {
            case 'firstName':
                setFirstName(e.target.value);
                break;
            case 'lastName':
                setLastName(e.target.value);
                break;
            case 'email':
                setEmail(e.target.value);
                break;
            case 'username':
                setUsername(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            case 'role':
                setRole(e.target.value);
            default:
                console.warn(`Improper binding detected on element with id: ${e.currentTarget.id}`);
        }
    }

    let update = async () => {
        props.updateAction(new NewUser(firstName, lastName, email, username, password, role))
    }

    return(
        <div className={classes.updateContainer}>
            <form className={classes.updateForm}>
                <Typography align="center" variant="h4">Register for Revaboards!</Typography>

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
                        onChange={e => setLastName(e.target.value)} 
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
                <br/><br/>
                <Button 
                    onClick={update} 
                    variant="contained" 
                    color="primary" 
                    size="medium">Save
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

export default UpdateUserComponent;