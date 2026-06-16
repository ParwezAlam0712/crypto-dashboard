const topCoins = document.getElementById("topCoins");

/*
==================================
ISSE KYA HOGA ?
==================================

Global market data bhi import hogi.
*/

import {
    fetchCoin,
    fetchHistory,
    fetchMarketCoins,
    fetchGlobalData
} from "./api.js";

import { loadFavorites, saveFavorite }
    from "./utils.js";

const results = document.getElementById("results");
const search = document.getElementById("search");
const favList = document.getElementById("favList");
const loader = document.getElementById("loader");
/*
==================================
DARK MODE BUTTON
==================================

Theme toggle button ko
JavaScript access karegi.
*/

const themeToggle = document.getElementById("themeToggle");
const searchResults = document.getElementById("searchResults");

let chart;
let portfolioChart;

/*
==================================
MARKET WIDGET ELEMENTS
==================================

Top Gainers aur Top Losers
list ko control karne ke liye.
*/

const gainersList =
    document.getElementById("gainersList");

const losersList =
    document.getElementById("losersList");

/*
==================================
MARKET STATS ELEMENTS
==================================

Stats cards ko access karne ke liye.
*/

const marketCap =
    document.getElementById("marketCap");

const volume =
    document.getElementById("volume");

const btcDominance =
    document.getElementById("btcDominance");

const fearGreed =
    document.getElementById("fearGreed");

/*
==================================
PORTFOLIO ELEMENTS
==================================

ISSE KYA HOGA ?

Portfolio inputs aur button ko
JavaScript access karegi.
*/

const btcQty =
    document.getElementById("btcQty");

const ethQty =
    document.getElementById("ethQty");

const savePortfolioBtn =
    document.getElementById("savePortfolio");

const portfolioValue =
    document.getElementById("portfolioValue");

const resetPortfolioBtn =
    document.getElementById("resetPortfolio");

/*
  Coin Render Function
*/
function renderCoin(data) {

    console.log(data);
    results.innerHTML = `
        <div class="card">

            <h2>
                ${data.name}
                ${data.symbol ? data.symbol.toUpperCase() : "N/A"}
            </h2>

            <p>
                Price:
                $${data.market_data.current_price.usd}
            </p>

            <p>
                24h Change:
                ${data.market_data.price_change_percentage_24h}%
            </p>

            <p>
    Market Cap:
    $${data.market_data.market_cap.usd.toLocaleString()}
</p>

            <button id="favBtn">
             Add To Favorites
            </button>
        </div>
    `;
    document
        .getElementById("favBtn")
        .addEventListener("click", () => {

            saveFavorite(data.id);

            renderFavorites();
        });
}

/*
  Load Coin
*/
async function loadCoin(coin = "bitcoin") {

    /*
    Spinner Show
    */

    loader.classList.remove("hidden");

    try {

        const data =
            await fetchCoin(coin);

        renderCoin(data);

        //  await renderChart(coin);

    } catch (error) {

        results.innerHTML =
            `<p class="error">Coin Not Found</p>`;

        console.error(error);

    } finally {

        /*
        Spinner Hide
        */

        loader.classList.add("hidden");
    }
}

function renderFavorites() {

    const favorites = loadFavorites();

    favList.innerHTML =
        favorites
            .map(
                coin =>
                    `<li class="favorite-coin"
                        data-coin="${coin}">
                        ${coin}
                    </li>`
            )
            .join("");

    document
        .querySelectorAll(".favorite-coin")
        .forEach(item => {

            item.addEventListener(
                "click",
                () => {

                    loadCoin(
                        item.dataset.coin
                    );

                }
            );

        });

}


async function renderTopCoins() {

    const coins =
        await fetchMarketCoins();

    console.log(coins);

    topCoins.innerHTML =
        coins
            .slice(0, 5)
            .map(
                coin => `
            <div class="top-coin"
                 data-coin="${coin.id}">

                <div>
                    <strong>
                        ${coin.symbol.toUpperCase()}
                    </strong>
                </div>

                <div>
                    $${coin.current_price}
                </div>

            </div>
        `
            )
            .join("");

    document
        .querySelectorAll(".top-coin")
        .forEach(card => {

            card.addEventListener(
                "click",
                () => {

                    loadCoin(
                        card.dataset.coin
                    );

                }
            );

        });

}

async function renderMarketMovers() {

    const coins =
        await fetchMarketCoins();

    const gainers =
        [...coins]
            .sort(
                (a, b) =>
                    b.price_change_percentage_24h -
                    a.price_change_percentage_24h
            )
            .slice(0, 5);

    const losers =
        [...coins]
            .sort(
                (a, b) =>
                    a.price_change_percentage_24h -
                    b.price_change_percentage_24h
            )
            .slice(0, 5);

    gainersList.innerHTML =
        gainers
            .map(
                coin => `
            <li>
                🟢 ${coin.symbol.toUpperCase()}
                (${coin.price_change_percentage_24h.toFixed(2)}%)
            </li>
        `
            )
            .join("");

    losersList.innerHTML =
        losers
            .map(
                coin => `
            <li>
                🔴 ${coin.symbol.toUpperCase()}
                (${coin.price_change_percentage_24h.toFixed(2)}%)
            </li>
        `
            )
            .join("");
}
/*
==================================
LIVE MARKET STATS
==================================

Market overview cards fill karega.
*/
fearGreed.textContent = "72";
marketCap.textContent = "$2 Trillion";
volume.textContent = "$85 Billion";
btcDominance.textContent = "56.40%";
async function renderMarketStats() {

    console.log("Market Stats Running");
    try {

        const data =
            await fetchGlobalData();

        marketCap.textContent =
            "$" +
            Math.round(
                data.data.total_market_cap.usd /
                1000000000000
            ) +
            " Trillion";

        volume.textContent =
            "$" +
            Math.round(
                data.data.total_volume.usd /
                1000000000
            ) +
            " Billion";

        btcDominance.textContent =
            data.data.market_cap_percentage
                .btc
                .toFixed(2) + "%";

        /*
        Temporary value

        Later API se live
        Fear & Greed laayenge.
        */

        fearGreed.textContent =
            "72";

    } catch (error) {

        console.error(
            "Stats Error",
            error
        );
    }
}

/*
==================================
SAVE PORTFOLIO
==================================

ISSE KYA HOGA ?

BTC aur ETH quantity
LocalStorage me save hogi.
*/

function savePortfolio() {

    const portfolio = {

        btc:
            btcQty.value || 0,

        eth:
            ethQty.value || 0
    };

    localStorage.setItem(
        "portfolio",
        JSON.stringify(portfolio)
    );
}

function resetPortfolio() {

    localStorage.removeItem("portfolio");

    btcQty.value = "";
    ethQty.value = "";

    portfolioValue.textContent =
        "Total Value: $0";

    if (portfolioChart) {
        portfolioChart.destroy();
    }
}

/*
==================================
LOAD PORTFOLIO
==================================

ISSE KYA HOGA ?

Page refresh ke baad bhi
saved values wapas aayengi.
*/

function loadPortfolio() {

    const savedPortfolio =
        JSON.parse(
            localStorage.getItem(
                "portfolio"
            )
        );

    if (!savedPortfolio) return;

    btcQty.value =
        savedPortfolio.btc;

    ethQty.value =
        savedPortfolio.eth;
}

/*
==================================
CALCULATE PORTFOLIO VALUE
==================================

ISSE KYA HOGA ?

BTC aur ETH ki current
market value calculate karega.
*/

async function calculatePortfolioValue() {

    try {

        const btcData =
            await fetchCoin("bitcoin");

        const ethData =
            await fetchCoin("ethereum");

        const btcPrice =
            btcData.market_data
                .current_price.usd;

        const ethPrice =
            ethData.market_data
                .current_price.usd;

        const btcValue =
            Number(
                btcQty.value || 0
            ) * btcPrice;

        const ethValue =
            Number(
                ethQty.value || 0
            ) * ethPrice;

        const total =
            btcValue + ethValue;

        portfolioValue.textContent =
            `Total Value: $${total.toLocaleString()}`;

        renderPortfolioChart(
            btcQty,
            ethQty
        );

    } catch (error) {

        console.error(
            "Portfolio Error",
            error
        );
    }
}


/*
async function renderChart(coin) {

    const history =
        await fetchHistory(coin);

    const ctx =
        document
            .getElementById("priceChart")
            .getContext("2d");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {

        type: "line",

        data: {

            labels:
                history.prices.map(
                    p =>
                        new Date(p[0])
                            .toLocaleDateString()
                ),

            datasets: [{

                label:
                    `${coin} Price`,

                data:
                    history.prices.map(
                        p => p[1]
                    )
            }]
        }
    });
}


/*
==================================
RENDER MARKET WIDGETS
==================================

Market data fetch karke
Top Gainers aur Top Losers
screen par dikhayega.
*/

async function renderMarketWidgets() {

    try {

        const coins =
            await fetchMarketCoins();

        /*
        Top Gainers
        */

        const gainers =
            [...coins]
                .sort(
                    (a, b) =>
                        b.price_change_percentage_24h -
                        a.price_change_percentage_24h
                )
                .slice(0, 5);

        /*
        Top Losers
        */

        const losers =
            [...coins]
                .sort(
                    (a, b) =>
                        a.price_change_percentage_24h -
                        b.price_change_percentage_24h
                )
                .slice(0, 5);

        /*
        Render Gainers
        */

        gainersList.innerHTML =
            gainers
                .map(
                    coin =>

                        `<li>
                    ${coin.name}
                    (${coin.price_change_percentage_24h.toFixed(2)}%)
                </li>`
                )
                .join("");

        /*
        Render Losers
        */

        losersList.innerHTML =
            losers
                .map(
                    coin =>

                        `<li>
                    ${coin.name}
                    (${coin.price_change_percentage_24h.toFixed(2)}%)
                </li>`
                )
                .join("");

    } catch (error) {

        console.error(
            "Market Widget Error",
            error
        );
    }
}


/*
  Search Event
*/
/*search.addEventListener("keypress", async (event) => {

    if (event.key === "Enter") {

        const coinName =
            search.value.trim().toLowerCase();

        if (!coinName) return;

        loadCoin(coinName);
    }
});

/*
  Initial Coin
*/
loadCoin();
renderFavorites();

/*
==================================
LOAD DASHBOARD DATA
==================================
*/

//renderMarketWidgets();

//renderMarketStats();
loadTradingView();
renderTopCoins();
renderMarketMovers();
/*
==================================
DARK MODE TOGGLE + SAVE
==================================

Theme change karne ke saath
LocalStorage me bhi save karega.
*/

/*
==================================
LOAD SAVED PORTFOLIO
==================================
*/

calculatePortfolioValue();
themeToggle.addEventListener(
    "click",
    () => {

        document.body
            .classList
            .toggle("dark-mode");

        /*
        Check current theme
        */

        const isDarkMode =
            document.body
                .classList
                .contains("dark-mode");

        /*
        Save theme
        */

        localStorage.setItem(
            "darkMode",
            isDarkMode
        );
    }
);

/*
==================================
RESTORE SAVED THEME
==================================

Page load hote hi
saved theme apply hogi.
*/

const savedTheme =
    localStorage.getItem("darkMode");

if (savedTheme === "true") {

    document.body
        .classList
        .add("dark-mode");
}

/*
==================================
SAVE + CALCULATE
==================================

ISSE KYA HOGA ?

Save karte hi portfolio
value bhi update hogi.
*/

savePortfolioBtn.addEventListener(
    "click",
    async () => {

        savePortfolio();

        await calculatePortfolioValue();

        alert(
            "Portfolio Saved Successfully"
        );
    }
);

resetPortfolioBtn.addEventListener(
    "click",
    resetPortfolio
);

function renderPortfolioChart(btcQty, ethQty) {

    const ctx =
        document
            .getElementById("portfolioChart")
            .getContext("2d");

    if (portfolioChart) {
        portfolioChart.destroy();
    }

    portfolioChart = new Chart(ctx, {

        type: "doughnut",

        data: {

            labels: [
                "Bitcoin",
                "Ethereum"
            ],

            datasets: [{
                data: [
                    btcQty,
                    ethQty
                ],

                backgroundColor: [
                    "#36A2EB",
                    "#FF6384"
                ]
            }]
        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    position: "top"
                }
            }
        }
    });
}

function loadTradingView() {

    new TradingView.widget({

        width: "100%",
        height: 720,

        symbol: "BINANCE:BTCUSDT",

        interval: "60",

        timezone: "Etc/UTC",

        theme: "dark",

        style: "1",

        locale: "en",

        container_id: "tradingview_chart"

    });

}

search.addEventListener(
    "input",
    async () => {

        const value =
            search.value.toLowerCase();

        if (value.length < 2) {

            searchResults.innerHTML = "";
            return;
        }

        const coins =
            await fetchMarketCoins();

        const filtered =
            coins.filter(
                coin =>
                    coin.name
                        .toLowerCase()
                        .includes(value)
            );

        searchResults.innerHTML =
            filtered
                .slice(0, 5)
                .map(
                    coin => `
          <div
            class="search-item"
            data-id="${coin.id}"
          >
            ${coin.name} (${coin.symbol.toUpperCase()})
          </div>
        `
                )
                .join("");

        document
            .querySelectorAll(".search-item")
            .forEach(item => {

                item.addEventListener(
                    "click",
                    () => {

                        loadCoin(
                            item.dataset.id
                        );

                        searchResults.innerHTML = "";
                        search.value = "";
                    }
                );
            });
    }
);