'use client';

import DatePicker, { ReactDatePickerProps } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const DatePickerComponent = (props: ReactDatePickerProps) => (
  <>
    <DatePicker {...props} />
  </>
);

export { DatePickerComponent };
