import axios,{AxiosInstance} from "axios";

const instance:AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        'Content-Type': 'application/json'
      }
});


interface CompanyData {
    name: string;
    pib: string;
    email: string;
    address: string;
    ceoFullName: string;
    phoneNumber: string;
  }

  interface CompanyDataEdit {
    name: string;
    pib: string;
    email: string;
    address: string;
    ceoFullName: string;
    phoneNumber: string;
    id:number| null
  }



  export const createComapnyPost = async (data: CompanyData) => {
    console.log(data,"ovo je data")
    try {
      const response = await instance.post('Company',data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  export const editCompanyPut = async (data:CompanyDataEdit) => {
    try {
      const response = await instance.put('Company',data);
      console.log(response)
      
    } catch (error) {
      console.log(error)
      
    }
  } 

  interface CompanySearchState {
    PIB: string;
    name: string;
}

  export const searchCompanyByParamsGet = async(params:CompanySearchState)=>{
    try {
      
      const response = await instance.get(`Company?PIB=${params.PIB}&name=${params.name}`)
      return response.data
      
    } catch (error) {
      console.log(error)
    }
  }

  interface InvoiceSearchState {
    creatorCompanyPIB: string;
}

  export const searchInvoiceByParamsGet = async(params:InvoiceSearchState)=>{
    try {
      if(params.creatorCompanyPIB.length){
        const response = await instance.get(`Invoice?creatorCompanyPIB=${params.creatorCompanyPIB}`)
        return response.data
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  export const getCompanyBalance = async(params:string) => {
    try {
      const response = await instance.get(`Company/Balance?companyPIB=${params}`)
      return response.data
    } catch (error) {
      console.log(error)
      
    }
  }

  export const createInvoicePost =  async (data : any) => {
    try {
      const response = await instance.post('Invoice',data)
      return response.status
      
    } catch (error) {
      console.log(error)
    }
  }

  export const updateInvoicePut = async(data:any) => {
    try {
      const response = await instance.put('Invoice',data)
      return response.status
      
    } catch (error) {
      console.log(error)
      
    }
  }