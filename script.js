// API Anahtarın (Mevcut anahtarını koruduk)
const API_KEY = "5ffb3b903316fff392da8574";
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair`;

const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const resultText = document.getElementById("result-text");

// Ana fonksiyon: Verileri çekip ekrana yazar
async function convertCurrency() {
    const amount = amountInput.value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (amount === "" || amount <= 0) {
        resultText.innerText = "Lütfen geçerli bir miktar girin";
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/${from}/${to}`);
        const data = await response.json();
        
        if (data.result === "success") {
            const rate = data.conversion_rate;
            const total = (amount * rate).toFixed(2);
            resultText.innerText = `${amount} ${from} = ${total} ${to}`;
        } else {
            resultText.innerText = "Kur verisi alınamadı.";
        }
    } catch (error) {
        resultText.innerText = "Hata oluştu!";
    }
}

// Ok butonuna basılınca sağ sol takas eden fonksiyon
function swapCurrencies() {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    // Takas sonrası anlık olarak yeni kuru hesapla
    convertCurrency();
}

// --- OTOMATİK TETİKLEYİCİLER (ENTER'A GEREK BIRAKMAYAN KISIM) ---
// Kullanıcı miktarı değiştirdikçe çalıştır
amountInput.addEventListener("input", convertCurrency);
// Kullanıcı kaynak birimi değiştirdikçe çalıştır
fromCurrency.addEventListener("change", convertCurrency);
// Kullanıcı hedef birimi değiştirdikçe çalıştır
toCurrency.addEventListener("change", convertCurrency);

// Sayfa ilk açıldığında da 1 GBP kaç TRY otomatik hesaplasın
window.addEventListener("DOMContentLoaded", convertCurrency);