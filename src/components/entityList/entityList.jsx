import React, { useEffect, useState } from 'react';
import { getEntities, createEntity, updateEntity, deleteEntity } from '../../services/api';
import '../EmployeeList/EmployeeList.css'; // Asegúrate de que este archivo esté bien importado

const EntityList = () => {
  const [entities, setEntities] = useState([]);
  const [newEntity, setNewEntity] = useState({ name: '', description: '' });
  const [editEntity, setEditEntity] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 4; // Mostrar solo 4 registros por página

  useEffect(() => {
    fetchEntities();
  }, []);

  const fetchEntities = async () => {
    try {
      const response = await getEntities();
      setEntities(response.data);
    } catch (error) {
      setErrorMessage("Error al cargar las entidades.");
    }
  };

  const handleAddEntity = async () => {
    try {
      const entity = {
        name: newEntity.name.trim(),
        description: newEntity.description.trim(),
        employees: [], // Asegúrate de enviar esto como un array vacío
      };

      console.log("Entidad enviada:", entity);
      await createEntity(entity);
      setNewEntity({ name: '', description: '' }); // Limpia los campos después de añadir
      fetchEntities(); // Refresca el listado de entidades
    } catch (error) {
      console.error('Error al añadir entidad:', error.response?.data || error.message);
    }
  };

  const handleEditEntity = async () => {
    try {
      if (editEntity) {
        await updateEntity(editEntity.id, editEntity);
        setEditEntity(null);
        fetchEntities();
      }
    } catch (error) {
      console.error('Error al editar entidad:', error);
    }
  };

  const handleDeleteEntity = async (id) => {
    try {
      await deleteEntity(id);
      fetchEntities();
    } catch (error) {
      console.error('Error al eliminar entidad:', error);
    }
  };

  // Lógica para paginación: calcular los registros de la página actual
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentEntities = entities.slice(indexOfFirstRecord, indexOfLastRecord);

  // Cambiar la página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular el número de páginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(entities.length / recordsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="table-container">
    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <div>
        <h3>{editEntity ? "Editar Entidad" : "Añadir Entidad"}</h3>
        <form>
          <div className="form-row">
            <input
              className="inputsEmployee"
              type="text"
              placeholder="Nombre"
              value={editEntity ? editEntity.name : newEntity.name}
              onChange={(e) =>
                editEntity
                  ? setEditEntity({ ...editEntity, name: e.target.value })
                  : setNewEntity({ ...newEntity, name: e.target.value })
              }
            />
            <input
              className="inputsEmployee"
              type="text"
              placeholder="Descripción"
              value={editEntity ? editEntity.description : newEntity.description}
              onChange={(e) =>
                editEntity
                  ? setEditEntity({ ...editEntity, description: e.target.value })
                  : setNewEntity({ ...newEntity, description: e.target.value })
              }
            />
            <button className="btn-add" onClick={editEntity ? handleEditEntity : handleAddEntity}>
              {editEntity ? "Guardar Cambios" : "Añadir"}
            </button>
          </div>
          {editEntity && (
            <button className="btn-cancel" onClick={() => setEditEntity(null)}>
              Cancelar
            </button>
          )}
        </form>
      </div>

      {/* Tabla de entidades */}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentEntities.map((entity) => (
            <tr key={entity.id}>
              <td>{entity.name}</td>
              <td>{entity.description}</td>
              <td>
                <button onClick={() => setEditEntity(entity)}>Editar</button>
                <button onClick={() => handleDeleteEntity(entity.id)}>Eliminar</button>
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

export default EntityList;
