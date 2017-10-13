import React from 'react';
import {prefixUrl} from '@mapbox/batfish/modules/prefix-url';
import PageShell from './page_shell';
import Navigation from "./navigation";
import {version} from '../../package.json';
import supported from 'mapbox-gl-supported';

const tags = {
    "styles": {
        "name": "Styles",
        "examples": []
    },
    "layers": {
        "name": "Layers",
        "examples": []
    },
    "sources": {
        "name": "Sources",
        "examples": []
    },
    "user-interaction": {
        "name": "User interaction",
        "examples": []
    },
    "camera": {
        "name": "Camera",
        "examples": []
    },
    "controls-and-overlays": {
        "name": "Controls and overlays",
        "examples": []
    },
    "browser-support": {
        "name": "Browser support",
        "examples": []
    },
    "internationalization": {
        "name": "Internationalization support",
        "examples": []
    }
};

function prefixMapboxGlUrl(path) {
    // Use local copy of GL JS when running locally.
    const base = process.env.DEPLOY_ENV !== 'production' ?
        prefixUrl('/dist') :
        `https://api.tiles.mapbox.com/mapbox-gl-js/v${version}`;
    return `${base}${path}`;
}

export default function (html, meta) {
    for (const tag of meta.tags) {
        tags[tag].examples.push(meta);
    }

    return class extends React.Component {
        render() {
            return (
                <PageShell meta={meta}>
                    <div className='docnav hide-mobile'>
                        <div className='limiter'>
                            <div className='col3 contain'>
                                <nav className='scroll-styled quiet-scroll small'>
                                    <div className="space-bottom">
                                        <input id='filter-input' type='text' className='space-bottom' name='filter' placeholder='Filter examples' />
                                    </div>
                                    {Object.entries(tags).map(([id, {name, examples}], i) =>
                                        <div key={i} className='space-bottom1'>
                                            <h3 className='heading'>{name}</h3>
                                            {examples.map((example, i) =>
                                                <a key={i} href={prefixUrl(example.pathname)}
                                                   className={`block small truncate example-names ${example.title === meta.title && 'active'}`}>{example.title}</a>
                                            )}
                                        </div>
                                    )}
                                </nav>
                            </div>
                        </div>
                    </div>

                    <div className='limiter clearfix'>
                        <Navigation current='examples'/>

                        <div className='contain margin3 col9'>
                            <div className='round doc fill-white keyline-all'>
                                <style>{`
                                    .fill-white pre { background-color:transparent; }
                                `}</style>

                                <div className='prose'>
                                    <div className='pad2'><strong>{meta.title}</strong><br/>{meta.description}</div>

                                    {!supported() &&
                                        <div id='unsupported' className='pad2 hidden dark'>
                                            <div className='note error round pad1'>
                                                <div className='strong space-bottom1 icon alert'>Mapbox GL unsupported</div>
                                                <div className='small strong'>Mapbox GL requires <a href='http://caniuse.com/webgl'>WebGL support</a>. Please check that you are using a supported browser and that WebGL is <a href='http://get.webgl.org/'>enabled</a>.</div>
                                            </div>
                                        </div>}
                                </div>

                                {supported() &&
                                    <iframe id='demo' className='row10 col12' allowFullScreen='true' mozallowfullscreen='true' webkitallowfullscreen='true'
                                            ref={(iframe) => { this.iframe = iframe; }}/>}

                                <div className='fill-white js-replace-token keyline-top'>
                                    <div id='code'>{`
                                        <!DOCTYPE html>
                                        <html>
                                        <head>
                                            <meta charset='utf-8' />
                                            <title>${meta.title}</title>
                                            <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
                                            <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v${version}/mapbox-gl.js'></script>
                                            <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v${version}/mapbox-gl.css' rel='stylesheet' />
                                            <style>
                                                body { margin:0; padding:0; }
                                                #map { position:absolute; top:0; bottom:0; width:100%; }
                                            </style>
                                        </head>
                                        <body>

                                        ${html.replace("<script>", "<script>\nmapboxgl.accessToken = '<your access token here>';")}
                                        </body>
                                        </html>
                                    `}</div>

                                    <a className='button icon clipboard col12 round-bottom js-clipboard' href='#' data-clipboard-target='code' id='copy'>Copy example</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </PageShell>
            );
        }

        componentDidMount() {
            if (!this.iframe) return;
            const doc = this.iframe.contentWindow.document;
            doc.open();
            doc.write(`
                <html>
                <head>
                    <meta charset=utf-8 />
                    <title>${meta.title}</title>
                    <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
                    <script src='${prefixMapboxGlUrl('/mapbox-gl.js')}'><\/script>
                    <link href='${prefixMapboxGlUrl('/mapbox-gl.css')}' rel='stylesheet' />
                    <style>
                        body { margin:0; padding:0; }
                        #map { position:absolute; top:0; bottom:0; width:100%; }
                    </style>
                    <script>mapboxgl.accessToken = '${ 'pk.eyJ1IjoiamZpcmUiLCJhIjoiVkRqZHhXTSJ9.k3r6TYm9oetgLQX0A_nQbQ' /*App.accessToken*/}'<\/script>
                </head>
                <body>
                ${html}
                </body>
                </html>
            `);
            doc.close();
        }
    }
};
