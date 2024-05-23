document.getElementById("encurtar").addEventListener('click', () =>
    {
        const longUrl = document.getElementById("link").value
        const shortUrlElement = document.getElementById("result");

        const ApiUrl = `https://localhost:7044/LinkShortner/Link-Shortner?urlOriginal=${encodeURIComponent(longUrl)}`;

        fetch(ApiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.shortUrl) {
                shortUrlElement.textContent = `${data.shortUrl}`;
            } else {
                shortUrlElement.textContent = "Erro ao encurtar a URL.";
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            shortUrlElement.textContent = "Erro ao encurtar a URL.";
        });
    }
)

