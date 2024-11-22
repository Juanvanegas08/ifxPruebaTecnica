using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson; // Asegurar referencia
using EntitiesManagementAPI.Models;
using EntitiesManagementAPI.Services;

namespace EntitiesManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeeService _employeeService;

        public EmployeesController(EmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        // Obtener todos los empleados con información de sus entidades
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAllWithEntities()
        {
            var employees = await _employeeService.GetAllWithEntitiesAsync();

            // Opcional: Filtrar información de las entidades
            var result = employees.Select(e => new
            {
                e.Id,
                e.Name,
                e.Position,
                e.EntityId,
                e.EntityName,
            });
            Console.WriteLine(result);

            return Ok(result);
        }


        // Obtener detalles de un empleado por ID
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            if (!ObjectId.TryParse(id, out _))
                return BadRequest(new { error = "El ID proporcionado no es un ObjectId válido." });

            var employee = await _employeeService.GetByIdAsync(id);
            if (employee == null)
                return NotFound(new { error = $"El empleado con ID '{id}' no fue encontrado." });

            return Ok(employee);
        }

        // Crear un nuevo empleado
        [Authorize(Roles = "Administrator")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Employee employee)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _employeeService.CreateAsync(employee);
                return CreatedAtAction(nameof(GetById), new { id = employee.Id }, employee);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        // Actualizar un empleado existente
        [Authorize(Roles = "Administrator")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] Employee employee)
        {
            if (!ObjectId.TryParse(id, out _))
                return BadRequest(new { error = "El ID proporcionado no es un ObjectId válido." });

            var existingEmployee = await _employeeService.GetByIdAsync(id);
            if (existingEmployee == null)
                return NotFound(new { error = $"El empleado con ID '{id}' no fue encontrado." });

            await _employeeService.UpdateAsync(id, employee);
            return NoContent();
        }

        // Eliminar un empleado por ID
        [Authorize(Roles = "Administrator")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            if (!ObjectId.TryParse(id, out _))
                return BadRequest(new { error = "El ID proporcionado no es un ObjectId válido." });

            var existingEmployee = await _employeeService.GetByIdAsync(id);
            if (existingEmployee == null)
                return NotFound(new { error = $"El empleado con ID '{id}' no fue encontrado." });

            await _employeeService.DeleteAsync(id);
            return NoContent();
        }
    }
}
