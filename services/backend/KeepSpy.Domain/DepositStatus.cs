using System;
using System.Collections.Generic;
using System.Text;

namespace KeepSpy.Domain
{
	public enum DepositStatus
	{
		GettingBtcAddress,
		BtcAddresGenerated,
		BtcReceived,
		SubmittingProof,
		ApprovingTdtSpendLimit,
		Minted
	}
}
