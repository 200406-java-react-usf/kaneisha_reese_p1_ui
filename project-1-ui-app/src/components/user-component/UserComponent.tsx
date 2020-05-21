import React, { useState, useEffect } from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { Redirect } from 'react-router';
import { Alert } from '@material-ui/lab';
import { User } from '../../dtos/user';
import MaterialTable from 'material-table';
import { getUsers, updateUser, deleteUserById, addUser} from '../../remote/user-service';

interface IUserProps {
    authUser: User;
    errorMessage: string;
}

const useStyles = makeStyles({
    userTable: {
        display: "flex",
        justifyContent: "center",
        margin: 20,
        marginTop: 40,
        padding: 20
    },
});

const UserComponent = (props: IUserProps) => {

    const classes = useStyles();
    const [users, setTableData] = useState([new User(0, '', '', '', '', '', '')]);
    const [errorMessage, setErrorMessage] = useState('');

    let getTableData = async() =>{
        let result = await getUsers();
        setTableData(result);
    }

    const updateRow = async (updatedUser: User) =>{
        try{
            if (!updatedUser.password){
                updatedUser.password = '';
            }
            await updateUser(updatedUser);
            getTableData();
        }catch(e){
            setErrorMessage(e.response.data.reason)
        }
    }

    const deleteRow = async (id: number) =>{
        try{
            await deleteUserById(id);
            getTableData();
        }catch(e){
            setErrorMessage(e.response.data.reason)
        }
    }

    const addNew = async (newUser: User) =>{
        try{
            await addUser(newUser);
            getTableData();
        }catch(e){
            setErrorMessage(e.response.data.reason)
        }
    }

    return (
        !props.authUser ? <Redirect to="/home" /> :
        <>
            <div>
                <Button
                    onClick={getTableData}
                    variant="contained" 
                    color="primary" 
                    size="medium" >Get Users</Button>
            </div>
            <div className = {classes.userTable}>
                <MaterialTable
                columns = {[
                    {title: 'User ID', field: 'user_id', editable: 'never'},
                    {title: 'Username', field: 'username', editable: 'always'},
                    {title: 'Password', field: 'password'},
                    {title: 'First Name', field: 'firstName', editable: 'onAdd'},
                    {title: 'Last Name', field: 'lastName', editable: 'always'},
                    {title: 'Email', field: 'email', editable: 'always'},
                    {title: 'Role', field: 'role', editable: 'always'}
                ]}
                data = {users}
                title = "ERS Users"
                editable= {{
                onRowAdd: newData =>
                new Promise((resolve,reject) => {
                    addNew(newData);
                    resolve();
                }),
                    onRowUpdate: (newData, oldData) =>
                    new Promise((resolve,reject) =>{
                        resolve();
                        updateRow(newData);
                    }),
                    onRowDelete: oldData =>
                    new Promise((resolve, reject) =>{
                        deleteRow(oldData.id)
                    })
                }}
                />
                    {
                        props.errorMessage 
                            ? 
                        <Alert severity="error">{props.errorMessage}</Alert>
                            :
                        <></>
                    }
            </div>
        </>
    );
}

export default UserComponent;