document.addEventListener("DOMContentLoaded", function() {

  if (!window.location.pathname.toLowerCase().includes("logement")) return;

  fetch("https://api.behomes.tech/v3/get_behomes_objects?lang=en&api_key=D6YQOUYS&filter=yes&objects_per_page=50&page=1")
    .then(res => res.json())
    .then(data => {

      // 🔥 Correction ici : on utilise data.response
      const logements = data.response;

      let html = "";

      logements.forEach(item => {
        html += `
          <div class="card">
            <h3>${item.project_label || "Sans titre"}</h3>
            <p><strong>Description :</strong> ${item.Description || "Aucune description"}</p>
            <p><strong>Location :</strong> ${item.location || "Inconnue"}</p>
          </div>
        `;
      });

      document.getElementById("logements").innerHTML = html;
    })
    .catch(err => console.error("Erreur API :", err));
});
