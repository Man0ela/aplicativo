function filterProfiles() {
    const input = document.getElementById("searchInput");
    const filter = input.value.toUpperCase();
    const container = document.getElementById("profilesContainer");
    const cards = container.getElementsByClassName("profile-card");
  
    // Percorre todos os cards e mostra/esconde conforme o nome
    for (let i = 0; i < cards.length; i++) {
      const title = cards[i].getElementsByTagName("h3")[0];
      const txtValue = title.textContent || title.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        cards[i].style.display = "";
      } else {
        cards[i].style.display = "none";
      }
    }
  }
  