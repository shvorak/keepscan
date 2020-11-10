using System;
using System.Collections;
using System.Collections.Generic;
using KeepSpy.Shared.Domain;

namespace KeepSpy.Domain
{
    public class Network: HasId<Guid>
    {

        /// <summary>
        /// Network name
        /// </summary>
        public string Name { get; set; }

        public NetworkKind Kind { get; set; }

        public bool IsTestnet { get; set; }
        
        public uint LastBlock { get; set; }
        public uint? LastBlockProcessed { get; set; }

        public DateTime LastBlockAt { get; set; }

        public ICollection<Contract> Contracts { get; set; }
        
    }
}