import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { FormattedMessage } from 'react-intl';
import { stripesShape, TitleManager, withStripes } from '@folio/stripes/core';
import {
  Headline,
  NavList,
  NavListItem,
  NavListSection,
  Pane
} from '@folio/stripes/components';

class SettingsRoute extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    stripes: stripesShape.isRequired
  }

  render() {
    const {
      children,
      location: { pathname },
      stripes
    } = this.props;

    return (
      <FormattedMessage id="ui-organization.settings.index.paneTitle">
        {pageTitle => (
          <TitleManager page={pageTitle}>
            <Pane
              defaultWidth="20%"
              paneTitle={
                <Headline tag="h3" size="small" margin="none">
                  <FormattedMessage id="ui-organization.settings.index.paneTitle" />
                </Headline>
              }
            >
              <NavList>
                <NavListSection
                  activeLink={pathname}
                  label={
                    <Headline tag="h4">
                      <FormattedMessage id="ui-organization.settings.general.label" />
                    </Headline>
                  }
                >
                  {stripes.hasPerm('ui-organization.settings.key-bindings') && (
                    <NavListItem to="/settings/organization/keys">
                      <FormattedMessage id="ui-organization.settings.bindings.label" />
                    </NavListItem>
                  )}
                  {stripes.hasPerm('ui-organization.settings.locale') && (
                    <NavListItem to="/settings/organization/locale">
                      <FormattedMessage id="ui-organization.settings.language.label" />
                    </NavListItem>
                  )}
                  {stripes.hasPerm('ui-organization.settings.plugins') && (
                    <NavListItem to="/settings/organization/plugins">
                      <FormattedMessage id="ui-organization.settings.plugins.label" />
                    </NavListItem>
                  )}
                  {stripes.hasPerm('ui-organization.settings.sso') && (
                    <NavListItem to="/settings/organization/ssosettings">
                      <FormattedMessage id="ui-organization.settings.ssoSettings.label" />
                    </NavListItem>
                  )}
                  {stripes.hasPerm('ui-organization.settings.servicepoints') && (
                    <NavListItem to="/settings/organization/servicePoints">
                      <FormattedMessage id="ui-organization.settings.servicePoints.label" />
                    </NavListItem>
                  )}
                </NavListSection>
                <br />
                {stripes.hasPerm('ui-organization.settings.location') && (
                  <NavListSection
                    activeLink={pathname}
                    label={
                      <Headline tag="h4">
                        <FormattedMessage id="ui-organization.settings.location.label" />
                      </Headline>
                    }
                  >
                    <NavListItem to="/settings/organization/location-institutions">
                      <FormattedMessage id="ui-organization.settings.location.institutions" />
                    </NavListItem>
                    <NavListItem to="/settings/organization/location-campuses">
                      <FormattedMessage id="ui-organization.settings.location.campuses" />
                    </NavListItem>
                    <NavListItem to="/settings/organization/location-libraries">
                      <FormattedMessage id="ui-organization.settings.location.libraries" />
                    </NavListItem>
                    <NavListItem to="/settings/organization/location-locations">
                      <FormattedMessage id="ui-organization.settings.location.locations" />
                    </NavListItem>
                  </NavListSection>
                )}
              </NavList>
            </Pane>
            {children}
          </TitleManager>
        )}
      </FormattedMessage>
    );
  }
}

export default withStripes(SettingsRoute);
