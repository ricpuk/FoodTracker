import React, { ChangeEvent } from "react";
import { Input } from "reactstrap";
import "./datePicker.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { toDateString } from "../../utils/dateHelpers";

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
    props.dateSelected(toDateString(date));
  };

  const increaseDay = () => {
    const date = new Date(props.date);
    date.setDate(date.getDate() + 1);
    props.dateSelected(toDateString(date));
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
