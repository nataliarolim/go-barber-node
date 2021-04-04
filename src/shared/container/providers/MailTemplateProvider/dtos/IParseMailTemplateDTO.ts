interface ITemplateVariables {
  [key: string]: string | number;  //o objeto não tem um formato certo
}

export default interface IParseMailTemplateDTO {
  file: string;
  variables: ITemplateVariables;
}
