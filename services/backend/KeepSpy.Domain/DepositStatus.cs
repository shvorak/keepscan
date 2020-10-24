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
		Closed,
		SetupFailed
	}
}
