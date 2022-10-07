import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import React, { useState } from "react";

import { useAppDispatch } from "stores/hooks";
import { updateAllEvent, updateEvent } from "stores/event.reducer";

import { EventTimeSt, UpdateEvent } from "./vieweventform.styles";
import { CarlendarAPI } from "api";

const mockTime = [
  "10:30-11:00",
  "11:00-11:30",
  "11:30-12:00",
  "12:00-12:30",
  "12:30-13:00",
  "13:00-13:30",
  "13:30-14:00",
  "14:00-14:30",
  "14:30-15:00",
];
const defaultFromState = {
  title: "",
  user: "",
  time: "",
};

type TAddEventProps = keyof typeof defaultFromState;

interface IViewEeventFormProps {
  openModal: (open: boolean) => void;
  title: string;
  user: string;
  time: string;
  date: string;
  _id: string;
}

export const ViewEventForm = ({
  openModal,
  title,
  user,
  time,
  date,
  _id,
}: IViewEeventFormProps) => {
  const [eventState, setEventState] = useState({ title, user, time });
  const dispatch = useAppDispatch();

  const [edit, setEdit] = useState(true);

  const handleChange =
    (prop: TAddEventProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value.length > 30) {
        return;
      }
      setEventState({ ...eventState, [prop]: event.target.value });
    };

  /**
   * TODO : refactor
   */
  const handleUpdateEvent = async () => {
    openModal(false);
    const { title, user, time } = eventState;
    const eventData = {
      _id,
      title,
      user,
      time,
      date,
    };
    if (!!title && !!user && !!time) {
      dispatch(updateEvent(eventData));
    }
    // TODO: Should handle error here
    const response = await CarlendarAPI.UPDATE_EVENT(eventData);

    dispatch(updateAllEvent(response?.data?.allEvents));
  };

  /**
   * TODO : refactor
   */
  const handleDeleteEvent = async () => {
    openModal(false);
    const { title, user, time } = eventState;
    const eventData = {
      _id,
      title,
      user,
      time,
      date,
    };
    const response = await CarlendarAPI.DELETE_EVENT(eventData);

    dispatch(updateAllEvent(response?.data?.allEvents));
  };

  return (
    <Card sx={{ minWidth: 300, maxWidth: 400 }}>
      <UpdateEvent>
        Update your event?
        <EditOutlinedIcon
          style={{
            cursor: "pointer",
          }}
          onClick={() => setEdit(!edit)}
        />
      </UpdateEvent>
      <CardContent>
        <TextField
          fullWidth
          name="title"
          id="standard-basic"
          label="Title"
          variant="standard"
          onChange={handleChange("title")}
          value={eventState.title}
          disabled={!!edit}
        />
        <TextField
          fullWidth
          name="user"
          id="standard-basic"
          label="Guest"
          variant="standard"
          onChange={handleChange("user")}
          value={eventState.user}
          disabled={!!edit}
        />
        <EventTimeSt>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Time</InputLabel>
            <Select
              name="time"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={eventState.time}
              label="Time"
              //@ts-ignore
              onChange={handleChange("time")}
              disabled={!!edit}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {mockTime.map((time, index) => {
                return (
                  <MenuItem key={index} value={time}>
                    {time}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          {date}
        </EventTimeSt>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: "end",
        }}
      >
        <Button size="small" variant="outlined" onClick={handleDeleteEvent}>
          Delete
        </Button>
        <Button size="small" variant="contained" onClick={handleUpdateEvent}>
          Save
        </Button>
      </CardActions>
    </Card>
  );
};
