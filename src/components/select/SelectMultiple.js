import React from 'react';
import { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, FormHelperText, MenuItem, OutlinedInput, Checkbox, ListItemText } from '@material-ui/core';
import { useRef } from 'react';
import PropTypes from 'prop-types';

export default function SelectMultiple(props) {
  const labelRef = useRef();
  const labelWidth = labelRef.current ? labelRef.current.clientWidth : 0;
  const [disable, setDisable] = useState(false);
  const [value, setValue] = useState([]);
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
    // console.log(e.target.value);
    // const { options } = props;
    // let values = value;
    // for (let i = 0, l = options.length; i < l; i += 1) {
    //   values.push(e.target.value[0])
    // }
    setValue(e.target.value);
    props.onChange(e.target.name, e.target.value, props.required ? e.target.value.length !== 0 : true);
  }

  const renderedValue = (selected) => {
    let returned = [];
    selected.map((val) => {
      let sel = options.filter((opt) => {
        return opt.value === val;
      });
      returned.push(sel[0].text);
      return '';
    });
    return returned.join(', ');
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
      error={props.required && submit && value.length === 0}
      size={props.size || 'medium'}
    >
      <InputLabel ref={labelRef} htmlFor={props.id}>{props.label}</InputLabel>
      <Select
        multiple
        value={value}
        onChange={handleChange}
        renderValue={(selected) => renderedValue(selected)}
        input={
          props.variant !== 'standard' &&
          <OutlinedInput
            labelWidth={value === '' ? 0 : labelWidth}
            name={props.name}
            id={props.id}
          // notched
          />
        }
      >
        <MenuItem value="">None</MenuItem>
        {
          options.length > 0 &&
          options.map((opt, key) =>
            <MenuItem key={key} value={opt.value}>
              <Checkbox checked={value.indexOf(opt.value) > -1} />
              <ListItemText secondary={opt.text} />
            </MenuItem>
          )
        }
      </Select>
      {
        props.required && submit && value.length === 0 &&
        <FormHelperText error={true}>Form ini wajib diisi</FormHelperText>
      }
    </FormControl>
  )
}

SelectMultiple.propTypes = {
  name: PropTypes.any.isRequired,
  id: PropTypes.any.isRequired,
  label: PropTypes.string,
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