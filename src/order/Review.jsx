import React from 'react'
import { Typography, List, ListItem, ListItemText, Grid } from '@material-ui/core';
const Review = ({ cart, shippingData }) => {
    const totalPrice = cart.reduce((a, c) => a + c.price * c.qty, 0);
    return (
        <>
            <Typography variant='h6' align='justify' >Order Information</Typography>
            <Grid style={{ textAlign: 'inherit',padding: '10px 25px' }} >
                <Typography variant='subtitle1'> Consignee Name: {shippingData.firstName} {shippingData.lastName} </Typography>
                <Typography variant='subtitle1'> Adress: {shippingData.adress} </Typography>
                <Typography variant='subtitle1'> Phone Numbers: {shippingData.phone} </Typography>
                <Typography variant='subtitle1'> Email: {shippingData.email} </Typography>
            </Grid>
            <Typography variant='h6' gutterBottom>Order Summary</Typography>
            <List >
                {cart.map((product) => (
                    <ListItem style={{ padding: '10px 0' }} key={product.name}>
                        <ListItemText primary={product.name} secondary={`Quantity: ${product.qty}`} />
                        <Typography style={{ marginRight: 50 }} variant='body2'>$ {product.price * product.qty}</Typography>
                    </ListItem>
                ))}
                <ListItem style={{ padding: '10px 0' }}>
                    <ListItemText primary='Total' />
                    <Typography variant='subtitle1' style={{ fontWeight: 800, marginRight: 50 }} >$ {totalPrice}</Typography>
                </ListItem>
            </List>

        </>
    )
}

export default Review
