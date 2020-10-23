import React from 'react'
import { Amount } from 'uikit/crypto/amount'
import { Number } from 'uikit/display/number'
import { Address } from 'uikit/crypto/address'
import { DateTime, DateTimeDistance } from 'uikit/display/datetime'

export const amount = ({ value, currency, precision = 10 }) => (
    <Amount value={value} currency={currency} precision={precision} className={null} />
)
export const number = ({ value, precision }) => <Number value={value} precision={precision} />
export const address = ({ value, color }) => <Address value={value} color={color} full />
export const datetime = ({ value }) => <DateTime value={value} />
export const datetimeDistance = ({ value }) => <DateTimeDistance value={value} withSuffix={false} />
