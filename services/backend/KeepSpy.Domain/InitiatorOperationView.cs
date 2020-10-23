using System;

namespace KeepSpy.Domain
{
    public class InitiatorOperationView
    {
        public string Tdt { get; set; }
        
        public string Type { get; set; }

        public string SenderAddress { get; set; }
        public string? BitcoinAddress { get; set; }

        public uint Status { get; set; }

        public decimal LotSize { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}