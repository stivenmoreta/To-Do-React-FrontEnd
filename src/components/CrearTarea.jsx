import React, {useState} from "react";
//axios
import axios from 'axios';
//material ui
import {TextField, Button} from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';


//styles
import '../assets/styles/styles.css';


export default function CrearTarea(props){
    const [tarea, set_tarea] = useState({textoTarea:""});
    const [fechaTerminoTarea, set_fechaTerminoTarea] = useState(new Date());

    //validador
    const [leyenda, set_leyenda] = useState('');
    const [errorContenido, set_errorContenido] = useState(false);

    const changeTextoTarea = (event) =>{set_tarea(
        {...tarea,textoTarea:event.target.value})
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

    const crearTarea = async ()=>{
        console.log(fechaTerminoTarea)
        const data = {
            textoTarea: tarea.textoTarea,
            fechaTermino: fechaTerminoTarea
        }
        await axios.post(`http://127.0.0.1:8000/api/agregar_tarea/`,data)
        .then(response =>{
            console.log(response)
            props.listarTareas();
        }).catch(error => console.log(error))
    }

    return(
        <div id='container-crear-tarea'>
            <div id='children-crear-tarea'>
                <TextField error={errorContenido} helperText={leyenda} label="Contenido"  onChange={changeTextoTarea} value={tarea.textoTarea}/>
                <br /><br />
                <DateTimePicker label="Finaliza" onChange={set_fechaTerminoTarea} value={fechaTerminoTarea}/>
                <br />
                <Button id='btn-enviar' onClick={()=>crearTarea()} >Crear tarea</Button>
                <br />
            </div>
        </div>
    )
}