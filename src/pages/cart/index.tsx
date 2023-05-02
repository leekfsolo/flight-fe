import React, { useState } from "react";
import CartMainView from "./CartMainView";
import { ILabelValue, IPassengersInput, IPaymentMethod } from "pages/interface";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Paypal } from "assets";

const Cart = () => {
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
    { label: "Tickets' price", value: 200 },
    { label: "Service fee", value: 3.65 },
    { label: "Discount", value: 0 },
    { label: "Total", value: 200 + 3.65 },
  ];

  return (
    <CartMainView
      passengersInput={passengersInput}
      paymentMethod={paymentMethod}
      handleSelectPaymentMethod={handleSelectPaymentMethod}
      paymentMethodData={paymentMethodData}
      billData={billData}
    />
  );
};

export default Cart;
