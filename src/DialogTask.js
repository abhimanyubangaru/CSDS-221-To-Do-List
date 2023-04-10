import React from 'react';
import './style.css';
import React, { Component, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
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
  //props
  const [add] = useState(props.add);
  let [tasks] = useState(props.tasks);
  const [title, setTitle] = useState(
    isThisEmpty(tasks) || props.index === -1 ? '' : tasks[props.index].title
  );
  const [description, setDescription] = useState(
    isThisEmpty(tasks) || props.index === -1
      ? ''
      : tasks[props.index].description
  );
  const [deadline, setDeadline] = useState(
    isThisEmpty(tasks) || props.index === -1
      ? null
      : tasks[props.index].deadline
  );
  const [priority, setPriority] = useState(
    isThisEmpty(tasks) || props.index === -1 ? '' : tasks[props.index].priority
  );
  const [checked, setChecked] = useState(
    isThisEmpty(tasks) || props.index === -1 ? null : tasks[props.index].checked
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

  //when hit the cancel button
  let closeDialog = () => {
    props.parentCallBack({
      action: 'cancel',
      task: {},
    });
  };

  //when hit submit button
  let submitAddTask = () => {
    if (
      !validateDescription() & !validateTitle() &&
      validatePriority &&
      deadline
    ) {
      props.parentCallBack({
        action: 'submit',
        task: {
          title: title,
          description: description,
          deadline: deadline,
          priority: priority,
          checked: checked,
          setChecked: setChecked,
        },
      });
    }
  };

  let updateTask = () => {
    if (!validateDescription() && validatePriority() && deadline) {
      props.parentCallBack({
        action: 'edit',
        task: {
          title: title,
          description: description,
          deadline: deadline,
          priority: priority,
          checked: checked,
          setChecked: setChecked,
        },
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
    // Check if the task title already exists in the array
    let existingTask = tasks.find((item) => item.title === title);
    if (existingTask && arrayTask.indexOf(existingTask) !== props.index) {
      setTitleValidator('Title already exists!');
      err = true;
      setTitleError(true);
    }
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
            {/* input fields for title, description, deadline, and priority */}
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
                margin="dense"
                label="Deadline"
                value={props.deadline}
                onChange={(newValue) => setEntry(newValue)}
                renderInput={(params) => <TextField {...params} />}
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
                <FormControlLabel
                  value="high"
                  control={<Radio />}
                  label="High"
                />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            {add ? (
              <Button
                onClick={submitAddTask}
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
                <EditIcon fontSize="small" />
                &nbsp;Edit
              </Button>
            )}
            <Button
              onClick={closeDialog}
              variant="contained"
              sx={{ bgcolor: 'red', width: '35%' }}
            >
              <DoNotDisturbAltIcon fontSize="small" />
              Cancel
            </Button>
          </DialogActions>
        </form>

    </div>
  );
}