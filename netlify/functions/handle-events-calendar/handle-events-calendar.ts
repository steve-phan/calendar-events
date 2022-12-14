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
  const bodyRequesData = await JSON.parse(event.body);

  try {
    const connectDB = await connect();
    const EventCalendar = connectDB.model("EventCalendar", eventCalendarSchema);
    const { _id, title, user, time, date } = bodyRequesData?.eventData || {
      _id: "",
      title: "",
      user: "",
      time: "",
      date: "",
    };
    const getNewEvents = async () => await EventCalendar.find();
    let newEvents;
    switch (bodyRequesData?.eventType) {
      case "GET_EVENTS":
        newEvents = await EventCalendar.find();

        return {
          statusCode: 200,
          body: JSON.stringify({
            allEvents: newEvents,
            message: `SUCCESS`,
          }),
        };
      case "ADD_EVENT":
        const newEvent = new EventCalendar({
          title,
          user,
          time,
          date,
        });
        await newEvent.save();

        newEvents = await EventCalendar.find();
        return {
          statusCode: 200,
          body: JSON.stringify({
            allEvents: newEvents,
            message: `SUCCESS`,
          }),
        };
      case "UPDATE_EVENT":
        await EventCalendar.findByIdAndUpdate(_id, {
          title,
          user,
          time,
          date,
        });
        newEvents = await EventCalendar.find();
        return {
          statusCode: 200,
          body: JSON.stringify({
            allEvents: newEvents,
            message: `SUCCESS`,
          }),
        };
      case "DELETE_EVENT":
        //Maybe replace by status or over ...
        await EventCalendar.findByIdAndDelete(_id);
        newEvents = await EventCalendar.find();

        return {
          statusCode: 200,
          body: JSON.stringify({
            allEvents: newEvents,
            message: `SUCCESS`,
          }),
        };
      default:
        return FAILURE;
    }
  } catch (error) {
    console.log({ error });
    return FAILURE;
  }
};
