using System;

namespace KeepSpy.Models
{
    public class OperationStat
    {
        public DateTime Date { get; set; }

        public int RedeemsCount { get; set; }
        public decimal RedeemsVolume { get; set; }

        public int DepositsCount { get; set; }
        public decimal DepositsVolume { get; set; }
    }
}