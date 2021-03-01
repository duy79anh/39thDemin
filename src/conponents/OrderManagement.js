import { Table, TableBody, TableHead, TableCell, TableRow, IconButton, Typography, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckIcon from '@material-ui/icons/Check';
import axios from 'axios';

const OrderManagement = ({order,setOrder}) => {
    const [checked, setChecked] = useState(false);
    const handleChange = (value) => {
        // setChecked((prev) => !prev);
        const exist = order.find((x) => x.orderId === value);
      if (exist) {
          setOrder(
              order.map((x) => x.orderId === value ? { ...exist, state: exist.state =false } : x)
          );
            // listItem(value);
            console.log(exist.state);
      }
      };
      const onClickCollapse=(value)=>{
        const exist = order.find((x) => x.orderId === value);
      if (exist) {
          setOrder(
              order.map((x) => x.orderId === value ? { ...exist, state: exist.state = true } : x)
          );
            listItem(value);
            console.log(exist.state);
      }
      }
    const listItem =(value)=>{
      // console.log(value);
     
     return (
            <div >
              <FormControlLabel
                control={<Switch checked={value.state} onClick={()=>{onClickCollapse(value.orderId)}} onChange={handleChange(value)} />}
                label="Show"
              />
              
              <div >
                <Collapse in={value.state}>
                  <Paper elevation={4} >
                    <Table >
                      
                      {order.map((item)=>{
                        return(
                          <TableRow key={item.orderId}>
                            <TableCell>{item.customerName}</TableCell>
                            </TableRow>
                        );
                      })}
                    </Table>
                  </Paper>
                </Collapse>               
              </div>
            </div>
          );
    }
    const onUpdateStatus=(value)=>{
     const conf=window.confirm('Do you want to confirm this Order?');
     if(conf===true){
      const exist = order.find((x) => x.orderId === value.orderId);
      if (exist) {
          setOrder(
              order.map((x) => x.orderId === value.orderId ? { ...exist, status: exist.status ='confirmed' } : x)
          );
    }
    let url='https://600e76d03bb1d100179df304.mockapi.io/orderDetails/'+value.orderId;
    axios({
      method:'PUT',
      url:url,
      data:{
        status:'confirmed'
      },
    },[])
    window.alert('confirmed');
     }else{
       return;
     }
  }
    return (
        <div>
            <Typography style={{margin:'20px 0px',textAlign:'center',fontWeight:800}} color='secondary' variant='h5'>Order Management</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>Order Id</TableCell>
                    <TableCell>Created At</TableCell>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>ListItem</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        order.map((value)=>{
                            return(
                                <TableRow key={value.orderId}>
                                    <TableCell>{value.orderId}</TableCell>
                                <TableCell>{value.createdAt}</TableCell>               
                                <TableCell>{value.customerName}</TableCell> 
                                <TableCell>{value.address}</TableCell>
                                <TableCell>{value.phone}</TableCell>
                                <TableCell>{value.email}</TableCell>
                                <TableCell>{' '+value.listProduct }</TableCell>
                                <TableCell>{value.totalOrder}</TableCell>
                                <TableCell>{value.status==='not confirmed yet'? <div>{value.status}<IconButton onClick={()=>{onUpdateStatus(value)}}><CheckIcon/></IconButton></div>:value.status}</TableCell>
                                </TableRow>
                            );
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
    
}

export default OrderManagement
