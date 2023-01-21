export type buttonType = {
  autoFocus?: boolean;
  disabled?: boolean;
  name?: string;
  type?: any;
  value?: string;
  className?: string;
  buttonText: string;
  loader?: boolean;
  onClick: () => void;
  onResetField?: () => void;
};
