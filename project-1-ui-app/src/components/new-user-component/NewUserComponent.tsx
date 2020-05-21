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

interface INewUserProps {
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
                setRole((e.target as HTMLInputElement).value));    
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
                        < InputLabel htmlFor="firstname">First Name</InputLabel>
                        < Input
                            onChange={updateFormField}
                            value={firstName}
                            id="firstname" type="text"
                            placeholder="Enter your first name" />
                    </ FormControl>

                    < FormControl margin="normal" fullWidth>
                        < InputLabel htmlFor="lastname">Last Name</InputLabel>
                        < Input
                            onChange={updateFormField}
                            value={lastName}
                            id="lastname" type="text"
                            placeholder="Enter your last name" />
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
                    
                        <RadioGroup aria-label="role" name="role" value={role} onChange={updateFormField}>
                            <FormControlLabel value="employee" control={<Radio />} label="employee" />
                            <FormControlLabel value="manager" control={<Radio />} label="manager" />
                            <FormControlLabel value="admin" control={<Radio />} label="admin" />
                        </RadioGroup>
                            
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