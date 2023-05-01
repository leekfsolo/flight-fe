import CButton from "components/CButton";
import CSelect from "components/CSelect";
import WrapperContainer from "components/WrapperContainer";
import { ITicketData } from "pages/interface";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Autoplay, Pagination, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { SelectDataType } from "utils/base/model";
import SearchIcon from "@mui/icons-material/Search";
import GroupInput, { GroupInputProps } from "components/GroupInput/GroupInput";
import moment from "moment";
import { FormControl } from "@mui/material";

interface Props {
  bannerList: string[];
  ticketType: SelectDataType[];
  ticketData: SelectDataType[];
  searchTicket: (data: ITicketData) => Promise<void>;
}

interface ISelectTicket {
  name: keyof ITicketData;
  options: SelectDataType[];
}

const HomeMainView = (props: Props) => {
  const { bannerList, ticketData, ticketType, searchTicket } = props;
  const defaultValues: ITicketData = {
    type: ticketType[0].id,
    data: ticketData[0].id,
    from: "",
    to: "",
    startDate: moment(new Date()),
    endDate: moment(new Date()),
  };
  const { control, handleSubmit } = useForm({ defaultValues });
  const selectTicket: ISelectTicket[] = [
    { name: "type", options: ticketType },
    { name: "data", options: ticketData },
  ];
  const filterTicket: GroupInputProps[] = [
    {
      label: "Destination",
      type: "text",
      groupInputData: [
        { name: "from", placeholder: "Departure location" },
        { name: "to", placeholder: "Arrival location" },
      ],
      control,
    },
    {
      label: "Date",
      type: "date",
      groupInputData: [
        { name: "startDate", placeholder: "Departure date" },
        { name: "endDate", placeholder: "Arrival date" },
      ],
      control,
    },
  ];

  return (
    <div className="home">
      <div className="home-banner">
        <Swiper
          spaceBetween={30}
          effect={"fade"}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay, EffectFade]}
        >
          {bannerList.map((value, idx) => (
            <SwiperSlide key={idx}>
              <img src={value} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="home-banner__content">
          <p>Let's travel the world with us</p>
          <h1>Discover the world with our guide</h1>
        </div>

        <div className="home-banner__search">
          <div className="search-wrapper">
            <form
              action="#"
              method="POST"
              noValidate
              onSubmit={handleSubmit(searchTicket)}
            >
              <div className="d-flex align-items-center gap-3 mb-3">
                {selectTicket.map((value) => (
                  <FormControl className="select-form-control">
                    <Controller
                      key={value.name}
                      name={value.name}
                      control={control}
                      render={({ field }) => (
                        <CSelect {...field} options={value.options} />
                      )}
                    />
                  </FormControl>
                ))}
              </div>

              <div
                className="d-flex align-items-center gap-3"
                style={{ height: "48px" }}
              >
                {filterTicket.map((data, idx) => (
                  <GroupInput key={idx} {...data} />
                ))}
                <CButton
                  sx={{ height: "48px" }}
                  className="d-flex align-items-center gap-1"
                >
                  <SearchIcon />
                  Search
                </CButton>
              </div>
            </form>
          </div>
        </div>
      </div>

      <main>
        <WrapperContainer></WrapperContainer>
      </main>
    </div>
  );
};

export default HomeMainView;
