
import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Fragment, useEffect, useState } from 'react';
import { searchInvoiceByParamsGet } from '../api';
import CardInvoice from '../components/CardInvoice';
import { Invoice } from '../types/intex';

interface InvoiceSearchState {
    creatorCompanyPIB: string;
}

const defaultCompanySearchState: InvoiceSearchState = {
    creatorCompanyPIB: '',
};


function SearchInvoice() {

    const [paramsForSearch, setParamsForSearch] = useState(defaultCompanySearchState);
    const [params, setParams] = useState(defaultCompanySearchState)
    const [company, setCompany] = useState<Invoice[]>([])

    const searchInvoiceyByParam = () => {
        setParams(paramsForSearch)

    }

    useEffect(() => {
        searchInvoiceByParamsGet(params).then((res) => {
            setCompany(res)
        })
    }, [params])



    return (
        <Fragment>
            <Box sx={{ width: '100%', height: '90vh', display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: '80%', }}>
                    <Typography variant='h4' sx={{ marginTop: 10 }}>Search Invoice by Creator Company PIB
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 5, marginTop: 5 }}>
                        <TextField value={paramsForSearch.creatorCompanyPIB} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setParamsForSearch({ ...paramsForSearch, ['creatorCompanyPIB']: event.target.value }) }} id="outlined-basic" label="PIB" variant="outlined" />
                        <Button onClick={searchInvoiceyByParam} size='large' variant="contained">Search</Button>
                    </Box>
                    <Box sx={{ marginTop: 10, gap: 5, display: 'flex', flexDirection: 'column' }}>
                        {company?.map((item: Invoice, i: number) => {
                            return <CardInvoice key={i} InvoiceItem={item} />
                        })}

                    </Box>
                </Box>

            </Box>

        </Fragment>
    );
}

export default SearchInvoice;
