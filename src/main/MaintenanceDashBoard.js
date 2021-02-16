import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ListMaintenanceOverdue from './ListMaintenanceOverdue'
import MapMaintenanceOverdue from './MapMaintenanceOverdue';

export default function MaintenanceDashBoard() {

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
                // console.log(main_list);


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
        <div className="container">
            <div className="row">
                <div className="col-md-6">

                </div>
                <div className="col-md-6">

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
