import * as React from 'react';
import {Box, Button} from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';

export default function AddCustomer(props) {
    const [customer, setCustomer] = React.useState( {       
            firstname: '',
            lastname: '',
            streetaddress: '',
            postcode: '',
            city:'',
            email:''
         }
       );

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.addCustomer(customer) ;
    setOpen(false)
  }

  return (
    <div>
      <Button variant="outlined" style={{ width: "120px", height: "100%" }}  onClick={handleClickOpen}
      endIcon={<AddIcon/>}
      >
        Add Customer
     
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Customer</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Please fill information about customer. ID need to be unique
          </DialogContentText>
          <TextField    
            margin="dense" 
            value = {customer.firstname}         
            label="First Name"
            fullWidth
            variant="standard"
            onChange={e => setCustomer({...customer,firstname: e.target.value})}
          />

<TextField    
            margin="dense" 
            value = {customer.lastname}         
            label="Lastname"
            fullWidth
            variant="standard"
            onChange={e => setCustomer({...customer,lastname: e.target.value})}
          />

<TextField    
            margin="dense" 
            value = {customer.streetaddress}         
            label="Address"
            fullWidth
            variant="standard"
            onChange={e => setCustomer({...customer, streetaddress: e.target.value})}
          />

<TextField    
            margin="dense" 
            value = {customer.postcode}         
            label="Post Code"
            fullWidth
            variant="standard"
            onChange={e => setCustomer({...customer,postcode: e.target.value})}
          />
          


<TextField    
            margin="dense" 
            value = {customer.city}         
            label="City"
            fullWidth
            variant="standard"
            onChange={e => setCustomer({...customer,city: e.target.value})}
          />
           <TextField    
            margin="dense" 
            value = {customer.email}         
            label="email"
            fullWidth
            variant="standard"
            onChange={e => setCustomer({...customer,email : e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
