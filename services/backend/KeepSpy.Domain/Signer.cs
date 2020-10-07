using System;
using System.Collections.Generic;
using KeepSpy.Shared.Domain;

namespace KeepSpy.Domain
{
	public class Signer : HasId<string>
	{
		public ICollection<DepositSigner> Deposits { get; set; }
	}
}
