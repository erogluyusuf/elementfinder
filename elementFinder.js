const elementFinder = {
    startSearch: function() {
        return new Promise((resolve, reject) => {
            let selectorType = prompt("ID mi, CLASS mı aramak istiyorsun? (id/class)").toLowerCase();

            if (selectorType !== "id" && selectorType !== "class") {
                console.error("❌ Geçersiz seçim! 'id' veya 'class' yazmalısın.");
                reject("Geçersiz seçim");
                return;
            }

            let selectorName = prompt(`Aramak istediğin ${selectorType} adını yaz:`);

            if (!selectorName) {
                console.error("❌ Boş değer girdin!");
                reject("Boş değer");
                return;
            }

            console.log(`⏳ ${selectorType.toUpperCase()}="${selectorName}" için tarama başlatılıyor...`);

            let attempts = 0;
            let interval = setInterval(() => {
                let element = (selectorType === "id") 
                    ? document.getElementById(selectorName) 
                    : document.querySelector(`.${selectorName}`);

                if (element) {
                    console.log(`✅ Eleman bulundu! (${selectorType.toUpperCase()}="${selectorName}")`);
                    console.log(element.outerHTML);
                    clearInterval(interval);
                    resolve(element); // Elemanı döndür
                } else {
                    console.log(`⏳ Bekleniyor... (${attempts + 1})`);
                }

                attempts++;
                if (attempts >= 12) {  
                    console.error(`❌ Eleman bulunamadı! (${selectorType.toUpperCase()}="${selectorName}")`);
                    clearInterval(interval);
                    reject("Eleman bulunamadı");
                }
            }, 500);
        });
    }
};

// Modül olarak kullanmak için (isteğe bağlı)
if (typeof module !== "undefined") {
    module.exports = elementFinder;
}
