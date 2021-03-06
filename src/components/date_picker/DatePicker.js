import React, { useState, useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import PropTypes from 'prop-types';

export default function DatePicker(props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isSubmit, setIsSubmit] = useState(false);
  const [currentDates, setCurrentDates] = useState('');
  const [inputDates, setInputDates] = useState('');

  useEffect(
    () => {
      setIsSubmit(props.isSubmit);
    }, [props.isSubmit]
  )

  useEffect(
    () => {
      if (props.value !== '') {
        setSelectedDate(props.value);
        setInputDates(props.value);
      }
    }, [props.value]
  )

  const handleChangeDate = (date) => {
    setSelectedDate(date);
    const current = new Date();
    let curMonth = current.getMonth() + 1 < 10 ? '0' + (current.getMonth() + 1) : current.getMonth() + 1;
    let curDates = current.getDate() < 10 ? '0' + current.getDate() : current.getDate();
    let currentDate = current.getFullYear() + '-' + curMonth + '-' + curDates;
    setCurrentDates(currentDate);
    let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    let dates = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let formattedDate = date.getFullYear() + '-' + month + '-' + dates;
    setInputDates(formattedDate);
    props.onChange(props.id, formattedDate, props.required ? currentDate !== formattedDate : true);
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        style={{
          width: '100%',
          maxWidth: 700,
          marginBottom: isSubmit && selectedDate === '' ? -5 : 5,
          marginTop: 10,
        }}
        // disableToolbar
        required={props.required || false}
        inputVariant='outlined'
        format='yyyy-MM-dd'
        margin='normal'
        id={props.id}
        label={props.label}
        value={selectedDate}
        onChange={handleChangeDate}
        helperText={props.required && isSubmit && currentDates === inputDates ? 'Tanggal Tidak Valid' : ''}
        error={props.required && props.isSubmit && currentDates === inputDates}
        KeyboardButtonProps={{
          'arial-label': 'ganti tanggal'
        }}
        size={props.size || 'medium'}
      />
    </MuiPickersUtilsProvider>
  )
}

DatePicker.propTypes = {
  id: PropTypes.any.isRequired,
  label: PropTypes.any,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  isSubmit: PropTypes.bool
}