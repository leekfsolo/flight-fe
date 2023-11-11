import React, { useEffect, useMemo, useState } from "react";
import HomeMainView from "./HomeMainView";
import {
  Bamboo,
  Banner1,
  Banner2,
  Banner3,
  Banner4,
  JetStar,
  VietJet,
  VietnamAirLine,
} from "assets";
import { SelectDataType } from "utils/base/model";
import { ILogo, ITableHeadCell, ITicketData } from "pages/interface";
import TicketDetail from "./TicketDetail";
import { useNavigate } from "react-router-dom";
import { PageUrl } from "configuration/enum";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { getTrendTickets } from "./homeSlice";
import { authSelector, homeSelector } from "app/selectors";
import { formatPrice } from "utils/helpers/formatPrice";
import {
  handleFormOpenChange,
  handleFormTypeChange,
  handleLoading,
} from "app/globalSlice";
import { addItemToCart, handleSaveTicketData } from "pages/cart/cartSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const home = useAppSelector(homeSelector);
  const auth = useAppSelector(authSelector);
  const { ticketList } = home;
  const { user } = auth;
  const homeBanners: string[] = [Banner1, Banner2, Banner3, Banner4];
  const airlinesLogo: ILogo[] = [
    { name: "Vietnam Airlines", img: VietnamAirLine },
    { name: "Vietjet", img: VietJet },
    { name: "Bamboo Airways", img: Bamboo },
    { name: "JetStar Pacific", img: JetStar },
  ];
  const ticketType: SelectDataType[] = [
    { id: "one", value: "one-way" },
    { id: "two", value: "round-trip" },
  ];
  const ticketData: SelectDataType[] = [
    { id: "economy", value: "economy class" },
    { id: "business", value: "business class" },
    { id: "first", value: "first class" },
  ];
  const ticketListHeadCells: ITableHeadCell[] = [
    {
      id: "from",
      label: "From",
      align: "left",
      padding: "normal",
    },
    {
      id: "to",
      label: "To",
      align: "left",
      padding: "normal",
    },
    {
      id: "date",
      label: "Dates",
      align: "left",
      padding: "normal",
    },
    {
      id: "fare",
      label: "Fare Type",
      align: "left",
      padding: "normal",
    },
    {
      id: "price",
      label: "Price",
      align: "left",
      padding: "normal",
    },
  ];

  const searchTicket = async (data: ITicketData) => {};

  // Ticket detail
  const [selectedTicket, setSelectedTicket] = useState<string>("");

  const handleSelectedTicket = (id: string) => {
    setSelectedTicket(id);
  };
  const handleCloseTicket = () => setSelectedTicket("");
  const handleContinue = async (id: string) => {
    if (user === "") {
      dispatch(handleFormOpenChange(true));
      dispatch(handleFormTypeChange("signin"));
    } else {
      dispatch(handleLoading(true));
      const res: any = await dispatch(addItemToCart(id)).unwrap();
      const { success, data } = res;
      if (success) {
        dispatch(handleSaveTicketData(data));
      }
      dispatch(handleLoading(false));
      navigate(PageUrl.CHECKOUT);
    }
  };
  const displayTicketList = ticketList.map((ticket) => {
    const {
      fromLocation,
      toLocation,
      startDate,
      endDate,
      type,
      classType,
      price,
      id,
    } = ticket;

    return {
      id,
      fromLocation,
      toLocation,
      dates: `${moment(startDate).format("DD/MM/YYYY HH:mm")} - ${moment(
        endDate
      ).format("DD/MM/YYYY HH:mm")}`,
      fare: `${type} / ${classType}`,
      price: `From $${formatPrice(price)}`,
    };
  });
  const selectedTicketData = useMemo(() => {
    return ticketList.find((ticket) => ticket.id === selectedTicket);
  }, [selectedTicket, ticketList]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getTrendTickets());
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      <HomeMainView
        bannerList={homeBanners}
        ticketData={ticketData}
        ticketType={ticketType}
        searchTicket={searchTicket}
        airlinesLogo={airlinesLogo}
        handleSelectedTicket={handleSelectedTicket}
        ticketListData={displayTicketList}
        ticketListHeadCells={ticketListHeadCells}
      />
      {selectedTicketData && (
        <TicketDetail
          data={selectedTicketData}
          handleClose={handleCloseTicket}
          handleContinue={handleContinue}
          open={selectedTicket !== ""}
          airlinesLogo={airlinesLogo}
        />
      )}
    </>
  );
};

export default Home;
