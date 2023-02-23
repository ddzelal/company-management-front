export interface Company {
    address: string;
    ceoFullName: string;
    email: string;
    id: number;
    name: string
    phoneNumber: string;
    pib: string;
}

export interface Invoice {
    createdAt:string,
    creatorCompany:number,
    id:number,
    intendedForCompanyPIB:string,
    toBePaidUntil:string,
    totalSum:number,
    type:number
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