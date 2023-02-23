
import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Fragment, useEffect, useState } from 'react';
import { searchCompanyByParamsGet } from '../api';
import CardCompany from '../components/CardCompany';

interface CompanySearchState {
    PIB: string;
    name: string;
}

const defaultCompanySearchState: CompanySearchState = {
    PIB: '',
    name: '',


};
interface Company {
    address: string;
    ceoFullName: string;
    email: string;
    id: number;
    name: string
    phoneNumber: string;
    pib: string;
}

function SearchCompany() {

    const [paramsForSearch, setParamsForSearch] = useState(defaultCompanySearchState);
    const [params, setParams] = useState(defaultCompanySearchState)
    const [company, setCompany] = useState<Company[]>([])

    const searchCompanyByParam = () => {
        setParams(paramsForSearch)

    }

    useEffect(() => {
        searchCompanyByParamsGet(params).then((res) => {
            setCompany(res)
        })
    }, [params])



    return (
        <Fragment>
            <Box sx={{ width: '100%', height: '90vh', display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: '80%', }}>
                    <Typography variant='h4' sx={{ marginTop: 10 }}>Search Company by PIB or Name</Typography>
                    <Box sx={{ display: 'flex', gap: 5, marginTop: 5 }}>
                        <TextField value={paramsForSearch.PIB} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setParamsForSearch({ ...paramsForSearch, ['PIB']: event.target.value }) }} id="outlined-basic" label="PIB" variant="outlined" />
                        <TextField value={paramsForSearch.name} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setParamsForSearch({ ...paramsForSearch, ['name']: event.target.value }) }} id="outlined-basic" label="Name" variant="outlined" />
                        <Button onClick={searchCompanyByParam} size='large' variant="contained">Search</Button>
                    </Box>
                    <Box sx={{ marginTop: 10, gap: 5, display: 'flex', flexDirection: 'column' }}>
                        {company.map((item: Company, i: number) => {
                            return <CardCompany key={i} CompanyItem={item} />
                        })}

                    </Box>
                </Box>

            </Box>

        </Fragment>
    );
}

export default SearchCompany;
