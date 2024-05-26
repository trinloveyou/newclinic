import React, { useState } from 'react';
import { Calendar } from 'rsuite';
import { Modal, Button } from 'react-bootstrap';
import 'rsuite/Calendar/styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './indexuser.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  paper: {
    width: 200,
    height: 230,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}



export default function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [petName, setPetName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [note, setNote] = useState('');


  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([0, 1, 2, 3]);
  const [right, setRight] = React.useState([4, 5, 6, 7]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items) => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`List item ${value + 1}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  )

  function handleDateSelect(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    if (selectedDate.getTime() < today.getTime()) {
      return;
    }
    setSelectedDate(selectedDate);
    setShowModal(true);
  }

  function handleSubmit() {
    setShowModal(false);
  }

  function handleClose() {
    setName('');
    setPhone('');
    setPetName('');
    setPurpose('');
    setNote('');
    setShowModal(false);
  }

  return (
    <div className="main-container">
      <div className="left-container">
      <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right)}</Grid>
    </Grid>

      </div>
      <div className="right-container">
        <div className="calendar-wrapper">
          <Calendar 
            bordered 
            onSelect={handleDateSelect} 
            disabledDate={date => date < new Date(new Date().setHours(0, 0, 0, 0))}
          />
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ข้อมูลผู้จอง</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-container">
            <p>วันที่: {selectedDate ? selectedDate.toLocaleDateString() : ''}</p>
            <input 
              type="text" 
              placeholder="ชื่อ" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
            <br /><br />
            <input 
              type="text" 
              placeholder="เบอร์โทรศัพท์" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
            />
            <br /><br />
            <input 
              type="text" 
              placeholder="ชื่อสัตว์" 
              value={petName} 
              onChange={(e) => setPetName(e.target.value)} 
            />
            <br /><br />
            <select 
              value={purpose} 
              onChange={(e) => setPurpose(e.target.value)}
            >
              <option value="" disabled>ประเภทการจอง</option>
              <option value="ฉีดวักซีน">ฉีดวักซีน</option>
              <option value="ฉีดยา">ฉีดยา</option>
              <option value="ตรวจร่างกาย">ตรวจร่างกาย</option>
            </select>
            <br /><br />
            <textarea 
              placeholder="หมายเหตุ" 
              value={note} 
              onChange={(e) => setNote(e.target.value)} 
              maxLength="150"
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ปิด
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            ส่ง
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
