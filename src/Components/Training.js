import React, { useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { format } from 'date-fns'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import {Box, Button} from '@mui/material/';
import AddTraining from './AddTraining'

function Training() { 
    const [trainers, setTrainers] = useState([
        {
           id: '',
           date:  new Date(),
           duration: 1 ,
           activity: '',
           customer: {
            id: '',
            firstname: '',
            lastname:''
           }        
        }
    ]);
    
      function getTrainnings() {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => {
                if (response.ok)
                    return response.json();

                else
                    alert("Something goes wrong");
            }
            )
            .then(data => setTrainers(data))
            .catch(err => console.log(err));
    }

    const deleteTrainning = (data) => {
     
      if (window.confirm("Are u sure?")) {
        
      fetch( `https://customerrest.herokuapp.com/api/trainings/${data.id}` , {method: 'DELETE'})
      .then(response => {
          if (response.ok) 
           getTrainnings() 
           else 
           alert("Something is wrong with deletion")
           console.log(data.id)
           
      })
      .catch(err => console.error(err))
  }
  }  
  
    const addTraining = (data) => {
    fetch('https://customerrest.herokuapp.com/api/trainings', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(data)
  })
  .then(response => {
      if(response.ok)
      getTrainnings();
      else
      alert("Something went wrong in addition")
      
  })
  .catch(err => console.error(err))
}

      useEffect( () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => {
            if (response.ok) 
               return response.json() 
            else 
            alert("Something goes wrong") 
        }
            )
            .then(data => {
              setTrainers(data)
                
            })
        .catch(err => console.log(err))
      }, [])   
    
      const columns = useMemo(
          () => [
           
          {
            header: "Add",
            
              Cell: ({row}) => (                 
            <AddTraining data={row.original}  addTraining= {addTraining}/>
                  ),
                  size: 5
            
              },         
              {
                header: " ",
                Cell: ({row }) => (
                  <div>
                    <Button size= "small"  color="secondary"
                    endIcon={<DeleteTwoToneIcon />}
                    onClick= { () =>
                      deleteTrainning(row.original)  
                    }></Button>                   
                   </div>
                ),
                size: 10                
              },
          {
            accessorKey: "id" ,
            header: "ID",
            muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
            Cell: ({ cell }) => <strong>{cell.getValue()}</strong> ,//optional custom cell render
            size: 10
           
          },      
          {
            accessorKey: "date",
            header: "Date",
            Cell: ({ cell }) => {
                return (
                    <div>                
                   { format(new Date(cell.getValue()), 'dd.MM.yyyy hh:mm a') }            
                    </div>
                )
            }                           
          },     
          {
            accessorKey: "duration" ,
            header: "Duration",
           size: 5,                      
          },    
          {
            accessorKey: "activity",
            header: "activity",
            size: 10           
          },     
          {
            accessorKey: "customer.id",
            header: "Customer - ID",
            size: 5            
          },
          {
            accessorKey: "customer.firstname"  ,
            header: "Customer's Name",           
          },        
          {
            accessorKey: "customer.lastname",
            header: "Customer - Lastname",
            
          },                 
        ],
        []
      );
       return(      
            <div>         
         <MaterialReactTable      
      columns={columns} 
      data={trainers}
      enableStickyHeader
      renderTopToolbarCustomActions={({ table }) => (      
        <Box
          sx={{ display: 'flex', gap: '1rem', p: '0.2rem', flexWrap: 'wrap' }}
        >
           <h1> Training</h1>          
          </Box>
      )
      }
 />                      
       </div>
        ) 
}
export default Training;