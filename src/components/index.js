// @flow

import * as React from 'react';
import Provider from './Provider';
import Generator from './Generator';
import type {Node} from './Generator';
import type Endpoint from '../app/endpoint';
import hocs from '../hocs';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import hocsLocales from '../hocs/query/locale';
import pluginsLocales from '@canner/cms-locales';

const lang = 'zh';
addLocaleData([...en, ...zh]);


type Props = {
  schema: {
    cannerSchema: {[key: string]: any},
    componentTree: {[key: string]: Node}
  },
  endpoint: {[key: string]: Endpoint},
  dataDidChange: void => void,
  children: React.ChildrenArray<React.Node>,

  imageServiceConfigs: Object,
  componentTree: {[string]: Node},
  hocs: {[string]: React.ComponentType<*>},
  layouts: {[string]: React.ComponentType<*>},
  goTo: (path: string) => void,
  baseUrl: string,
  routes: Array<string>,
  params: {[string]: string},
}

class CannerCMS extends React.Component<Props> {
  static defaultProps = {
    schema: {
      cannerSchema: {},
      componentTree: {},
    },
    endpoint: {},
    dataDidChange: () => {},
    componentTree: {},
    hocs,
    layouts: {},
    goTo: () => {},
    baseUrl: '',
    routes: [],
    params: {},
  }

  render() {
    const {
      schema,
      dataDidChange,
      hocs,
      layouts,
      goTo,
      baseUrl,
      routes,
      params,
      endpoint,
      imageServiceConfigs
    } = this.props;
    return (
      <IntlProvider
        locale={lang}
        defaultLocale={lang}
        key={lang}
        messages={{
          ...pluginsLocales[lang],
          ...hocsLocales[lang],
        }}
      >
        <Provider
          schema={schema.cannerSchema}
          endpoint={endpoint}
          dataDidChange={dataDidChange}
        >
        
          <Generator
            imageServiceConfigs={imageServiceConfigs}
            componentTree={schema.componentTree}
            hocs={hocs}
            layouts={layouts}
            goTo={goTo}
            baseUrl={baseUrl}
            routes={routes}
            params={params}
          />
        </Provider>
      </IntlProvider>
    );
  }
}

export default CannerCMS;
