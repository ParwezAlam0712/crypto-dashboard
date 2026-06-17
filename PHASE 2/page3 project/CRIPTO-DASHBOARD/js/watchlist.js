const coinInput = document.getElementById("coinInput");
const addCoinBtn = document.getElementById("addCoinBtn");
const watchlist = document.getElementById("watchlist");

addCoinBtn.addEventListener("click", () => {

    const coin = coinInput.value.trim();

    if (!coin) {
        alert("Enter coin name");
        return;
    }

    const li = document.createElement("li");

    li.textContent = coin;

    watchlist.appendChild(li);

    coinInput.value = "";

});