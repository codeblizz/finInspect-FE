export type buttonType = {
  autoFocus?: boolean;
  disabled?: boolean;
  name?: string;
  type?: any;
  value?: string;
  className?: string;
  buttonText: string;
  onClick: () => void;
  onResetField?: () => void;
};
