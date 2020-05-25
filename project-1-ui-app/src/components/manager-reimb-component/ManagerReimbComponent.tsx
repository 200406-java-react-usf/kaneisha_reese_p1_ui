import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { getReimbs, getReimbById, updateReimb, deleteReimbById, addReimb, getReimbsByUser } from '../../remote/reimb-service';
import { User } from '../../dtos/user';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core';
import { Reimb } from '../../dtos/reimb';
import { Redirect } from 'react-router';

export interface IManagerReimbProps {
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

const ManagerReimbComponent = (props: IManagerReimbProps) => {

    const classes = useStyles();
    const [reimbs, setTableData] = useState([new Reimb(0,0,new Date,new Date,'','','','','')]);
    const [errorMessage, setErrorMessage] = useState('');

    let getTableData = async () => {
        let result = await getReimbs();
        console.log(result);
        setTableData(result);
    }
    let manager = props.authUser
    const updateRow = async (updatedReimb: Reimb) => {
        try {
            await updateReimb(updatedReimb, manager);
            
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
                { title: 'Amount', field: 'amount', editable: 'never', type: 'currency', cellStyle: {textAlign: 'left'} },
                { title: 'Submitted (Time)', field: 'submitted' , editable: 'never', type: 'datetime'},
                { title: 'Resolved (Time)', field: 'resolved', editable: 'never', type: 'datetime'},
                { title: 'Description', field: 'description' , editable: 'never'},
                { title: 'Author', field: 'author' , editable: 'never'},
                { title: 'Resolver', field: 'resolver', editable: 'never' },
                { title: 'Reimb Type', field: 'reimb_type' , editable: 'never'},
                { title: 'Reimb Status', field: 'reimb_status', editable:'always', editComponent:((props) => 
                    (<select value={props.value || ''} onChange={e => props.onChange(e.target.value)} >
                        <option value={'approved'}>Approved</option>
                        <option value={'denied'}>Denied</option>
                    </select>)) },
                
            ]}
            data = {reimbs}
            title = "User Reimbursements"
            editable = {{
                
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

export default ManagerReimbComponent;