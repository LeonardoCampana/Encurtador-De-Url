document.getElementById("encurtar").addEventListener('click', () =>
    {
        const longUrl = document.getElementById("link").value
        const shortUrlElement = document.getElementById("result");
        
        const numLocal = 7044

        //substitua o numLocal para funcionar baseado no seu numero de localhost(você pode verificar ao inicializar a api)
        const ApiUrl = `https://localhost:${numLocal}/LinkShortner/Link-Shortner?urlOriginal=${longUrl}`;

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

