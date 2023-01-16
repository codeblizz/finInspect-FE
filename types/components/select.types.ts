export type selectType = {
  className: string;
  name: string;
  control: any;
  options: any[];
  toMoveUp: string;
  fieldError?: any;
  placeholder: string;
  watchFormValue: any;
  formFieldValues: any;
  unregister: (value:any) => void;
  getValues: (value:string) => void; 
  setValue: (value:any, data:any) => void;
  setFormFieldValues: (value:any) => void;
};

export type optionType = {
  label: string;
  value: string;
};
