import React, {useState} from "react";
import axios from 'axios';
//material ui
import Checkbox from '@material-ui/core/Checkbox';

export default function TareaTerminada(props){
    const [checkedEstadoTarea, set_checkedEstadoTarea] = useState(props.estadoTarea)
    
/*     console.log("estado inicial del prop: "+checkedEstadoTarea) */

    const actualizarEstadoTarea = async ()=>{
        /* Este codigo tiene una falencia, no se usa el estado actualizado,
        por el momento se simula el cambio con ! para ello.
        porque el cambio del estado se hace despues de ejectura todo, pero para ese punto nose como
        ejectur el actualizarEstadoTarea */
        /* console.log("estado que se enviara: "+!checkedEstadoTarea) */
        const data = {
                estadoTarea: !checkedEstadoTarea
        }
        await axios.put(`http://127.0.0.1:8000/api/actualizar_estado_tarea/${props.idTarea}`,data)
        .then(response =>{
            props.listarTareas();
        }).catch(error => console.log('error al completar tarea'))
    }



    const changeEstadoTarea = (event) =>{
        /* console.log("estado antes del cambio: "+checkedEstadoTarea) */
        set_checkedEstadoTarea(event.target.checked)
        /* no realiza el cambio, por que espera que termine de ejecutar todo los metodos */
        /* console.log("estado despues del cambio: "+checkedEstadoTarea) */
        actualizarEstadoTarea();
    }


    return(
        <Checkbox checked={checkedEstadoTarea} onChange={changeEstadoTarea}/>
    )
}