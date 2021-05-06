using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace KeepSpy.App.Blockstream
{
    public class Client
    {
        private ILogger<Client> _logger;
        private HttpClient _client;

        public Client(HttpClient client, ILogger<Client> logger)
        {
            _client = client;
            _logger = logger;
        }

        T GetResult<T>(string path)
        {
            try
            {
                var response = _client.GetAsync(path)
                    .ConfigureAwait(false).GetAwaiter().GetResult();

                var content = response.Content.ReadAsStringAsync()
                    .ConfigureAwait(false).GetAwaiter().GetResult();

                if (!response.IsSuccessStatusCode)
                    throw new HttpRequestException(
                        $"Request to {path} failed with code {response.StatusCode} and response:\n\n{content}");

                try
                {
                    return JsonSerializer.Deserialize<T>(content);
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "Failed to deserialize response content into {0}:\\n\\n{1}", nameof(T),
                        content);
                    throw;
                }
            }
            catch (HttpRequestException e)
            {
                _logger.LogError(e, "Failed to make request to {0}", path);
                throw;
            }
        }

        public Block[] GetBlocks()
        {
            return GetResult<Block[]>("blocks/tip");
        }

        public Address GetAddress(string addr)
        {
            return GetResult<Address>($"address/{addr}");
        }

        public Tx[] GetTxs(string addr)
        {
            return GetResult<Tx[]>($"address/{addr}/txs");
        }
    }
}