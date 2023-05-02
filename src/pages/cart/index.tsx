import React, { useEffect, useState } from "react";
import CartMainView from "./CartMainView";
import {
  ILabelValue,
  IPassengersInput,
  IPaymentMethod,
  ITicket,
} from "pages/interface";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Paypal } from "assets";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { cartSelector } from "app/selectors";

const Cart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(cartSelector);
  const ticketData = cart.ticketData as ITicket;
  const passengersInput: IPassengersInput[] = [
    {
      name: "firstname",
      required: true,
      label: "First name",
    },
    {
      name: "lastname",
      required: true,
      label: "Last name",
    },
    {
      name: "email",
      required: true,
      label: "Email",
    },
    {
      name: "phone",
      required: false,
      label: "Phone number",
    },
  ];
  const [paymentMethod, setPaymentMethod] = useState<number>(0);
  const handleSelectPaymentMethod = (value: number) => setPaymentMethod(value);

  const paymentMethodData: IPaymentMethod[] = [
    { icon: <LocalAtmIcon />, name: "Cash" },
    { icon: <AccountBalanceIcon />, name: "Internet Banking" },
    { icon: <CreditCardIcon />, name: "Credit / Debit card" },
    { icon: <Paypal />, name: "Paypal" },
  ];

  const billData: ILabelValue[] = [
    { label: "Tickets' price", value: ticketData?.price },
    { label: "Service fee", value: 3.65 },
    { label: "Discount", value: 0 },
    { label: "Total", value: ticketData?.price + 3.65 },
  ];

  return (
    <CartMainView
      passengersInput={passengersInput}
      paymentMethod={paymentMethod}
      handleSelectPaymentMethod={handleSelectPaymentMethod}
      paymentMethodData={paymentMethodData}
      billData={billData}
      ticketData={ticketData}
    />
  );
};

export default Cart;
