import React from 'react';
import './style.css';
import React, { Component, useState } from 'react';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import moment from 'moment';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { LocalizationProvider, DateAdapter } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'react-toastify/dist/ReactToastify.css';

export default function DialogTask(props) {
  //props -> essentially if it is at -1 that means it is add not edit
  const [add] = useState(props.add);
  let [tasks] = useState(props.tasks);
  const [title, setTitle] = useState(
    initializeState() ? '' : tasks[props.index].title
  );
  const [description, setDescription] = useState(
    initializeState() ? '' : tasks[props.index].description
  );
  const [deadline, setDeadline] = useState(
    initializeState() ? moment() : tasks[props.index].deadline
  );
  const [priority, setPriority] = useState(
    initializeState() ? '' : tasks[props.index].priority
  );
  const [checked, setChecked] = useState(
    initializeState() ? null : tasks[props.index].checked
  );

  //Validation for title and description
  //string error messages
  const [titleValidator, setTitleValidator] = useState('');
  const [descriptionValidator, setDescriptionValidator] = useState('');
  //error flags
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  function isThisEmpty(item) {
    return !item || item.length === 0 || Object.keys(item).length === 0;
  }

  //boolean expression to initialize state of all objects based on update or add
  function initializeState() {
    return isThisEmpty(tasks) || props.index === -1;
  }
  //when hit the cancel button
  let closeDialog = () => {
    props.parentCallback({
      action: 'cancel',
      task: {},
    });
  };

  //when hit submit button
  let addTask = () => {
    if (
      !validateDescription() & !validateTitle() &&
      validatePriority() &&
      deadline
    ) {
      console.log(title);
      props.parentCallback({
        action: 'submit',
        task: {
          title: title,
          description: description,
          deadline: deadline,
          priority: priority,
          checked: checked,
        },
      });
    }
  };

  let updateTask = () => {
    if (!validateDescription() && validatePriority() && deadline) {
      props.parentCallback({
        action: 'edit',
        task: {
          title: title,
          description: description,
          deadline: deadline,
          priority: priority,
          checked: checked,
        },
        index: props.index,
      });
    }
  };

  let validatePriority = () => {
    return priority !== '';
  };

  let validateDescription = () => {
    let err = false;
    if (description == '') {
      setDescriptionValidator('Description is required!');
      err = true;
      setDescriptionError(true);
    } else {
      setDescriptionValidator('');
      setDescriptionError(false);
    }
    return err;
  };

  let validateTitle = () => {
    let err = false;
    if (title == '') {
      setTitleValidator('Title is required!');
      err = true;
      setTitleError(true);
    } else {
      setTitleValidator('');
      setTitleError(false);
    }

    //Check if the task is a duplicate
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].title === title) {
        setTitleValidator('Title already exists!');
        err = true;
        setTitleError(true);
      }
    }
    return err;
  };

  return (
    <div>
      {/*Dialog*/}
      {add ? (
        <DialogTitle sx={{ bgcolor: 'primary.dark', color: 'white' }}>
          <AddCircleIcon id="header" />
          &nbsp; Add Task
        </DialogTitle>
      ) : (
        <DialogTitle sx={{ bgcolor: 'primary.dark', color: 'white' }}>
          <EditIcon id="header" /> Edit Task
        </DialogTitle>
      )}
      <form>
        <DialogContent>
          {/*input fields for title, description, deadline, and priority*/}
          {add && (
            <TextField
              label="Title"
              placeholder="Title"
              fullWidth
              error={titleError}
              helperText={titleValidator}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          )}
          <br /> <br />
          {/*Textfield for Description box*/}
          <TextField
            aria-label="minimum height"
            minRows={3}
            label="Description"
            placeholder="Description"
            error={descriptionError}
            helperText={descriptionValidator}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br /> <br />
          {/*Date Picker*/}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              fullWidth
              margin="dense"
              label="Deadline"
              value={deadline}
              onChange={(newValue) => setDeadline(newValue)}
              renderInput={(params) => <TextField fullWidth {...params} />}
            />
          </LocalizationProvider>
          {/*Radio for Priority*/}
          <br /> <br />
          <FormControl component="fieldset">
            <FormLabel component="legend">Priority</FormLabel>
            <RadioGroup
              row
              aria-label="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <FormControlLabel value="low" control={<Radio />} label="Low" />
              <FormControlLabel
                value="medium"
                control={<Radio />}
                label="Medium"
              />
              <FormControlLabel value="high" control={<Radio />} label="High" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          {add ? (
            <Button
              onClick={addTask}
              variant="contained"
              sx={{ bgcolor: 'primary.dark', width: '35%' }}
            >
              <AddCircleIcon fontSize="small" />
              &nbsp;Add
            </Button>
          ) : (
            <Button
              onClick={updateTask}
              variant="contained"
              sx={{ bgcolor: 'primary.dark', width: '35%' }}
            >
              <FontAwesomeIcon icon={faEdit} />
              &nbsp;Edit
            </Button>
          )}
          <Button
            onClick={closeDialog}
            variant="contained"
            sx={{ bgcolor: 'red', width: '35%' }}
          >
              <FontAwesomeIcon icon={faBan} />
            &nbsp;Cancel
          </Button>
        </DialogActions>
      </form>
    </div>
  );
}
