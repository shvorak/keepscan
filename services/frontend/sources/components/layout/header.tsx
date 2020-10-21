import React, { Children, cloneElement, FC, useCallback, useMemo, useState } from 'react'
import styles from './header.less'
import { ENV_CONFIG } from '~/application/env'
import { Link, NavLink } from 'react-router-dom'
import { DisplayLink } from 'uikit/typography/display'
import styled from 'uikit/styled'
import { Drawer } from 'uikit/overlay/drawer'
import { CloseSymbol } from 'uikit/symbol'

type HeaderProps = {
    opened?: boolean
    onOpen?: any
}

export const Header: FC<HeaderProps> = ({ children, ...props }) => {
    return (
        <div className={styles.headline} {...props}>
            <Logo />
            <Menu>
                <MenuItem to="/" exact>
                    Dashboard
                </MenuItem>
                <MenuItem to="/deposits">Deposits</MenuItem>
                <MenuItem to="/redeems">Redeems</MenuItem>
                <MenuItem to="/initiators">Initiators</MenuItem>
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

const Menu = ({ children }) => {
    const [opened, setOpened] = useState(false)

    const onOpen = useCallback(() => {
        setOpened((open) => !open)
    }, [])

    const onClose = useCallback(() => {
        setOpened(false)
    }, [])

    return (
        <div className={styles.menu}>
            <Drawer opened={opened} placement="right" className={styles.drawer} onClose={onClose}>
                <MenuDrawer onClose={onClose}>{children}</MenuDrawer>
            </Drawer>
            <MenuBurger onClick={onOpen} />
            <div className={styles.menu__items}>{children}</div>
        </div>
    )
}

const MenuItem = ({ to, exact = false, children }) => (
    <NavLink to={to} exact={exact}>
        {children}
    </NavLink>
)

export const MenuBurger = ({ ...props }) => {
    return (
        <div className={styles.menu__burger} {...props}>
            <span />
        </div>
    )
}

const MenuDrawer = ({ children, onClose }) => {
    const onClickCapture = useCallback(() => {
        onClose()
    }, [onClose])

    const items = useMemo(() => {
        return Children.map(children, (element) => {
            return cloneElement(element, { onClickCapture })
        })
    }, [children])

    return (
        <div className={styles.drawer__menu} onClick={onClickCapture}>
            <div className={styles.drawer__closer}>
                <span onClick={onClose}>
                    <CloseSymbol />
                </span>
            </div>
            {items}
        </div>
    )
}

export const MenuOverlay = styled('div', styles, 'menu__overlay')
