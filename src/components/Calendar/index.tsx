import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const Calendar = () => {
  const { isLoading, error, data } = useQuery(
    ["get-events-calendar"],
    async () => {
      const response = await axios.get(
        // TODO: replace online API
        "http://localhost:8888/.netlify/functions/get-events-calendar"
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
