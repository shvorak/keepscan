import React from 'react'
import styles from './index.css'
import { DisplayLink } from 'uikit/typography/display'


export const GithubLink = ({to}) => {
    return <DisplayLink to={to} className={styles.link} />
}
