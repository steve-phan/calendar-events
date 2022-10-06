import { useQuery } from "react-query";
import axios from "axios";

import { daysOfTheWeek } from "libs/utils-types";
import { Month } from "components/Month/Month";
import {
  firstDayOfMonth,
  getDaysArrayOfMonth,
  totalDaysOfMonth,
} from "libs/utils-dates";
import { useAppDispatch } from "stores/hooks";

import { DayHeaderSt, MonthSt, WrapDaysHeaderSt } from "./calendar.styles";
import { updateAllEvent } from "stores/event.reducer";

const daysArr = getDaysArrayOfMonth(firstDayOfMonth, totalDaysOfMonth);

export const Calendar = () => {
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

      dispatch(updateAllEvent(response?.data?.allEvents));
      return { data: response.data };
    }
  );

  return (
    <MonthSt>
      <WrapDaysHeaderSt>
        {daysOfTheWeek.map((dayOfTheWeek, pos) => (
          <DayHeaderSt key={pos}>{dayOfTheWeek}</DayHeaderSt>
        ))}
      </WrapDaysHeaderSt>
      <Month daysArr={daysArr} />
    </MonthSt>
  );
};
