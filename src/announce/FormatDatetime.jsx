function FormatDate(date) {
    return date.slice(0, 4) + ". " + date.slice(4, 6) + ". " + date.slice(6);
}

export default FormatDate;
