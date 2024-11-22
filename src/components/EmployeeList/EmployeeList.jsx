import React, { useEffect, useState } from "react";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEntities, 
} from "../../services/api";


import "../login/login.css";


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


  useEffect(() => {
    fetchEmployees();
    fetchEntities();
  }, []);

  // Función para obtener empleados
  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data);
      console.log("Empleados obtenidos:", response.data);
      setErrorMessage(""); 
    } catch (error) {
      console.error("Error al obtener empleados:", error);
      setErrorMessage("Error al cargar los empleados.");
    }
  };

  // Función para obtener entidades
  const fetchEntities = async () => {
    try {
      const response = await getEntities();
      setEntities(response.data);
      console.log("Entidades obtenidas:", response.data);
    } catch (error) {
      console.error("Error al obtener entidades:", error);
      setErrorMessage("Error al cargar las entidades.");
    }
  };

  // Función para añadir un empleado
  const handleAddEmployee = async () => {
    try {
      if (!newEmployee.entityId) {
        setErrorMessage("Debe seleccionar una entidad.");
        return;
      }
      await createEmployee(newEmployee);
      setNewEmployee({ name: "", position: "", entityId: "" }); // Reiniciar los campos
      fetchEmployees(); 
    } catch (error) {
      console.error("Error al añadir empleado:", error.response?.data || error.message);
      setErrorMessage(
        `Error al añadir empleado: ${
          error.response?.data?.error || "Error desconocido"
        }`
      );
    }
  };

  // Función para editar un empleado
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
      console.error("Error al editar empleado:", error.response?.data || error.message);
      setErrorMessage(
        `Error al editar empleado: ${
          error.response?.data?.error || "Error desconocido"
        }`
      );
    }
  };

  // Función para eliminar un empleado
  const handleDeleteEmployee = async (id) => {
    try {
      console.log("ID del empleado a eliminar:", id);
      if (!id) {
        setErrorMessage("El ID del empleado no es válido.");
        return;
      }
      await deleteEmployee(id);
      fetchEmployees();
    } catch (error) {
      console.error("Error al eliminar empleado:", error.response?.data || error.message);
      setErrorMessage(
        `Error al eliminar empleado: ${
          error.response?.data?.error || "Error desconocido"
        }`
      );
    }
  };

  return (
    <div>
      <h2>Listado de Empleados</h2>
      <div>
        <h3>{editEmployee ? "Editar Empleado" : "Añadir Empleado"}</h3>
        <input
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
          type="text"
          placeholder="Posición"
          value={editEmployee ? editEmployee.position : newEmployee.position}
          onChange={(e) =>
            editEmployee
              ? setEditEmployee({ ...editEmployee, position: e.target.value })
              : setNewEmployee({ ...newEmployee, position: e.target.value })
          }
        />
        <select
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
        {editEmployee && (
          <button onClick={() => setEditEmployee(null)}>Cancelar</button>
        )}
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <table border="1">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Posición</th>
            <th>Entidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
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

     
    </div>
  );
};

export default EmployeeList;
