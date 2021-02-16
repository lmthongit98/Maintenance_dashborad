import React from 'react'
import GoogleMapReact from 'google-map-react';

export default function MapMaintenanceOverdue(props) {
    const { list } = props;

    const AnyReactComponent = ({ text }) => <div style={{ color: '#05264b', fontSize: '12px', fontWeight: 'bold' }}>{text}</div>;

    const renderMarkerToMap = () => {
        return list.map((item, index) => {
            return (
                <AnyReactComponent key={index}
                    lat={item.lat}
                    lng={item.lon}
                    text={<p><i style={{ fontSize: '18px' }} className="fa fa-map-marker-alt" /> {item.asset}</p>}
                />
            )
        })
    }

    return (
        <div id="mapid" style={{ height: '390px' }}>
            <div style={{ height: '100%', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 0 /* YOUR KEY HERE */ }}
                    defaultCenter={{
                        lat: 10.745413,
                        lng: 106.704844
                    }}
                    defaultZoom={11}
                >
                    {renderMarkerToMap()}

                </GoogleMapReact>
            </div>
        </div>
    )
}
