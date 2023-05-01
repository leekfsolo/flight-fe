import React from "react";
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
import { ITicketData } from "pages/interface";

const Home = () => {
  const homeBanners: string[] = [Banner1, Banner2, Banner3, Banner4];
  const airlinesLogo: string[] = [VietnamAirLine, VietJet, Bamboo, JetStar];
  const ticketType: SelectDataType[] = [
    { id: "one", value: "one-way" },
    { id: "two", value: "round-trip" },
  ];
  const ticketData: SelectDataType[] = [
    { id: "economy", value: "economy class" },
    { id: "business", value: "business class" },
    { id: "first", value: "first class" },
  ];
  const ticketList: any[] = [];

  const searchTicket = async (data: ITicketData) => {};

  return (
    <HomeMainView
      bannerList={homeBanners}
      ticketData={ticketData}
      ticketType={ticketType}
      searchTicket={searchTicket}
      airlinesLogo={airlinesLogo}
    />
  );
};

export default Home;
