import configureStore from 'store/configureStore'
import createHistory from 'history/createBrowserHistory'

describe('configureStore', () => {
  const history = createHistory()

  it('should be able to create a store with initial state', () => {
    const store = configureStore({
      resources: {
        languageProvider: { language: 'fr' },
      },
    }, history)

    expect(store.getState().getIn(['resources', 'languageProvider', 'language'])).toEqual('fr')
  })

  it('should call window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__', () => {
    const compose = jest.fn()

    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = () => compose
    configureStore({}, history)

    expect(compose).toHaveBeenCalled()
  })
})
