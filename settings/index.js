import React from 'react';
import Settings from '@folio/stripes-components/lib/Settings';
import { stripesShape } from '@folio/stripes-core/src/Stripes';

import Locale from './Locale';
import Plugins from './Plugins';
import Bindings from './Bindings';
import SSOSettings from './SSOSettings';
import ShelvingLocationsSettings from './ShelvingLocationsSettings';

class Organization extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
  }

  constructor(props) {
    super(props);
    const formatMsg = this.props.stripes.intl.formatMessage;
    this.pages = [
      {
        route: 'keys',
        label: formatMsg({ id: 'ui-organization.settings.bindings.label' }),
        component: Bindings,
        perm: 'ui-organization.settings.key-bindings',
      },
      {
        route: 'locale',
        label: formatMsg({ id: 'ui-organization.settings.language.label' }),
        component: Locale,
        perm: 'ui-organization.settings.locale',
      },
      {
        route: 'plugins',
        label: formatMsg({ id: 'ui-organization.settings.plugins.label' }),
        component: Plugins,
        perm: 'ui-organization.settings.plugins',
      },
      {
        route: 'ssosettings',
        label: formatMsg({ id: 'ui-organization.settings.ssoSettings.label' }),
        component: SSOSettings,
        perm: 'ui-organization.settings.sso',
      },
      {
        route: 'shelvinglocations',
        label: formatMsg({ id: 'ui-organization.settings.shelvingLocations.label' }),
        component: ShelvingLocationsSettings,
      },
    ];
  }

  render() {
    return (
      <Settings
        {...this.props}
        pages={this.pages}
        paneTitle={this.props.stripes.intl.formatMessage({ id: 'ui-organization.settings.index.paneTitle' })}
      />
    );
  }
}

export default Organization;
