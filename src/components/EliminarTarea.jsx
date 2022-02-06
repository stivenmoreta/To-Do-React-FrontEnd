import axios from "axios";
import React from "react";
//material ui
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
//estilos para el boton
import '../assets/styles/styles.css';

export default function EliminarTarea(props){

    const eliminarTarea = async() =>{
        const data = {
            eliminarTarea: true
        }
        await axios.put(`http://127.0.0.1:8000/api/eliminar_tarea/${props.idTarea}`,data)
        .then(response =>{
            props.listarTareas();
        }).catch(error => console.log('error al eliminar tarea'))
    }

    return(
            <IconButton id='btn-delete'  onClick={eliminarTarea} edge="end" aria-label="delete">
                <DeleteIcon />
            </IconButton>
    )
}