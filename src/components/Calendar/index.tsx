import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import _lodash from "lodash";

import { daysOfTheWeek } from "libs/utils-types";

import {
  MonthSt,
  WrapDaysHeaderSt,
  DayHeaderSt,
  WrapDaysContentSt,
  WrapRowDaysSt,
  RowDaysSt,
  DaySt,
} from "./calendar.styles";
import {
  OVER_DAY,
  getDaysArrayOfMonth,
  totalDaysOfMonth,
  firstDayOfWeek,
  firstDayOfMonth,
  first,
} from "./calendar.utils";

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
  console.log({ data });
  // Mock current Month
  const daysArr = getDaysArrayOfMonth(firstDayOfMonth, totalDaysOfMonth);

  return (
    <MonthSt>
      <WrapDaysHeaderSt>
        {daysOfTheWeek.map((dayOfTheWeek, pos) => (
          <DayHeaderSt key={pos}>{dayOfTheWeek}</DayHeaderSt>
        ))}
      </WrapDaysHeaderSt>
      <WrapDaysContentSt>
        {_lodash.chunk(daysArr, 7).map((week, weekIndex) => {
          return (
            <WrapRowDaysSt key={`${weekIndex}_outer`}>
              <RowDaysSt>
                {week.map((day, index) => {
                  return (
                    <DaySt key={`${day}_iner`}>
                      {day !== OVER_DAY ? day : ""}
                    </DaySt>
                  );
                })}
              </RowDaysSt>
            </WrapRowDaysSt>
          );
        })}
      </WrapDaysContentSt>
    </MonthSt>
  );
};

export default Calendar;
