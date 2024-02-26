function FormatDate(date) {
    return (
        date[0] + "년 " + date[1] + "월 " + date[2] + "일"
        // date.slice(0, 4) +
        // "년 " +
        // date.slice(4, 6) +
        // "월 " +
        // date.slice(6) +
        // "일"
    );
}

export default FormatDate;
