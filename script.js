function clock() {
    var stunden = getHours();
    var minuten = getMinutes();
    var sekunden = getSeconds();

    minuten = minuten < 10 ? '0' + minuten : minuten;
    sekunden = sekunden < 10 ? '0' + sekunden : sekunden;

    var zeitString = stunden + ':' + minuten + sekunden;

    console.log('clock: ' + zeitString)

    setInterval(clock, 1000)
}