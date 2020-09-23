using System;
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

        public DateTime LastBlockAt { get; set; }
        
    }
}