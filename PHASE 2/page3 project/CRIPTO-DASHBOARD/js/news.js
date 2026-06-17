const newsContainer =
document.getElementById("newsContainer");

const demoNews = [

    {
        title: "Bitcoin Surges Past Key Resistance",
        source: "Crypto News"
    },

    {
        title: "Ethereum ETF Sees Increased Demand",
        source: "Market Watch"
    },

    {
        title: "Solana Network Activity Hits New High",
        source: "Blockchain Daily"
    }

];

demoNews.forEach(news => {

    newsContainer.innerHTML += `
        <div class="card">

            <h3>${news.title}</h3>

            <p>${news.source}</p>

        </div>
    `;

});