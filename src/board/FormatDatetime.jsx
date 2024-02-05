import React from "react";

function FormatDatetime(datetimeList) {
    const [year, month, day, hour, minute] = datetimeList;
    const datetime = new Date(Date.UTC(year, month - 1, day, hour, minute));
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Seoul",
    };
    return new Intl.DateTimeFormat("ko-KR", options).format(datetime);
}

export default FormatDatetime;
