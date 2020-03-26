import React from 'react';
import { TextField, InputAdornment, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function SearchField(props) {
  const classes = useStyles();

  const handleChange = (e) => {
    props.searchHandleChange(e.target.value)
  }

  return (
    <TextField
      className={classes.margin}
      id='search-box'
      variant='outlined'
      size='small'
      onInput={handleChange}
      color='secondary'
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        )
      }}
    />
  )
}