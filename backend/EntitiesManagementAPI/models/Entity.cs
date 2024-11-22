using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations; // Agregar este using

namespace EntitiesManagementAPI.Models
{
    public class Entity
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; } // Cambiar a nullable

        [Required(ErrorMessage = "El nombre es obligatorio.")]
        [MinLength(3, ErrorMessage = "El nombre debe tener al menos 3 caracteres.")]
        public string Name { get; set; } = null!;

        [Required(ErrorMessage = "La descripción es obligatoria.")]
        public string Description { get; set; } = null!;

        public List<Employee> Employees { get; set; } = new List<Employee>();
    }
}