import { useState,useEffect } from "react";
import { Filtros } from "./components/Filtros";
import { Header } from "./components/Header";
import { ListadoGastos } from "./components/ListadoGastos";
import { Modal } from "./components/Modal";
import { generarId } from "./helpers";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";

export const App = () => {

  
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  );

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [modalAnimado, setModalAnimado] = useState(false);

  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro,setFiltro] = useState('');
  const [gastosFiltrados,setGastosFiltrados] = useState([]);

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);

      setTimeout(() => {
        setModalAnimado(true);
      }, 500);
    }
  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0 );
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [] );
  }, [gastos])

  useEffect(() => {
    if (filtro) {
      //filtrar gastos por categoria
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro )
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }
  }, [])

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});
    setTimeout(() => {
      setModalAnimado(true);
    }, 500);
  };

  const guardarGasto = (gasto) => {

    if (gasto.id) {
      //Actualizar
      const gastosActualizados = gastos.map( gastoState => 
        gastoState.id === gasto.id ? gasto : gastoState )
        setGastos(gastosActualizados);
        setGastoEditar({})
    } else{
      //Nuevo Gasto
      gasto.id = generarId();
      gasto.fecha = Date.now(); //retorna la fecha en la que se genera este objeto
      setGastos([...gastos, gasto]);
    }

    setModalAnimado(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id);
    setGastos(gastosActualizados)
  }

  return (
    <>
      <div className={modal ? 'fijar' : ''}>
        <Header
          gastos={gastos}
          setGastos={setGastos}
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          isValidPresupuesto={isValidPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
      

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros filtro={filtro}
                     setFiltro={setFiltro}
            />
            <ListadoGastos gastos={gastos}
                           setGastoEditar={setGastoEditar}
                           eliminarGasto={eliminarGasto}
                           filtro={filtro}
                           gastosFiltrados={gastosFiltrados} />
          </main>
          <div className="nuevo-gasto">
            <img src={IconoNuevoGasto} alt="icono" onClick={handleNuevoGasto} />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          modalAnimado={modalAnimado}
          setModalAnimado={setModalAnimado}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
    </>
  );
};
