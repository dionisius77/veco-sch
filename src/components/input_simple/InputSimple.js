import React, { useState, useEffect } from 'react';
import { Input } from '@material-ui/core';
import PropTypes from 'prop-types';

export default function InputSimple(props) {
  const [value, setValue] = useState('');
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
    <Input
      style={{
        width: '100%',
        maxWidth: 700,
      }}
      disableUnderline={true}
      placeholder={props.label}
      id={props.id}
      required={props.required}
      type={props.type}
      value={value}
      disabled={disabled}
      onInput={handleChange}
      onBlur={handleBlur}
      error={value === '' && props.required}
    />
  )
}

InputSimple.propTypes = {
  id: PropTypes.any.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};