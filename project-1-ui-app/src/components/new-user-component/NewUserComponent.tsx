import { 
    makeStyles,
    Typography,
    InputLabel,
    Input,
    FormControl, 
    Button,
    Select,
    FormControlLabel,
    Radio,
    RadioGroup
} from "@material-ui/core";
import React, { useState } from "react";
import { addUser } from '../../remote/user-service';
import { NewUser } from "../../dtos/new-user";
import { newUserAction } from "../../actions/new-user-action";
import { connect } from "react-redux";
import { User } from "../../dtos/user";
import { Redirect } from "react-router";

interface INewUserProps {
    authUser: User;
    newUser: NewUser;
    errorMessage: string;
    newUserAction: (user: NewUser) => void;

}

const useStyles = makeStyles({
    newUserContainer: { 
        display: "flex",
        justifyContent: "center",
        margin: 20,
        marginTop: 20,
        padding: 20
    },
    newUserForm: {
        width: "50%"
    }
});
 
function NewUserComponent(props: INewUserProps) {

    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    let updateFormField = (e: any) => {
        switch (e.currentTarget.id) {
            case 'firstName':
                setFirstName(e.currentTarget.value);
                break;
            case 'lastName':
                setLastName(e.currentTarget.value);
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
            case 'role':
                setRole(e.currentTarget.value);    
            default:
                console.warn(`Improper binding detected on element with id: ${e.currentTarget.id}`);
        }
    }

    let makeNewUser = async () => {
        let addedUser = new NewUser(firstName, lastName, email, username, password, role);
        console.log(addedUser);
        props.newUserAction(addedUser);
    }

    return (
        !props.authUser ? <Redirect to='/login' />:
        <>
            <div className={classes.newUserContainer}>
                <form className={classes.newUserForm}>
                    < Typography align="center" variant="h4">NewUser account for Reimbursments</Typography> 
                    < FormControl margin="normal" fullWidth>
                        < InputLabel htmlFor="username">Username</InputLabel>
                        < Input
                            onChange={updateFormField}
                            value={username}
                            id="username" type="text"
                            placeholder="Enter a username" />
                    </ FormControl>

                    < FormControl margin="normal" fullWidth>
                        < InputLabel htmlFor="password">Password</InputLabel>
                        < Input
                            onChange={updateFormField}
                            value={password}
                            id="password" type="password"
                            placeholder="Enter a password" />
                    </ FormControl>

                    < FormControl margin="normal" fullWidth>
                        < InputLabel htmlFor="firstName">First Name</InputLabel>
                        < Input
                            onChange={updateFormField}
                            value={firstName}
                            id="firstName" type="text"
                            placeholder="Enter first name" />
                    </ FormControl>

                    < FormControl margin="normal" fullWidth>
                        < InputLabel htmlFor="lastName">Last Name</InputLabel>
                        < Input
                            onChange={updateFormField}
                            value={lastName}
                            id="lastName" type="text"
                            placeholder="Enter last name" />
                    </ FormControl>

                    < FormControl margin="normal" fullWidth>
                        < InputLabel htmlFor="email">Email</InputLabel>
                        < Input
                            onChange={updateFormField}
                            value={email}
                            id="email" type="text"
                            placeholder="Enter your email" />
                    </ FormControl>

                    < FormControl margin="normal" fullWidth>
                        < InputLabel htmlFor="role">Role</InputLabel>
                        < Input
                            onChange={updateFormField}
                            value={role}
                            id="role" type="text"
                            placeholder="Enter a role" />
                    </ FormControl>
                    <br/> <br/>
                    < Button 
                        onClick={makeNewUser} 
                        variant="contained" color="primary"
                        size = "medium"> NewUser
                    </Button>
                    <br/><br/>
                    

                </form>
            </div>
        </>
    )
}

export default NewUserComponent;