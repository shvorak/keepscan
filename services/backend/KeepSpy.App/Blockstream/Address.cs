using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KeepSpy.App.Blockstream
{
    public class ChainStats
    {
        public int funded_txo_count { get; set; }
        public int funded_txo_sum { get; set; }
        public int spent_txo_count { get; set; }
        public int spent_txo_sum { get; set; }
        public int tx_count { get; set; }
    }

    public class MempoolStats
    {
        public int funded_txo_count { get; set; }
        public int funded_txo_sum { get; set; }
        public int spent_txo_count { get; set; }
        public int spent_txo_sum { get; set; }
        public int tx_count { get; set; }
    }

    public class Address
    {
        public string address { get; set; }
        public ChainStats chain_stats { get; set; }
        public MempoolStats mempool_stats { get; set; }
    }
}
