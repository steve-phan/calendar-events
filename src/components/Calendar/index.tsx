import axios from "axios";
import { useQuery } from "react-query";

import { daysOfTheWeek } from "libs/utils-types";
import Day from "components/Days";

import {
  firstDayOfMonth,
  getDaysArrayOfMonth,
  totalDaysOfMonth,
} from "libs/utils-dates";

import { DayHeaderSt, MonthSt, WrapDaysHeaderSt } from "./calendar.styles";

const daysArr = getDaysArrayOfMonth(firstDayOfMonth, totalDaysOfMonth);

const Calendar = () => {
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
      return { data: response.data };
    }
  );
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
