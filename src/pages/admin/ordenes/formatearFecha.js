export function formatearFecha(fechaString) {
    const fecha = new Date(fechaString);
    const año = fecha.getFullYear();
    let mes = fecha.getMonth() + 1; 
    let dia = fecha.getDate();
  

    mes = mes < 10 ? `0${mes}` : mes;
    dia = dia < 10 ? `0${dia}` : dia;
  

    return `${dia}-${mes}-${año}`;
  }