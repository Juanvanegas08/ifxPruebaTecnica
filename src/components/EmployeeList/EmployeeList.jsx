import React, { useEffect, useState } from "react";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEntities,
} from "../../services/api";

import "../EmployeeList/EmployeeList.css"; 

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [entities, setEntities] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    position: "",
    entityId: "",
  });
  const [editEmployee, setEditEmployee] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 4; 

  useEffect(() => {
    fetchEmployees();
    fetchEntities();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Error al cargar los empleados.");
    }
  };

  const fetchEntities = async () => {
    try {
      const response = await getEntities();
      setEntities(response.data);
    } catch (error) {
      setErrorMessage("Error al cargar las entidades.");
    }
  };

  const handleAddEmployee = async () => {
    try {
      if (!newEmployee.entityId) {
        setErrorMessage("Debe seleccionar una entidad.");
        return;
      }
      await createEmployee(newEmployee);
      setNewEmployee({ name: "", position: "", entityId: "" });
      fetchEmployees();
    } catch (error) {
      setErrorMessage("Error al añadir empleado.");
    }
  };

  const handleEditEmployee = async () => {
    try {
      if (!editEmployee.entityId) {
        setErrorMessage("Debe seleccionar una entidad.");
        return;
      }
      await updateEmployee(editEmployee.id, editEmployee);
      setEditEmployee(null);
      fetchEmployees();
    } catch (error) {
      setErrorMessage("Error al editar empleado.");
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await deleteEmployee(id);
      fetchEmployees();
    } catch (error) {
      setErrorMessage("Error al eliminar empleado.");
    }
  };

  // Lógica para paginación: calcular los registros de la página actual
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentEmployees = employees.slice(indexOfFirstRecord, indexOfLastRecord);

  // Cambiar la página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular el número de páginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(employees.length / recordsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div >

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div >
        <h3>{editEmployee ? "Editar Empleado" : "Añadir Empleado"}</h3>
      <div >
      <input
      className="inputsEmployee"
          type="text"
          placeholder="Nombre"
          value={editEmployee ? editEmployee.name : newEmployee.name}
          onChange={(e) =>
            editEmployee
              ? setEditEmployee({ ...editEmployee, name: e.target.value })
              : setNewEmployee({ ...newEmployee, name: e.target.value })
          }
        />
        <input
        className="inputsEmployee"
          type="text"
          placeholder="Posición"
          value={editEmployee ? editEmployee.position : newEmployee.position}
          onChange={(e) =>
            editEmployee
              ? setEditEmployee({ ...editEmployee, position: e.target.value })
              : setNewEmployee({ ...newEmployee, position: e.target.value })
          }
        />
        <select className="inputsEmployee"
          value={editEmployee ? editEmployee.entityId : newEmployee.entityId || ""}
          onChange={(e) =>
            editEmployee
              ? setEditEmployee({ ...editEmployee, entityId: e.target.value })
              : setNewEmployee({ ...newEmployee, entityId: e.target.value })
          }
        >
          <option value="">Seleccione una entidad</option>
          {entities.map((entity) => (
            <option key={entity.id} value={entity.id}>
              {entity.name}
            </option>
          ))}
        </select>
        <button onClick={editEmployee ? handleEditEmployee : handleAddEmployee}>
          {editEmployee ? "Guardar Cambios" : "Añadir"}
        </button>
      </div>
        {editEmployee && <button onClick={() => setEditEmployee(null)}>Cancelar</button>}
      </div>

      {/* Tabla de empleados */}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Posición</th>
            <th>Entidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.position}</td>
              <td>{employee.entityName}</td>
              <td>
                <button onClick={() => setEditEmployee(employee)}>Editar</button>
                <button onClick={() => handleDeleteEmployee(employee.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => paginate(number)}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
