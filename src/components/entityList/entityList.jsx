import React, { useEffect, useState } from 'react';
import { getEntities, createEntity, updateEntity, deleteEntity } from '../../services/api';

const EntityList = () => {
  const [entities, setEntities] = useState([]);
  const [newEntity, setNewEntity] = useState({ name: '', description: '' });
  const [editEntity, setEditEntity] = useState(null);

  useEffect(() => {
    fetchEntities();
  }, []);

  const fetchEntities = async () => {
    try {
      const response = await getEntities();
      setEntities(response.data);
    } catch (error) {
      console.error('Error al obtener entidades:', error);
    }
  };

  const handleAddEntity = async () => {
    try {
        const entity = {
            name: newEntity.name.trim(),
            description: newEntity.description.trim(),
            employees: [], // Asegurarte de enviar esto como un array vacío
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

  return (
    <div>
      <h2>Listado de Entidades</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
        {entities.map((entity) => (
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

      <div>
        <h3>{editEntity ? 'Editar Entidad' : 'Añadir Entidad'}</h3>
        <input
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
          type="text"
          placeholder="Descripción"
          value={editEntity ? editEntity.description : newEntity.description}
          onChange={(e) =>
            editEntity
              ? setEditEntity({ ...editEntity, description: e.target.value })
              : setNewEntity({ ...newEntity, description: e.target.value })
          }
        />
        <button onClick={editEntity ? handleEditEntity : handleAddEntity}>
          {editEntity ? 'Guardar Cambios' : 'Añadir'}
        </button>
        {editEntity && <button onClick={() => setEditEntity(null)}>Cancelar</button>}
      </div>
    </div>
  );
};

export default EntityList;
