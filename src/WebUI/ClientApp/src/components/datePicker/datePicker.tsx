import React, { useState } from "react";
import { Input } from "reactstrap";
import "./datePicker.css";

interface DatePickerProps {
  date: string;
}

const DatePicker = (props: DatePickerProps) => {
  return (
    <div className="d-flex">
      {/* <a>
        <i className="arrow left" />
      </a> */}
      <Input
        type="date"
        name="date"
        id="exampleDate"
        placeholder="date placeholder"
      />
      {/* <a>
        <i className="arrow right" />
      </a> */}
    </div>
  );
};

export default DatePicker;
