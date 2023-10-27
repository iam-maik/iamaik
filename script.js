function clock() {
    var stunden = jetzt.getHours();
    var minuten = jetzt.getMinutes();
    var sekunden = jetzt.getSeconds();

    minuten = minuten < 10 ? '0' + minuten : minuten;
    sekunden = sekunden < 10 ? '0' + sekunden : sekunden;

    var zeitString = stunden + ':' + minuten + ':' + sekunden;

    console.log('clock: ' + zeitString)

    setInterval(clock, 1000)
}