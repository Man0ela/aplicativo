function buscarProfissionais() {
    const tipo = document.getElementById('tipo-servico').value;
    window.location.href = `profs_filtrados.html?tipo=${encodeURIComponent(tipo)}`;
  }
  