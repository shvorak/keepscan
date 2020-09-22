import './reset.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './application/app'
import { BrowserRouter } from 'react-router-dom'

function render(Component) {
    ReactDOM.render(
       <BrowserRouter>
            <Component />
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
