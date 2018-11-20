import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { ControlledVocab } from '@folio/stripes/smart-components';
import stripesConnect from '../connect';

class LocationInstitutions extends React.Component {
  static manifest = Object.freeze({
    locationsPerInstitution: {
      type: 'okapi',
      records: 'locations',
      path: 'locations',
      accumulate: true,
    },
  });

  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }).isRequired,
    resources: PropTypes.shape({
      locationsPerInstitution: PropTypes.object,
    }).isRequired,
    mutator: PropTypes.shape({
      locationsPerInstitution: PropTypes.shape({
        GET: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired,
      }),
    }),
  };

  constructor(props) {
    super(props);
    this.connectedControlledVocab = props.stripes.connect(ControlledVocab);
    this.numberOfObjectsFormatter = this.numberOfObjectsFormatter.bind(this);
  }

  /**
   * Refresh lookup tables when the component mounts. Fetches in the manifest
   * will only run once (in the constructor) but because this object may be
   * unmounted/remounted without being destroyed/recreated, the lookup tables
   * will be stale if they change between unmounting/remounting.
   */
  componentDidMount() {
    this.props.mutator.locationsPerInstitution.reset();
    this.props.mutator.locationsPerInstitution.GET();
  }

  numberOfObjectsFormatter = (item) => {
    const records = (this.props.resources.locationsPerInstitution || {}).records || [];
    return records.reduce((count, loc) => {
      return loc.institutionId === item.id ? count + 1 : count;
    }, 0);
  }

  render() {
    const formatter = {
      numberOfObjects: this.numberOfObjectsFormatter,
    };

    return (
      <this.connectedControlledVocab
        {...this.props}
        // We have to unset the dataKey to prevent the props.resources in
        // <ControlledVocab> from being overwritten by the props.resources here.
        dataKey={undefined}
        baseUrl="location-units/institutions"
        records="locinsts"
        label={<FormattedMessage id="ui-organization.settings.location.institutions" />}
        labelSingular={<FormattedMessage id="ui-organization.settings.location.institutions.institution" />}
        objectLabel={<FormattedMessage id="ui-organization.settings.location.locations" />}
        visibleFields={['name', 'code']}
        columnMapping={{
          name: <FormattedMessage id="ui-organization.settings.location.institutions.institution" />,
          code: <FormattedMessage id="ui-organization.settings.location.code" />,
        }}
        formatter={formatter}
        nameKey="name"
        id="institutions"
        sortby="name"
      />
    );
  }
}

export default stripesConnect(LocationInstitutions);
