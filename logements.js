document.addEventListener("DOMContentLoaded", function () {
  // On ne s’exécute que sur /logement
  if (!window.location.pathname.toLowerCase().includes("logement")) return;

  fetch("https://api.behomes.tech/v3/get_behomes_objects?lang=en&api_key=D6YQOUYS&filter=yes&objects_per_page=50&page=1")
    .then(res => res.json())
    .then(data => {
      console.log("API data =", data);

      // On essaye de récupérer proprement le bon tableau
      let logements = [];

      if (Array.isArray(data.response)) {
        logements = data.response;
      } else if (Array.isArray(data.objects)) {
        logements = data.objects;
      } else if (Array.isArray(data)) {
        logements = data; // au cas où l’API renvoie directement un tableau
      }

      console.log("Nombre de logements :", logements.length);

      let html = "";

      logements.forEach(item => {
        html += `
          <div class="card">
            <h3>${item.project_label || item.project_id || "Sans titre"}</h3>
            <p><strong>Description :</strong> ${item.Description || item.description || "Aucune description"}</p>
          </div>
        `;
      });

      const container = document.getElementById("logements");
      if (container) {
        container.innerHTML = html || "<p>Aucun logement trouvé.</p>";
      }
    })
    .catch(err => console.error("Erreur API :", err));
});
