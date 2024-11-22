import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/login';
import EntityList from './components/entityList/entityList';
import EmployeeList from './components/EmployeeList/EmployeeList';
import Home from './components/Home/home';

const App = () => {
  const [token, setToken] = useState(null);

  const handleLogin = (newToken) => {
    console.log('Token recibido:', newToken);
    setToken(newToken);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/entities" element={<EntityList />} />
          {/* Ruta para mostrar todos los empleados */}
          <Route path="/employees" element={<EmployeeList />} />
          {/* Ruta para mostrar empleados de una entidad específica */}
          <Route path="/employees/:entityId" element={<EmployeeList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
