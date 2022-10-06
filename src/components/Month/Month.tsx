import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Popper, { PopperPlacementType } from "@mui/material/Popper";
import _lodash from "lodash";
import React, { useState } from "react";

import { AddEventForm } from "components/AddEventForm/AddEventForm";
import { getSelectedDay, OVER_DAY } from "libs/utils-dates";
import { useAppDispatch, useAppSelector } from "stores/hooks";
import { ViewEventForm } from "components/ViewEventForm/ViewEventForm";
import { closeViewEvent } from "stores/event.reducer";

import {
  DayModalSt,
  DaySt,
  RowDaysSt,
  WrapDayEvents,
  WrapDaysContentSt,
  WrapDaySt,
  WrapRowDaysSt,
} from "./month.styles";
import EventItem from "./EventItem";

export const Month = ({ daysArr }: { daysArr: number[] }) => {
  const events = useAppSelector((state) => state.events);
  const dispatch = useAppDispatch();

  const [selectedDay, setSelectedDay] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();
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
              {events.openViewEvent ? (
                <ViewEventForm openModal={setOpen} {...events.viewEvent} />
              ) : (
                <AddEventForm day={selectedDay} openModal={setOpen} />
              )}
            </Paper>
          </Fade>
        )}
      </Popper>
      {open && (
        <DayModalSt
          onClick={() => {
            setOpen(false);
            /** The reason for closing ViewEvent here because
             *  React.18 call   useEffect twice.
             *  Normaly we should call it when ViewEventForm component unmount
             *
             */
            dispatch(closeViewEvent());
          }}
        />
      )}
      {_lodash.chunk(daysArr, 7).map((week, weekIndex) => {
        return (
          <WrapRowDaysSt key={`${weekIndex}_outer`}>
            <RowDaysSt>
              {week.map((day, index) => {
                const exitsEvents = events.events.filter(
                  (event) => event.date === getSelectedDay(day, "MM-DD-YYYY")
                );

                return (
                  <WrapDaySt key={`${day}_inner_${index}`}>
                    <DaySt
                      onClick={(e) => {
                        setSelectedDay(day);
                        //@ts-ignore
                        handleClick("top-start")(e);
                      }}
                    >
                      {day !== OVER_DAY ? day : ""}
                    </DaySt>
                    {exitsEvents.length > 0 && (
                      <WrapDayEvents>
                        {exitsEvents
                          .sort((a, b) => {
                            const first = Number(
                              a.time.replace("-", ":").split(":")[0]
                            );
                            const last = Number(
                              b.time.replace("-", ":").split(":")[2]
                            );
                            return first - last;
                          })
                          .map((event) => {
                            return (
                              <EventItem
                                {...event}
                                openModal={setOpen}
                                key={event._id}
                              />
                            );
                          })}
                      </WrapDayEvents>
                    )}
                  </WrapDaySt>
                );
              })}
            </RowDaysSt>
          </WrapRowDaysSt>
        );
      })}
    </WrapDaysContentSt>
  );
};
