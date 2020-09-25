using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KeepSpy.App.Blockstream
{
	public class Block
	{
        public string id { get; set; }
        public uint height { get; set; }
        public int version { get; set; }
        public int timestamp { get; set; }
        public int tx_count { get; set; }
        public int size { get; set; }
        public int weight { get; set; }
        public string merkle_root { get; set; }
        public string previousblockhash { get; set; }
        public object nonce { get; set; }
        public int bits { get; set; }
        public int difficulty { get; set; }
    }
}
