import React from "react";
import HomeMainView from "./HomeMainView";
import { Banner1, Banner2, Banner3, Banner4 } from "assets";
import { SelectDataType } from "utils/base/model";
import { ITicketData } from "pages/interface";

const Home = () => {
  const homeBanners: string[] = [Banner1, Banner2, Banner3, Banner4];
  const ticketType: SelectDataType[] = [
    { id: "one", value: "one-way" },
    { id: "two", value: "round-trip" },
  ];
  const ticketData: SelectDataType[] = [
    { id: "economy", value: "economy class" },
    { id: "business", value: "business class" },
    { id: "first", value: "first class" },
  ];

  const searchTicket = async (data: ITicketData) => {};

  return (
    <HomeMainView
      bannerList={homeBanners}
      ticketData={ticketData}
      ticketType={ticketType}
      searchTicket={searchTicket}
    />
  );
};

export default Home;
