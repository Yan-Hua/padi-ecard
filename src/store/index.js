import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware, { END } from 'redux-saga'
import rootReducer from '../reducers'

// if (process.env.NODE_ENV === 'development') {
//   middlewares.push(require('redux-logger').createLogger())
// }

export default function configStore () {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer, 
    compose(
      applyMiddleware(
        sagaMiddleware,
        createLogger()
      )
    )
  )
  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  return store
}