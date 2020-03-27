// HOW TO USE
// <Select
//   name='' (string)
//   id='' (string)
//   label='' (string)
//   options={} (array object)
//   value={} (string)
//   onChange={} (function ())
//   isSubmit={} (boolean)
//   disable={} (boolean)
//   required={} (boolean)
// />
// sample for options
// selectOption: [
//   {
//     value: '1',
//     text: '1'
//   },
//   {
//     value: '2',
//     text: '2'
//   },
//   {
//     value: '3',
//     text: '3'
//   },
//   {
//     value: '4',
//     text: '4'
//   },
//   {
//     value: '5',
//     text: '5'
//   },
// ],
import React from 'react';
import { useState, useEffect } from 'react';
import { FormControl, InputLabel, NativeSelect, FormHelperText } from '@material-ui/core';

export default function Select(props) {
  const [disable, setDisable] = useState(false);
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  const [submit, setSubmit] = useState(false);

  useEffect(
    () => {
      setOptions(props.options);
    }, [props.options]
  )

  useEffect(
    () => {
      setValue(props.value);
    }, [props.value]
  )

  useEffect(
    () => {
      setDisable(props.disable);
    }, [props.disable]
  )

  useEffect(
    () => {
      setSubmit(props.isSubmit);
    }, [props.isSubmit]
  )

  const handleChange = (e) => {
    setValue(e.target.value);
    props.onChange(e.target.name, e.target.value);
  }

  return (
    <FormControl disabled={props.disable || disable} required={props.required || false} style={{minWidth: 120}}>
      <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      <NativeSelect
        value={value}
        onChange={handleChange}
        inputProps= {{
          name: props.name,
          id: props.id
        }}
      >
        <option aria-label="None" value="" />
        {
          options.length > 0 &&
          options.map((opt, key) => 
            <option key={key} value={opt.value}>{opt.text}</option>
          )
        }
      </NativeSelect>
      {
        props.required && submit && value === '' &&
        <FormHelperText error={true}>Required</FormHelperText>
      }
    </FormControl>
    )
}