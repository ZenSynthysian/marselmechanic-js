// utils/formatCurrency.js
export const formatCurrency = (number, currency = 'IDR') => {
    if (isNaN(number)) return '-';

    const options = {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    };

    // Gunakan toLocaleString untuk format angka dengan pemisah ribuan
    return number.toLocaleString('id-ID', options);
};
