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