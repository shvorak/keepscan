import React, { useMemo } from 'react'
import { workflowFactory } from 'entities/Redeem/helpers'
import { Workflow, WorkflowStep } from 'uikit/display/workflow'
import { isErrorStatus } from 'entities/Redeem/specs'

export const RedeemFlow = ({ redeem }) => {
    const states = useMemo(() => {
        return workflowFactory(redeem)
    }, [redeem])

    const stages = useMemo(() => {
        return states.map((status) => (
            <WorkflowStep key={status} completed={states.indexOf(redeem.status) >= states.indexOf(status)} />
        ))
    }, [redeem, states])

    const state = isErrorStatus(redeem.status) ? 'warning' : 'success'

    return (
        <Workflow state={state} variant="redeem">
            {stages}
        </Workflow>
    )
}
