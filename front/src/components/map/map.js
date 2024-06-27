import React, { useRef, useEffect, useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';

import { defaults as defaultControls } from 'ol/control';
import { createLegendControl } from './createLegend';
import './index.css'


const MapComponent = ({ address = "" }) => {
    const mapRef = useRef(null);
    const [coordinate, setCoordinate] = useState([0, 0]); // [경도 log, 위도 lat]
    const [error, setError] = useState(null);
    const [map, setMap] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_DEV_URL}/gps?address=${address}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('response is not ok');
                }
                return response.json();
            })
            .then(data => {
                if (!data || data.length === 0) {
                    throw new Error('No data available');
                }
                setCoordinate([data.longitude, data.latitude]);
            })
            .catch(error => {
                setError(error.message);
            })
    }, [address])

    useEffect(() => {
        const param = {
            name: '범죄주의구간(전체)',
            serverUrl: `${process.env.REACT_APP_SAFE_URL}?apikey=${process.env.REACT_APP_SAFE_API_KEY}`,
            layername: 'A2SM_CRMNLHSPOT_TOT',
            styles: 'A2SM_CrmnlHspot_Tot_Tot'
        };

        const wmsLayer = new TileLayer({
            source: new TileWMS({
                url: param.serverUrl,
                params: {
                    'LAYERS': param.layername,
                    'STYLES': param.styles,
                    'FORMAT': 'image/png',
                    'EXCEPTIONS': 'text/xml',
                    'TRANSPARENT': true
                },
                serverType: 'geoserver',
                transition: 0
            })
        });

        const initialMap = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                wmsLayer
            ],
            view: new View({
                center: fromLonLat([coordinate[0], coordinate[1]]), // 서울의 경도 및 위도
                zoom: 16, // 초기 줌 레벨을 더 높임
                minZoom: 10, // 최소 줌 레벨 설정
                maxZoom: 18  // 최대 줌 레벨 설정
            }),
            controls: defaultControls().extend([createLegendControl()])
        });

        setMap(initialMap);

        return () => {
            if (initialMap) {
                initialMap.setTarget(null);
            }
        };
    }, []);

    useEffect(() => {
        if (map) {
            map.getView().setCenter(fromLonLat([coordinate[0], coordinate[1]]));
        }
    }, [coordinate, map]);

    return (
        <div ref={mapRef} className='map' />
    )
};

export default MapComponent;
