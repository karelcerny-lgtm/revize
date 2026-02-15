// Počkáme, až se celá stránka načte
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('revizeForm');

    // Funkce, která se spustí při kliknutí na tlačítko
    window.generovatRevizi = function() {
        // Načtení dat z formuláře (příklad pro pan Liška, Koněvova) [cite: 13, 14]
        const data = {
            cisloZpravy: "77437671", // Pevné číslo z tvého PDF [cite: 3]
            objednatel: form.querySelector('input[placeholder*="Liška Vít"]').value,
            adresa: form.querySelector('input[placeholder*="ulice"]').value,
            spotrebic: form.querySelector('input[placeholder*="Luna Compact"]').value || "Luna Compact 24", [cite: 18]
            vysledek: form.querySelector('input[name="vysledek"]:checked').value
        };

        if (!data.objednatel || !data.adresa) {
            alert("Prosím, vyplňte jméno objednatele a adresu objektu.");
            return;
        }

        console.log("Generuji data pro: ", data);

        // Simulace vytvoření QR kódu pro ověření na cesc.cz [cite: 77, 78]
        // V reálné aplikaci by zde byla URL vašeho webu
        const verificationUrl = `https://cesc.cz/overeni/${data.cisloZpravy}`;
        
        // Vytvoření vizuálního potvrzení pro uživatele
        zobrazitPotvrzeni(data, verificationUrl);
    };

    function zobrazitPotvrzeni(data, url) {
        // Vytvoříme jednoduché vyskakovací okno s QR kódem
        const modal = document.createElement('div');
        modal.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50";
        modal.innerHTML = `
            <div class="bg-white rounded-xl p-8 max-w-sm w-full text-center shadow-2xl">
                <div class="text-green-500 mb-4">
                    <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h3 class="text-xl font-bold mb-2">Zpráva č. ${data.cisloZpravy} uložena</h3>
                <p class="text-gray-600 text-sm mb-6">Revize pro objekt ${data.adresa} byla úspěšně zaevidována jako ${data.vysledek.toUpperCase()}.</p>
                
                <div class="bg-gray-100 p-4 rounded-lg mb-6">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}" 
                         alt="QR kód pro ověření" class="mx-auto shadow-sm">
                    <p class="text-[10px] text-gray-400 mt-2 uppercase tracking-widest">Ověřovací QR kód</p>
                </div>

                <button onclick="this.parentElement.parentElement.remove()" 
                        class="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-black transition">
                    Zavřít
                </button>
            </div>
        `;
        document.body.appendChild(modal);
    }
});
