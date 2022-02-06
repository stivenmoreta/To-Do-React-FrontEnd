import React from "react";
import './App.css';

//hooks personales
import ListaTareas from './components/ListaTareas';
//envoltura para usar calendario, debe envolver el proyecto
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
//formato fecha y hora
import DateFnsUtils from '@date-io/date-fns';
//En español
import esLocale from 'date-fns/locale/es';



function App() {
  return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale} >
        <div className="App">
            <ListaTareas/>
        </div>
      </MuiPickersUtilsProvider>
  );
}

export default App;
