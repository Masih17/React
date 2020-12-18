import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';
import 'date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker
} from '@material-ui/pickers';
import moment from 'moment';

function AddTraining(props) {
    console.log(props);
    const [open, setOpen] = useState(false);
    const [workout, setWorkout] = useState({
        date: '',
        activity: '',
        duration: '',
        customer: props.customerId
    });

    const inputChanged = (e) => {
        setWorkout({ ...workout, [e.target.name]: e.target.value });
    };

    const handleDateChange = date => {
        setWorkout({ ...workout, date: date });
    };

    const handleClickOpen = () => {

        setOpen(true);
    };

    const closeDialog = () => {
        setOpen(false);
    };

    const addTraining = () => {
        props.addTraining(props.customer, workout);
        closeDialog();
        console.log(props.customer);
    };

    return (
        <div>

            <Tooltip title="Add" aria-label="add">
                <AddCircleIcon variant="outlined" color="primary" onClick={handleClickOpen} />
            </Tooltip>

            <Dialog open={open} onClose={closeDialog} >
                <DialogTitle >
                    New Training
                </DialogTitle>
                <DialogContent>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDateTimePicker
                            format="dd.MM.yyyy HH:MM"
                            ampm={false}
                            margin="dense"
                            id="date-picker-dialog"
                            label="Date"
                            inputValue={workout.date}
                            onChange={e => handleDateChange(moment(e).format('DD.MM.yyyy HH:MM'))}
                            disablePast
                        />

                    </MuiPickersUtilsProvider>
                    <TextField
                        autoFocus
                        name="activity"
                        value={workout.activity}
                        onChange={inputChanged}
                        margin="dense"
                        label="Workout"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        name="duration"
                        value={workout.duration}
                        onChange={inputChanged}
                        margin="dense"
                        label="Duration"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={addTraining} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog >
        </div>
    );
}
export default AddTraining;