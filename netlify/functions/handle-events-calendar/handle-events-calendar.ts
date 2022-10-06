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
  //@ts-ignore
  const bodyRequesData = JSON.parse(event.body);

  try {
    const connectDB = await connect();
    const EventCalendar = connectDB.model("EventCalendar", eventCalendarSchema);
    switch (bodyRequesData?.eventType) {
      case "GET_EVENTS":
        const allEvents = await EventCalendar.find();
        return {
          statusCode: 200,
          body: JSON.stringify({
            allEvents,
            message: `SUCCESS`,
          }),
        };
      case "ADD_EVENT":
        const {
          eventData: { title, user, time, date },
        } = bodyRequesData;
        const newEvent = new EventCalendar({
          title,
          user,
          time,
          date,
        });
        await newEvent.save();
        return SUCCESS;
      case "UPDATE_EVENT":
        // const all;
        const {
          eventData: { _id },
        } = bodyRequesData;
        await EventCalendar.findByIdAndUpdate(_id, {
          title,
          user,
          time,
          date,
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
