import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    height: 400,
    flexGrow: 1,
    minWidth: 300,
    transform: 'translateZ(0)',
    // The position fixed scoping doesn't work in IE 11.
    // Disable this demo to preserve the others.
    '@media all and (-ms-high-contrast: none)': {
      display: 'none',
    },
  },
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    overflow:'scroll',
  },
  paper: {
    margin: theme.spacing(15),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    border: 'none'
  },
}));

const CustomModal = ({ children, isOpen, setIsOpen, title }) => {
  const classes = useStyles();
    const [modalStatus, setModalStatus] = useState(isOpen);

    useEffect(() => {
      setModalStatus(isOpen);
    }, [isOpen]);


  return (
    <div className={classes.root}>
    <Modal
      open={modalStatus}
      onClose={setIsOpen}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={classes.modal}
    >
      <div className={classes.paper}>
        <Typography component="h2" variant="h5">{title}</Typography>
        {children}
      </div>

    </Modal>
    </div>
  );
}

export default CustomModal;
