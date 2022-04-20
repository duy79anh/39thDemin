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
        const exist = order.find((x) => x.orderId === value);
      if (exist) {
          setOrder(
              order.map((x) => x.orderId === value ? { ...exist, state: exist.state =false } : x)
          );
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
     const conf=window.confirm('Bạn có muốn xác nhận đơn hàng này?');
     if(conf===true){
      const exist = order.find((x) => x.orderId === value.orderId);
      if (exist) {
          setOrder(
              order.map((x) => x.orderId === value.orderId ? { ...exist, status: exist.status ='confirmed' } : x)
          );
    }
    let url='https://6241159919f609879242ccd5.mockapi.io/orderDetails/'+value.orderId;
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
            <Typography style={{margin:'20px 0px',textAlign:'center',fontWeight:800}} color='secondary' variant='h5'>Quản lý đơn hàng</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>Mã đơn</TableCell>
                    <TableCell>Ngày order</TableCell>
                    <TableCell>Tên KH</TableCell>
                    <TableCell>Địa chỉ</TableCell>
                    <TableCell>SĐT</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>List sản phẩm</TableCell>
                    <TableCell>Tổng</TableCell>
                    <TableCell>Trạng thái</TableCell>
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
                                <TableCell>{value.totalOrder}.0 vnđ</TableCell>
                                <TableCell>{value.status==='Chưa xác nhận'? <div>{value.status}<IconButton onClick={()=>{onUpdateStatus(value)}}><CheckIcon/></IconButton></div>:value.status}</TableCell>
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
