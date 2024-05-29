import React, { useRef, useEffect } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';
import './index.css'

const MapComponent = () => {
    const mapRef = useRef(null);

    useEffect(() => {
        console.log(process.env.REACT_APP_SAFE_URL)
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

        const map = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                wmsLayer
            ],
            view: new View({
                center: fromLonLat([127.14701459306, 36.836484242852]), // 서울의 경도 및 위도
                zoom: 17, // 초기 줌 레벨을 더 높임
                minZoom: 10, // 최소 줌 레벨 설정
                maxZoom: 18  // 최대 줌 레벨 설정
            })
        });

        return () => {
            map.setTarget(null);
        };
    }, []);

    return <div ref={mapRef} className='map' />;
};

export default MapComponent;
