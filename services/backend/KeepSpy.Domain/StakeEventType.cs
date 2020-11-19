using System;
using System.Collections.Generic;
using System.Text;

namespace KeepSpy.Domain
{
    public enum StakeEventType
    {
        StakeDelegated,
        OperatorStaked,
        StakeOwnershipTransferred,
        TopUpInitiated,
        TopUpCompleted,
        Undelegated,
        RecoveredStake,
        TokensSlashed,
        TokensSeized,
        StakeLocked,
        LockReleased,
        ExpiredLockReleased
    }
}
