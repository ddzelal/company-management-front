import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Company } from '../types/intex';
import { Modal, Grid, TextField } from '@mui/material';
import { editCompanyPut, getCompanyBalance } from '../api';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

interface Props {
  CompanyItem: Company;
}

interface CompanyFormState {
  name: string;
  pib: string;
  email: string;
  address: string;
  ceoFullName: string;
  phoneNumber: string;
  id: number | null;
}

const defaultFormState: CompanyFormState = {
  name: '',
  pib: '',
  email: '',
  address: '',
  ceoFullName: '',
  phoneNumber: '',
  id: null,
};

export default function CardCompany({ CompanyItem }: Props) {
  const [open, setOpen] = React.useState(false);
  const [openTwoModal, setOpenTwoModal] = React.useState(false);
  const [copnayEdit, setCopnayEdit] = React.useState(defaultFormState)
  const [companyBalance, setCompanyBalance] = React.useState(null)

  const handleOpen = (Company: CompanyFormState) => {
    setCopnayEdit(Company)

    setOpen(true)
  };
  const handleClose = () => setOpen(false);


  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setCopnayEdit((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    editCompanyPut(copnayEdit).then(() => {
      window.location.reload()
    })
  };

  const checkCompanyBalance = () => {
    setOpenTwoModal(true)
    getCompanyBalance(CompanyItem.pib).then((res) => {
      setCompanyBalance(res)
    })

  }

  return (
    <Card sx={{ minWidth: 375 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {bull}PIB: {CompanyItem?.pib}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {bull}Address: {CompanyItem?.address}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {bull}Ceo FullName: {CompanyItem?.ceoFullName}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {bull}email: {CompanyItem?.email}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {bull}Phone Number: {CompanyItem?.phoneNumber}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {bull}id: {CompanyItem.id}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {bull}name: {CompanyItem?.name}
        </Typography>

      </CardContent>
      <CardActions>
        <Button onClick={() => handleOpen(CompanyItem)} size="small">Update Company</Button>
      </CardActions>
      <CardActions>
        <Button onClick={checkCompanyBalance} size="small">Check Company Balanc</Button>
      </CardActions>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ width: '100%', height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ background: 'white', width: '80%', padding: 20 }} >
            <form onSubmit={handleSubmit}>
              <Typography variant='h3' color={'#1976d2'}>Update Company</Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Name"
                    name="name"
                    value={copnayEdit?.name}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="PIB"
                    name="pib"
                    value={copnayEdit?.pib}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    name="email"
                    value={copnayEdit?.email}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Address"
                    name="address"
                    value={copnayEdit?.address}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="CEO Full Name"
                    name="ceoFullName"
                    value={copnayEdit?.ceoFullName}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={copnayEdit?.phoneNumber}
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
      </Modal>
      <Modal
        open={openTwoModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ width: '100%', height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ background: 'white', width: '80%', padding: 20 }} >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Company Balance: {companyBalance}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Company Name: {CompanyItem.name}
            </Typography>
            <Button onClick={() => { setOpenTwoModal(false) }} type="submit" variant="contained" color="primary">
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Card >
  );
}