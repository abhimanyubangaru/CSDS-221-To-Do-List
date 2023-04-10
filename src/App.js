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

export default function App() {
  //toastr messages
  const deleteSuccess = () => toast.success('Task successfully deleted');
  const addSuccess = () => toast.success('Task successfully added');
  const updateSuccess = () => toast.success('Task successfully updated');

  const [arrayTask, setArrayTask] = useState([]);
  const [task, setTask] = useState({
    title: '',
    description: '',
    deadline: moment(),
    priority: '',
    complete: false,
  });

  //Validation for title and description
  //string error messages
  const [titleValidator, setTitleValidator] = useState('');
  const [descriptionValidator, setDescriptionValidator] = useState('');
  //error flags
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  //to handle the dialog states
  const [addState, setAddState] = useState(false);
  const [openState, setOpenState] = useState(false);
  const [updateState, setUpdateState] = useState(false);

  const openAddDialog = () => {
    reset();
    setAddState(true);
    handleOpen();
  };

  //reset our entry state back to blanks
  const reset = () => {
    setTask({
      title: '',
      description: '',
      deadline: moment(),
      priority: '',
    });
  };

  const closeDialog = () => {
    handleClose();
    setTitleValidator('');
    setDescriptionValidator('');
    setTitleError(false);
    setDescriptionError(false);
  };

  //if no error, then add, close dialog, and display success
  function handleAddingEntry() {
    if (validateTitle() | validateDescription() | validatePriority()) {
      return;
    } else {
      if(task.deadline == ''){
        task.deadline = moment()
      }
      setArrayTask((arrayTask) => [...arrayTask, task]);
      reset();
      closeDialog();
      addSuccess();
    }
  }

  let validatePriority = () => {
    return task.priority == ''
  }

  let validateDescription = () => {
    let err = false;
    if (task.description == '') {
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
    if (task.title == '') {
      setTitleValidator('Title is required!');
      err = true;
      setTitleError(true);
    } else {
      setTitleValidator('');
      setTitleError(false);
    }
  
    // Check if the task title already exists in the array
    let existingTask = arrayTask.find((item) => item.title === task.title);
    if (existingTask && arrayTask.indexOf(existingTask) !== ind) {
      setTitleValidator('Title already exists!');
      err = true;
      setTitleError(true);
    }
  
    return err;
  };

  const changeTitle = (w) => {
    setTask({ ...task, title: w})
  }

  const changeDescription = (w) => {
    setTask({ ...task, description: e.target.value })
  }

  const changeDeadline = (w) => {
    setTask({ ...task, deadline: e.target.value })
  }

  const changePriority = (w) => {
    setTask({ ...task, priority: e.target.value })
  }
  

  const handleOpen = () => {
    setOpenState(true);
  };

  const handleClose = () => {
    setOpenState(false);
  };

  //toggles the checkbox so the update button can be hidden
  const toggleComplete = (index) => (e) => {
    let tempArray = [...arrayTask];
    let targetTask = tempArray[index];
    let cStatus = targetTask.complete;
    tempArray[index] = {
      title: targetTask.title,
      description: targetTask.description,
      deadline: targetTask.deadline,
      priority: targetTask.priority,
      complete: !cStatus,
    };
    setArrayTask(tempArray);
  };

  // index inorder to update the correct task
  const [ind, setInd] = useState(-1);

  const openUpdateDialog = (index) => {
    setAddState(false);
    setInd(index);
    handleOpen();
    let targetTask = arrayTask[index];
    setTask({
      title: targetTask.title,
      description: targetTask.description,
      deadline: targetTask.deadline,
      priority: targetTask.priority,
    });
  };

  const handleEditing = () => {
    //if there is no description, can't update!
    if (validateDescription()) {
      return;
    } else {
      let searchIndex = ind;
      let tempArray = [...arrayTask];
      let searchTask = tempArray[searchIndex];
      tempArray[searchIndex] = {
        //need to keep title the same
        title: searchTask.title,
        description: task.description,
        deadline: task.deadline,
        priority: task.priority,
        complete: task.complete,
      };
      setArrayTask(tempArray);
      closeDialog();
      reset();
      updateSuccess();
    }
  };

  const deleteEntry = (index) => {
    setArrayTask(arrayTask.filter((_, i) => i !== index));
    deleteSuccess();
  };

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
              onClick={openAddDialog}
              sx={{ marginRight: '5%' }}
            >
              <AddCircleIcon />
              &nbsp;ADD
            </Button>
          </>
        }
      ></CardHeader>
      <CardContent>
      <Dialog openState={openState} addState={addState} task={task} changeTitle={changeTitle} changeDescription={changeDescription} changeDeadline={changeDeadline} changePriority={changePriority}></Dialog>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ color: 'grey' }}>Title</TableCell>
                <TableCell align="center" sx={{ color: 'grey' }}>Description</TableCell>
                <TableCell align="center" sx={{ color: 'grey' }}>Deadline</TableCell>
                <TableCell align="center" sx={{ color: 'grey' }}>Priority</TableCell>
                <TableCell align="center" sx={{ color: 'grey' }}>Is Complete</TableCell>
                <TableCell align="center" sx={{ color: 'grey' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{arrayTask.map((thisTask, index) => {
      return (
        <TableRow key={thisTask.title}>
          <TableCell align="center">{thisTask.title}</TableCell>
          <TableCell align="center">{thisTask.description}</TableCell>
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
                onClick={() => deleteEntry(index)}
              >
                <CancelIcon fontSize="small" />
                &nbsp;Delete
              </Button>
              </div>
            </div>
          </TableCell>
        </TableRow>
      );
    })}</TableBody>
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
