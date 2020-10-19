import React, { FC, useMemo } from 'react'
import styles from './header.less'
import { ENV_CONFIG } from '~/application/env'
import { Link, NavLink } from 'react-router-dom'
import { DisplayLink } from 'uikit/typography/display'
import styled from 'uikit/styled'

type HeaderProps = {
    opened?: boolean
    onOpen?: any
}

export const Header: FC<HeaderProps> = ({ children, opened, onOpen, ...props }) => {
    return (
        <div className={styles.headline} {...props}>
            <Logo />
            <Menu>
                <MenuBurger onClick={onOpen} />
                <MenuOverlay opened={opened}>
                    <div className={styles.content}>
                        <MenuItem to="/" exact>
                            Dashboard
                        </MenuItem>
                        <MenuItem to="/deposits">Deposits</MenuItem>
                        <MenuItem to="/redeems">Redeems</MenuItem>
                        <MenuItem to="/tdt">Get TDT</MenuItem>
                        {/*<MenuItem to="/api">API</MenuItem>*/}
                    </div>
                </MenuOverlay>
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

export const MenuBurger = ({ ...props }) => (
    <div className={styles.menu__burger} {...props}>
        <span />
    </div>
)

export const MenuOverlay = styled('div', styles, 'menu__overlay')
