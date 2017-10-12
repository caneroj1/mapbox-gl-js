const path = require('path');
const webpack = require('webpack');
// const rehypeSlug = require('rehype-slug');
// const rehypeHighlightCodeBlock = require('@mapbox/rehype-highlight-code-block');
// const mapboxHighlighter = require('@mapbox/mapbox-highlighter');
// const mapboxAssembly = require('@mapbox/mapbox-assembly');

module.exports = () => {
    const config = {
        siteBasePath: '/mapbox-gl-js',
        siteOrigin: 'https://www.mapbox.com',
        pagesDirectory: `${__dirname}/docs/pages`,
        // browserslist: mapboxAssembly.browsersList,
        // postcssPlugins: mapboxAssembly.postcssPipeline.plugins,
        stylesheets: [
            // require.resolve('@mapbox/mapbox-assembly/dist/assembly.css'),
            path.join(__dirname, './vendor/dotcom-page-shell/page-shell-styles.css')
            // **Add more stylesheets (paths or globs) here!**
        ],
        applicationWrapperPath: path.join(
            __dirname,
            'docs/components/application-wrapper.js'
        ),
        webpackLoaders: [
            // Transform SVGs into React components.
            // cf. https://github.com/mapbox/svg-react-transformer
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: '@mapbox/svg-react-transformer-loader',
                        options: { template: 'fancy' }
                    }
                ]
            }
        ],
        webpackPlugins: [
            // Make environment variables available within JS that Webpack compiles.
            new webpack.DefinePlugin({
                // DEPLOY_ENV is used in config to pick between staging/production.
                'process.env.DEPLOY_ENV': `"${process.env.DEPLOY_ENV}"`
            })
        ],
        // babelPlugins: [
        //     // With this plugin, you can `import _ from 'lodash';` and only
        //     // the specific utiliy functions that you actually  use will be included
        //     // in your bundle.
        //     require('babel-plugin-lodash')
        // ],
        // vendorModules: ['@mapbox/appropriate-images-react'],
        inlineJs: [
            {
                filename: path.join(
                    __dirname,
                    './vendor/dotcom-page-shell/page-shell-script.js'
                )
            }
        ],
        // jsxtremeMarkdownOptions: {
        //     rehypePlugins: [
        //         // rehypeSlug,
        //         [rehypeHighlightCodeBlock, { highlight: mapboxHighlighter.highlight }]
        //     ]
        // }
    };
    return config;
};
