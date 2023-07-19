const now = new Date(); // Erstellt ein Date-Objekt mit der aktuellen Zeit
const hours = String(now.getHours()).padStart(2, '0'); // Holt die Stunden (0-23) und fügt ggf. eine führende Null hinzu
const minutes = String(now.getMinutes()).padStart(2, '0'); // Holt die Minuten (0-59) und fügt ggf. eine führende Null hinzu
const seconds = String(now.getSeconds()).padStart(2, '0'); // Holt die Sekunden (0-59) und fügt ggf. eine führende Null hinzu

const currentTimeString = `${hours}:${minutes}:${seconds}`; // Erstellt einen String im Format "Stunden:Minuten:Sekunden"
document.title = currentTimeString; // Setzt den Wert des <title>-Elements auf die aktuelle Zeit
