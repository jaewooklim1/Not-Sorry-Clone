import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import '../../styling/splash.scss';

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
    width: 650,
    backgroundColor: '#2b3a2e',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: '50px',
    justifyContent: 'center',
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
      <div className="instructions-modal">
        <img
          className="pieces-fighting"
          src="https://i.imgur.com/LV8A9qO.png"
        ></img>
        <div className="instructions-2">Instructions</div>
      </div>

      <div classname="game-instructions-list">
        <li>
          Player must roll a 7 or a 11 to get out of the starting zone with
          their pieces
        </li>
        <li>
          There are various slide spots around the board that will give you an
          extra 3 or 4 spaces that your piece can advance if you land on them
        </li>
        <li>
          If an opposing player's piece lands on your piece, he or she says "not
          sorry!" and then you are sent back to the starting zone
        </li>
        <li>
          After making a lap around the board a player is able to enter the safe
          zone
        </li>
        <li>
          Once in the safe zone you must roll exactly or less than the number of
          spaces to reach home to advance
        </li>
        <li>Once you reach home you gain a point</li>

        {/* <SimpleModal /> */}
      </div>
    </div>
  );

  return (
    <div>
      <a className="second-menu" onClick={handleOpen}>
        Learn to Play
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
