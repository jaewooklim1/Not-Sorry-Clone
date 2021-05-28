import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Link, Switch } from 'react-router-dom';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 550,
    backgroundColor: "#2b3a2e",
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: "50px",
  },
}));

export default function SimpleModal() {
  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>   
        <Link exact to="/login" className='fifth-menu' ></Link>
      <SimpleModal />
    </div>
  );

  return (
    <div>
        <a className='fourth-menu' onClick={handleOpen}>
        Sign In
        </a>    
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}