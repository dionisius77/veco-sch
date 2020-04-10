import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade'
import Button from '../button/Button';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: 0,
    borderRadius: 10,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(0, 2, 2),
  },
  buttonGroup: {
    display: 'flex',
    marginTop: 15
  },
  spacing: {
    flexGrow: 1
  }
}));

export default function Modals(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(
    () => {
      setOpen(props.open)
    }, [props.open]
  )

  const handleClose = () => {
    // setOpen(false)
    props.onCloseModal();
  }

  const handleOk = () => {
    props.onSubmitModal();
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">{props.modalTitle}</h2>
          <div id="transition-modal-description">
            {props.children}
            <div className={classes.buttonGroup}>
              <div className={classes.spacing}></div>
              <Button type="default" text="OK" onClick={handleOk}/>
              {props.type === 'confirm' && 
                <Button type="negative" text="Cancel" onClick={handleClose}/>
              }
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}