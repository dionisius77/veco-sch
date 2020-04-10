import React, { useState, useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

export default function DatePicker(props) {
  const [selectedDate, setSelectedDate] = useState(new Date('2000-01-01T00:00:00'));
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(
    () => {
      setIsSubmit(props.isSubmit);
    }, [props.isSubmit]
  )

  useEffect(
    () => {
      if (props.value !== '') {
        setSelectedDate(props.value);
      }
    }, [props.value]
  )

  const handleChangeDate = (date) => {
    setSelectedDate(date);
    let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    let dates = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let formattedDate = date.getFullYear() + '-' + month + '-' + dates;
    props.onChange(props.id, formattedDate);
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        style={{
          width: '100%',
          maxWidth: 700,
          marginBottom: isSubmit && (selectedDate === '' || selectedDate === new Date('2000-01-01T00:00:00')) ? -5 : 5,
          marginTop: 10,
        }}
        disableToolbar
        required={props.required}
        inputVariant='outlined'
        format='yyyy-MM-dd'
        margin='normal'
        id={props.id}
        label={props.label}
        value={selectedDate}
        onChange={handleChangeDate}
        helperText={props.required && isSubmit && selectedDate === '' ? 'Tanggal Tidak Valid' : ''}
        error={props.required && props.isSubmit}
        KeyboardButtonProps={{
          'arial-label': 'ganti tanggal'
        }}
      />
    </MuiPickersUtilsProvider>
  )
}