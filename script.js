// Buraya ExchangeRate-API'den aldığın anahtarı yapıştır
const API_KEY = "5ffb3b903316fff392da8574";
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair`;

// HTML elemanlarını seçiyoruz
const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const convertBtn = document.getElementById("convert-btn");
const resultText = document.getElementById("result");

// Hesaplama yapan fonksiyon
async function calculateExchange() {
    const amount = amountInput.value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (amount === "" || amount <= 0) {
        resultText.innerText = "Lütfen geçerli bir miktar girin.";
        return;
    }

    resultText.innerText = "Döviz kuru alınıyor...";

    try {
        // API'ye istek atıyoruz
        const response = await fetch(`${BASE_URL}/${from}/${to}`);
        const data = await response.json();

        if (data.result === "success") {
            const rate = data.conversion_rate;
            const total = (amount * rate).toFixed(2);
            
            // Sonucu ekrana yazdırıyoruz
            resultText.innerText = `${amount} ${from} = ${total} ${to}`;
        } else {
            resultText.innerText = "Kur verisi alınamadı. API anahtarını kontrol edin.";
        }
    } catch (error) {
        resultText.innerText = "Bir hata oluştu. İnternet bağlantınızı kontrol edin.";
        console.error(error);
    }
}

// Butona tıklandığında hesapla
convertBtn.addEventListener("click", calculateExchange);

// Sayfa ilk açıldığında da otomatik bir kere hesaplasın
window.addEventListener("load", calculateExchange);