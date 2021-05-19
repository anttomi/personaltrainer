import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';


function AddTraining(props) {

    const [training, setTraining] = useState({activity: '', date: '', duration: '', customer: props.oldData.links[0].href})
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    
    const inputChanged = (event) => {
      setTraining({...training, [event.target.name]: event.target.value});
    };
    
    const addTraining = () => {
      
        training.date = moment().toISOString(training.date);
        props.addTraining({...training, customer: props.oldData.links[0].href});
            handleClose();
            
        };
    
    
    return(
        <div>
    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Add Training
          </Button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add new training</DialogTitle>
            <DialogContent>
            <TextField
                margin="dense"
                name="activity"
                value={training.activity}
                onChange={e => inputChanged(e)}
                label="Activity"
                fullWidth
              />
              <TextField
                margin="dense"
                name="date"
                value={training.date}
                onChange={e => inputChanged(e)}
                label="Date"
                fullWidth
              />
              <TextField
                margin="dense"
                name="duration"
                value={training.duration}
                onChange={e => inputChanged(e)}
                label="Duration"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={addTraining} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
    )
    }
    


export default AddTraining;