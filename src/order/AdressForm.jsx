import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import FormInput from '../customComponent/CustomTextField';
const AdressForm = ({ cart,next }) => {
    const methods = useForm();
   
    return (
        <>
            <Typography>Địa chỉ giao hàng</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data)=>next({ ...data }))}>
                    <Grid container spacing={3}>
                        <FormInput required name='firstName' label='Họ' />
                        <FormInput required name='lastName' label='Tên' />
                        <FormInput required name='phone' label='Số điện thoại' />
                        <FormInput required name='email' label='Email' />
                        <FormInput required name='adress' label='Địa chỉ' />
                        
                    </Grid>

                    <br/>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <Button component={Link} to='/Cart' color='secondary' variant='outlined'>Về giỏ hàng</Button>
                        <Button  type='submit' color='primary' variant='contained'>Tiếp tục</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AdressForm
