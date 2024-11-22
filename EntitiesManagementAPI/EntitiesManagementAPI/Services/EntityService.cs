using Microsoft.Extensions.Options;
using MongoDB.Driver;
using EntitiesManagementAPI.Models;

namespace EntitiesManagementAPI.Services
{
    public class EntityService
    {
        private readonly IMongoCollection<Entity> _entities;

        public EntityService(IOptions<MongoDBSettings> settings, IMongoClient client)
        {
            var database = client.GetDatabase(settings.Value.DatabaseName);
            _entities = database.GetCollection<Entity>("Entities");
        }

        public async Task<List<Entity>> GetAllAsync()
        {
            var entities = await _entities.Find(entity => true).ToListAsync();
            foreach (var entity in entities)
            {
                entity.Employees = entity.Employees.Where(e => e.Name != null && e.Position != null).ToList();
            }
            return entities;
        }


        public async Task<Entity> GetByIdAsync(string id) =>
            await _entities.Find(entity => entity.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Entity entity)
        {
            await _entities.InsertOneAsync(entity);
        }


        public async Task UpdateAsync(string id, Entity entity) =>
            await _entities.ReplaceOneAsync(e => e.Id == id, entity);

        public async Task DeleteAsync(string id) =>
            await _entities.DeleteOneAsync(e => e.Id == id);
    }
}
