const getFormattedDateTime = () => {
    const dateNow = new Date();

    const year = dateNow.getFullYear();
    const month = String(dateNow.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JS
    const day = String(dateNow.getDate()).padStart(2, '0');
    const hours = String(dateNow.getHours()).padStart(2, '0');
    const minutes = String(dateNow.getMinutes()).padStart(2, '0');
    const seconds = String(dateNow.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

module.exports = getFormattedDateTime;
