const fs = require('fs');
//Tüm coin bilgilerini çeker coins nesnesine ve Json a kaydeder
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
    console.log("Tüm Coinler çekildi");
    fs.writeFileSync("./data.json", result);
    return coins;
}
//Verilen nesnede verilen stringi arar
function searchJ(arr, toSearch) {
    for (var i = 0; i < arr.length; i++) {
        for (key in arr[i]) {
            if (arr[i][key].indexOf(toSearch) != -1) {
                return arr[i];//!!!!!
            }
        }
    }
}
//Tüm coin listesinde USDT paritesinde olanları çeker
function getUSDTPar(coins) {
    var usdtPar = [];
    for (var i = 0; i < coins.length; i++) {
        if (coins[i].symbol.endsWith("USDT") == true) {
            usdtPar.push(coins[i]);
        }
    }
    return usdtPar;
}
//Tüm USDT paritesindeki coinleri checkbox şeklinde listeler
function writePars(usdtPar) {
    let div = document.getElementById("checkbox");
    for (var i = 0; i < usdtPar.length; i++) {
        div.innerHTML += usdtPar[i].symbol + '<input type="checkbox" name"boxes" value="' + usdtPar[i].symbol + '"><br>';
    }
}
//Seçilen işlem çiftlerini içeren checkbox ın value sunu diziye kaydeder
function submitPars() {
    var selectedPars = [];
    var checks = document.querySelectorAll('input[type="checkbox"]:checked')
    for (var i = 0; i < checks.length; i++) {
        selectedPars.push(checks[i].value);
    }
    console.log(selectedPars);
    return selectedPars;
}
//Seçilen diziyi coinlerin içerisinden çekip başka bir dizide tutar
function listSelected(selectedPars) {
    var selectObjects = [];
    for (var i = 0; i < selectedPars.length; i++) {
        selectObjects.push(searchJ(coins, selectedPars[i]));
    }
    return selectObjects;
}
//Tüm istenen coinleri ekrana yazdırır
function writePrices(selectObjects) {
    var body = document.getElementById("body");
    body.innerHTML = "";
    for (i = 0; i < selectObjects.length; i++) {
        body.innerHTML += selectObjects[i].symbol + "<br>" + selectObjects[i].price + "<hr>";
    }
}
function loop() {
    setInterval(function () {
        getCoin();
        getUSDTPar();
        writePrices();
    }, 3000)
}
var coins = getCoin();
var usdtPar = getUSDTPar(coins);
writePars(usdtPar);
document.getElementById("sbm").addEventListener("click", function (event) {
    var selectedPars = submitPars();
    var selectObjects = listSelected(selectedPars);
    writePrices(selectObjects);
})

//Key is not defined listSelected() daki coins de bir sıkıntı olabilir 