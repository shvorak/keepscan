using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace KeepSpy.App.Services
{
    public class KeychainService
    {
        private readonly HttpClient _http;

        public KeychainService(HttpClient http)
        {
            _http = http;
        }

        public string? GetBtcAddress(string keyX, string keyY, bool isTest = true)
        {
            var network = isTest ? "testnet" : "mainnet";
            try
            {
                var address = _http.GetStringAsync($"/btc/pubkey?x={keyX}&y={keyY}&network={network}")
                    .ConfigureAwait(false)
                    .GetAwaiter()
                    .GetResult();

                return string.IsNullOrEmpty(address) ? null : address;
            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
}