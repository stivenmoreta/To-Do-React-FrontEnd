import React, { useState } from "react";
//axios
import axios from "axios";
//material
import { Modal, TextField, Button } from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

//estilos
import "../assets/styles/styles.css";

export default function ActualizarTarea(props) {
  const [modal, setModal] = useState(false);
  const [tarea, set_tarea] = useState(props.tarea);
  const [fechaTermino, set_fechaTermino] = useState(props.tarea.fecha_termino);
  //validador
  const [leyenda, set_leyenda] = useState("");
  const [errorContenido, set_errorContenido] = useState(false);

  const changeContenido = (event) => {
    set_tarea({ ...tarea, texto_tarea: event.target.value });
    if (tarea.texto_tarea.length > 25) {
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

  const actualizarTarea = async () => {
    const data = {
      new_texto_tarea: tarea.texto_tarea,
      new_fecha_termino: fechaTermino,
    };
    await axios
      .put(`https://todo-app-back-end-nodejs.herokuapp.com/api/tarea/${tarea.id_tarea}`, data)
      .then((response) => {
        props.listarTareas();
        abrirCerrarModal();
      })
      .catch((error) =>
        error.response.status === 406
          ? alert(error.response.data)
          : alert("un proble ocurrio")
      );
  };

  const abrirCerrarModal = () => {
    setModal(!modal);
  };

  const body = (
    <div id="modal">
      <div align="center">
        <h2>Tarea</h2>
      </div>

      <TextField
        error={errorContenido}
        helperText={leyenda}
        id="textField"
        label="Contenido"
        onChange={changeContenido}
        value={tarea.texto_tarea}
      />
      <br />
      <DateTimePicker
        label="Finaliza"
        onChange={set_fechaTermino}
        value={fechaTermino}
      />
      <div>
        <Button
          id="btn-actualizar"
          onClick={() => actualizarTarea()}
          color="primary"
        >
          Enviar
        </Button>
        <Button id="btn-cancelar" onClick={() => abrirCerrarModal()}>
          Cancelar
        </Button>
      </div>
    </div>
  );
  return (
    <>
      <IconButton
        id="btn-editar"
        onClick={() => abrirCerrarModal()}
        edge="end"
        aria-label="edit"
      >
        <EditIcon />
      </IconButton>

      <Modal open={modal} onClose={abrirCerrarModal}>
        {body}
      </Modal>
    </>
  );
}
