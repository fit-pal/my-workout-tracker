import React from "react";
import "./calendar.css";
import nextId from "react-id-generator";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from ".././../MaterialUI";
const CalendarBody = (props) => {
  const {
    firstDayOfMonth,
    daysInMonth,
    currentDay,
    currentMonth,
    currentMonthNum,
    selectedDay,
    setSelectedDay,
    actualMonth,
    weekdays,
    activeDays
  } = props;
  let blanks = [];
  for (let i = 0; i < firstDayOfMonth(); i++) {
    blanks.push(<TableCell key={nextId()}>{""}</TableCell>);
  }
  let monthDays = [];
  for (let d = 1; d <= daysInMonth(); d++) {
    let currDay, selectDay, activeDay;
    // Check if day is today
    if (currentDay() == d && currentMonth() == actualMonth()) currDay = "today";
    // Check if day is selected day
    if (selectedDay.day == d && currentMonthNum() == selectedDay.month)
      selectDay = "selected-day";
     // Check if day found in this month active days
     let formattedDate = `${d}-${currentMonthNum()}`;
     if (activeDays.indexOf(formattedDate) !== -1) activeDay = "active";
    monthDays.push(
      <TableCell
        key={d}
        className={`week-day ${currDay} ${selectDay}`}
        onClick={() => setSelectedDay(d)}
      >
        <span className={activeDay}>{d}</span>
      </TableCell>
    );
  }
  let totalSlots = [...blanks, ...monthDays];
  let rows = [];
  let cells = [];
  totalSlots.forEach((row, i) => {
    if (i % 7 !== 0) {
      cells.push(row);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(row);
    }
    if (i === totalSlots.length - 1) {
      rows.push(cells);
    }
  });
  return (
    <TableContainer component={Paper}>
      <Table className="calendar">
        <TableHead>
          <TableRow>
            {weekdays.map((day, i) => (
              <TableCell key={i}>{day}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((day, i) => (
            <TableRow key={i}>{day}</TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default CalendarBody;