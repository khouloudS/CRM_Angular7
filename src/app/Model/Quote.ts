
export class postData{
  reference: string;
  description: string;
  duration: number;
  dateQuote: string;
  expired: boolean;
  generatedToInvoice: number;
  idClient: number;
}

export interface respData {
  reference: string;
  description: string;
  duration: number;
  dateQuote: string;
  expired: boolean;
  generatedToInvoice: number;
  id: number;
}
export interface quoteClientAffect {
  id: number;
  idClient : number;
}
export interface respquoteClientAffect {
  id: number;
  idClient : number;
}
