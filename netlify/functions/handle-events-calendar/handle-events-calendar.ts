import { Handler } from "@netlify/functions";

import { eventCalendarSchema } from "../utils/models/eventModel";
import { connect } from "../utils/mongooseConnect";

const SUCCESS = {
  statusCode: 200,
  body: JSON.stringify({
    message: `SUCCESS`,
  }),
};

const FAILURE = {
  statusCode: 500,
  body: JSON.stringify({
    message: `Something wrong`,
  }),
};
export const handler: Handler = async (event, context) => {
  if (event.httpMethod === "GET") {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: " NOT allowed" }),
    };
  }

  const {
    eventType,
    eventData: { _id, title, user, start, end },
    //@ts-ignore
  } = JSON.parse(event.body);

  try {
    const connectDB = await connect();
    const EventCalendar = connectDB.model("EventCalendar", eventCalendarSchema);
    switch (eventType) {
      case "ADD_EVENT":
        const newEvent = new EventCalendar({
          title,
          user,
          start,
          end,
        });
        await newEvent.save();
        return SUCCESS;
      case "UPDATE_EVENT":
        // const all;
        await EventCalendar.findByIdAndUpdate(_id, {
          title,
          user,
          start,
          end,
        });
        return SUCCESS;
      case "DELETE_EVENT":
        //Maybe replace by status or over ...
        await EventCalendar.findByIdAndDelete(_id);
        return SUCCESS;
      default:
        return FAILURE;
    }
  } catch (error) {
    console.log({ error });
    return FAILURE;
  }
};
