export type buttonType = {
  autoFocus?: boolean;
  disabled?: boolean;
  name?: string;
  type?: any;
  value?: string;
  className?: string;
  buttonText: string;
  loader?: boolean;
  onClick?: ({e, data}:any) => void;
  onResetField?: () => void;
};
