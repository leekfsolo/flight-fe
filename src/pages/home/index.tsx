import React, { useState } from "react";
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
import { ILogo, ITableHeadCell, ITicket, ITicketData } from "pages/interface";
import TicketDetail from "./TicketDetail";
import { useNavigate } from "react-router-dom";
import { PageUrl } from "configuration/enum";
import moment from "moment";

const Home = () => {
  const navigate = useNavigate();
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
  const ticketListData: any[] = [
    {
      from: "San Francisco (SFO)",
      to: "Ho Chi Minh City (SGN)",
      date: "23/08/2023 - 14/09/2023",
      fare: "Round-trip / Economy",
      price: "From $1,056",
    },
    {
      from: "San Francisco (SFO)",
      to: "Ho Chi Minh City (SGN)",
      date: "23/08/2023 - 14/09/2023",
      fare: "Round-trip / Economy",
      price: "From $1,056",
    },
    {
      from: "San Francisco (SFO)",
      to: "Ho Chi Minh City (SGN)",
      date: "23/08/2023 - 14/09/2023",
      fare: "Round-trip / Economy",
      price: "From $1,056",
    },
    {
      from: "San Francisco (SFO)",
      to: "Ho Chi Minh City (SGN)",
      date: "23/08/2023 - 14/09/2023",
      fare: "Round-trip / Economy",
      price: "From $1,056",
    },
    {
      from: "San Francisco (SFO)",
      to: "Ho Chi Minh City (SGN)",
      date: "23/08/2023 - 14/09/2023",
      fare: "Round-trip / Economy",
      price: "From $1,056",
    },
    {
      from: "San Francisco (SFO)",
      to: "Ho Chi Minh City (SGN)",
      date: "23/08/2023 - 14/09/2023",
      fare: "Round-trip / Economy",
      price: "From $1,056",
    },
    {
      from: "San Francisco (SFO)",
      to: "Ho Chi Minh City (SGN)",
      date: "23/08/2023 - 14/09/2023",
      fare: "Round-trip / Economy",
      price: "From $1,056",
    },
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

  const handleSelectedTicket = async (id: string) => {
    setIsOpenTicket(true);
  };

  const searchTicket = async (data: ITicketData) => {};

  // Ticket detail
  const [isOpenTicket, setIsOpenTicket] = useState<boolean>(false);
  const handleCloseTicket = () => setIsOpenTicket(false);
  const handleContinue = async (id: string) => {
    navigate(PageUrl.PAYMENT);
  };

  const mockTicketData: ITicket = {
    id: "test",
    airplane: 0,
    classType: "Economy",
    endDate: moment(new Date()),
    startDate: moment(new Date()),
    from: "San Francisco (SFO)",
    to: "Ho Chi Minh City (SGN)",
    meals: 2,
    entertainment: true,
    wifi: true,
    type: "round-trip",
    price: 1035,
  };

  return (
    <>
      <HomeMainView
        bannerList={homeBanners}
        ticketData={ticketData}
        ticketType={ticketType}
        searchTicket={searchTicket}
        airlinesLogo={airlinesLogo}
        handleSelectedTicket={handleSelectedTicket}
        ticketListData={ticketListData}
        ticketListHeadCells={ticketListHeadCells}
      />
      <TicketDetail
        data={mockTicketData}
        handleClose={handleCloseTicket}
        handleContinue={handleContinue}
        open={isOpenTicket}
        airlinesLogo={airlinesLogo}
      />
    </>
  );
};

export default Home;
