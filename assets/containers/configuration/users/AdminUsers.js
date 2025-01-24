import React, { useEffect } from 'react'
import axios from 'axios';
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
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import UserFormAdd from './form/UserFormAdd'
import Chip from '@mui/material/Chip';
import {localDomaine} from '../../../env'

const AdminUsers = () => {

  useEffect(() => {
      document.title = 'Users management';
  }, []);

  const [users, setUsers] = React.useState([]);
  const [openAdd, setOpenAdd] = React.useState(false);

  useEffect(() => {
    const url = localDomaine + '/admin/users/fetchall';
    let usersArr = [];
    axios({url: url, method: 'post'})
      .then(res => {
        res.data.users.map(user => {
          usersArr.push(user)
        })
        setUsers(usersArr)
      })
      .catch(console.log('error fetch users.'))
  }, [])

  const handleOpenAdd = () => {
      setOpenAdd(true);
  };

  const updateTableUsers = (props) => {
    setUsers([...users, props])
  }

  const handleDeleteUser = (id) => {
    const url = localDomaine + '/admin/users/remove';
    axios({url: url, method: 'post', data: id})
      .then(res => {
        if(res.data.userRemoved){
          let majUsers = [...users];
          majUsers = majUsers.filter(user => user.id !=id)
          setUsers(majUsers);
        }
      })
      .catch(console.log('error remove user.'))
  }

  return (

    <Box sx={{ width: '96%', marginTop: '20px', marginLeft: '2%' }}>

      <UserFormAdd 
        show={openAdd} 
        setShow={setOpenAdd}
        updateTableUsers = {updateTableUsers}
      />

      <TableContainer component={Paper}>

        <Box component="section" sx={{ p: 2, height: 36 }}>
          LISTE DES UTILISATEURS
          <Button sx={{ float: 'right' }} variant="contained" onClick={handleOpenAdd}>Ajouter un utilisateur</Button>
        </Box>

        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">

          <TableHead sx={{ bgcolor: '#576065', height: 60 }}>
            <TableRow>
              <TableCell style={{ color: '#F5F5F5' }}>ID</TableCell>
              <TableCell style={{ color: '#F5F5F5' }}align="right">Nom</TableCell>
              <TableCell style={{ color: '#F5F5F5' }} align="right">Email</TableCell>
              <TableCell style={{ color: '#F5F5F5' }} align="center">Enseignes</TableCell>
              <TableCell style={{ color: '#F5F5F5' }} align="right">Rôles</TableCell>
              <TableCell style={{ color: '#F5F5F5' }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{row.id}</TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="left">
                    <Box sx={{ width: 300, display: 'inline-block' }}></Box>
                    {row.enseigne.map(e => {
                      return(<Chip key={e.id} label={e.enseignes} color='primary' style={{marginLeft: 10}} />);
                    })}
                </TableCell>
                <TableCell align="right">{row.role}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit" style={{ color: '#576065' }}>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip  title="Delete" onClick={()=>{handleDeleteUser(row.id)}} style={{ color: '#576065' }}>
                    <IconButton>
                      <DeleteIcon/>
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