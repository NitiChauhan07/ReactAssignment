import React, { useState, useContext, useEffect } from 'react';
import { CampaignContext } from '../Context/CampaignContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const DateRange = () => {
  const { filterCampaigns } = useContext(CampaignContext);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (startDate && endDate && moment(startDate).isSameOrBefore(endDate)) {
      filterCampaigns('', startDate, endDate);
    }
  }, [startDate, endDate, filterCampaigns]);

  return (
    <div>
      <div className="date-input-container">
        <label htmlFor="start-date">Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Start Date"
          dateFormat="dd/MM/yyyy"
          className="date-picker"
          selectsStart
          startDate={startDate}
          endDate={endDate}
          maxDate={endDate}
        />
      </div>
      <div className="date-input-container">
        <label htmlFor="end-date">End Date:</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText="End Date"
          dateFormat="dd/MM/yyyy"
          className="date-picker"
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </div>
    </div>
  );
};

export default DateRange;
