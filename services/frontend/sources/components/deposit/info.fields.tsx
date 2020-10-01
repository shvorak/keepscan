import React from 'react'
import { DateTime } from 'uikit/display/datetime'
import { Address } from 'uikit/crypto/address'
import { Amount } from 'uikit/crypto/amount'

export const amount = ({ value }) => <Amount value={value} precision={10} />
export const address = ({ value, color }) => <Address value={value} color={color} full />
export const datetime = ({ value }) => <DateTime value={value} />
