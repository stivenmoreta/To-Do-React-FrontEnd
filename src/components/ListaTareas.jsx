import React from "react";
import axios from 'axios';
import {useEffect, useState} from 'react';

//Componentes personales
import ActualizarTarea from './ActualizarTarea';
import EliminarTarea from './EliminarTarea';
import CrearTarea from './CrearTarea';
import TareaTerminada from "./TareaTerminada";
//Material ui
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@mui/material/TextField';
//grillas para los espacios, 12 grillas
import Grid from '@mui/material/Grid';

//para transformar la fecha
import dateFormat from "dateformat"; 

//estilos para el listar
import '../assets/styles/styles.css';




export default function ListaTareas (){
    /* la constante tareas contendra los datos de la api y en ella se modificaran segun la busqueda
    la constante listaTareas sera un tabla de referencia para filtrar segun la busqueda y que se iran anidando
    en var resultadosBusqueda y seteando en la constante tareas*/
    const [tareas, set_tareas]= useState([]);//Estas son las tareas que se muestran en el render
    const [listaTareas, set_listaTareas] = useState([]);//Estos son todos los datos que no se modificaran
    const [busqueda, set_busqueda]= useState("");
    

    const listarTareas = async() =>{
        await axios.get("https://todo-app-back-end-nodejs.herokuapp.com/api/tarea")
        .then(response =>{
            set_tareas(response.data);
            set_listaTareas(response.data);
            console.log(response.data)
        }).catch(error => console.log('error al listar tareas'))
    }

    const handleChange= event=>{
        set_busqueda(event.target.value);
        filtrar(event.target.value);
      }

    const filtrar=(terminoBusqueda)=>{
        var resultadosBusqueda=listaTareas.filter((elemento)=>{
          if(elemento.texto_tarea.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
          ){
            return elemento;
          }
        });
        set_tareas(resultadosBusqueda);
    }

    useEffect(()=>
        listarTareas()
    ,[])

    return(
      
        <div>
            <CrearTarea  listarTareas={listarTareas}/>
            <br/>

            <Grid container>
              <Grid item xs={12}>
                <TextField value={busqueda} onChange={handleChange} color="secondary"label="busca tu tarea..."/>
              </Grid>
            </Grid>
          <div id='container-list'>
            <List id="sub-container-list">
              <h2 >Tareas</h2>
                  {tareas && tareas.map((tarea)=>(
                    <Grid container>
                      <ListItem  id="listItem" key={tarea.id_tarea}>
                        <Grid item xs={2} sm={2} md={1}>
                          <TareaTerminada estadoTarea={tarea.estado_tarea} listarTareas={listarTareas} idTarea={tarea.id_tarea}  />
                        </Grid>
                        <Grid item xs={4} sm={4} md={6}>
                          <ListItemText style={{minWidth: 95,overflow: 'auto'}}> {tarea.estado_tarea ? <del>{tarea.texto_tarea}</del> : tarea.texto_tarea} </ListItemText>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                          <ListItemText>{tarea.estado_tarea ?  <del>{dateFormat(tarea.fecha_termino,'dd/mm/yy h:MM TT')}</del> : dateFormat(tarea.fecha_termino,'dd/mm/yy h:MM TT')}</ListItemText>
                        </Grid>
                        <Grid item xs={2} sm={2} md={1}>
                          <ListItemSecondaryAction>
                            <ActualizarTarea listarTareas={listarTareas} tarea={tarea} />
                            <EliminarTarea listarTareas={listarTareas} idTarea={tarea.id_tarea}/>
                          </ListItemSecondaryAction>
                        </Grid>
                      </ListItem>
                    </Grid>
                  ))}
              </List>

            </div>
        </div>
    )
}