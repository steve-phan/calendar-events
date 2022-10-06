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
import React, { useState, useEffect } from "react";

import { getSelectedDay } from "libs/utils-dates";

import { useAppDispatch } from "stores/hooks";
import { addEvent, closeViewEvent } from "stores/event.reducer";
import { UpdateEvent } from "./vieweventform.styles";

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
  day: number;
  openModal: (open: boolean) => void;
  title: string;
  user: string;
  time: string;
  date: string;
}

const ViewEventForm = ({
  day,
  openModal,
  title,
  user,
  time,
  date,
}: IViewEeventFormProps) => {
  const [eventState, setEventState] = useState({ title, user, time });
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(true);

  const handleChange =
    (prop: TAddEventProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setEventState({ ...eventState, [prop]: event.target.value });
    };
  const handleUpdateEvent = () => {
    openModal(false);
    const { title, user, time } = eventState;
    if (!!title && !!user && !!time) {
      dispatch(
        addEvent({
          title,
          user,
          time,
          day: getSelectedDay(day, "MM-DD-YYYY"),
        })
      );
    }
  };

  // useEffect(() => {
  //   return () => {
  //     dispatch(closeViewEvent());
  //   };
  // }, []);
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
          label="Add title and time"
          variant="standard"
          onChange={handleChange("title")}
          value={eventState.title}
          disabled={!!edit}
        />
        <TextField
          fullWidth
          name="user"
          id="standard-basic"
          label="Add guest"
          variant="standard"
          onChange={handleChange("user")}
          value={eventState.user}
          disabled={!!edit}
        />
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
        {getSelectedDay(day)}
      </CardContent>
      <CardActions
        sx={{
          justifyContent: "end",
        }}
      >
        <Button size="small" variant="contained" onClick={handleUpdateEvent}>
          Save
        </Button>
      </CardActions>
    </Card>
  );
};

export default ViewEventForm;
