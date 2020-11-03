import React from 'react'
import styles from './index.css'
import { DisplayLink } from 'uikit/typography/display'

export const GithubLink = ({ to }) => <DisplayLink to={to} className={styles.github} />

export const MediumLink = ({ to }) => <DisplayLink to={to} className={styles.medium} />

export const TwitterLink = ({ to }) => <DisplayLink to={to} className={styles.twitter} />
