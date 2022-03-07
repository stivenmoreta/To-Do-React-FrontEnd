import React, { useState } from "react";
//axios
import axios from "axios";
//material ui
import { TextField, Button } from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";

import dateFormat from "dateformat";

//styles
import "../assets/styles/styles.css";

export default function CrearTarea(props) {
  const [tarea, set_tarea] = useState("");
  const [fechaTerminoTarea, set_fechaTerminoTarea] = useState(new Date());
  //validador
  const [leyenda, set_leyenda] = useState("");
  const [errorContenido, set_errorContenido] = useState(false);

  const changeTextoTarea = (event) => {
    set_tarea(event.target.value);
    if (tarea.length > 25) {
      set_errorContenido(true);
      set_leyenda("El contenido no puede ser mayor a 25 caracteres");
    } else if (event.target.value.length === 0) {
      set_errorContenido(true);
      set_leyenda("Debe ingresar una tarea");
    } else {
      set_errorContenido(false);
      set_leyenda("");
    }
  };

  const crearTarea = async () => {
    const data = {
      texto_tarea: tarea,
      fecha_termino: dateFormat(fechaTerminoTarea, "yyyy/mm/dd h:MM:ss"),
    };
    await axios
      .post(`https://todo-app-back-end-nodejs.herokuapp.com/api/tarea`, data)
      .then((response) => {
        console.log(response);
        props.listarTareas();
      })
      .catch((error) => {
        error.response.status === 406
          ? alert(error.response.data)
          : alert("un proble ocurrio");
        
      });
  };

  return (
    <div id="container-crear-tarea">
      <div id="children-crear-tarea">
        <TextField
          error={errorContenido}
          helperText={leyenda}
          label="Contenido"
          onChange={changeTextoTarea}
          value={tarea}
        />
        <br />
        <br />
        <DateTimePicker
          label="Finaliza"
          onChange={set_fechaTerminoTarea}
          value={fechaTerminoTarea}
        />
        <br />
        <Button id="btn-enviar" onClick={() => crearTarea()}>
          Crear tarea
        </Button>
        <br />
      </div>
    </div>
  );
}
