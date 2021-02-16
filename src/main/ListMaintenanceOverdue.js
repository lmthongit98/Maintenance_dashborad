import React from 'react'

export default function ListMaintenanceOverdue(props) {

    const { list, paginatiion, pagingHandle, currentPage } = props;
    const totalPages = Math.ceil(paginatiion.totalRows / paginatiion.pagesize);
    const renderListOverdue = () => {
        return (
            list.map((item, index) => {
                return (
                    <tr key={index}>
                        <td className="text-primary">{item.asset}</td>
                        <td>{item.program}</td>
                        <td>{item.overdue_day}d</td>
                    </tr>
                )
            })
        )
    }

    // const renderPagination = () => {
    //     const totalPages = Math.ceil(paginatiion.totalRows / paginatiion.pagesize);
    //     let listButton = [];
    //     for (let i = 0; i < totalPages; i++) {
    //         let x = (<button onClick={() => { pagingHandle(i) }} key={i} className="btn btn-primary mx-2">{i}</button>)
    //         listButton.push(x);
    //     }

    //     return listButton;
    // }



    return (
        <div style={{ height: '300px' }}>
            <h5>Maintenance due</h5>
            <table style={{ height: '100%' }} className="table">
                <thead>
                    <tr>
                        <th>Asset</th>
                        <th>Maintenance program</th>
                        <th>Overdue</th>
                    </tr>
                </thead>
                <tbody>
                    {renderListOverdue()}
                </tbody>
            </table>
            <div className="text-right">
                {/* {renderPagination()} */}
                <button disabled={currentPage > 0 ? false : true} onClick={() => { pagingHandle(currentPage - 1) }} className="btn btn-primary mx-2">Pre</button>
                <button className="btn btn-primary mx-2">{currentPage}</button>
                <button disabled={currentPage < totalPages - 1 ? false : true} onClick={() => { pagingHandle(currentPage + 1) }} className="btn btn-primary mx-2">Nex</button>
            </div>
        </div >
    )
}
