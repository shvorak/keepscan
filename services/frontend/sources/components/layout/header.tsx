import React, { FC, useMemo } from 'react'
import styles from './header.less'
import { ENV_CONFIG } from '~/application/env'
import { Link, NavLink } from 'react-router-dom'
import { DisplayLink } from 'uikit/typography/display'

type HeaderProps = {

}

export const Header: FC<HeaderProps> = ({children, ...props}) => {
    return (
        <div className={styles.headline}>
            <Logo />
            <Menu>
                <MenuItem to="/" exact>
                    Dashboard
                </MenuItem>
                <MenuItem to="/deposits">Deposits</MenuItem>
                <MenuItem to="/redeems">Redeems</MenuItem>
                <MenuItem to="/tdt">Get TDT</MenuItem>
                {/*<MenuItem to="/api">API</MenuItem>*/}
            </Menu>
        </div>
    )
}

const Logo = () => {
    const net = useMemo(() => ENV_CONFIG[location.hostname], [])

    return (
        <div>
            <Link to="/" className={styles.logo}>
                KeepScan
            </Link>
            <DisplayLink to={net.link} title={net.label} className={styles.net}>
                {net.name}
            </DisplayLink>
        </div>
    )
}

const Menu = ({ children }) => <div className={styles.menu}>{children}</div>

const MenuItem = ({ to, exact = false, children }) => (
    <NavLink to={to} exact={exact}>
        {children}
    </NavLink>
)
