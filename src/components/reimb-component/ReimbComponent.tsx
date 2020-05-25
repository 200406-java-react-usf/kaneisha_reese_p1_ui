import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { getReimbs, getReimbById, updateReimb, deleteReimbById, addReimb, getReimbsByUser } from '../../remote/reimb-service';
import { User } from '../../dtos/user';
import { Alert } from '@material-ui/lab';
import { makeStyles, Select, MenuItem } from '@material-ui/core';
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

const ReimbComponent = (props: IReimbProps) => {

    const classes = useStyles();
    const [reimbs, setTableData] = useState([new Reimb(0,0,new Date,new Date,'','','','','')]);
    const [errorMessage, setErrorMessage] = useState('');

    let getTableData = async () => {
        let result = (await getReimbs()).filter(function(reimb: Reimb) {
            return reimb.author == props.authUser.username;
        });
        console.log(result);
        setTableData(result);
    }
    let newUser = props.authUser;
    const updateRow = async (updatedReimb: Reimb) => {
        try {
            await updateReimb(updatedReimb, newUser);
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
        console.log(newReimb);
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
                        (<Select defaultValue={'other'} value={props?.value || ''} onChange={e => props.onChange(e.target.value)}>
                            <MenuItem value={'lodging'}>Lodging</MenuItem>
                            <MenuItem value={'food'}>Food</MenuItem>
                            <MenuItem value={'travel'}>Travel</MenuItem>
                            <MenuItem value={'other'}>Other</MenuItem>
                        </Select>)) }   
                    
                ]}
            data = {reimbs}
            title = "User Reimbursements"
            editable= {{

                onRowAdd: newData =>
                new Promise((resolve,reject) => {
                    addNewReimb(newData);
                    resolve();
                }),
                onRowUpdate: (newData, oldData) =>
                new Promise((resolve,reject) =>{
                    resolve();
                    updateRow(newData);
                }),
                onRowDelete: oldData =>
                new Promise((resolve, reject) =>{
                    console.log(oldData.reimb_id)
                    deleteRow(oldData)
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

export default ReimbComponent;