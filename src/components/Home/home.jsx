import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import "../Home/home.css";

// Importa las imágenes que vas a utilizar
import empleadosImg from '../../assets/img/empleados.png';
import documentacionImg from '../../assets/img/documentacion.png';
import entidadImg from '../../assets/img/entidad.png';
import manualImg from '../../assets/img/manual.png';

// Importa los componentes correspondientes
import EmployeeList from '../../components/EmployeeList/EmployeeList';
import EntityList from '../../components/entityList/entityList';

const Home = () => {
  // Estado para controlar qué contenido se debe mostrar
  const [selected, setSelected] = useState('');

  const handleSelection = (selection) => {
    setSelected(selection);
  };

  return (
    <div className='containerHome'>
      <div className="headerHome">
        <h5>PRUEBA TECNICA IFX</h5>
      </div>

      <div className="cardContainer">
        <div onClick={() => handleSelection('empleados')}>
          <img src={empleadosImg} alt="Empleados" />
        </div>
        <div onClick={() => handleSelection('entidades')}>
          <img src={entidadImg} alt="Entidades" />
        </div>
  
      </div>

      
      <div className="contentContainer">
        {selected === 'empleados' && <EmployeeList />}
        {selected === 'entidades' && <EntityList />}
      </div>
    </div>
  );
};

export default Home;
