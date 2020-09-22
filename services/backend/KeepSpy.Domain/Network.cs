using System;
using KeepSpy.Shared.Domain;

namespace KeepSpy.Domain
{
    public class Network: HasId<Guid>
    {

        public string Name { get; set; }
        
        
        
    }
}