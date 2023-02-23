import { Button, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { createInvoicePost } from '../api';

interface InvoiceData {
  intendedForCompanyPIB: string;
  creatorCompany: string;
  toBePaidUntil: string;
  type: number;
  totalSum: number;
  invoiceItems: InvoiceItem[];
}

interface InvoiceItem {
  id: number;
  name: string;
  priceByUnitType: number;
  unitType: string;
  neto: number;
  [key: string]: number | string;
}


const defaultState: InvoiceData = {
  intendedForCompanyPIB: '',
  creatorCompany: '',
  toBePaidUntil: '',
  type: 0,
  totalSum: 0,
  invoiceItems: [
    {
      id: 0,
      name: '',
      priceByUnitType: 0,
      unitType: '',
      neto: 0,
    },
  ],
};


export const CreateInvoice = () => {
  const [formState, setFormState] = useState(defaultState);
  const navigate = useNavigate()

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = event.target;
    if (name === 'type' || name === 'totalSum') {
      const numberValue = Number(event.target.value)
      setFormState((prevState) => ({ ...prevState, [name]: numberValue }));
    }
    else {
      const { value } = event.target
      setFormState((prevState) => ({ ...prevState, [name]: value }));

    }
  };

  // onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setFormState({ ...formState, invoiceItems: [...formState.invoiceItems[0].name:event.target.value]})}}

  const handleInvoiceItems = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFormState = formState
    if (event.target.name === 'neto' || event.target.value === 'priceByUnitType') {
      const numberValue = Number(event.target.value)
      newFormState.invoiceItems[0][event.target.name] = numberValue


    }
    else {
      const { value } = event.target;

      newFormState.invoiceItems[0][event.target.name] = value
    }
    setFormState(newFormState)

  }


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formState);
    const fromStateCopy = formState

    createInvoicePost(formState).then((res) => {
      if (res === 200) navigate('/')
    })
  };
  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ width: '70%', marginTop: 10 }}>
        <form onSubmit={handleSubmit}>
          <Typography variant='h3' color={'#1976d2'}>Create Inovice</Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Intended For Company PIB"
                name="intendedForCompanyPIB"
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Creator Company"
                name="creatorCompany"
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                required
                label="Type"
                name="type"
                type="number"
                InputProps={{
                  inputProps: {
                    min: 0,
                    max: 1,
                  },
                }}
                fullWidth
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="toBePaidUntil"
                onChange={handleInputChange}
                type="date"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Total Sum"
                name="totalSum"
                onChange={handleInputChange}
                type="number"
                fullWidth
              />

            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                onChange={handleInvoiceItems}
                label="Name Items"
                name="name"
                fullWidth
              />

            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                onChange={handleInvoiceItems}
                label="Price By Unit Type"
                name="priceByUnitType"
                type="number"
                fullWidth
              />

            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                onChange={handleInvoiceItems}
                label="Unit Type"
                name="unitType"
                fullWidth
              />

            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                onChange={handleInvoiceItems}
                label="Neto"
                name="neto"
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
  )
}
