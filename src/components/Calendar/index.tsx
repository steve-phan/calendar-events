import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const Calendar = () => {
  const { isLoading, error, data } = useQuery(
    ["get-events-calendar"],
    async () => {
      const response = await axios.post(
        // TODO: replace online API
        "http://localhost:8888/.netlify/functions/handle-events-calendar",
        JSON.stringify({
          eventType: "ADD_EVENT",
          eventData: {
            user: "Cool Guys",
            title: "first Call",
            start: "10",
            end: "12",
          },
        })
      );
      return { data: response.data };
    }
  );

  return (
    <div>
      <h1>Calendar Component</h1>
    </div>
  );
};

export default Calendar;
