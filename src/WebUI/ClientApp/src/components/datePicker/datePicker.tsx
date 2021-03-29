import React, { ChangeEvent } from "react";
import { Input } from "reactstrap";
import "./datePicker.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface DatePickerProps {
  date: string;
  dateSelected: (date: string) => void;
}

const DatePicker = (props: DatePickerProps) => {
  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    if (props.dateSelected) {
      props.dateSelected(target.value);
    }
  };

  const reduceDay = () => {
    const date = new Date(props.date);
    date.setDate(date.getDate() - 1);
    date.setUTCHours(0, 0, 0, 0);
    props.dateSelected(date.toISOString().split("T")[0]);
  };

  const increaseDay = () => {
    debugger;
    const date = new Date(props.date);
    date.setDate(date.getDate() + 1);
    date.setUTCHours(0, 0, 0, 0);
    const dateStr = date.toISOString().split("T")[0];
    props.dateSelected(date.toISOString().split("T")[0]);
  };

  return (
    <React.Fragment>
      <h4>Date</h4>
      <div className="d-flex">
        <FiChevronLeft size={40} onClick={reduceDay} />
        <Input
          type="date"
          name="date"
          id="date"
          placeholder="select a date"
          value={props.date}
          onChange={handleDateChange}
        />
        <FiChevronRight size={40} onClick={increaseDay} />
      </div>
    </React.Fragment>
  );
};

export default DatePicker;
