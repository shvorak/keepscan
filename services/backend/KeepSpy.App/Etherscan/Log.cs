﻿using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace KeepSpy.App.Etherscan
{
    public class Log
    {
        public string address { get; set; }
        public IList<string> topics { get; set; }
        public string data { get; set; }
        public string blockNumber { get; set; }
        public uint BlockNumber => uint.Parse(blockNumber.Substring(2), NumberStyles.HexNumber);
        public string timeStamp { get; set; }
        public DateTime TimeStamp => new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc).AddSeconds(ulong.Parse(timeStamp.Substring(2), NumberStyles.HexNumber));
        public string gasPrice { get; set; }
        public string gasUsed { get; set; }
        public decimal Fee => ulong.Parse(gasPrice.Substring(2), NumberStyles.HexNumber) / 1000000000000000000M * ulong.Parse(gasUsed.Substring(2), NumberStyles.HexNumber);
        public string logIndex { get; set; }
        public string transactionHash { get; set; }
        public string transactionIndex { get; set; }
    }
}
