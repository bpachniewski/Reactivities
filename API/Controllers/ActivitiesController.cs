

using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly DataContext _context;
        public ActivitiesController(DataContext context)
        {
            _context = context;
            
        }

        [HttpGet] //api/activities
        public async Task<ActionResult<List<Activity>>> GetActivites()
        {
            return await _context.Activities.ToListAsync();  
        }

        [HttpGet("{id}")] //api/activities/SDqsdmkwkdk1wje12kS

        public async Task<ActionResult<Activity>> GetActicity(Guid id)
        {
            return await _context.Activities.FindAsync(id);
        }

    }
}