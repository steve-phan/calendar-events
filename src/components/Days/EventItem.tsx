import React, { useEffect } from "react";

import { closeViewEvent, IEvent, viewEvent } from "stores/event.reducer";
import { useAppDispatch } from "stores/hooks";

import { WrapEventItemSt } from "./days.styles";

interface IEventItemProps extends IEvent {
  openModal: (open: boolean) => void;
}

const EventItem = ({ title, user, time, date, openModal }: IEventItemProps) => {
  const dispatch = useAppDispatch();

  const handleViewEvent = () => {
    dispatch(viewEvent({ title, user, time, date }));
    openModal(true);
  };

  return (
    <WrapEventItemSt onClick={handleViewEvent}>
      <span>{title}</span>
    </WrapEventItemSt>
  );
};

export default EventItem;
