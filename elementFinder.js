const elementFinder = {
    // Eleman arama fonksiyonu
    startSearch: function() {
        return new Promise((resolve, reject) => {
            let attempts = 0;

            const askForSelector = () => {
                const selectorType = prompt("ID mi, class mı aramak istiyorsunuz?").toLowerCase();
                if (selectorType !== "id" && selectorType !== "class") {
                    alert("Geçersiz seçim! Lütfen 'id' veya 'class' yazın.");
                    return askForSelector();
                }

                const selectorName = prompt(`Aramak istediğiniz ${selectorType} adını yazın:`);
                if (!selectorName) {
                    alert("Geçersiz giriş! Lütfen geçerli bir id veya class adı girin.");
                    return askForSelector();
                }

                // Arama işlemi başlatılıyor
                this.searchElement(selectorType, selectorName, resolve, reject);
            };

            askForSelector();  // Seçim istemek için başlat
        });
    },

    // Eleman arama işlemi
    searchElement: function(selectorType, selectorName, resolve, reject) {
        let element;

        const interval = setInterval(() => {
            if (selectorType === "id") {
                element = document.getElementById(selectorName);
            } else if (selectorType === "class") {
                element = document.querySelector(`.${selectorName}`);
            }

            if (element) {
                console.log("✅ Eleman bulundu!");
                console.log(element.outerHTML);
                clearInterval(interval);  // Arama durduruluyor
                resolve(element);
            } else {
                console.log(`⏳ Bekleniyor... (${attempts + 1})`);
            }

            attempts++;
            if (attempts >= 12) {  // 6 saniye (500ms x 12)
                console.log("❌ Eleman bulunamadı!");
                clearInterval(interval);
                reject("Eleman bulunamadı");
            }
        }, 500);  // 500ms arayla kontrol et
    }
};

// Kütüphaneyi global olarak kullanıma sunuyoruz
window.elementFinder = elementFinder;
