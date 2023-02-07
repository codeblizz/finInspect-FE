export type inputType = {
    className: string;
    type: string;
    placeholder?: string;
    name: string;
    control?: any;
    getValues: (value:string) => void; 
    register?: any;
    category?: string;
    fieldError?: any;
    onChange?: (e:any) => void;
}