import React from "react";

import { IEvent, viewEvent } from "stores/event.reducer";
import { useAppDispatch } from "stores/hooks";

import { WrapEventItemSt } from "./month.styles";

interface IEventItemProps extends IEvent {
  openModal: (open: boolean) => void;
}

const EventItem = ({
  title,
  user,
  time,
  date,
  openModal,
  _id,
}: IEventItemProps) => {
  const dispatch = useAppDispatch();

  const handleViewEvent = () => {
    dispatch(viewEvent({ title, user, time, date, _id }));
    openModal(true);
  };

  return (
    <WrapEventItemSt onClick={handleViewEvent}>
      <span>{title}</span>
    </WrapEventItemSt>
  );
};

export default EventItem;
