using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EntitiesManagementAPI.Models;
using EntitiesManagementAPI.Services;

namespace EntitiesManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntitiesController : ControllerBase
    {
        private readonly EntityService _entityService;

        public EntitiesController(EntityService entityService)
        {
            _entityService = entityService;
        }

        // Obtener todas las entidades
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var entities = await _entityService.GetAllAsync();
            return Ok(entities);
        }

        // Obtener detalles de una entidad
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var entity = await _entityService.GetByIdAsync(id);
            if (entity == null)
                return NotFound(new { error = $"La entidad con ID '{id}' no fue encontrada." });

            return Ok(entity);
        }

        // Crear una nueva entidad
        [Authorize(Roles = "Administrator")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Entity entity)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _entityService.CreateAsync(entity);
                return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        // Actualizar una entidad existente
        [Authorize(Roles = "Administrator")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] Entity entity)
        {
            var existingEntity = await _entityService.GetByIdAsync(id);
            if (existingEntity == null)
                return NotFound(new { error = $"La entidad con ID '{id}' no fue encontrada." });

            await _entityService.UpdateAsync(id, entity);
            return NoContent();
        }

        // Eliminar una entidad por ID
        [Authorize(Roles = "Administrator")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var existingEntity = await _entityService.GetByIdAsync(id);
            if (existingEntity == null)
                return NotFound(new { error = $"La entidad con ID '{id}' no fue encontrada." });

            await _entityService.DeleteAsync(id);
            return NoContent();
        }
    }
}
