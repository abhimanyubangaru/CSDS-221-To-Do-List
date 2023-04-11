import './style.css';
import React, { Component, useState } from 'react';
import CardHeader from '@mui/material/CardHeader';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import DiaWrap from '@mui/material/Dialog';
import moment from 'moment';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import MenuIcon from '@mui/icons-material/Menu';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DialogTask from './DialogTask';

export default class Page extends Component {
  deleteSuccess = () => toast.success('Task successfully deleted');
  addSuccess = () => toast.success('Task successfully added');
  updateSuccess = () => toast.success('Task successfully updated');

  constructor(props) {
    super(props);
    this.state = {
      task: {},
      tasks: [],
      open: false,
      add: false,
      index: -1,
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
  editThisEntry(index) {
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
  editRow = (data) => {
    let newTasks = [...this.state.tasks];
    newTasks[data.index] = data.task;
    this.setState({ tasks: newTasks });
  };

  //Callback from dialog input to see what next to do
  dialogCallback = (data) => {
    if (data.action === 'submit') {
      console.log('reached here');
      this.addSuccess();
      this.setState({ tasks: [...this.state.tasks, data.task] });
      this.handleClose();
      console.log('printing tasks');
      console.log(this.state.tasks);
    } else if (data.action === 'cancel') {
      this.handleClose();
    } else if (data.action === 'edit') {
      this.updateSuccess();
      this.editRow(data);
      this.handleClose();
    }
  };

  toggleIsComplete = (index) => {
    let newTasks = [...this.state.tasks];
    newTasks[index]['checked'] = !newTasks[index]['checked'];
    this.setState({ tasks: newTasks });
  };

  render() {
    return (
      <>
        <DiaWrap
          open={this.state.open}
          onClose={() => this.dialogCallback()}
        >
          <DialogTask
            add={this.state.add}
            index={this.state.index}
            data={this.state.data}
            dataFromParents={this.state.task}
            parentCallback={this.dialogCallback}
            tasks={this.state.tasks}
          ></DialogTask>
        </DiaWrap>
        {/*HEADER*/}
        <Card>
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
                  onClick={() => this.addATask()}
                  sx={{ marginRight: '5%' }}
                >
                  <AddCircleIcon />
                  &nbsp;ADD
                </Button>
              </>
            }
          />
          <CardContent sx={{ bgcolor: 'white', marginBottom: -1 }}>
            <TableContainer>
              <Table sx={{ bgcolor: 'white' }}>
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
                    console.log(thisTask);
                    return (
                      <TableRow key={thisTask.title}>
                        <TableCell align="center">{thisTask.title}</TableCell>
                        <TableCell align="center">
                          {thisTask.description}
                        </TableCell>
                        <TableCell align="center">
                          {moment(this.state.tasks[index].deadline).format('MM/DD/YY')}
                        </TableCell>
                        <TableCell align="center">
                          {thisTask.priority}
                        </TableCell>
                        <TableCell align="center">
                          {thisTask.checked ? (
                            <Checkbox
                              checked={thisTask.checked}
                              onChange={(e) => {
                                this.toggleIsComplete(index);
                              }}
                            />
                          ) : (
                            <Checkbox
                              checked={thisTask.checked}
                              onChange={(e) => {
                                this.toggleIsComplete(index);
                              }}
                            />
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {!thisTask.checked && (
                            <Button
                              variant="contained"
                              sx={{ width: '85%' }}
                              onClick={() => this.editThisEntry(index)}
                            >
                              <EditIcon fontSize="small" />
                              &nbsp;Update
                            </Button>
                          )}
                          <Button
                            color="error"
                            variant="contained"
                            onClick={() => {
                              this.setState((prevState) => ({
                                tasks: [
                                  ...prevState.tasks.slice(0, index),
                                  ...prevState.tasks.slice(index + 1),
                                ],
                              }));
                              this.deleteSuccess();
                            }}
                            sx={{ bgcolor: 'red', width: '85%' }}
                          >
                            <CancelIcon fontSize="small" />
                            &nbsp;Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
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
      </>
    );
  }
}
