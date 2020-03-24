$(document).ready(function () {
  /*
  JSON.stringfy(objeto): para armazenar os dados, utilizaremos o formato JSON e esta função transforma um objeto em string com sintaxe adequado ao JSON.
  JSON.parse(objeto): já a função parse transforma um item no formato JSON no seu formato original.
  */
  loadPageQuests()

  $('#home').click(function (e) {
    loadPageForm()
  });


  function loadPageForm() {
    $('main').load("form.html", "data", function (response, status, request) {
      this;
      $('#formButton').click(function (e) {
        e.preventDefault();
        var name = $('#nomeID').val();
        var valor = $('#valorID').val();

        var usuarioObj = {
          "nome": name,
          "valor": valor
        };

        setValueLocalStorage("usuario", JSON.stringify(usuarioObj))

        loadPageQuests()
      });
    });
  }


  function loadPageQuests() {
    $('main').load("quests.html", "data", function (response, status, request) {
      this;
        setItens("#placaMaeID", placasMaes)
    });
  }

  function setValueLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }

  function setItens(select, array){
    $.each(array, function (index, value) { 
      $(select).append("<option value="+ value.preco +">"+ value.nome +" - R$ "+value.preco+"</option>");
    });
  }

  var placasMaes = [
   {
     "nome":"ASRock H110M",
     "preco":381
   },
   {
    "nome":"Asus A320M",
    "preco":386
  },
  {
    "nome":"Gigabyte GA-H270M-Gaming 3",
    "preco":469
  },
  {
    "nome":"MSI B350 Tomahawk",
    "preco":596
  },
  {
    "nome":"MSI Z270 SLI Plus",
    "preco":699
  }
  ]



});