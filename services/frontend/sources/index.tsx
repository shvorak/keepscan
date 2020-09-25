import './reset.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './application/app'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '~/store'

function render(Component) {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <Component />
            </Provider>
        </BrowserRouter>,
        document.getElementById('app')
    )
}

if (module.hot) {
    module.hot.accept('./application/app.tsx', () => {
        return render(require('./application/app').App)
    })
}

render(App)
