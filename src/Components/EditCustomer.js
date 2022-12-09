import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CreateIcon from '@mui/icons-material/Create';

export default function EditCustomer(props) {
    const [customer, setCustomer] = React.useState( {       
            firstname: '' ,
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
    setCustomer({
            firstname: props.data.firstname ,
            lastname: props.data.lastname,
            streetaddress: props.data.address,
            postcode: props.data.postcode,
            city:props.data.city,
            email: props.data.email
    })
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const handleSave = () => {
    props.editCustomer(customer, props.data.links[1].href) ;
   
    setOpen(false)
  }

  return (
    <div>
      <Button  onClick={handleClickOpen} size="small"
      endIcon={<CreateIcon/>}
      >
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Edit customer form here
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
