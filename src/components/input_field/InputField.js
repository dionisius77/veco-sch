// HOW TO USE
// <InputField
//   id='' (string)
//   label='' (string)
//   variant='' (string [standard | outlined | filled])
//   required={} (boolean)
//   type="" (string {text, number})
//   value={} (string)
//   disabled={} (boolean)
//   onChange={} (function (id, value))
//   onBlur={} (function (id, value))
//   isSubmit={} (boolean)
// />
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
    if(props.onChange){
      props.onChange(e.target.id, e.target.value);
    }
  }

  const handleBlur = (e) => {
    setValue(e.target.value);
    if(props.onBlur){
      props.onBlur(e.target.id, e.target.value);
    }
  }

  return (
    <TextField
      style={{
        width: '100%',
        maxWidth: 700,
        marginBottom: submit && value === '' ? 0 : 5,
        marginTop: 10,
      }}
      id={props.id}
      label={props.label}
      required={props.required}
      type={props.type}
      value={value}
      helperText={
        submit &&
        value === '' &&
        props.required
          ? 'Form ini wajib diisi'
          : ''
      }
      disabled={disabled}
      onInput={handleChange}
      onBlur={handleBlur}
      error={submit && value === '' && props.required}
      variant={props.variant ? props.variant : 'standard'}
    />
  )
}