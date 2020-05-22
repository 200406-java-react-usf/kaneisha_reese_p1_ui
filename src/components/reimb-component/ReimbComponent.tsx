import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { getReimbs, getReimbById, updateReimb, deleteReimbById, addReimb } from '../../remote/reimb-service';
import { User } from '../../dtos/user';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core';
import { Reimb } from '../../dtos/reimb';

export interface IReimbProps {
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

const UserComponent = (props: IReimbProps) => {

    const classes = useStyles();
    const [reimb, setTableData] = useState([new Reimb(0,0,new Date,new Date,'','','','','')]);
    const [errorMessage, setErrorMessage] = useState('');

    let getTableData = async () => {
        let result = await getReimbById(props.authUser.user_id);
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

    const addNewReimb = async (newReimb: Reimb) =>{
        try{
            await addReimb(newReimb);
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
                { title: 'Id', field: 'reimbId', editable: 'never'},
                { title: 'Amount', field: 'amount', editable: 'never', type: 'currency', cellStyle: {textAlign: 'left'} },
                { title: 'Submitted (Time)', field: 'submitted' , editable: 'never', type: 'datetime'},
                { title: 'Resolved (Time)', field: 'resolved', editable: 'never', type: 'datetime'},
                { title: 'Description', field: 'description' , editable: 'never'},
                { title: 'Author', field: 'author' , editable: 'never'},
                { title: 'Resolver', field: 'resolver', editable: 'never' },
                { title: 'Reimb. Status', field: 'status', editComponent:((props) => 
                (<select value={props.value || ''} onChange={e => props.onChange(e.target.value)} >
                  <option value={'Denied'}>Denied</option>
                  <option value={'Pending'}>Pending</option>
                  <option value={'Approved'}>Approved</option>
                  </select>)) },
                { title: 'Reimb Type', field: 'reimbType' , editable: 'never'}
              ]}
            data = {[]}
            title = "User Reimbursements"
            editable = {{
                onRowAdd: newData => 
                new Promise((resolve, reject) => {
                    addNewReimb(newData);
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