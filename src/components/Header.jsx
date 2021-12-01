import React from "react";
import { ControlPresupuesto } from "./ControlPresupuesto";
import { NewPresupuesto } from "./NewPresupuesto";

export const Header = ({
  gastos,
  setGastos,
  presupuesto,
  setPresupuesto,
  isValidPresupuesto,
  setIsValidPresupuesto,
}) => {
  return (
    <header>
      <h1>Planificador de Gastos</h1>
      {isValidPresupuesto ? (
        <ControlPresupuesto presupuesto={presupuesto}
                            setPresupuesto={setPresupuesto}
                            gastos={gastos}
                            setGastos={setGastos}
                            setIsValidPresupuesto={setIsValidPresupuesto} />
      ) : (
        <NewPresupuesto
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
      )}
    </header>
  );
};
