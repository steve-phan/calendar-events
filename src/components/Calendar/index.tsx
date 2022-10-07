import { useQuery } from "react-query";
import { useEffect } from "react";

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
import { CarlendarAPI } from "api";

const daysArr = getDaysArrayOfMonth(firstDayOfMonth, totalDaysOfMonth);

export const Calendar = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, data } = useQuery(
    ["get-events-calendar"],
    async () => {
      const response = await CarlendarAPI.GET_EVENTS();
      return response.data.allEvents;
    }
  );
  useEffect(() => {
    if (data) dispatch(updateAllEvent(data));
  }, [data, dispatch]);

  if (isLoading) {
    return <h1>App is loading ...</h1>;
  }

  if (error) {
    return <h1>Something wrong, try again please ...</h1>;
  }

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
