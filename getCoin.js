const fs = require('fs');
var selectedPars = [];
var coins = [];
function getCoin() {
    let url = "https://api.binance.com/api/v3/ticker/price";
    function httpGet(theUrl) {
        let xmlhttp;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                return xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", theUrl, false);
        xmlhttp.send();
        return xmlhttp.response;
    }
    let result = httpGet(url);
    coins = JSON.parse(result);
    fs.writeFileSync("./data.json", result);
    return coins;
}
function searchJ(arr, toSearch) {
    for (var i = 0; i < arr.length; i++) {
        for (key in arr[i]) {
            if (arr[i][key].indexOf(toSearch) != -1) {
                return arr[i];
            }
        }
    }

}
function getUSDTPar(arr) {
    var usdtPar = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].symbol.endsWith("USDT") == true) {
            usdtPar.push(arr[i]);
        }
    }
    return usdtPar;
}
function writePars(arr) {
    let div = document.getElementById("checkbox");
    for (i = 0; i < arr.length; i++) {
        div.innerHTML += arr[i].symbol + '<input type="checkbox" name"boxes" value="' + arr[i].symbol + '"><br>';
    }
}
function submitPars() {
    var checks = document.querySelectorAll('input[type="checkbox"]:checked')
    for (i = 0; i < checks.length; i++) {
        selectedPars.push(checks[i].value);
    }
    console.log(selectedPars);
    writePrices(listSelected(selectedPars));
}
function listSelected(arr) {
    var selectObjects = [];
    for (i = 0; i < arr.length; i++) {
        selectObjects.push(searchJ(coins, arr[i]));
    }
    return selectObjects;
}
function writePrices(arr) {
    var body = document.getElementById("body");
    body.innerHTML = "";
    for (i = 0; i < arr.length; i++) {
        body.innerHTML += arr[i].symbol + "<br>" + arr[i].price + "<hr>";
    }
}
var allCoins = getCoin();
var usdtPar = getUSDTPar(allCoins);
writePars(usdtPar);