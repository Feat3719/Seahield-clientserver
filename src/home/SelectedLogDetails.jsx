import React from 'react';
import style from './CCTV.Module.css';

function SelectedLogDetails({ selectedLog, onClose }) {
    return (
        <div className={style.modalBackground}>
            <div className={style.modalContainer}>
                <div className={style.modalHeader}>
                    <h2>Selected CCTV Log Details</h2>
                    <button onClick={onClose} className={style.closeButton}>닫기</button>
                </div>
                <div className={style.modalContent}>
                    <table className={style.dataTable}>
                        <thead>
                            <tr>
                                {selectedLog && Object.keys(selectedLog).map((key, index) => (
                                    <th key={index}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {selectedLog && (
                                <tr>
                                    {Object.values(selectedLog).map((value, index) => (
                                        <td key={index}>{value}</td>
                                    ))}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SelectedLogDetails;
