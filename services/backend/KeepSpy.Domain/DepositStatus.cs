using System;
using System.Collections.Generic;
using System.Text;

namespace KeepSpy.Domain
{
	public enum DepositStatus
	{
		InitiatingDeposit,
		WaitingForBtc,
		BtcReceived,
		SubmittingProof,
		ApprovingSpendLimit,
		Minted,
		Redeemed,
		SetupFailed,
		Liquidated
	}
}
