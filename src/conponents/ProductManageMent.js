import { Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import axios from 'axios';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import FormInput from '../customComponent/CustomTextField';

const ProductManageMent = ({ product, setProduct }) => {

    const methods = useForm();

    const onClickEdit = (value) => {
        const exist = product.find((x) => x.id === value.id);
        if (exist) {
            setProduct(
                product.map((x) => x.id === value.id ? { ...exist, click: exist.click = true } : x)
            );

        }
    }

    const [previous, setPrevious] = useState({});
    const [clicked, setClicked] = useState(false);
    const onChangeHandler = (e, row) => {
        if (!previous[row.id]) {
            setPrevious(state => ({ ...state, [row.id]: row }));
        }
        const name = e.target.name;
        const value = e.target.value;
        const { id } = row;
        const newRows = product.map(row => {
            if (row.id === id) {
                return { ...row, [name]: value };
            }
            return row;
        });
        setProduct(newRows);
        const exist = product.find((x) => x.id === value.id);
        if (exist) {
            setProduct(
                product.map((x) => x.id === value.id ? { ...exist, [name]: value } : x)
            );
        }
    };
    const onUpdateProduct = (value) => {

        let urlUpdate = 'https://6241159919f609879242ccd5.mockapi.io/products/' + value.id;
        axios({
            method: 'PUT',
            url: urlUpdate,
            data: {
                name: value.name,
                price: value.price,
            },
        }, [])
            .then((response) => {
                console.log(response);
                const exist = product.find((x) => x.id === value.id);
                if (exist) {
                    setProduct(
                        product.map((x) => x.id === value.id ? { ...exist, click: exist.click = false } : x)
                    );

                }
            })
            .catch((err) => {
                console.log(err);
            })

    }
    const onDelete = (value) => {
        let url = 'https://6241159919f609879242ccd5.mockapi.io/products/' + value.id;
        return axios({
            method: 'DELETE',
            url: url,
        })
    }
    const onSubmitHandler = (data) => {
        console.log(data);
        let urlCreate = 'https://6241159919f609879242ccd5.mockapi.io/products/';
        axios({
            method: 'POST',
            url: urlCreate,
            data: {
                name: data.name,
                price: data.price,
            }
        }, [])
            .then((response) => {
                const { data } = response;
                setProduct([...product, data]);
                window.alert('Sản phẩm đã được thêm');
                setClicked(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const onClickDelete = (value) => {
        const conf = window.confirm('Bạn có muốn xóa sản phẩm này?');
        if (conf === true) {
            const result = onDelete(value);
            result.then((response) => {
                const newRows = product.filter((row) => {
                    if (row.id === value.id) {
                        return false;
                    }
                    return row;
                });
                setProduct(newRows);
            })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            return;
        }
    }
   
    const onAddProduct = () => {
        setClicked(true);
    }
    const onCancel = () => {
        setClicked(false);
    }
    const formAddProduct = () => clicked === true ? (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit((data) => onSubmitHandler({ ...data }))}>
                <div style={{ display: 'flex' }}>
                    <FormInput required name='name' label='Name*' />
                    <FormInput required name='price' label='Price*' />



                    <Button style={{ margin: '10px' }} type='submit' variant='outlined' >Xác nhận</Button>
                    <Button style={{ margin: '10px' }} variant='outlined' onClick={() => { onCancel() }}>
                        Cancel
         </Button>

                </div>

            </form>
        </FormProvider>
    ) : ''
    return (
        <div>
            <div>
                <Typography style={{ margin: '40px 0px', textAlign: 'center', fontWeight: 800 }} color='secondary' variant='h5'>Quản lý sản phẩm</Typography>
            </div>
            <div style={{ display: 'flex' }}>
                <IconButton style={{ margin: '10px 20px' }} onClick={() => { onAddProduct() }}>
                    Thêm sản phẩm   <AddCircleIcon />
                </IconButton>

                {formAddProduct()}
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Tên</TableCell>
                        <TableCell>Giá</TableCell>
                        <TableCell>Ảnh</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        product.map((value) => {
                            return (
                                <TableRow key={value.id}>
                                    <TableCell>{value.id}</TableCell>
                                    <TableCell>{value.click == true ? <TextField onChange={e => onChangeHandler(e, value)} name='name' defaultValue={value.name} /> : value.name}</TableCell>
                                    <TableCell>{value.click == true ? <TextField onChange={e => onChangeHandler(e, value)} name='price' defaultValue={value.price} /> : value.price}</TableCell>
                                    <TableCell><div><img style={{ width: 100, height: 50 }} src={value.image} /></div></TableCell>
                                    <TableCell>

                                        <IconButton onClick={() => { onClickEdit(value) }}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => { onClickDelete(value) }}>
                                            <HighlightOffIcon />
                                        </IconButton>
                                        {value.click == true ? <IconButton onClick={() => { onUpdateProduct(value) }}>
                                            Lưu
                                    </IconButton> : ''}
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default ProductManageMent
