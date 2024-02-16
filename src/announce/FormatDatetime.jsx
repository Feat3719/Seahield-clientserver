function FormatDate(date) {
    return (
        date.slice(0, 4) +
        "년 " +
        date.slice(4, 6) +
        "월 " +
        date.slice(6) +
        "일"
    );
}

export default FormatDate;
