import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { ConfigManager } from '@folio/stripes/smart-components';
import { withStripes } from '@folio/stripes/core';

import BindingsForm from './BindingsForm';

class Bindings extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      setBindings: PropTypes.func.isRequired,
      connect: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.configManager = props.stripes.connect(ConfigManager);
    this.setBindings = this.setBindings.bind(this);
  }

  setBindings(config) {
    this.props.stripes.setBindings(JSON.parse(config.value));
  }

  render() {
    return (
      <this.configManager
        label={<FormattedMessage id="ui-organization.settings.bindings.label" />}
        moduleName="ORG"
        configName="bindings"
        onAfterSave={this.setBindings}
        configFormComponent={BindingsForm}
      />
    );
  }
}

export default withStripes(Bindings);
