import axios from "axios";

const EVENTYPE = {
  GET_EVENTS: "GET_EVENTS",
  ADD_EVENT: "ADD_EVENT",
  UPDATE_EVENT: "UPDATE_EVENT",
  DELETE_EVENT: "DELETE_EVENT",
} as const;

type TEventType = keyof typeof EVENTYPE;

interface IEventData {
  _id?: string;
  title: string;
  user: string;
  time: string;
  date: string;
}

interface IFetchData {
  eventType: TEventType;
  eventData?: IEventData;
}

export class CarlendarAPI {
  static async FETCHDATA({ eventType, eventData }: IFetchData) {
    return await axios.post(
      "/.netlify/functions/handle-events-calendar",
      JSON.stringify({
        eventType: eventType,
        eventData: {
          _id: eventData?._id,
          title: eventData?.title,
          user: eventData?.user,
          time: eventData?.time,
          date: eventData?.date,
        },
      })
    );
  }

  static async GET_EVENTS() {
    return await this.FETCHDATA({ eventType: EVENTYPE.GET_EVENTS });
  }
  static async ADD_EVENT(eventData: IEventData) {
    return await this.FETCHDATA({ eventType: EVENTYPE.ADD_EVENT, eventData });
  }
  static async UPDATE_EVENT(eventData: IEventData) {
    return await this.FETCHDATA({
      eventType: EVENTYPE.UPDATE_EVENT,
      eventData,
    });
  }
  static async DELETE_EVENT(eventData: IEventData) {
    return await this.FETCHDATA({
      eventType: EVENTYPE.DELETE_EVENT,
      eventData,
    });
  }
}
