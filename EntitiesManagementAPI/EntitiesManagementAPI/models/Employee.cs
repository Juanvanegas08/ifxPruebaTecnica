using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace EntitiesManagementAPI.Models
{
    public class Employee
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("name")]
        [Required(ErrorMessage = "El nombre del empleado es obligatorio")]
        public string Name { get; set; } = null!;

        [BsonElement("position")]
        [Required(ErrorMessage = "La posición del empleado es obligatoria")]
        public string Position { get; set; } = null!;

        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("entityId")]
        public string? EntityId { get; set; }
    }
}
