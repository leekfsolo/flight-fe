import { ReactNode } from "react";
import { Moment } from "moment";

type alignPadding = "left" | "right" | "center";
type cellPadding = "checkbox" | "none" | "normal";

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
  classType: string;
  from: string;
  to: string;
  startDate: Moment;
  endDate: Moment;
}

export interface ITableHeadCell {
  padding: cellPadding;
  id: string;
  label: string;
  align: alignPadding;
}

export interface ITicket extends ITicketData {
  id: string;
  wifi: boolean;
  meals: number;
  entertainment: boolean;
  airplane: number;
  price: number;
}

export interface ILogo {
  name: string;
  img: string;
}
