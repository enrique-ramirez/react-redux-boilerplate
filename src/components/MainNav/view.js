import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
} from 'components/Grid'

import styles from './styles.css'
import messages from './messages'

function MainNav(props) {
  const { filter } = props

  return (
    <Container isFluid>
      <Row className={styles.mainNav} middle="xs" start="xs" tagName="ul" top="xs">
        <Col tagName="li" xs={4}>
          {filter === undefined
            ? <FormattedMessage {...messages.all} tagName="strong" />
            : <Link to="/"><FormattedMessage {...messages.all} /></Link>
          }
        </Col>
        <Col tagName="li" xs={4}>
          {filter === 'active'
            ? <FormattedMessage {...messages.active} tagName="strong" />
            : <Link to="/active"><FormattedMessage {...messages.active} /></Link>
          }
        </Col>
        <Col tagName="li" xs={4}>
          {filter === 'done'
            ? <FormattedMessage {...messages.done} tagName="strong" />
            : <Link to="/done"><FormattedMessage {...messages.done} /></Link>
          }
        </Col>
      </Row>
    </Container>
  )
}

MainNav.propTypes = {
  /** Current active filter. */
  filter: PropTypes.oneOf(['active', 'done']),
}

export default MainNav
