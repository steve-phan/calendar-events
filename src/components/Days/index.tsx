import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Popper, { PopperPlacementType } from "@mui/material/Popper";
import _lodash from "lodash";
import React, { useState } from "react";

import AddEventForm from "components/AddEventForm";
import { OVER_DAY } from "libs/utils-dates";

import {
  DayModalSt,
  DaySt,
  RowDaysSt,
  WrapDaysContentSt,
  WrapRowDaysSt,
} from "./days.styles";

const Day = ({ daysArr }: { daysArr: number[] }) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();
  console.log({ open });
  const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  return (
    <WrapDaysContentSt>
      <Popper
        sx={{ zIndex: 10 }}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <AddEventForm day={selectedDay} />
            </Paper>
          </Fade>
        )}
      </Popper>
      {open && (
        <DayModalSt
          onClick={() => {
            console.log("click on on Modal");
            setOpen(false);
          }}
        />
      )}
      {_lodash.chunk(daysArr, 7).map((week, weekIndex) => {
        return (
          <WrapRowDaysSt key={`${weekIndex}_outer`}>
            <RowDaysSt>
              {week.map((day, index) => {
                return (
                  <DaySt
                    key={`${day}_iner`}
                    onClick={(e) => {
                      setSelectedDay(day);
                      //@ts-ignore
                      handleClick("top-start")(e);
                    }}
                  >
                    {day !== OVER_DAY ? day : ""}
                  </DaySt>
                );
              })}
            </RowDaysSt>
          </WrapRowDaysSt>
        );
      })}
      {/* <Button onClick={handleClick("top-start")}>Show</Button> */}
    </WrapDaysContentSt>
  );
};

export default Day;
