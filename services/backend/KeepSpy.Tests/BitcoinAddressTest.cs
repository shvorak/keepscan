using System;
using System.Text;
using NBitcoin;
using NBitcoin.DataEncoders;
using Xunit;

namespace KeepSpy.Tests
{
    public class BitcoinAddressTest
    {
        [Theory]
        [InlineData(
            "4afe0fabb6b909a0ea57ca7161266e4611fdfba259937731d109d2d3be8e7ef5",
            "171e01f24a3ac9f3832bcfe047e2e4dac8d5733d086cd95a752a678d1cd3c0db",
            "tb1q5d0ycc3588tr7kw52xlu37sq0q66jaj483y0tu"
        )]
        [InlineData(
            "bbbcfa8d345d86159a3e1e0f759c9d98d34e6fbddc415c1aa64394bfcb6524fe",
            "ef4ec8ed0a50df4a2c540e7065320fba4635ca05c11f0f29266e35fc89d762cd",
            "tb1qktz76vxl9nwxknqev593msw0d7ava0wkfjj3xd"
        )]
        public void GetAddressFromPublicKeys(string x, string y, string expected)
        {
            var key = Encoders.Hex.DecodeData("03" + x);
            
            var address = new PubKey(key).GetAddress(ScriptPubKeyType.Segwit, Network.TestNet).ToString();
            
            Assert.Equal(address, expected);
        }
    }
}