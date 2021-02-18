import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ListMaintenanceOverdue from './ListMaintenanceOverdue'
import MapMaintenanceOverdue from './MapMaintenanceOverdue';
import PastMaintenanceChart from './PastMaintenanceChart';
import AssetWithNoMaintenanceDue from './AssetWithNoMaintenanceDue';
import AssetMaintenanceIsDue from './AssetMaintenanceIsDue';

export default function MaintenanceDashBoard() {
    //####Note: setState is asyn function!!!!
    //------------component 1, 2--------------
    const [assetStatus, setAssetStatus] = useState([
        {
            "status": 0,
            "num_Count": 0
        },
        {
            "status": 1,
            "num_Count": 0
        },
        {
            "status": 2,
            "num_Count": 0
        }
    ]);
    useEffect(() => {
        const fectchAssetStatus = async () => {
            try {
                const res = await axios({
                    url: 'http://localhost:8080/api/maintenance/countassetstatus',
                    method: "GET"
                })
                setAssetStatus(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fectchAssetStatus();
    }, [])



    //--------------component chart-------------
    let overdueInfoDefault = [];
    const maxMonth = 4; //number of month present on the chart(Jan->Apr)
    for (let i = 0; i < maxMonth; i++) {
        overdueInfoDefault.push(0);
    }
    const [overdueInfo, setOverdueInfo] = useState(overdueInfoDefault);
    useEffect(() => {
        const fectOverdueInfo = async () => {
            try {
                const res = await axios({
                    url: 'http://localhost:8080/api/overdueasset/listAssetOverdue',
                    method: "GET"
                })
                let { data } = res;
                for (let i = 0; i < maxMonth; i++) {
                    let check = 0;
                    for (const item of data) {
                        if ((i + 1) === item.month) {
                            overdueInfoDefault[i] = item.num_Overdue;
                            check = 1;
                            break;
                        }
                    }
                    if (!check) {
                        overdueInfoDefault[i] = 0;
                    }
                }
                setOverdueInfo(overdueInfoDefault);
            } catch (err) {
                console.log(err)
            }
        }
        fectOverdueInfo();
    }, [])

    let intimeInfoDefault = [];
    for (let i = 0; i < maxMonth; i++) {
        overdueInfoDefault.push(0);
    }
    const [intimeInfo, setIntimeInfo] = useState(intimeInfoDefault);
    useEffect(() => {
        const fectIntimeInfo = async () => {
            try {
                const res = await axios({
                    url: 'http://localhost:8080/api/intimeasset/listAssetIntime',
                    method: "GET"
                })
                let { data } = res;
                for (let i = 0; i < maxMonth; i++) {
                    let check = 0;
                    for (const item of data) {
                        if ((i + 1) === item.month) {
                            intimeInfoDefault[i] = item.num_Intime;
                            check = 1;
                            break;
                        }
                    }
                    if (!check) {
                        intimeInfoDefault[i] = 0;
                    }
                }
                setIntimeInfo(intimeInfoDefault);
            } catch (err) {
                console.log(err)
            }
        }
        fectIntimeInfo();
    }, [])


    //--------------component listOverdueAsset and mapOverdueAsset--------------
    //Shoud init default value for state to avoid error because have to wait the response from server
    const [listMaintenOverdue, setListMaintenOverdue] = useState([])
    const [paginatiion, setPagination] = useState({ pagesize: 5, totalRows: 20 })
    const [currentPage, setCurrentPage] = useState(0);
    useEffect(() => {
        const fetchListMaintenanceOverude = async () => {
            try {
                const res_1 = await axios({
                    url: `http://localhost:8080/api/overdueasset?pageNo=${currentPage}`,
                    method: "GET"
                })
                let { list, pagesize, totalRows } = res_1.data;
                const res_2 = await axios({
                    url: "http://localhost:8080/api/maintenance/all",
                    method: "GET"
                })

                const list_overdue = res_2.data;
                setPagination({ pagesize, totalRows });

                let main_list = [];
                for (const i of list) {
                    for (const j of list_overdue) {
                        if (i.id_asset === j.id) {
                            let overdue_day = i.overdue_num_day;
                            main_list.push({ ...j, overdue_day });
                            break;
                        }
                    }
                }
                setListMaintenOverdue(main_list);

            } catch (err) {
                console.log(err);
            }
        }
        fetchListMaintenanceOverude();
    }, [currentPage])

    const pagingHandle = (page) => {
        setCurrentPage(page);
    }

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-6">
                    <div className="row">
                        <div className="col">
                            <AssetWithNoMaintenanceDue assetStatus={assetStatus} />
                        </div>
                        <div className="col">
                            <AssetMaintenanceIsDue assetStatus={assetStatus} />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <PastMaintenanceChart overdueInfo={overdueInfo} intimeInfo={intimeInfo} />
                </div>
                <div className="col-md-6">
                    <ListMaintenanceOverdue list={listMaintenOverdue} paginatiion={paginatiion}
                        pagingHandle={pagingHandle}
                        currentPage={currentPage} />
                </div>
                <div className="col-md-6">
                    <MapMaintenanceOverdue list={listMaintenOverdue} />
                </div>
            </div>
        </div>
    )
}
