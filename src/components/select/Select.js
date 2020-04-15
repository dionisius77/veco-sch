import React from 'react';
import { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, FormHelperText, MenuItem, OutlinedInput } from '@material-ui/core';
import { useRef } from 'react';
import PropTypes from 'prop-types';

export default function Selects(props) {
  const labelRef = useRef();
  const labelWidth = labelRef.current ? labelRef.current.clientWidth : 0;
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
    <FormControl
      variant={props.variant ? props.variant : 'standard'}
      disabled={props.disable || disable}
      required={props.required || false}
      style={{
        width: '100%',
        maxWidth: 700,
        marginBottom: submit && value === '' ? 0 : 5,
        marginTop: props.noMargin ? 0 : 10
      }}
      error={props.required && submit && value === ''}
      size={props.size || 'medium'}
    >
      <InputLabel ref={labelRef} htmlFor={props.id}>{props.label}</InputLabel>
      <Select
        // labelId={props.id}
        // id={props.id}
        value={value}
        onChange={handleChange}
        // name={props.name}
        input={
          props.variant !== 'standard' &&
          <OutlinedInput
            labelWidth={value === '' ? 0 : labelWidth}
            name={props.name}
            id={props.id}
            notched
          />
        }
      >
        <MenuItem value="">None</MenuItem>
        {
          options.length > 0 &&
          options.map((opt, key) =>
            <MenuItem key={key} value={opt.value}>{opt.text}</MenuItem>
          )
        }
      </Select>
      {
        props.required && submit && value === '' &&
        <FormHelperText error={true}>Form ini wajib diisi</FormHelperText>
      }
    </FormControl>
  )
}

Selects.propTypes = {
  name: PropTypes.any.isRequired,
  id: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['standard', 'filled', 'outlined']),
  options: PropTypes.array.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  isSubmit: PropTypes.bool,
  disable: PropTypes.bool,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium']),
  noMargin: PropTypes.bool,
}