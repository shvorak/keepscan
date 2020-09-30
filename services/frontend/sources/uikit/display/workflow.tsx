import React, { FC } from 'react'
import styles from './workflow.css'
import { useClasses } from 'shared/hooks/styles'


type WorkflowProps = {
    state: 'success' | 'warning',
    variant?: 'redeem'
}

type WorkflowStepProps = {
    completed?: boolean
}


export const Workflow: FC<WorkflowProps> = ({children, ...props}) => {
    const className = useClasses(styles, 'workflow', props)
    return <div className={className}>{children}</div>
}

export const WorkflowStep: FC<WorkflowStepProps> = ({...props}) => {
    const className = useClasses(styles, 'workflow-step', props)
    return <div className={className} />
}
