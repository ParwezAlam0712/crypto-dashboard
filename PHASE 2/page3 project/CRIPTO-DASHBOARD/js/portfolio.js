const btcQty =
    document.getElementById("btcQty");

const ethQty =
    document.getElementById("ethQty");

const saveBtn =
    document.getElementById("savePortfolio");

const resetBtn =
    document.getElementById("resetPortfolio");

const portfolioValue =
    document.getElementById("portfolioValue");

saveBtn.addEventListener("click", () => {

    const btc =
        Number(btcQty.value) || 0;

    const eth =
        Number(ethQty.value) || 0;

    const total =
        (btc * 65000) +
        (eth * 1800);

    portfolioValue.textContent =
        `Total Value: $${total}`;

});

resetBtn.addEventListener("click", () => {

    btcQty.value = "";
    ethQty.value = "";

    portfolioValue.textContent =
        "Total Value: $0";

});