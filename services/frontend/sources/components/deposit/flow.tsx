import { buildStatuses } from 'entities/Deposit/helpers'
import { Workflow, WorkflowStep } from 'uikit/display/workflow'
import { isErrorStatus } from 'entities/Deposit/specs'
import React from 'react'
import { DepositStatus } from 'entities/Deposit/constants'

const DepositSuccessStatuses = [
    DepositStatus.InitiatingDeposit,
    DepositStatus.WaitingForBtc,
    DepositStatus.BtcReceived,
    DepositStatus.SubmittingProof,
    DepositStatus.ApprovingTdtSpendLimit,
    DepositStatus.Minted,
]
export const DepositFlow = ({ deposit }) => {
    const statuses = buildStatuses(DepositSuccessStatuses, deposit.transactions || []).map((status) => (
        <WorkflowStep key={status} completed={deposit.status >= status} />
    ))

    const state = isErrorStatus(deposit.status) ? 'warning' : 'success'
    return <Workflow state={state}>{statuses}</Workflow>
}
