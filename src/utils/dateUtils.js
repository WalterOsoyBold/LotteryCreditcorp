export const formatDate = (date) => {
    const monthNames = ["Enero", "Febrero", "Marzo", "April", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ];
    try {
        return `${new Date(date / 1).getDate()} / ${monthNames[new Date(date / 1).getMonth()]} / ${new Date(date / 1).getFullYear()}`;
    } catch (err) {
        return '';
    }
};