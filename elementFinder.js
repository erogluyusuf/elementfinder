(async function() {
    // Kullanıcıya ID mi yoksa CLASS mı aramak istediğini sor
    let selectorType = prompt("ID mi, CLASS mı aramak istiyorsun? (id/class)").toLowerCase();

    if (selectorType !== "id" && selectorType !== "class") {
        console.log("❌ Geçersiz seçim! 'id' veya 'class' yazmalısın.");
        return;
    }

    // ID veya CLASS ismini sor
    let selectorName = prompt(`Aramak istediğin ${selectorType} adını yaz:`);

    if (!selectorName) {
        console.log("❌ Boş değer girdin!");
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
            clearInterval(interval); // Aramayı durdur
        } else {
            console.log(`⏳ Bekleniyor... (${attempts + 1})`);
        }

        attempts++;
        if (attempts >= 12) {  // 6 saniye (500ms x 12) sonra durdur
            console.log(`❌ Eleman bulunamadı! (${selectorType.toUpperCase()}="${selectorName}")`);
            clearInterval(interval);
        }
    }, 500);
})();
