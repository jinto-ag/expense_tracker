export enum Context {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  INFO = "info",
  WARNING = "warning",
  DANGER = "danger",
}

export interface FormField {
  type: string;
  label: string;
  placeholder?: string;
  invalidText?: string;
  validText?: string;
  isFloatingLabel?: boolean;
  required?: boolean;
}

export enum ButtonTypes {
  SUBMIT = "submit",
  RESET = "reset",
  BUTTON = "button",
}

export interface Button {
  label: string;
  context: Context;
  type: ButtonTypes;
}
