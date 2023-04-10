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
import RadioGroup from '@mui/material/RadioGroup';
import { ToastContainer, toast } from 'react-toastify';
import { LocalizationProvider, DateAdapter } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'react-toastify/dist/ReactToastify.css';

export default class Page extends Component {
  deleteSuccess = () => toast.success('Task successfully deleted');
  addSuccess = () => toast.success('Task successfully added');
  updateSuccess = () => toast.success('Task successfully updated');

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      open: false,
      add: false,
      index: -1,
      data: {},
    };
  }

  //add a task
  addATask() {
    //open the dialog
    this.setState({ open: true });
    //then you need to make it an add dialog, not edit dialog
    this.setState({ add: true });
    //this brings it to the front
    this.setState({ index: -1 });
  }

  //Edit an existing task
  editATask(index) {
    //open the dialog
    this.setState({ open: true });
    //then you need to make it an edit dialog, not add dialog
    this.setState({ add: false });
    //this brings it to the front
    this.setState({ index: index });
  }

  handleClose() {
    this.setState({ open: false });
  }

  //used to edit a row
  editThisRow = (data) => {
    let newTasks = [...this.state.tasks];
    newTasks[data.index] = data.task;
    this.setState({ tasks: newTasks });
  };

  //Callback from dialog input to see what next to do
  dialogCallback = (data) => {
    if (data.action === 'submit') {
      addSuccess();
      this.setState({ tasks: [...this.state.tasks, data.task] });
      handleClose();
    } else if (data.action === 'cancel') {
      handleClose();
    } else if (data.action === 'edit') {
      updateSuccess();
      this.editATask(data);
      handleClose();
    }
  };

  toggleComplete = (index) => {
    let newTasks = [...this.state.tasks];
    newTasks[index].complete = !newTasks[index].complete;
    this.setState({ tasks: newTasks });
  };

  render() {
    return (
      <div>
        {/*HEADER*/}
        <CardHeader
          sx={{ bgcolor: 'primary.dark', color: 'white' }}
          title={
            <>
              <span>
                <MenuIcon className="svg_icons" id="header" />
                FRAMEWORKS
              </span>
            </>
          }
          style={{ textAlign: 'center' }}
          action={
            <>
              <Button
                variant="contained"
                onClick={this.addATask}
                sx={{ marginRight: '5%' }}
              >
                <AddCircleIcon />
                &nbsp;ADD
              </Button>
            </>
          }
        ></CardHeader>
        <CardContent>
          <Dialog
            add={this.state.add}
            index={this.state.index}
            task={this.state.task}
            parentCallback={this.dialogCallback}
            tasks={this.state.tasks}
          ></Dialog>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ color: 'grey' }}>
                    Title
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'grey' }}>
                    Description
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'grey' }}>
                    Deadline
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'grey' }}>
                    Priority
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'grey' }}>
                    Is Complete
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'grey' }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.tasks.map((thisTask, index) => {
                  return (
                    <TableRow key={thisTask.title}>
                      <TableCell align="center">{thisTask.title}</TableCell>
                      <TableCell align="center">
                        {thisTask.description}
                      </TableCell>
                      <TableCell align="center">
                        {moment(thisTask.deadline).format('MM/DD/YY')}
                      </TableCell>
                      <TableCell align="center">{thisTask.priority}</TableCell>
                      <TableCell align="center">
                        <Checkbox
                          name="isComplete"
                          checked={thisTask.complete}
                          onChange={toggleComplete(index)}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <div>
                          {!thisTask.complete && (
                            <div>
                              <Button
                                variant="contained"
                                color="primary"
                                sx={{ bgcolor: 'primary' }}
                                onClick={() => openUpdateDialog(index)}
                              >
                                <EditIcon fontSize="small" />
                                &nbsp;Update
                              </Button>
                            </div>
                          )}
                          <div>
                            <Button
                              color="error"
                              variant="contained"
                              sx={{ bgcolor: 'red' }}
                              onClick={() => {
                                this.setState((prevState) => ({
                                  tasks: [
                                    ...prevState.tasks.slice(0, index),
                                    ...prevState.tasks.slice(index + 1),
                                  ],
                                }));
                                deleteSuccess();
                              }}
                            >
                              <CancelIcon fontSize="small" />
                              &nbsp;Delete
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                }
                }
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        {/*TOASTER CONTAINER SO TOASTS CAN DISPLAY */}
        <ToastContainer
          position="bottom-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}
