import React from 'react';
import Helmet from 'react-helmet';
import ReactPageShell from '../../vendor/dotcom-page-shell/react-page-shell.js';
import {prefixUrl} from '@mapbox/batfish/modules/prefix-url';

class PageShell extends React.Component {
    render() {
        return (
            <ReactPageShell {...this.props}>
                <Helmet>
                    <link href='https://www.mapbox.com/base/latest/base.css?v1.0' rel='stylesheet'/>
                    <link href='https://www.mapbox.com/css/docs.css' rel='stylesheet'/>
                    <link href={prefixUrl('/site.css')} rel='stylesheet'/>
                </Helmet>
                <div className='static-header-page'>
                    {this.props.children}
                    <script src={prefixUrl('/js/site.js')}/>
                </div>
            </ReactPageShell>
        );
    }
}

export default PageShell;
