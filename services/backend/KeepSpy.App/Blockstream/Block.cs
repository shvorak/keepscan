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
    }
}
