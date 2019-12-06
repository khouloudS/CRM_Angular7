
export class postInvoiceModel{
  reference: string;
  description: string;
  duration: number;
  dateInvoice: string;
  total : number;
  status: string;
}

export interface respInvoiceModel {
  reference: string;
  description: string;
  duration: number;
  dateInvoice: string;
  total : number;
  status: string;
  id : number;
}

