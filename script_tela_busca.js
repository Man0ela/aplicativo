function buscarProfissionais() {
    const tipoServico = document.getElementById("barra-pesquisa").value;
    console.log("Buscando por:", tipoServico);
    window.location.href = `profs_filtrados.html?tipo=${encodeURIComponent(tipoServico)}`;
  }
  
