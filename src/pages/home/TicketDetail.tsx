import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CButton from "components/CButton";
import { ILogo, ITicket } from "pages/interface";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import moment from "moment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WifiIcon from "@mui/icons-material/Wifi";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { formatPrice } from "utils/helpers/formatPrice";
import { formatQuantity } from "utils/helpers/formatQuantity";

interface Props {
  data: ITicket;
  open: boolean;
  handleClose: () => void;
  handleContinue: (id: string) => Promise<void>;
  airlinesLogo: ILogo[];
}

const TicketDetail = (props: Props) => {
  const { data, handleClose, handleContinue, open, airlinesLogo } = props;
  const {
    id,
    classType,
    endDate,
    entertainment,
    fromLocation,
    meals,
    startDate,
    toLocation,
    type,
    wifi,
    airline,
    price,
  } = data;

  const durationHrs = moment(endDate).diff(moment(startDate), "hours");
  const durationMins = moment(endDate).diff(moment(startDate), "minutes") % 60;
  const duration = `${formatQuantity(durationHrs)}:${formatQuantity(
    durationMins
  )} hrs`;
  const ticketProperties = [
    { included: wifi, value: "wifi", icon: <WifiIcon /> },
    {
      included: entertainment,
      value: "Onboard Entertainment",
      icon: <LiveTvIcon />,
    },
    {
      included: meals > 0,
      value: `Meals service (${meals})`,
      icon: <RestaurantIcon />,
    },
  ].filter((data) => data.included);
  const ticketData = [
    { label: "Type", value: type },
    { label: "Class", value: classType },
    {
      label: "Airline",
      value: airlinesLogo[airline].name,
    },
    { label: "Price", value: `${formatPrice(price)} USD` },
  ];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="xs"
      className="ticket-dialog"
    >
      <DialogTitle className="ticket-dialog-title" id="alert-dialog-title">
        <div className="ticket-overview">
          <div className="ticket-date">
            {moment(startDate).format("ddd, MMM D")}
          </div>
          <div className="ticket-extra">
            <AccessTimeIcon />
            Duration: {duration}
          </div>
        </div>
        <IconButton
          className="dialog-title__close p-0"
          disableRipple
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className="ticket-dialog-content">
        <div className="timeline-wrapper">
          <div className="ticket-timeline">
            <div className="ticket-timeline__value">
              {moment(startDate).format("H:mm A")}
            </div>
            <div className="ticket-timeline--divider"></div>
            <div className="ticket-timeline__duration">{duration}</div>
            <div className="ticket-timeline--divider"></div>
            <div className="ticket-timeline__value">
              {moment(endDate).format("H:mm A")}
            </div>
          </div>

          <div className="ticket-destination">
            <span className="ticket-destination__departure">
              {fromLocation}
            </span>
            <span>{toLocation}</span>
          </div>
        </div>

        <div className="ticket-detail">
          <div className="d-flex flex-column gap-4 my-4">
            {ticketData.map((data) => (
              <div key={data.label} className="ticket-detail__info">
                <span className="info-label">{data.label}:</span>
                <span className="info-value">{data.value}</span>
              </div>
            ))}
          </div>

          <div className="d-flex align-items-center gap-2 flex-wrap">
            {ticketProperties.map((prop, idx) => (
              <div className="ticket-prop" key={idx}>
                {prop.icon}
                <span>{prop.value}</span>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
      <DialogActions className="ticket-dialog-actions">
        <CButton
          className="d-flex align-items-center gap-1"
          onClick={() => handleContinue(id)}
          sx={{ paddingX: "14px !important" }}
        >
          Continue <ChevronRightIcon />
        </CButton>
      </DialogActions>
    </Dialog>
  );
};

export default TicketDetail;
