using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Activity Activity {get; set;}
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler (DataContext context) {
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity); //entity framework tracks the fact that we add the activity to the memory, Ist not added to db therefore no noeed to async
                await _context.SaveChangesAsync();
                
                return Unit.Value ;
             }
        }
    }
}