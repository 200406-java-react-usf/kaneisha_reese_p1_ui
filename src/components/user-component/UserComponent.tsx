import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { getUsers, updateUser, deleteUserById, addUser } from '../../remote/user-service';
import { User } from '../../dtos/user';
import { Alert } from '@material-ui/lab';
import { makeStyles, Select, MenuItem } from '@material-ui/core';
import { NewUser } from '../../dtos/new-user';


export interface IUserProps {
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
    const [users, setTableData] = useState([new User(0,'','','','','','')]);
    const [errorMessage, setErrorMessage] = useState('');

    let getTableData = async () => {
        let result = await getUsers();
        setTableData(result);
    }

    const updateRow = async (updatedUser: NewUser) => {
        try {
            await updateUser(updatedUser);
            getTableData();
        } catch (e) {
            setErrorMessage(e.response.data.reason);
        }
    }
    
    const deleteRow = async (userToBeDeleted: User) =>{
        try{
            console.log(userToBeDeleted)
            await deleteUserById(userToBeDeleted.user_id);
            await getTableData();
        }catch(e){
            setErrorMessage(e.response.data.reason)
        }
    }

    const addNew = async (newUser: User) =>{
        try{
            await addUser(newUser.username, newUser.password, newUser.firstName, newUser.lastName, newUser.email, newUser.role);
            getTableData();
        }catch(e){
            setErrorMessage(e.response.data.reason)
        }
    }

    useEffect(() => {
        getTableData();
    }, []);

  return (
    <>
        <div className={classes.userTable}>
            < MaterialTable
            columns = {[
                {title: 'User ID', field: 'user_id', editable: 'never'},
                {title: 'Username', field: 'username', editable: 'onAdd'},
                {title: 'First Name', field: 'firstName'},
                {title: 'Last Name', field: 'lastName'},
                {title: 'Password', field: 'password' },
                {title: 'Email', field: 'email'},
                {title: 'Role', field: 'role', editable: 'always', editComponent:((props)=> 
            (<Select defaultValue={'employee'} value={props?.value || ''} onChange={e => props.onChange(e.target.value)}>
                  <MenuItem value={'admin'}>Administrator</MenuItem>
                  <MenuItem value={'manager'}>Finance Manager</MenuItem>
                  <MenuItem value={'employee'}>Employee</MenuItem>
              </Select>)) }
            ]}
            data = {users}
            title = "All System Users"
            
            editable = {{
                onRowAdd: newData => 
                new Promise((resolve, reject) => {
                    addNew(newData);
                    resolve();
                }),
                
                onRowUpdate: (newData, oldData) => 
                new Promise((resolve, reject) => {
                    resolve();
                    updateRow(newData);
                }),
                onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                    
                    deleteRow(oldData);
                    resolve();
                })
            }}
            />
            {
                (props.errorMessage)
                ?
                < Alert severity="error">{props.errorMessage}</Alert>
                :
                <></>
            }
        
        </div>
    </>
  );
}

export default UserComponent;