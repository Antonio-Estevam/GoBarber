import IParseMailTemplateDTO from '../../../../../shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IMailcontact {
  name: string;
  email: string;
}

export default interface ISendMailDTO{
  to: IMailcontact;
  from?: IMailcontact;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
