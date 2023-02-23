import { Box, Button, Grid, TextField, Typography } from '@mui/material';

import React, { useState } from 'react';
import { createComapnyPost } from '../api';

interface CompanyFormState {
    name: string;
    pib: string;
    email: string;
    address: string;
    ceoFullName: string;
    phoneNumber: string;
}

const defaultFormState: CompanyFormState = {
    name: '',
    pib: '',
    email: '',
    address: '',
    ceoFullName: '',
    phoneNumber: '',
};

const CreateCompany = () => {
    const [formState, setFormState] = useState(defaultFormState);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formState); // You can do something with the form data here
        createComapnyPost(formState)
        setFormState(defaultFormState); // Reset the form
    };

    return (
        <Box sx={{ width: '100%', height: '90vh', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
            <Box sx={{ width: '80%', height: '50%  ' }}>
                <form onSubmit={handleSubmit}>
                    <Typography variant='h3' color={'#1976d2'}>Create Company</Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Name"
                                name="name"
                                value={formState.name}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="PIB"
                                name="pib"
                                value={formState.pib}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                name="email"
                                value={formState.email}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Address"
                                name="address"
                                value={formState.address}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="CEO Full Name"
                                name="ceoFullName"
                                value={formState.ceoFullName}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Phone Number"
                                name="phoneNumber"
                                value={formState.phoneNumber}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Box>
    );
};

export default CreateCompany;