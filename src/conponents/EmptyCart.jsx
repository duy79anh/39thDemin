import { Typography } from '@material-ui/core'
import React from 'react'
const EmptyCart = () => {
    return (
        <>
        <React.Fragment >
          <Typography style={{fontWeight:'bold',marginTop: 148,paddingBottom:90}} variant='h3' color='secondary' align='center'> Ồ! Giỏ hàng của bạn đang trống!</Typography>
          </React.Fragment>
        </>
    )
}

export default EmptyCart
