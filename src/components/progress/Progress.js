import { Backdrop, Box, LinearProgress, makeStyles, Modal, Typography } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
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
  },
  title: {
    width: '100%',
    background: theme.palette.secondary.main
  },
  fileName: {
    maxWidth: 350
  }
}));

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" color="secondary" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2">
          {`${Math.round(props.value,)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function ProgressBarCustom(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false)

  useEffect(
    () => {
      setOpen(props.open);
    }, [props.open]
  )

  useEffect(
    () => {
      setDone(props.isDone);
    }, [props.isDone]
  )

  useEffect(
    () => {
      setProgress(props.progress);
    }, [props.progress]
  )

  const handleClose = () => {
    props.onCloseModal();
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Upload</h2>
          <div id="transition-modal-description">
            <Typography variant="body1" className={classes.fileName} noWrap>{props.modalTitle}</Typography>
            <LinearProgressWithLabel value={progress} />
            <div className={classes.buttonGroup}>
              <div className={classes.spacing}></div>
              <Button type="default" text="Selesai" onClick={handleClose} disabled={!done}/>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}

ProgressBarCustom.propTypes = {
  open: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired,
  modalTitle: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
}