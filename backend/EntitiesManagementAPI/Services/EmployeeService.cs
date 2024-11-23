using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using EntitiesManagementAPI.Models;

namespace EntitiesManagementAPI.Services
{
    public class EmployeeService
    {
        private readonly IMongoCollection<Employee> _employees;

        public EmployeeService(IOptions<MongoDBSettings> settings, IMongoClient client)
        {
            var database = client.GetDatabase(settings.Value.DatabaseName);
            _employees = database.GetCollection<Employee>("Employees");
        }


        public async Task<List<EmployeeWithEntity>> GetAllWithEntitiesAsync()
{
    var pipeline = new[]
    {
        // Convierte `entityId` a ObjectId
        new BsonDocument
        {
            { "$addFields", new BsonDocument
                {
                    { "entityIdObjectId", new BsonDocument("$toObjectId", "$entityId") }
                }
            }
        },
        new BsonDocument
        {
            { "$lookup", new BsonDocument
                {
                    { "from", "Entities" },
                    { "localField", "entityIdObjectId" },
                    { "foreignField", "_id" },
                    { "as", "entity" }
                }
            }
        },
        // Descomprime el resultado del $lookup
        new BsonDocument
        {
            { "$unwind", new BsonDocument
                {
                    { "path", "$entity" },
                    { "preserveNullAndEmptyArrays", true } 
                }
            }
        },
        // Proyecta los campos requeridos
        new BsonDocument
        {
            { "$project", new BsonDocument
                {
                    { "_id", new BsonDocument("$toString", "$_id") },
                    { "name", 1 },
                    { "position", 1 },
                    { "entityId", new BsonDocument("$toString", "$entityId") }, 
                    { "entityName", new BsonDocument
                        {
                            { "$ifNull", new BsonArray { "$entity.Name", "Sin Entidad" } }
                        }
                    }
                }
            }
        }
    };

    try
    {
        return await _employees.Aggregate<EmployeeWithEntity>(pipeline).ToListAsync();
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error en GetAllWithEntitiesAsync: {ex.Message}");
        throw;
    }
}


        // Obtener todos los empleados
        public async Task<List<Employee>> GetAllAsync() =>
            await _employees.Find(employee => true).ToListAsync();

        // Obtener un empleado por ID
        public async Task<Employee> GetByIdAsync(string id)
{
    if (!ObjectId.TryParse(id, out var objectId))
    {
        throw new FormatException($"'{id}' is not a valid 24 digit hex string.");
    }

    return await _employees.Find(e => e.Id == objectId.ToString()).FirstOrDefaultAsync();
}
        // Crear un empleado
        public async Task CreateAsync(Employee employee)
        {
            await _employees.InsertOneAsync(employee);
        }

    public async Task UpdateAsync(string id, Employee employee)
{
    if (!ObjectId.TryParse(id, out var objectId))
    {
        throw new FormatException($"'{id}' is not a valid 24 digit hex string.");
    }

    employee.Id = objectId.ToString();
    await _employees.ReplaceOneAsync(e => e.Id == objectId.ToString(), employee);
}
        // Eliminar un empleado por ID
       public async Task DeleteAsync(string id)
{
    if (!ObjectId.TryParse(id, out var objectId))
    {
        throw new FormatException($"'{id}' is not a valid 24 digit hex string.");
    }

    await _employees.DeleteOneAsync(e => e.Id == objectId.ToString());
}
    }
}
