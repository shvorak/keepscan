using System;
using KeepSpy.Shared.Domain;

namespace KeepSpy.Domain
{
    public class Contract: HasId<string>
    {
        public string Name { get; set; }

        public bool Active { get; set; }

        public Network Network { get; set; }

        public Guid NetworkId { get; set; }
    }
}