using System;

namespace KeepSpy.Models
{
    public class SupplyStat
    {
        public DateTime Date { get; set; }

        public decimal Supply { get; set; }
        
        public decimal Minted { get; set; }
    }
}