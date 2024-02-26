import React from 'react';
import style from './MonitoringModalPlace.module.css';

function MonitoringModalPlace({ data, title, onRowClick, selectedId }) {
    return (
        <div className={style.monitoringmodalplace_1}>
            <div className={style.monitoringmodalplace_title}>
                <p className={style.monitoringplace_title_text}>{title}</p>
            </div>
            <table className={style.monitoringmodalplace_table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>지역명</th>
                        <th>상세 위치</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(([id, region, detail], index) => (
                        <tr
                            key={index}
                            onClick={() => onRowClick(id)}
                            className={selectedId === id ? style.selectedRow : ''}
                        >
                            <td>{id}</td>
                            <td>{region}</td>
                            <td>{detail}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MonitoringModalPlace;
