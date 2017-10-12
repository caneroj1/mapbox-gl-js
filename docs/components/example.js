/*---
layout: wrapper
hasdocnav: true
class: fill-light
options: full
section: Mapbox GL JS
---*/

import React from 'react';
import Helmet from 'react-helmet';
import ReactPageShell from '../../vendor/dotcom-page-shell/react-page-shell.js';
import {prefixUrl} from '@mapbox/batfish/modules/prefix-url';

const examples = [
    {
        "name": "Styles",
        "id": "styles"
    },
    {
        "name": "Layers",
        "id": "layers"
    },
    {
        "name": "Sources",
        "id": "sources"
    },
    {
        "name": "User interaction",
        "id": "user-interaction"
    },
    {
        "name": "Camera",
        "id": "camera"
    },
    {
        "name": "Controls and overlays",
        "id": "controls-and-overlays"
    },
    {
        "name": "Browser support",
        "id": "browser-support"
    },
    {
        "name": "Internationalization support",
        "id": "internationalization"
    }
];

class PageShell extends React.Component {
    render() {
        const meta = this.props.meta;
        return (
            <ReactPageShell {...this.props}>
                <Helmet>
                    <link href='https://www.mapbox.com/base/latest/base.css?v1.0' rel='stylesheet'/>
                    <link href='https://www.mapbox.com/css/docs.css' rel='stylesheet'/>
                    <link href={prefixUrl('/site.css')} rel='stylesheet'/>
                </Helmet>
                <div className='static-header-page'>
                    <div className='docnav hide-mobile'>
                        <div className='limiter'>
                            <div className='col3 contain'>
                                <nav className='scroll-styled quiet-scroll small'>
                                    {/*{meta.pathname.includes('example') &&*/}
                                    {/*<div className="space-bottom">*/}
                                    {/*<input id='filter-input' type='text' className='space-bottom' name='filter' placeholder='Filter examples' />*/}
                                    {/*</div>}*/}
                                    {/*{examples.map(example =>*/}
                                    {/*<div className='space-bottom1'>*/}
                                    {/*<h3 className='heading'>{example.name}</h3>*/}
                                    {/*{site.tags[example.id].reverse().map(listing =>*/}
                                    {/*<a href={prefixUrl(listing.url)}*/}
                                    {/*className={`block small truncate example-names ${listing.title === page.title && 'active'}`}>{listing.title}</a>*/}
                                    {/*)}*/}
                                    {/*</div>*/}
                                    {/*)}}*/}
                                    {/*{% if page.url contains 'api' %}*/}
                                    {/*<div className='space-bottom1'>*/}
                                    {/*<span className='block truncate strong'>API</span>*/}
                                    {/*</div>*/}
                                    {/*{% for navitem in page.navigation %}*/}
                                    {/*<div className='space-bottom1'>*/}
                                    {/*<a className='block truncate strong quiet'*/}
                                    {/*href='{{site.baseurl}}{{navitem.url}}/#{{navitem.id}}'>{{navitem.title}}</a>*/}
                                    {/*{% for subitem in navitem.subnav %}*/}
                                    {/*<a className='block truncate'*/}
                                    {/*href='{{site.baseurl}}{{subitem.url}}/#{{subitem.id}}'>{{subitem.title}}</a>*/}
                                    {/*{% endfor %}*/}
                                    {/*</div>*/}
                                    {/*{% endfor %}*/}
                                    {/*{% endif %}*/}
                                </nav>
                            </div>
                        </div>
                    </div>

                    <div className='limiter clearfix'>
                        {/*{% include navigation.html %}*/}

                        <div className='contain margin3 col9'>
                            {this.props.children}
                        </div>
                    </div>

                    {/*<script src='{{site.baseurl}}/js/site.js'></script>*/}
                </div>
            </ReactPageShell>
        );
    }
}

export default PageShell;
