import React, {useState} from 'react';
//axios
import axios from 'axios';
//material
import {Modal, TextField, Button} from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers'
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

//estilos
import '../assets/styles/styles.css';



export default function ActualizarTarea(props){
    const [modal, setModal] = useState(false);
    const [tarea, set_tarea] = useState(props.tarea)
    const [fechaTermino, set_fechaTermino] = useState(props.tarea.fechaTermino)
    //validador
    const [leyenda, set_leyenda] = useState('');
    const [errorContenido, set_errorContenido] = useState(false);


    const changeContenido = (event) =>{
        set_tarea({...tarea, textoTarea:event.target.value})
        if(tarea.textoTarea.length > 25){
            set_errorContenido(true);
            set_leyenda("El contenido no puede ser mayor a 25 caracteres")
        }else if(event.target.value.length === 0){
            set_errorContenido(true);
            set_leyenda("Debe ingresar una tarea")
        }else{
            set_errorContenido(false);
            set_leyenda("");
        }
    }

    const actualizarTarea = async ()=>{
        const data = {
            textoTarea: tarea.textoTarea,
            fechaTermino: fechaTermino
        }
        await axios.put(`http://127.0.0.1:8000/api/actualizar_tarea/${tarea.idTarea}`,data)
        .then(response =>{
            props.listarTareas();
            abrirCerrarModal();
        }).catch(error => console.log('error al actualizar tarea'))
    }

    const abrirCerrarModal = ()=>{
        setModal(!modal);
    }

    const body=(
        <div  id='modal'>
            <div align="center">
                <h2>Tarea</h2>
            </div>

            <TextField error={errorContenido} helperText={leyenda} id='textField' label="Contenido" onChange={changeContenido} value={tarea.textoTarea} />
            <br />
            <DateTimePicker label='Finaliza' onChange={set_fechaTermino} value={fechaTermino}/>
            <div>
                <Button id='btn-actualizar' onClick={()=>actualizarTarea()} color='primary'>Enviar</Button>
                <Button id='btn-cancelar' onClick={()=>abrirCerrarModal()}>Cancelar</Button>
            </div>
        </div> 
    )
    return(
        <>
        <IconButton id='btn-editar' onClick={()=>abrirCerrarModal()} edge="end" aria-label="edit">
                <EditIcon />
        </IconButton>

        <Modal open={modal} onClose={abrirCerrarModal}>
            {body}
        </Modal>
        </>
    )
}