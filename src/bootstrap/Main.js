import React, { Component } from 'react';
import {
  HashRouter, Route, Switch, Redirect
} from 'react-router-dom';
// import moment from 'moment';
// import 'moment/locale/id';

// import { addLocaleData, IntlProvider } from 'react-intl';
// import idLocaleData from 'react-intl/locale-data/id';
// import enLocaleData from 'react-intl/locale-data/en';
// import flatten from 'flat';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import ReduxStore from './ReduxStore';
// import translation from '../i18n/locales';
import Routes from "../config/Routes";

// addLocaleData(idLocaleData);
// addLocaleData(enLocaleData);
// global.intl = require('intl');

// const locale = 'id';
// const messages = translation[locale];

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  componentDidMount() {
    // moment.locale('id');
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, error, info });
  }

  render() {
    if (this.state.hasError) {
      return <h1>error {this.state.error}{this.state.info}</h1>;
    }
    return (
      <Provider store={ReduxStore.store}>
        <PersistGate
          loading={null}
          persistor={ReduxStore.persistor}
        >
          {/* <IntlProvider locale={locale} key={locale} messages={flatten(messages)}> */}
          <HashRouter>
            <Switch>
              <Redirect exact from="/" to="/login_page" />
              {Routes.ContainerRoutes.map(
                (item, index) => <Route key={index.toString()} path={item.path} name={item.name} component={item.component} />,
              )}
            </Switch>
          </HashRouter>
          {/* </IntlProvider> */}
        </PersistGate>
      </Provider>
    );
  }
}

export default Main;
