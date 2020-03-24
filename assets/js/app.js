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
      setItens("#processadorID", processadores)
      setItens("#memoriaRamID", memoriaRam)
      setItens("#armazenamentoID", storage)
      setItens("#placaVideoID", placaVideo)
      setItens("#fonteID", fontes)

     
		

    });
  }

  function setValueLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }

  function setItens(select, array) {
    $.each(array, function (index, value) {
      $(select).append("<option value=" + value.preco + ">" + value.nome + " - R$ " + value.preco + "</option>");
    });
  }

  var placasMaes = [
    {
      "nome": "ASRock H110M",
      "preco": 381
    },
    {
      "nome": "Asus A320M",
      "preco": 386
    },
    {
      "nome": "Gigabyte GA-H270M",
      "preco": 469
    },
    {
      "nome": "MSI B350 Tomahawk",
      "preco": 596
    },
    {
      "nome": "MSI Z270 SLI Plus",
      "preco": 699
    }
  ]

  var processadores = [
    {
      "nome": "Intel Core i5 9600K",
      "preco": 1209
    },
    {
      "nome": "AMD Ryzen 7 2700X",
      "preco": 999
    },
    {
      "nome": "AMD Ryzen 3 2200G",
      "preco": 479
    },
    {
      "nome": "Pentium Gold G5400",
      "preco": 339
    },
    {
      "nome": "AMD Athlon 200GE",
      "preco": 285
    }
  ]

  var memoriaRam = [
    {
      "nome": "Memória Kingston 2GB",
      "preco": 79
    },
    {
      "nome": "Memória Kingston 4GB",
      "preco": 152
    },
    {
      "nome": "Memória Kingston 8GB",
      "preco": 249
    },
    {
      "nome": "Memória HyperX 16GB",
      "preco": 449
    },
    {
      "nome": "Memória HyperX 32GB",
      "preco": 1104
    }
  ]

  var storage = [
    {
      "nome": "SSD de 240GB G26 PLUS",
      "preco": 168
    },
    {
      "nome": "SSD de 500GB 860 EVO",
      "preco": 509
    },
    {
      "nome": "SSD 1TB WD Black",
      "preco": 1699
    },
    {
      "nome": "Hd 500gb Pc Western",
      "preco": 99
    },
    {
      "nome": "Hd 1tb Seagate",
      "preco": 269
    }
  ]

  var placaVideo = [
    {
      "nome": "N/ GeForce RTX 2080 ti",
      "preco": 8549
    },
    {
      "nome": "AMD Radeon RX 5700",
      "preco": 2099
    },
    {
      "nome": "AMD Radeon RX 570",
      "preco": 699
    },
    {
      "nome": "N/ GeForce GTX 1050 ti",
      "preco": 729
    },
    {
      "nome": "AMD Radeon RX 550",
      "preco": 399
    }
  ]

  var fontes = [
    {
      "nome": "Fonte AeroCool ATX 500W",
      "preco": 215
    },
    {
      "nome": "Fonte GM600 80 600W ",
      "preco": 285
    },
    {
      "nome": "Fonte Corsair CX550 550W ",
      "preco": 342
    },
    {
      "nome": "AMD Radeon RX 550",
      "preco": 399
    },
    {
      "nome": "Fonte Corsair CX750 750W",
      "preco": 525
    },
    {
      "nome": "Fonte Cooler Master V1000",
      "preco": 899
    }
  ]

});