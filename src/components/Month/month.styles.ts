import styled from "styled-components";

export const WrapDaysContentSt = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  overflow: hidden;
  margin: 0;
`;

export const WrapRowDaysSt = styled.div`
  position: relative;
  overflow: hidden;
  border-top: #cecece 1px solid;
  display: flex;

  flex: 1 1 0%;
`;
export const RowDaysSt = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
`;
export const WrapDaySt = styled.div`
  position: relative;

  border-right: #cecece 1px solid;

  flex: 1 1 0%;
`;

export const DaySt = styled.div`
  position: absolute;
  inset: 0;
`;

/** CUSTOM MODAL */

export const DayModalSt = styled.div`
  position: fixed;
  inset: 0;
  opacity: 1;
  z-index: 5;
`;

// EventItem
export const WrapDayEvents = styled.div`
  padding-top: 24px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

export const WrapEventItemSt = styled.div`
  width: 100%;
  overflow: hidden;
  font-size: 12px;
  border: 1px solid pink;
  z-index: 5;
  white-space: nowrap;

  &:hover {
    cursor: pointer;
  }
`;
