import React from 'react'
import './App.css';
import Main from './components/Main'
import Page from './components/Page'

import { Route } from 'react-router-dom'

function App(props) {
  debugger

  return (
    <div className="App">
      <Route
        exact path='/'
        render={() => <Main
          dispatch={props.dispatch}
          main={props.state.main}
        />}
      />
      <Route
        path='/search'
        render={() => <Main
          dispatch={props.dispatch}
          main={props.state.main}
        />}
      />
      <Route
        exact path={props.state.page.lastGetUrl}
        render={() => <Page
          dispatch={props.dispatch}
          page={props.state.page}
        />
        }
      />
    </div>
  )
}

export default App