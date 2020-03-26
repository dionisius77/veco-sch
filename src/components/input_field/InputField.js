import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';

export default function InputField(props) {
  const [value, setValue] = useState('');
  const [submit, setSubmit] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(
    () => {
      setValue(props.value);
    }, [props.value]
  )

  useEffect(
    () => {
      setDisabled(props.disabled)
    }, [props.disabled]
  )

  useEffect(
    () => {
      setSubmit(props.isSubmit)
    }, [props.isSubmit]
  )

  const handleChange = (e) => {
    setValue(e.target.value)
    props.onChange(e.target.id, e.target.value);
  }

  return (
    <TextField
      id={props.id}
      label={props.label}
      required={props.required}
      type={props.type}
      value={value}
      helperText={
        submit &&
        value === ''
          ? 'Required'
          : ''
      }
      disabled={disabled}
      onInput={handleChange}
      error={submit && value === ''}
    />
  )
}