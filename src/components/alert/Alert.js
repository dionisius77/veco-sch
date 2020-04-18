import React, { useState, useEffect } from 'react';
import SnackBar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alerts(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

export default function AlertCustom(props){
  const [isOpen, setIsOpen] = useState(false);

  useEffect(
    () => {
      setIsOpen(props.isOpen)
    }, [props.isOpen]
  )
  const handleClose = () => {
    setIsOpen(false);
    props.onClose();
  }

  return (
    <SnackBar open={isOpen} onClose={handleClose} autoHideDuration={6000}>
      <Alerts onClose={handleClose} severity={props.type}>
        {props.message}
      </Alerts>
    </SnackBar>
  )
}