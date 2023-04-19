export enum Context {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  SUCCESS = "success",
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
  name?: string;
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

export interface Message {
  text: string;
  type: Context;
  autoClose?: boolean;
  timeout?: number;
}
