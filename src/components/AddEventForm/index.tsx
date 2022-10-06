import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";

import * as axios from "axios";
import { getSelectedDay } from "libs/utils-dates";

import { SelectTimeSt } from "./addeventform.styles";
import { useAppDispatch } from "stores/hooks";
import { addEvent } from "stores/event.reducer";

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

export type TEventFromState = typeof defaultFromState;
type TAddEventProps = keyof typeof defaultFromState;

interface IAddEeventFormProps {
  day: number;
  openModal: (open: boolean) => void;
}

const AddEventForm = ({ day, openModal }: IAddEeventFormProps) => {
  const [eventState, setEventState] = useState(defaultFromState);
  const dispatch = useAppDispatch();

  const handleChange =
    (prop: TAddEventProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setEventState({ ...eventState, [prop]: event.target.value });
    };
  const handleSaveEvent = async () => {
    openModal(false);
    const { title, user, time } = eventState;
    if (!!title && !!user && !!time) {
      dispatch(
        addEvent({
          title,
          user,
          time,
          date: getSelectedDay(day, "MM-DD-YYYY"),
        })
      );
      await axios.post(
        // TODO: replace online API
        "/.netlify/functions/handle-events-calendar",
        JSON.stringify({
          eventType: "ADD_EVENT",
          eventData: {
            title,
            user,
            time,
            date: getSelectedDay(day, "MM-DD-YYYY"),
          },
        })
      );
    }
  };
  return (
    <Card sx={{ minWidth: 300, maxWidth: 400 }}>
      <CardContent>
        <TextField
          fullWidth
          name="title"
          id="standard-basic"
          label="Add title and time"
          variant="standard"
          onChange={handleChange("title")}
        />
        <TextField
          fullWidth
          name="user"
          id="standard-basic"
          label="Add guest"
          variant="standard"
          onChange={handleChange("user")}
        />
        <SelectTimeSt>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Select Time
            </InputLabel>
            <Select
              name="time"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={eventState.time}
              label="Select time"
              //@ts-ignore
              onChange={handleChange("time")}
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
          {getSelectedDay(day)}
        </SelectTimeSt>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: "end",
        }}
      >
        <Button size="small" variant="contained" onClick={handleSaveEvent}>
          Save
        </Button>
      </CardActions>
    </Card>
  );
};

export default AddEventForm;
