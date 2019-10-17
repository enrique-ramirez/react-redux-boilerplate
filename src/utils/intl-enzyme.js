/**
 * Taken from:
 * https://github.com/damonbauer/egghead-bookshelf/blob/master/src/intl-enzyme.js
 */

/**
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 */

import { IntlProvider, IntlShape } from 'react-intl'
import { mount, shallow } from 'enzyme'

import en from '../i18n'

export function shallowWithIntl(node) {
  return shallow(node, {
    wrappingComponent: IntlProvider,
    wrappingComponentProps: {
      locale: 'en',
      defaultLocale: 'en',
      messages: en,
    },
    intl: IntlShape,
  })
}

export function mountWithIntl(node) {
  return mount(node, {
    wrappingComponent: IntlProvider,
    wrappingComponentProps: {
      locale: 'en',
      defaultLocale: 'en',
      messages: en,
    },
    intl: IntlShape,
  })
}
