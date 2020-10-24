namespace KeepSpy.Domain
{
	public enum RedeemStatus
	{
		Requested = 0,
		Signed = 1,
		Redeemed = 2,
		Liquidation = 3,
		Liquidated = 4,
		BtcTransferred = 5,
		OperationFailed = 6
	}
}
