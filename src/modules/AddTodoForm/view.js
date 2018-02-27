import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Field } from 'redux-form/immutable'
import PropTypes from 'prop-types'
import {
  Row,
  Col,
  Container,
} from 'components/Grid'
import Input from 'components/Input'
import Button from 'components/Button'

import styles from './styles.css'
import messages from './messages'

function AddTodoForm({ handleSubmit, intl }) {
  return (
    <Container isFluid>
      <form onSubmit={handleSubmit}>
        <fieldset className={styles.addTodoForm}>
          <Container isFluid tagName="ul">
            <Row middle="xs" start="xs" tagName="li" top="xs">
              <Col tagName="span" xs={3}>
                <FormattedMessage {...messages.titleLabel} />
              </Col>

              <Col tagName="span" xs={9}>
                <Field
                  component={Input}
                  isBlock
                  isDark
                  name="title"
                  placeholder={intl.formatMessage(messages.titlePlaceholder)}
                  type="text"
                />
              </Col>
            </Row>

            <Row middle="xs" start="xs" tagName="li" top="xs">
              <Col tagName="span" xs={3}>
                <FormattedMessage {...messages.descriptionLabel} />
              </Col>

              <Col tagName="span" xs={9}>
                <Field
                  component={Input}
                  isBlock
                  isDark
                  name="description"
                  placeholder={intl.formatMessage(messages.descriptionPlaceholder)}
                  type="text"
                />
              </Col>
            </Row>
          </Container>

          <Container isFluid>
            <Row end="xs">
              <Button isBlock kind="primary" type="submit">
                <FormattedMessage {...messages.saveButton} />
              </Button>
            </Row>
          </Container>
        </fieldset>
      </form>
    </Container>
  )
}

AddTodoForm.propTypes = {
  /** Function to execute when submit is called */
  handleSubmit: PropTypes.func,
  /** intl function */
  intl: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

export default AddTodoForm
