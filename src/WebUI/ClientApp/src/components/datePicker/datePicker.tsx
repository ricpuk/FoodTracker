import React, { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "reactstrap";
import "./datePicker.css";

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

  return (
    <div className="d-flex">
      <Input
        type="date"
        name="date"
        id="date"
        placeholder="select a date"
        value={props.date}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default DatePicker;
