$(document).ready(function () {
  /*
  JSON.stringfy(objeto): para armazenar os dados, utilizaremos o formato JSON e esta função transforma um objeto em string com sintaxe adequado ao JSON.
  JSON.parse(objeto): já a função parse transforma um item no formato JSON no seu formato original.
  */

  loadPageQuests();

  $('#home').click(function (e) {
    loadPageForm("Por favor, informe seus dados", "usuario")
  });


  function loadPageForm(title ,userType) {
    $('main').load("form.html", "data", function (response, status, request) {
      this;
      loadFormUsuario(title)

      $('#formButton').click(function (e) {
        e.preventDefault();
        var name = $('#nomeID').val();
        var sexo = $('#sexoID').val();

        var usuarioObj = {
          "nome": name,
          "sexo": sexo,
          "tipo": userType
        };

        setValueLocalStorage(userType, JSON.stringify(usuarioObj))

        if(userType === "usuario")
          loadPageForm("Por favor, informe os dados do seu parceiro", "parceiro")

        if(userType === "parceiro")
          loadPageQuests()
      });
    });
  }


  function loadFormUsuario(title) {
    $('#formTitle').text(title);
  }

  function loadPageQuests() {
    $('main').load("quests.html", "data", function (response, status, request) {
      this;

    });
  }

  function setValueLocalStorage(key, value) {
    localStorage.setItem(key, value);

  }


  //requestt a api
  /* function getData(ajaxurl) { 
      return $.ajax({
        url: ajaxurl,
        type: 'GET',
      });
  };
    
    async function test() {
      try {
        const data = await getData('http://www.omdbapi.com/?t=The+Prestige&apikey=5eb9dd68')
        setTitle(data.Title)
      } catch(err) {
        console.log(err);
      }
    }
  
    function setTitle(title){
        $(".teste").text(title)
    }
    
    test();
  
  */

});