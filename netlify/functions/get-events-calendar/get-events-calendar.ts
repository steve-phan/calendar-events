import { Handler } from "@netlify/functions";

import { eventCalendarSchema } from "../utils/models/eventModel";
import { connect } from "../utils/mongooseConnect";

export const handler: Handler = async (event, context) => {
  //@ts-ignore
  const { name = "stranger" } = event.queryStringParameters;
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: " NOT allowed" }),
    };
  }

  try {
    // const connectDB = await connect();
    // const EventCalendar = connectDB.model("EventCalendar", eventCalendarSchema);
    // const newEvent = new EventCalendar({
    //   id: 1,
    //   title: "first Call",
    //   user: "Nice Guy",
    //   start: "10",
    //   end: "11",
    // });
    // await newEvent.save();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Hello, ${name}!`,
      }),
    };
  } catch (error) {
    console.log({ error });
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Something wrong`,
      }),
    };
  }
};
