using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KeepSpy.App.Blockstream
{
    public class Utxo
    {
        public string txid { get; set; }
        public int vout { get; set; }
        public Status status { get; set; }
        public int value { get; set; }
    }
}
