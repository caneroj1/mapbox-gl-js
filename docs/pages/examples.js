import React from 'react';
import {prefixUrl} from '@mapbox/batfish/modules/prefix-url';

export default class extends React.Component {
    componentDidMount() {
        window.location.href = prefixUrl(`/example/simple-map/`);
    }

    render() {
        return null;
    }
};
