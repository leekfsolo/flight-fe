import { ReactNode } from "react";
import { Moment } from "moment";

export interface IFormLogin {
  email: string;
  password: string;
}

export interface ILoginState {
  isUserExisted: boolean;
  user: string;
  accessToken?: string;
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
