import React from 'react'

export default function AssetWithNoMaintenanceDue(props) {

    const { assetStatus } = props;

    return (
        <div className="border">
            <h5 className="bg-secondary py-2 text-center">Maintenance is OK</h5>
            <div className="text-secondary" style={{ height: '200px', fontSize: '24px', fontWeight: 'bold', textAlign: 'center', lineHeight: '200px' }}>
                {assetStatus[0].num_Count}
            </div>
        </div>
    )
}
