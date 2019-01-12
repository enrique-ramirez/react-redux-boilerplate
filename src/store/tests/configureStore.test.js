import configureStore from 'store/configureStore'
import createHistory from 'history/createMemoryHistory'

describe('configureStore', () => {
  let history

  beforeEach(() => {
    history = createHistory()
  })

  it('should be able to create a store with initial state', () => {
    history.push('/home')

    const store = configureStore({
      resources: {
        languageProvider: { language: 'fr' },
      },
    }, history)

    expect(store.getState().getIn(['resources', 'languageProvider', 'language'])).toEqual('fr')
    expect(store.getState().getIn(['router', 'location', 'pathname'])).toEqual('/home')
  })

  it('should call window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__', () => {
    const compose = jest.fn()

    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = () => compose
    configureStore({}, history)

    expect(compose).toHaveBeenCalled()
  })

  it('should create a store with a default initial values', () => {
    const store = configureStore()

    expect(store.getState().getIn(['resources', 'languageProvider', 'language'])).toEqual('en')
    expect(store.getState().getIn(['router', 'location', 'pathname'])).toEqual('/')
  })
})
