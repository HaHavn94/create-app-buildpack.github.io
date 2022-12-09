import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import 'react-datepicker/dist/react-datepicker.css'
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


export default function AddTraining(props) {

    const [training, setTraining] = React.useState([
      {         
        date: dayjs('2014-08-18T09:00:00.000+0000') ,
        activity: '',
        duration: '',
        customer: '',             
      }
    ]);  
  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    
    setTraining( {...training,  customer : `https://customerrest.herokuapp.com/api/customers/${props.data.customer.id}`}) 
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.addTraining(training); 
    setOpen(false)
  }

  const handleChange = (newValue) => {
    setTraining({ ...training, date: newValue })    
  };

  return (
    <div>  
       <Button  onClick={handleClickOpen} size="small"
      endIcon={<AddIcon/>}
      >
      </Button>
     
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Training</DialogTitle>
        <DialogContent>
          <DialogContentText>
           
          </DialogContentText>
          
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              
       <DateTimePicker
          label="Date&Time picker"
          value={training.date}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />      
        
                </Stack>
          </LocalizationProvider>

<TextField    
            margin="dense" 
            value = {training.duration}         
            label="Duration"
            fullWidth
            variant="standard"
            onChange={e => setTraining({...training, duration: e.target.value})}
          />
          

<TextField    
            margin="dense" 
            value = {training.activity}         
            label="Activity"
            fullWidth
            variant="standard"
            onChange={e => setTraining({...training,activity: e.target.value})}
          />       
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} >Save</Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
}