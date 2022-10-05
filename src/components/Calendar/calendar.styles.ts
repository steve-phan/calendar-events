import styled from "styled-components";

export const MonthSt = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin-left: 8px;
`;
/** Days HEADER styles */
export const WrapDaysHeaderSt = styled.div`
  display: flex;
  flex: none;
  align-items: stretch;
  height: auto;
  margin: 0;
`;

export const DayHeaderSt = styled.div`
  flex: 1 1 0%;
  text-align: center;
  text-transform: uppercase;
`;
/** Content styles */

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

export const DaySt = styled.div`
  border-right: #cecece 1px solid;

  flex: 1 1 0%;
`;
