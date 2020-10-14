using System;
using System.Collections.Generic;
using System.Text;

namespace KeepSpy.Domain
{
	public class CurrencyRate
	{
		public DateTime Timestamp { get; set; }
		public TradePair TradePair { get; set; }
		public decimal Value { get; set; }
		public CurrencyRateSource Source { get; set; }
	}
}
