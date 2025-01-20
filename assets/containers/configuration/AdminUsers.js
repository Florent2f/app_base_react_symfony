import * as React from 'react';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const AdminUsers = () => {



  return (

    <Box sx={{ width: '96%', marginTop: '20px', marginLeft: '2%' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">

          <TableHead sx={{ bgcolor: '#576065', height: 60 }}>
            <TableRow>
              <TableCell style={{ color: '#F5F5F5' }}>ID</TableCell>
              <TableCell style={{ color: '#F5F5F5' }}align="right">Nom</TableCell>
              <TableCell style={{ color: '#F5F5F5' }} align="right">Email</TableCell>
              <TableCell style={{ color: '#F5F5F5' }} align="right">Enseignes</TableCell>
              <TableCell style={{ color: '#F5F5F5' }} align="right">Rôles</TableCell>
              <TableCell style={{ color: '#F5F5F5' }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit" style={{ color: '#576065' }}>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete" style={{ color: '#576065' }}>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </Box>
  );
}

export default AdminUsers;