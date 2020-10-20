import { makeStyles, Modal, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';
import Button from '../button/Button';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    width: 330,
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
  canvasUpload: {
    width: 300,
    height: 150,
    border: 2,
    borderStyle: 'dashed',
    borderColor: '#fff',
    color: '#fff'
  },
  canvasUploaded: {
    width: 300,
    height: 150,
    border: 2,
    borderStyle: 'dashed',
    borderColor: 'rgb(80, 80, 80)',
    color: 'rgb(80, 80, 80)'
  },
  typographyUpload: {
    textAlign: 'center',
    marginTop: 60
  },
  fileName: {
    maxWidth: 200,
  }
}));

export default function Uploader(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [base64file, setBase64file] = useState('');
  const [fileName, setFileName] = useState('');

  useEffect(
    () => {
      setOpen(props.open);
      setBase64file('');
      setFileName('');
    }, [props.open]
  )

  const onFileDrop = async (e) => {
    e.preventDefault();
    try {
      setFileName(e.dataTransfer.files[0].name);
      const file = await readUploadedFile(e.dataTransfer.files[0]);
      setBase64file(file);
    } catch (e) {
      console.warn(e.message);
    }
  }

  const readUploadedFile = (inputFile) => {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onerror = () => {
        reader.abort();
        reject(new DOMException("Problem parsing input file."));
      }
      reader.onload = () => {
        resolve(reader.result);
      }
      reader.readAsDataURL(inputFile);
    })
  }

  const onFileOver = (e) => {
    e.preventDefault();
  }

  const onFileEnter = (e) => {
    e.preventDefault();
  }

  const handleUpload = () => {
    props.handleUpload({
      base64file: base64file,
      fileName: fileName
    });
  }

  const handleClose = () => {
    props.onCloseModal();
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
          <h2 id="transition-modal-title">Upload File</h2>
          <div id="transition-modal-description">
            {
              fileName === '' &&
              <div className={fileName === '' ? classes.canvasUpload : classes.canvasUploaded}
                onDrop={onFileDrop}
                onDragOver={onFileOver}
                onDragEnter={onFileEnter}
              >
                <div className={classes.typographyUpload}>
                  Seret &amp; lepaskan file disini
                </div>
              </div>
            }
            <div className={classes.buttonGroup}>
              <Typography className={classes.fileName} variant="body1" color="inherit" noWrap>
                {fileName}
              </Typography>
              <div className={classes.spacing}></div>
              <Button type="default" text="Upload" onClick={handleUpload} disabled={fileName === '' ? true : false} />
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}

Uploader.propTypes = {
  open: PropTypes.bool.isRequired,
  handleUpload: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
}