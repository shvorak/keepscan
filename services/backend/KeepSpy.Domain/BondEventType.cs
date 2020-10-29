using System;
using System.Collections.Generic;
using System.Text;

namespace KeepSpy.Domain
{
	public enum BondEventType
	{
		UnbondedValueDeposited,
		UnbondedValueWithdrawn,
		BondSeized,
		BondReassigned,
		BondCreated,
		BondReleased
	}
}
