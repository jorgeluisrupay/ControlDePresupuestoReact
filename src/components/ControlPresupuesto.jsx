import {useEffect, useState} from "react";
import { CircularProgressbar,buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css'

export const ControlPresupuesto = ({ 
  presupuesto, 
  gastos, 
  setPresupuesto, 
  setGastos,
  setIsValidPresupuesto }) => {

  const [porcentaje,setPorcentaje] = useState(0);
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);


  useEffect(() => {
    const totalGastado = gastos.reduce( (total, gasto)=> {
      return gasto.cantidad + total
    },0);
    const totalDisponible = presupuesto - totalGastado;

    //Calcular el porsentaje gastado
    const nuevoPorcentaje = (((presupuesto - totalDisponible)/presupuesto) * 100).toFixed(2);

    setDisponible(totalDisponible)
    setGastado(totalGastado);

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    },1500);
    
  }, [gastos])

  /*No modifica el state, solo cambia visualmente */
  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleResetApp = () => {
    const resultado = confirm('Deseas reiniciar presupuesto y gastos?');
    if (resultado) {
      setGastos([]);
      setPresupuesto(0);
      setIsValidPresupuesto(false);
    }
    else{
      console.log('no');
    }
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div className="aea">
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? '#F1948A' : '#3B82F6',
            trailColor: '#f5f5f5',
            textColor: porcentaje > 100 ? '#F1948A' : '#3B82F6'
          })}
          value={porcentaje}
          text={`${porcentaje}% gastado`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Resetear App
        </button>
        <p>
          <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? 'negativo' : ''} `}>
          <span>Disponible: </span> {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado: </span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};
