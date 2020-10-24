namespace KeepSpy.Domain
{
	public enum DepositStatus
	{
		InitiatingDeposit = 0,
		WaitingForBtc = 1,
		BtcReceived = 2,
		SubmittingProof = 3,
		ApprovingSpendLimit = 4,
		Minted = 5,
		Closed = 6,
		SetupFailed = 7
	}
}
