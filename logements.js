document.addEventListener("DOMContentLoaded", function() {

    if (!window.location.pathname.toLowerCase().includes("logement")) return;

    fetch("https://api.behomes.tech/v3/get_behomes_objects?lang=en&api_key=D6YQOUYS&filter=yes&objects_per_page=50&page=1")
        .then(res => res.json())
        .then(data => {
            const logements = data.objects;
            let html = "";

            logements.forEach(item => {
                html += `
          <div class="card">
            <img src="${item.default_photo || ''}">
            <div class="card-content">
              <h3>${item.title}</h3>
              <p><strong>Prix :</strong> ${item.price || "N/A"} €</p>
              <p><strong>Ville :</strong> ${item.city || "Non spécifiée"}</p>
              <p>${item.description ? item.description.substring(0,100) + "..." : ""}</p>
            </div>
          </div>
        `;
            });

            document.getElementById("logements").innerHTML = html;
        })
        .catch(e => console.error("Erreur API :", e));
});
