using System;
using System.Collections.Generic;
using System.Text;

namespace KeepSpy.Domain
{
	public enum DepositStatus
	{
		GettingBtcAddress,
		BtcAddressGenerated,
		BtcReceived,
		SubmittingProof,
		ApprovingTdtSpendLimit,
		Minted
	}
}
