import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { getReimbs, getReimbById, updateReimb, deleteReimbById, addReimb, getReimbsByUser } from '../../remote/reimb-service';
import { User } from '../../dtos/user';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core';
import { Reimb } from '../../dtos/reimb';
import { Redirect } from 'react-router';

export interface IReimbProps {
    authUser: User;
    errorMessage: string;
}

const useStyles = makeStyles({
    reimbTable: {
        display: "flex",
        justifyContent: "center",
        margin: 20,
        marginTop: 40,
        padding: 20
    },
});

const UserComponent = (props: IReimbProps) => {

    const classes = useStyles();
    const [reimbs, setTableData] = useState([new Reimb(0,0,new Date,new Date,'','','','','')]);
    const [errorMessage, setErrorMessage] = useState('');

    let getTableData = async () => {
        let result = await getReimbsByUser(props.authUser.username);
        setTableData(result.data);
    }

    const updateRow = async (updatedReimb: Reimb) => {
        try {
            await updateReimb(updatedReimb);
            getTableData();
        } catch (e) {
            setErrorMessage(e.response.data.reason);
        }
    }
    
    const deleteRow = async (reimbToBeDeleted: Reimb) =>{
        try{
            console.log(reimbToBeDeleted)
            await deleteReimbById(reimbToBeDeleted.reimb_id);
            await getTableData();
        }catch(e){
            setErrorMessage(e.response.data.reason)
        }
    }
    let newUser = props.authUser
    const addNewReimb = async (newReimb: Reimb) =>{
        try{
            await addReimb(newReimb, newUser);
            getTableData();
        }catch(e){
            setErrorMessage(e.response.data.reason)
        }
    }

    useEffect(() => {
        getTableData();
    }, []);

  return (
    !props.authUser ? <Redirect to='/login' />:
    <>
        <div className={classes.reimbTable}>
            < MaterialTable
            columns = {[
                { title: 'Id', field: 'reimb_id', editable: 'never'},
                { title: 'Amount', field: 'amount', editable: 'always', type: 'currency', cellStyle: {textAlign: 'left'} },
                { title: 'Submitted (Time)', field: 'submitted' , editable: 'never', type: 'datetime'},
                { title: 'Resolved (Time)', field: 'resolved', editable: 'never', type: 'datetime'},
                { title: 'Description', field: 'description' , editable: 'always'},
                { title: 'Author', field: 'author' , editable: 'never'},
                { title: 'Resolver', field: 'resolver', editable: 'never' },
                { title: 'Reimb Status', field: 'reimb_status' , editable: 'never'},
                { title: 'Reimb Type', field: 'reimb_type', editComponent:((props) => 
                    (<select value={props.value || ''} onChange={e => props.onChange(e.target.value)} >
                        <option value={'lodging'}>Lodging</option>
                        <option value={'travel'}>Travel</option>
                        <option value={'food'}>Food</option>
                        <option value={'other'}>Other</option>
                        </select>)) },
                
            ]}
            data = {[]}
            title = "User Reimbursements"
            editable = {{
                onRowAdd: newData => 
                new Promise((resolve, reject) => {
                    addNewReimb(newData, );
                    resolve();
                }),
                onRowUpdate: (newData, oldData) => 
                new Promise((resolve, reject) => {
                    updateRow(newData);
                    resolve();
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