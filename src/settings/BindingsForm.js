import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button, Col, Pane, Row, TextArea } from '@folio/stripes/components';
import stripesForm from '@folio/stripes/form';
import { Field } from 'redux-form';
import { stripesShape, withStripes } from '@folio/stripes/core';

function validate(values) {
  const errors = {};

  try {
    JSON.parse(values.bindings);
  } catch (error) {
    errors.bindings = error.message;
  }

  return errors;
}

class BindingsForm extends React.Component {
  getLastMenu() {
    const { pristine, submitting } = this.props;
    return (<Button type="submit" disabled={(pristine || submitting)} marginBottom0>Save</Button>);
  }

  render() {
    const { handleSubmit, label, stripes } = this.props;
    const actionList = stripes.actionNames.map(name => (
      <span key={name}>
        <tt>{name}</tt>
  ,
        {' '}
      </span>
    ));

    return (
      <form id="bindings-form" onSubmit={handleSubmit}>
        <Pane defaultWidth="fill" fluidContentWidth paneTitle={label} lastMenu={this.getLastMenu()}>
          <Row>
            <Col xs={12}>
              <div>
                <FormattedMessage id="ui-organization.settings.keyBindings" />
              </div>
              <p>
                <FormattedMessage
                  id="ui-organization.settings.bindings.provide"
                  values={{
                    actionNames: <span>{actionList}</span>,
                  }}
                />
              </p>
              <p>
                <a href="https://github.com/folio-org/ui-organization/blob/master/settings/example-key-bindings.json">[example]</a>
              </p>
              <br />
              <Field
                label={label}
                component={TextArea}
                name="bindings"
                id="bindings"
                fullWidth
                rows="12"
              />
            </Col>
          </Row>
        </Pane>
      </form>
    );
  }
}

BindingsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  stripes: stripesShape.isRequired,
  submitting: PropTypes.bool,
  label: PropTypes.node,
};

export default stripesForm({
  form: 'bindingsForm',
  validate,
  navigationCheck: true,
  enableReinitialize: true,
})(withStripes(BindingsForm));
