import React, { useEffect, useMemo, useState } from "react";

import MaterialReactTable from 'material-react-table';
import AddCustomer from './AddCustomer'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditCustomer from './EditCustomer'
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportToCsv } from 'export-to-csv'

function Customers() {

  const [customers, setCustomers] = useState([
    {
      firstname: '',
      lastname: '',
      streetaddress: '',
      postcode: '',
      city: '',
      email: '',

    }
  ]);

  const getCustomers = () => {
    fetch('http://traineeapp.azurewebsites.net/api/customers')
      .then(response => {
        if (response.ok)
          return response.json()
        else
          alert("Something goes wrong")
      }
      )
      .then(data => setCustomers(data.content))
      .catch(err => console.log(err))
  }

  const addCustomer = (customer) => {
    fetch('http://traineeapp.azurewebsites.net/api/customers', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(customer)
    })
      .then(response => {
        if (response.ok)
          getCustomers();
        else
          alert("Something went wrong in addition")
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetch('http://traineeapp.azurewebsites.net/api/customers')
      .then(response => {
        if (response.ok)
          return response.json()
        else
          alert("Something goes wrong")
      }
      )
      .then(data => setCustomers(data.content))
      .catch(err => console.log(err))
  }, [])

  const deleteCustomer = (data) => {

    if (window.confirm("Are u sure?")) {

      fetch(data.links[0].href, { method: 'DELETE' })
        .then(response => {
          if (response.ok)
            getCustomers()
          else
            alert("Something is wrong with deletion")
        })
        .catch(err => console.error(err))
    }
  }
  const editCustomer = (customer, url) => {
    fetch(url, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(customer)

    })
      .then(response => {
        if (response.ok)
          getCustomers()
        else
          alert("Something went wrong in edit")
      })
      .catch(err => console.log(err))
  }

  const columns = useMemo(
    () => [

      {
        header: "edit",
        Cell: ({ row }) => (
          <EditCustomer data={row.original} editCustomer={editCustomer} />
        ),
        size: 10
      },
      {
        header: "delete",
        Cell: ({ row }) => (
          <div>
            <Button size="small" color="secondary"
              endIcon={<DeleteTwoToneIcon />}
              onClick={() =>
                deleteCustomer(row.original)
              }></Button>
          </div>
        ),
        size: 10

      },
      {
        accessorKey: "firstname",
        header: "First Name",
        size: 10
      },
      {
        accessorKey: "lastname",
        header: "Last Name",
        size: 10,
      },
      {
        accessorKey: "streetaddress",
        header: "Street Address",
        size: 10
      },
      {
        accessorKey: "postcode",
        header: "Post code",
        size: 10
      },
      {
        accessorKey: "city",
        header: "City",
        size: 10
      },
      {
        accessorKey: "email",
        header: "Email",
      },
    ]
  );

  const csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: true,
    headers: columns.map((c) => c.header),
  };

  const csvExporter = new ExportToCsv(csvOptions);

  const handleExportRows = (rows) => {
    csvExporter.generateCsv(rows.map((row) => row.original));
  };

  const handleExportData = () => {
    csvExporter.generateCsv(customers);
  };

  return (
    <div>
      <MaterialReactTable
        title="Customer Information"
        columns={columns}
        data={customers}
        enableStickyHeader
        enableRowSelection
        positionToolbarAlertBanner="bottom"
        renderTopToolbarCustomActions={({ table }) => (
          <Box
            sx={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', p: '0.05rem' }}
          >

            <h1> Customers </h1>
            <Button
              //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
              onClick={handleExportData}
              startIcon={<FileDownloadIcon />}
              variant="outlined"
            >
              Export All Data
            </Button>
            <Button
              disabled={table.getPrePaginationRowModel().rows.length === 0}
              //export all rows, including from the next page, (still respects filtering and sorting)
              onClick={() =>
                handleExportRows(table.getPrePaginationRowModel().rows)
              }
              startIcon={<FileDownloadIcon />}
              variant="outlined"
            >
              Export All Rows
            </Button>
            <Button
              disabled={table.getRowModel().rows.length === 0}
              //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
              onClick={() => handleExportRows(table.getRowModel().rows)}
              startIcon={<FileDownloadIcon />}
              variant="outlined"
            >
              Export Page Rows
            </Button>
            <Button
              disabled={
                !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
              }
              //only export selected rows
              onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
              startIcon={<FileDownloadIcon />}
              variant="outlined"
            >
              Export Selected Rows
            </Button>
            <AddCustomer addCustomer={addCustomer} />
          </Box>
        )}
      />

    </div>)
}

export default Customers;