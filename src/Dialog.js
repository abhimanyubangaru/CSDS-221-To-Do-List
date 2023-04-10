import React from 'react';
import './style.css';
import React, { Component, useState } from 'react';
import CardHeader from '@mui/material/CardHeader';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import MenuIcon from '@mui/icons-material/Menu';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CardContent from '@mui/material/CardContent';
import EditIcon from '@mui/icons-material/Edit';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import CancelIcon from '@mui/icons-material/Cancel';
import RadioGroup from '@mui/material/RadioGroup'
import { ToastContainer, toast } from 'react-toastify';
import { LocalizationProvider, DateAdapter } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'react-toastify/dist/ReactToastify.css';

export default function Dialog(props) {
  return (
    <div>
        {/*Dialog*/}
        <Dialog open={true} onClose={handleClose}>
          {props.addState ? (
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
              {props.addState && <TextField
                label="Title"
                placeholder="Title"
                fullWidth
                error={titleError}
                helperText={titleValidator}
                value={props.task.title}
                onChange={(e) => props.changeTitle(e)}
              />
              }
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
                value={props.task.description}
                onChange={(e) =>
                  props.changeDescription(e)
                }
              />
              <br /> <br />
              {/*Date Picker*/}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  margin="dense"
                  label="Deadline"
                  value={props.deadline}
                  onChange={(newValue) => props.changeDeadline(e)}
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
                  value={props.priority}
                  onChange={(e) =>
                    props.changePriority(e)
                  }
                >
                  <FormControlLabel
                    value="low"
                    control={<Radio/>}
                    label="Low"
                  />
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
              {props.addState ? (
                <Button
                  onClick={props.handleAddingEntry}
                  variant="contained"
                  sx={{ bgcolor: 'primary.dark', width: '35%' }}
                >
                  <AddCircleIcon fontSize="small" />
                  &nbsp;Add
                </Button>
              ) : (
                <Button
                  onClick={props.handleEditing}
                  variant="contained"
                  sx={{ bgcolor: 'primary.dark', width: '35%' }}
                >
                  <EditIcon fontSize="small" />
                  &nbsp;Edit
                </Button>
              )}
              <Button
                onClick={props.closeDialog}
                variant="contained"
                sx={{ bgcolor: 'red', width: '35%' }}
              >
                <DoNotDisturbAltIcon fontSize="small" />
                Cancel
              </Button>
            </DialogActions>
          </form>
        </Dialog>
    </div>
  );
}
