import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { stripesShape, withStripes } from '@folio/stripes/core';

import { Route, Switch } from './router';

import Settings from './settings';
import Locale from './settings/Locale';
import Plugins from './settings/Plugins';
import Bindings from './settings/Bindings';
import SSOSettings from './settings/SSOSettings';
import LocationCampuses from './settings/LocationCampuses';
import LocationInstitutions from './settings/LocationInstitutions';
import LocationLibraries from './settings/LocationLibraries';
import LocationLocations from './settings/LocationLocations';
import ServicePoints from './settings/ServicePoints';

class Organization extends React.Component {
  static propTypes = {
    match: ReactRouterPropTypes.match.isRequired,
    stripes: stripesShape
  }

  render() {
    const {
      match: { path: rootPath },
      stripes
    } = this.props;

    return (
      <Route path={rootPath} component={Settings}>
        <Switch>
          {stripes.hasPerm('ui-organization.settings.key-bindings') && (
            <Route path={`${rootPath}/keys`} exact component={Bindings} />
          )}
          {stripes.hasPerm('ui-organization.settings.locale') && (
            <Route path={`${rootPath}/locale`} exact component={Locale} />
          )}
          {stripes.hasPerm('ui-organization.settings.plugins') && (
            <Route path={`${rootPath}/plugins`} exact component={Plugins} />
          )}
          {stripes.hasPerm('ui-organization.settings.sso') && (
            <Route path={`${rootPath}/ssosettings`} exact component={SSOSettings} />
          )}
          {stripes.hasPerm('ui-organization.settings.servicepoints') && (
            <Route path={`${rootPath}/servicePoints`} exact component={ServicePoints} />
          )}
          {stripes.hasPerm('ui-organization.settings.location') && (
            <Route path={`${rootPath}/location-institutions`} exact component={LocationInstitutions} />
          )}
          {stripes.hasPerm('ui-organization.settings.location') && (
            <Route path={`${rootPath}/location-campuses`} exact component={LocationCampuses} />
          )}
          {stripes.hasPerm('ui-organization.settings.location') && (
            <Route path={`${rootPath}/location-libraries`} exact component={LocationLibraries} />
          )}
          {stripes.hasPerm('ui-organization.settings.location') && (
            <Route path={`${rootPath}/location-locations`} exact component={LocationLocations} />
          )}
        </Switch>
      </Route>
    );
  }
}

export default withStripes(Organization);
