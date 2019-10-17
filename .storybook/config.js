/* eslint global-require: 0 */
import { addDecorator, configure } from '@storybook/react'
import { setDefaults } from '@storybook/addon-info'
import { setIntlConfig, withIntl } from 'storybook-addon-intl'

import { translationMessages } from '../src/i18n'

const getMessages = locale => translationMessages[locale]

setIntlConfig({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  getMessages,
})

setDefaults({
  header: true,
  inline: false,
})

addDecorator(withIntl)

configure(() => require('./stories'), module)
