import { useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";

import { daysOfTheWeek } from "libs/utils-types";
import Day from "components/Days";

import {
  firstDayOfMonth,
  getDaysArrayOfMonth,
  totalDaysOfMonth,
} from "libs/utils-dates";
import { useAppDispatch } from "stores/hooks";

import { DayHeaderSt, MonthSt, WrapDaysHeaderSt } from "./calendar.styles";
import { getAllEvent } from "stores/event.reducer";

const daysArr = getDaysArrayOfMonth(firstDayOfMonth, totalDaysOfMonth);

const Calendar = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, data } = useQuery(
    ["get-events-calendar"],
    async () => {
      const response = await axios.post(
        // TODO: replace online API
        "/.netlify/functions/handle-events-calendar",
        JSON.stringify({
          eventType: "GET_EVENTS",
        })
      );

      dispatch(getAllEvent(response?.data?.allEvents));
      return { data: response.data };
    }
  );

  // useEffect(() => {
  // }, [data, dispatch]);
  // Mock current Month

  return (
    <MonthSt>
      <WrapDaysHeaderSt>
        {daysOfTheWeek.map((dayOfTheWeek, pos) => (
          <DayHeaderSt key={pos}>{dayOfTheWeek}</DayHeaderSt>
        ))}
      </WrapDaysHeaderSt>
      <Day daysArr={daysArr} />
    </MonthSt>
  );
};

export default Calendar;
