using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace EntitiesManagementAPI.Models
{
    public class EmployeeWithEntity
    {
        [BsonElement("_id")]
        public string Id { get; set; } = null!;

        [BsonElement("name")]
        public string Name { get; set; } = null!;

        [BsonElement("position")]
        public string Position { get; set; } = null!;

        // Permitir que EntityId sea nullable
        [BsonRepresentation(BsonType.ObjectId)] 
        [BsonElement("entityId")]
        public ObjectId? EntityId { get; set; } // Cambié a nullable (ObjectId?)
        
        [BsonElement("entityName")]
        public string EntityName { get; set; } = "Sin Entidad";

        // Información completa de la entidad
        [BsonElement("entityDetails")]
        public object? EntityDetails { get; set; }
    }
}
