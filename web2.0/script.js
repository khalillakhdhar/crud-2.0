// script.js
document.addEventListener('DOMContentLoaded', function() {
    const inventoryForm = document.getElementById('inventoryForm');
    const inventoryList = document.getElementById('inventoryList');
  
    // Fonction pour afficher la liste des éléments de l'inventaire
    async function displayInventory() {
      try {
        const response = await axios.get('http://localhost:4000/api/inventory');
        const items = response.data;
        inventoryList.innerHTML = ''; // Réinitialiser la liste
        items.forEach(item => {
          const itemElement = document.createElement('div');
          itemElement.innerHTML = `
            <div class="card mb-3">
              <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.description}</p>
                <p class="card-text">Numéro de Série: ${item.serialNumber}</p>
                <p class="card-text">Quantité Disponible: ${item.quantityAvailable}</p>
                <button class="btn btn-danger btn-sm" onclick="deleteItem('${item._id}')">Supprimer</button>
              </div>
            </div>
          `;
          inventoryList.appendChild(itemElement);
        });
      } catch (error) {
        console.error(error);
      }
    }
  
    // Fonction pour ajouter un nouvel élément à l'inventaire
    inventoryForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      const formData = new FormData(inventoryForm);
      const newItem = {
        name: formData.get('name'),
        description: formData.get('description'),
        serialNumber: formData.get('serialNumber'),
        quantityAvailable: formData.get('quantityAvailable')
      };
      try {
        await axios.post('http://localhost:4000/api/inventory', newItem);
        inventoryForm.reset(); // Réinitialiser le formulaire après l'ajout
        displayInventory(); // Mettre à jour l'affichage de la liste
      } catch (error) {
        console.error(error);
      }
    });
  
    // Fonction pour supprimer un élément de l'inventaire
    window.deleteItem = async function(id) {
        if(confirm('Êtes-vous sûr de vouloir supprimer cet élément?')){
      try {
        await axios.delete(`http://localhost:4000/api/inventory/${id}`);
        displayInventory(); // Mettre à jour l'affichage de la liste
      } catch (error) {
        console.error(error);
      }
    }
    };
  
    // Fonction pour modifier un élément de l'inventaire (redirection vers une page de modification)
    window.editItem = function(id) {
      window.location.href = `/edit.html?id=${id}`;
    };
  
    // Afficher la liste des éléments de l'inventaire au chargement de la page
    displayInventory();
  });
  