import WrapperContainer from "components/WrapperContainer";
import React from "react";
import CartSection from "./CartSection";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  IBooking,
  IBookingData,
  ILabelValue,
  IPassengersInput,
  IPaymentMethod,
  ITicket,
} from "pages/interface";
import { useAppDispatch } from "app/hooks";
import { handleLoading } from "app/globalSlice";
import CInput from "components/CInput";
import {
  FormControl,
  FormGroup,
  InputLabel,
  FormHelperText,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import LuggageIcon from "@mui/icons-material/Luggage";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";
import CButton from "components/CButton";
import { formatPrice } from "utils/helpers/formatPrice";
import moment from "moment";
import { addBooking } from "./cartSlice";
import customToast, { ToastType } from "components/CustomToast/customToast";
import { PageUrl } from "configuration/enum";

interface Props {
  passengersInput: IPassengersInput[];
  paymentMethod: number;
  handleSelectPaymentMethod: (value: number) => void;
  paymentMethodData: IPaymentMethod[];
  billData: ILabelValue[];
  ticketData: ITicket;
}

const defaultValues: IBooking = {
  email: "",
  firstname: "",
  lastname: "",
  paymentMethod: 0,
  phone: "",
  checked_in_luggage: "no",
};

const CartMainView = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    passengersInput,
    handleSelectPaymentMethod,
    paymentMethod,
    paymentMethodData,
    billData,
    ticketData,
  } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IBooking>({ defaultValues });
  const submitFormHandler: SubmitHandler<IBooking> = async (data) => {
    // Just for test
    dispatch(handleLoading(true));
    const { checked_in_luggage, ...restData } = data;
    const bookingData: IBookingData = {
      ...restData,
      luggage: checked_in_luggage === "no" ? false : true,
      ticketId: ticketData.id,
    };

    const res: any = await dispatch(addBooking(bookingData)).unwrap();
    const { success, message } = res;
    if (success) {
      customToast(ToastType.SUCCESS, message);
      navigate(`/${PageUrl.ACCOUNT}`);
    } else {
      customToast(ToastType.ERROR, message);
    }
    dispatch(handleLoading(false));
  };
  const errorFormHandler: SubmitErrorHandler<IBooking> = (_, event) => {
    event?.target.classList.add("wasvalidated");
  };
  const { startDate, endDate, fromLocation, toLocation } = ticketData;

  return (
    <main className="cart">
      <WrapperContainer>
        <p
          className="d-flex align-items-center gap-2 mb-3"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        >
          <ChevronLeftIcon />
          Back
        </p>
        <form
          action="#"
          noValidate
          method="POST"
          className="row m-0"
          onSubmit={handleSubmit(submitFormHandler, errorFormHandler)}
        >
          <div className="col-9 p-0 pe-3">
            <div className="cart-detail">
              <CartSection title="Passengers" order={1}>
                <div
                  className="row m-0 justify-content-between"
                  style={{ gap: "16px 0" }}
                >
                  {passengersInput.map((input) => {
                    const { label, name, required } = input;

                    return (
                      <FormControl key={name} className="passenger-input">
                        <Controller
                          control={control}
                          name={name}
                          rules={
                            required
                              ? {
                                  required: {
                                    value: true,
                                    message: "This field is required",
                                  },
                                }
                              : {}
                          }
                          render={({ field }) => (
                            <FormGroup className="passenger-group">
                              <InputLabel htmlFor={name}>
                                <span>
                                  {label} ({required ? "Required" : "Optional"})
                                </span>
                              </InputLabel>
                              <CInput
                                {...field}
                                size="small"
                                id={name}
                                valid={!errors[name]}
                              />
                            </FormGroup>
                          )}
                        />
                        {!!errors[name] && (
                          <FormHelperText error>
                            {errors[name]?.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    );
                  })}
                </div>
              </CartSection>
              <CartSection title="Seat Reservation" order={2}>
                <div className="seat-wrapper">
                  <AirlineSeatReclineNormalIcon />
                  <div className="seat-content">
                    <p>Seat reversation not available</p>
                    <span>
                      On this trip, you are free to choose seat when you get
                      onboard!
                    </span>
                  </div>
                </div>
              </CartSection>
              <CartSection title="Extras" order={3}>
                <div className="extra-luggage mb-3">
                  <div className="luggage-icon">
                    <LuggageIcon />
                  </div>
                  <div className="luggage-detail">
                    <p>Included per person</p>
                    <span>
                      1 carry-on luggage | 25lb &#x2022; 22 x 14 x 9 in
                    </span>
                    <span>
                      1 checked-in luggage | 50lb &#x2022; 25 x 27 x 14 in
                    </span>
                  </div>
                </div>

                <FormControl className="form-luggage">
                  <FormLabel id="checked-in luggages">
                    Do you have any checked-in luggages?
                  </FormLabel>
                  <Controller
                    name="checked_in_luggage"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup
                        row
                        aria-labelledby="checked-in luggages"
                        {...field}
                      >
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label="No"
                        />
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label="Yes"
                        />
                      </RadioGroup>
                    )}
                  />
                </FormControl>
              </CartSection>
              <CartSection title="Payment" order={4}>
                <div className="payment-wrapper">
                  {paymentMethodData.map((data, idx) => (
                    <div
                      className="payment-method"
                      key={data.name}
                      aria-selected={idx === paymentMethod}
                      onClick={() => {
                        handleSelectPaymentMethod(idx);
                        setValue("paymentMethod", idx);
                      }}
                    >
                      <span>{data.name}</span>
                      {data.icon}
                    </div>
                  ))}
                </div>
              </CartSection>
            </div>
          </div>
          <div className="col p-0">
            <div className="cart-overview">
              <section className="cart-booking">
                <h4>Your Booking</h4>
                <div className="booking-detail">
                  <p className="booking-date">
                    {moment(startDate).format("ddd, MMM D")}
                  </p>
                  <div className="booking-summary">
                    <div className="date-range">
                      <span>{moment(startDate).format("H:mm A")}</span>
                      <span>{moment(endDate).format("H:mm A")}</span>
                    </div>
                    <div className="booking-timeline">
                      <div className="timeline-start"></div>
                      <div className="timeline-divider"></div>
                      <div className="timeline-end"></div>
                    </div>
                    <div className="location-range">
                      <span>{fromLocation}</span>
                      <span>{toLocation}</span>
                    </div>
                  </div>
                </div>
              </section>

              <section className="cart-bill">
                <h4>Your Bill</h4>
                <div className="cart-bill__detail mb-3">
                  {billData.map((data, idx) => (
                    <div className="bill-price" key={data.label}>
                      <span className="bill-price--label">{data.label}</span>
                      <span
                        className={`bill-price--value ${
                          idx === 3 ? "red-value" : ""
                        }`}
                      >
                        {idx === 2 ? "-" : ""}${formatPrice(data.value)}
                      </span>
                    </div>
                  ))}
                </div>
                <CButton type="submit" className="w-100">
                  Proceed Payment
                </CButton>
              </section>
            </div>
          </div>
        </form>
      </WrapperContainer>
    </main>
  );
};

export default CartMainView;
