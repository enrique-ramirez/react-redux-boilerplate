import { injectIntl } from 'react-intl'
import { reduxForm } from 'redux-form/immutable'

import {
  required,
  length,
  makeValidate,
} from 'utils/formValidations'

import AddTodoForm from './view'

const validations = {
  title: [required(), length({ max: 25 })],
  description: [required()],
}

export default reduxForm({
  form: 'addTodo',
  validate: makeValidate(validations),
})(injectIntl(AddTodoForm))
