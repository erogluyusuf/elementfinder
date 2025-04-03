# Element Finder Script

Bu JavaScript betiği, kullanıcıdan bir ID veya CLASS değeri alarak belirtilen HTML elemanını sayfada arar ve bulur. Kullanıcı, aramak istediği öğenin ID veya CLASS bilgisini girdikten sonra, betik belirtilen öğeyi bulana kadar periyodik olarak arama yapar. Arama 6 saniye (12 deneme) sonunda durur.

## Özellikler

- **ID veya CLASS seçimi**: Kullanıcıdan, aramak istediği elemanın ID veya CLASS'ını seçmesi istenir.
- **Periyodik arama**: Betik, her yarım saniyede bir (500 ms) arama yapar.
- **Sonuç gösterimi**: Öğenin bulunduğu takdirde, HTML öğesi `outerHTML` olarak konsola yazdırılır.
- **Zaman aşımı**: 6 saniye boyunca (12 deneme) öğe bulunamazsa, arama durdurulur ve konsola hata mesajı yazdırılır.

## Kullanım

1. **Betiği tarayıcınıza ekleyin**:
    - Betiği bir HTML dosyasına veya tarayıcı konsoluna ekleyebilirsiniz.
    - Betik çalıştırıldığında, kullanıcıdan ID mi yoksa CLASS mı aramak istediği sorulacaktır.
    
2. **Bir ID veya CLASS girin**:
    - Aramak istediğiniz öğenin ID veya CLASS adını girmeniz istenir.
    
3. **Sonuçları görün**:
    - Eleman bulunduğunda, betik öğenin HTML kodunu konsola yazdırır.
    - 6 saniye sonra hiçbir öğe bulunamazsa, hata mesajı görüntülenir.

## Örnek

```
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

```


Bu projeye katkı sağlamak için ``` pull request ``` gönderebilirsiniz. Herhangi bir hata veya geliştirme önerisi için ``` Issues ``` bölümünü kullanabilirsiniz.
