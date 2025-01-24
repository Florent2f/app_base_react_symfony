import React, { useState, useCallback, useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Modal from '../../../../components/ui/modal/Modal';
import {user_create} from '../actions/adminUsers'

const enseignesList = [{id: 1, enseigne: 'Enseigne 1', selected: false}, {id: 2, enseigne: 'Enseigne 2', selected: false}]
const userObj = {name: '', email: '', password: '', confirmPassword: ''};

const UserFormAdd = (props) => {

    const { show, setShow, updateTableUsers, isFormValid} = props;

    const [user, setUser] = useState(userObj);
    const [enseignes, setEnseignes] = useState(enseignesList);
    const [role, setRole] = useState('');
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleSubmitAdd = (e) => {
        e.preventDefault();
        const data = {user: user, enseignes: enseignes, role: role};
        // const userCreated = useCallback(() => dispatch(user_create(data)),[dispatch]);
        user_create(data).then(reponse => {
            if(reponse.newUser){
                updateTableUsers(reponse.newUser)
                resetForm();
                setShow(false);
            } else {
                setErrorMessage('Une erreur est servenue.')
            }
        });
    };

    const handleClose = () => {
        resetForm();
        setShow(false);
    }

    const resetForm = () => {
        setUser(userObj);
        setRole('');
        setEnseignes(enseignesList); // enseignes
        setErrorMessage('');
    }

    const handleSelectChip = (e) => {
        const id = e.target.offsetParent.id
        const newState = enseignes.map(enseigne => enseigne.id == id ? { ...enseigne, selected: !enseigne.selected} : enseigne);
        setEnseignes(newState);
    }

    const handleChangeRole = (event) => {
        setRole(event.target.value);
    };

    const handleName = (e) => {
        setUser({...user, name: e.target.value})
    }

    const handleEmail = (e) => {
        setUser({...user, email: e.target.value})
    }

    const handlePassword = (e) => {
        setUser({...user, password: e.target.value})
    }

    const handleConfirmPassword = (e) => {
        setUser({...user, confirmPassword: e.target.value})
    }

    return (
        <Modal show={show} width={'350px'} left={"calc(50% - 175px)"}>
            <Typography variant="h5" component="h3">Ajouter un utilisateur</Typography>
            <Divider style={{margin : '10px 0'}}/>

            <FormControl style={{ width: '100%' }}>

                { errorMessage.length > 0 && <Alert style={{ margin: '10px 0' }} severity="error">{errorMessage}</Alert>}
                {/* <TextField id="standard-basic" name="username" label="Nom" variant="standard" color="warning" focused size="small" /> */}
                <TextField type="text" name="username" onChange={handleName} value={user.name} label="Nom" variant="standard" size="small" />
                <TextField type="email" name="email" onChange={handleEmail} value={user.email} label="Email" variant="standard" size="small" />
                <TextField type="password" name="password" onChange={handlePassword} value={user.password} label="Mot de passe" variant="standard" size="small" />
                <TextField type="password" name="repeat_password" onChange={handleConfirmPassword} value={user.confirmPassword} label="Confirmer le mot de passe" variant="standard" size="small" />

                <Accordion style={{ marginTop: 20 }} expanded={true}>
                    <AccordionSummary style={{ backgroundColor: '#F5F5F5' }} expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header" >
                        <Typography component="span">Enseignes associées</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack direction="row" spacing={1}>
                            {Object.keys(enseignes).map((enseigne) => {
                                return(
                                    <Chip key={enseignes[enseigne].id} label={enseignes[enseigne].enseigne} id={enseignes[enseigne].id} 
                                            onClick={handleSelectChip} color={enseignes[enseigne].selected ? 'primary' : ''} />
                                );
                            })}
                        </Stack>
                    </AccordionDetails>
                </Accordion>

                <FormControl fullWidth style={{ marginTop: 20 }}>
                    <InputLabel id="demo-simple-select-label">Rôle</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={role} onChange={handleChangeRole} label="Rôle">
                        <MenuItem value={'admin'}>ROLE_ADMIN</MenuItem>
                        <MenuItem value={'user'}>ROLE_USER</MenuItem>
                    </Select>
                </FormControl>

                <Button type="submit" variant="contained" onClick={handleSubmitAdd} disabled={isFormValid} color="primary" className="mx-auto my-16 mt-24" aria-label="REGISTER" style={{ margin: "10px 0" }}>
                    Envoyer
                </Button>
                <Button type="button" variant="contained" color="error" aria-label="Close pop" onClick={handleClose}>
                    Fermer
                </Button>
            </FormControl>

        </Modal>
    )
}

export default UserFormAdd;