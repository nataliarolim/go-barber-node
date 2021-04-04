import ISendMailDTO from '../dtos/ISendMailDTO';

export default interface IMailProvider { // qual as propriedades que o nosso serviço de email vai oferecer para aplicação   
  sendMail(data: ISendMailDTO): Promise<void>;
}
