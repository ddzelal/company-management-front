import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Invoice } from '../types/intex';
import { Modal, Grid, TextField } from '@mui/material';
import { updateInvoicePut } from '../api';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

interface Props {
    InvoiceItem: Invoice;
}

interface InvoiceForState {

    intendedForCompanyPIB: string;
    creatorCompany: string;
    createdAt: string;
    toBePaidUntil: string;
    type: number | null;
    totalSum: string | null;
    id: number | null;
}

const defaultFormState: InvoiceForState = {
    intendedForCompanyPIB: '',
    creatorCompany: '',
    createdAt: '',
    toBePaidUntil: '',
    type: null,
    totalSum: null,
    id: null,
};


export default function CardInvoice({ InvoiceItem }: Props) {
    const [open, setOpen] = React.useState(false);
    const [openTwoModal, setOpenTwoModal] = React.useState(false);
    const [invoiceEdit, setInvoiceEdit] = React.useState<Invoice | any>()
    const [companyBalance, setCompanyBalance] = React.useState(null)

    const handleOpen = () => {
        console.log(InvoiceItem)
        setInvoiceEdit(InvoiceItem)

        setOpen(true)
    };
    const handleClose = () => setOpen(false);


    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name } = event.target;
        if (event.target.name === 'type' || event.target.name === 'totalSum') {
            const numberValue = Number(event.target.value)
            setInvoiceEdit((invoiceEdit: any) => ({ ...invoiceEdit, [name]: numberValue }));

        }
        else {

            setInvoiceEdit((invoiceEdit: any) => ({ ...invoiceEdit, [name]: event.target.value }));
        }

        console.log(invoiceEdit, "edit")
    };

    const handleInvoiceItemInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newFormState = invoiceEdit
        if (event.target.name === 'neto' || event.target.value === 'priceByUnitType') {
            const numberValue = Number(event.target.value)
            newFormState.invoiceItems[0][event.target.name] = numberValue
        }
        else {
            const { value } = event.target;

            newFormState.invoiceItems[0][event.target.name] = value
        }
        setInvoiceEdit(newFormState)


    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { id, intendedForCompanyPIB, creatorCompany, toBePaidUntil, createdAt, type, totalSum, ...rest } = invoiceEdit
        const editObj = {
            id, intendedForCompanyPIB, creatorCompany, toBePaidUntil, createdAt, type, totalSum
        }
        console.log(editObj, "TO JE TO")
        updateInvoicePut(editObj).then((res) => {
            if (res === 200) window.location.reload()
        })

    };


    return (
        <Card sx={{ minWidth: 375 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {bull}Creator Company: {InvoiceItem.creatorCompany}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {bull}id: {InvoiceItem.id}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {bull}Intended For Company PIB: {InvoiceItem?.intendedForCompanyPIB}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {bull}Name Items: {InvoiceItem.invoiceItems[0]?.name}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {bull}Neto: {InvoiceItem.invoiceItems[0]?.neto}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {bull}Total Sum: {InvoiceItem?.totalSum}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {bull}Type: {InvoiceItem?.type}
                </Typography>

            </CardContent>
            <CardActions>
                <Button onClick={handleOpen} size="small">Update Invoice</Button>
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

                                <Grid item xs={12}>
                                    <TextField
                                        label="intendedForCompanyPIB"
                                        name="intendedForCompanyPIB"
                                        value={invoiceEdit?.intendedForCompanyPIB}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Total Sum"
                                        name="totalSum"
                                        type='number'
                                        value={invoiceEdit?.totalSum}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        type='date'
                                        name="toBePaidUntil"
                                        value={invoiceEdit?.toBePaidUntil}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Type"
                                        name="type"
                                        value={invoiceEdit?.type}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Invoice name"
                                        name="name"
                                        value={invoiceEdit?.invoiceItems[0]?.name}
                                        onChange={handleInvoiceItemInputChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Price By Unit Type"
                                        name="priceByUnitType"
                                        type='number'
                                        value={invoiceEdit?.invoiceItems[0]?.priceByUnitType}
                                        onChange={handleInvoiceItemInputChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Unit Type"
                                        name="unitType"
                                        value={invoiceEdit?.invoiceItems[0]?.unitType}
                                        onChange={handleInvoiceItemInputChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Neto"
                                        name="neto"
                                        value={invoiceEdit?.invoiceItems[0]?.neto}
                                        onChange={handleInvoiceItemInputChange}
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

        </Card >
    );
}