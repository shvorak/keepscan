using System;

namespace KeepSpy.Models
{
    public class OperationDto
    {
        public string Tdt { get; set; }
        
        public string Type { get; set; }

        public string SenderAddress { get; set; }
        public string? BitcoinAddress { get; set; }

        public uint Status { get; set; }

        public decimal LotSize { get; set; }

        public OperationTxDto[] Transactions { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class OperationTxDto
    {
        public int Status { get; set; }
        
        public DateTime Timestamp { get; set; }
    }
}