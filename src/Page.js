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
      task: {
        deadline: moment(),
      },
      rows: [],
      open: false,
      add: false,
      index: -1,
      data: {}
    };
  }

  //add a task
  addTask() {
    //open the dialog
    this.setState({ open: true });
    //then you need to make it an add dialog, not edit dialog
    this.setState({ add: true });
    //this brings it to the front
    this.setState({ index: -1 });
  }

  //Edit an existing task
  editTask(index) {
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
    let newTasks = [...this.state.rows];
    newTasks[data.index] = data.data;
    this.setState({ rows: newTasks });
  };

  //Callback from dialog input to see what next to do
  dialogCallback = (data) => {
    if (data.action === 'submit') {
      this.addSuccess();
      this.setState({ rows: [...this.state.rows, data.data] });
      this.handleClose();
    } else if (data.action === 'cancel') {
      this.handleClose();
    } else if (data.action === 'edit') {
      this.updateSuccess();
      this.editRow(data);
      this.handleClose();
    }
  };

  toggleComplete = (index) => {
    let newTasks = [...this.state.rows];
    newTask[index]['checked'] = !newTask[index]['checked'];
    this.setState({ rows: newTask });
  };

  render() {
    return (
      <>
         <DiaWrap open={this.state.open} onClose={() => this.dialogCallback()}>
            <DialogTask
              add={this.state.add}
              index={this.state.index}
              data={this.state.data}
              dataFromParents={this.state.task}
              parentCallback={this.dialogCallback}
              tasks={this.state.rows}
            ></DialogTask>
          </DiaWrap>
        {/*HEADER*/}
        <Card sx = {{margin '20px'}} >
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
                onClick={() => this.addTask()}
                sx={{ marginRight: '5%' }}
              >
                <AddCircleIcon />
                &nbsp;ADD
              </Button>
            </>
          }
        />
        <CardContent sx = {{bgcolor: 'white', marginBottom: -1 }}>
          <TableContainer>
            <Table sx ={{bgcolor: 'white'}}>
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
                {this.state.rows.map((thisTask, index) => {
                  return (
                    <TableRow key={thisTask.title}>
                      <TableCell align="center">{thisTask.title}</TableCell>
                      <TableCell align="center">
                        {thisTask.description}
                      </TableCell>
                      <TableCell align="center">
                        {new Date(thisTask.deadline.toLocaleDateString("en-US"))}
                      </TableCell>
                      <TableCell align="center">{thisTask.priority}</TableCell>
                      <TableCell align="center">{thisTask.checked ? <Checkbox checked={row.checked} onChange={(e) => {this.toggleIsComplete(index)}}/> :
                        <Checkbox
                          name="isComplete"
                          checked={thisTask.complete}
                          onChange={this.toggleComplete(index)}
                        /> }
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
                                  rows: [
                                    ...prevState.rows.slice(0, index),
                                    ...prevState.rows.slice(index + 1)
                                  ]
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
                })}
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
      </>
    );
  }
}
