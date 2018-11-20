import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { ControlledVocab } from '@folio/stripes/smart-components';
import { Select } from '@folio/stripes/components';
import stripesConnect from '../connect';

class LocationCampuses extends React.Component {
  static manifest = {
    institutions: {
      type: 'okapi',
      records: 'locinsts',
      path: 'location-units/institutions?query=cql.allRecords=1 sortby name&limit=100',
      accumulate: true,
    },
    locationsPerCampus: {
      type: 'okapi',
      records: 'locations',
      path: 'locations',
      accumulate: true,
    }
  };

  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }).isRequired,
    resources: PropTypes.shape({
      institutions: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.object),
      }),
      locationsPerCampus: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.object),
      }),
    }),
    mutator: PropTypes.shape({
      institutions: PropTypes.shape({
        GET: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired,
      }),
      locationsPerCampus: PropTypes.shape({
        GET: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired,
      }),
    }),
  };

  constructor(props) {
    super(props);
    this.connectedControlledVocab = props.stripes.connect(ControlledVocab);
    this.numberOfObjectsFormatter = this.numberOfObjectsFormatter.bind(this);

    this.state = {
      institutionId: null,
    };
  }

  /**
   * Refresh lookup tables when the component mounts. Fetches in the manifest
   * will only run once (in the constructor) but because this object may be
   * unmounted/remounted without being destroyed/recreated, the lookup tables
   * will be stale if they change between unmounting/remounting.
   */
  componentDidMount() {
    ['institutions', 'locationsPerCampus'].forEach(i => {
      this.props.mutator[i].reset();
      this.props.mutator[i].GET();
    });
  }

  numberOfObjectsFormatter = (item) => {
    const records = (this.props.resources.locationsPerCampus || {}).records || [];
    return records.reduce((count, loc) => {
      return loc.campusId === item.id ? count + 1 : count;
    }, 0);
  }

  onChangeInstitution = (e) => {
    this.setState({ institutionId: e.target.value });
  }


  render() {
    const institutions = [];
    (((this.props.resources.institutions || {}).records || []).forEach(i => {
      institutions.push({ value: i.id, label: `${i.name}${i.code ? ` (${i.code})` : ''}` });
    }));

    if (!institutions.length) {
      return <div />;
    }

    return (
      <this.connectedControlledVocab
        {...this.props}
        // We have to unset the dataKey to prevent the props.resources in
        // <ControlledVocab> from being overwritten by the props.resources here.
        dataKey={undefined}
        baseUrl="location-units/campuses"
        records="loccamps"
        rowFilter={<Select
          label={<FormattedMessage id="ui-organization.settings.location.institutions.institution" />}
          id="institutionSelect"
          name="institutionSelect"
          dataOptions={[
            { label: <FormattedMessage id="ui-organization.settings.location.institutions.selectInstitution" />, value: '' },
            ...institutions
          ]}
          onChange={this.onChangeInstitution}
        />}
        rowFilterFunction={(row) => row.institutionId === this.state.institutionId}
        label={<FormattedMessage id="ui-organization.settings.location.campuses" />}
        labelSingular={<FormattedMessage id="ui-organization.settings.location.campuses.campus" />}
        objectLabel={<FormattedMessage id="ui-organization.settings.location.locations" />}
        visibleFields={['name', 'code']}
        columnMapping={{
          name: <FormattedMessage id="ui-organization.settings.location.campuses.campus" />,
          code: <FormattedMessage id="ui-organization.settings.location.code" />,
        }}
        formatter={{ numberOfObjects: this.numberOfObjectsFormatter }}
        nameKey="group"
        id="campuses"
        preCreateHook={(item) => Object.assign({}, item, { institutionId: this.state.institutionId })}
        listSuppressor={() => !this.state.institutionId}
        listSuppressorText={<FormattedMessage id="ui-organization.settings.location.campuses.missingSelection" />}
        sortby="name"
      />
    );
  }
}

export default stripesConnect(LocationCampuses);
