using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace EntitiesManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly IMongoClient _mongoClient;

        public TestController(IMongoClient mongoClient)
        {
            _mongoClient = mongoClient;
        }

        [HttpGet("test-mongo")]
        public IActionResult TestMongoConnection()
        {
            try
            {
                var databaseNames = _mongoClient.ListDatabaseNames().ToList();
                return Ok(new
                {
                    Message = "Conexión exitosa a MongoDB",
                    Databases = databaseNames
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Message = "Error al conectar con MongoDB",
                    Error = ex.Message
                });
            }
        }
    }
}
