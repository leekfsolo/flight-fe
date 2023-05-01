import { ReactNode } from "react";
import { Moment } from "moment";

export interface IFormLogin {
  email: string;
  password: string;
}

export interface IFormAuth extends IFormLogin {
  confirmPassword: string;
}

export interface ILoginState {
  user: string;
  token?: string;
}

export interface BaseProps {
  children?: ReactNode;
}

export interface ITicketData {
  type: string;
  data: string;
  from: string;
  to: string;
  startDate: Moment;
  endDate: Moment;
}
