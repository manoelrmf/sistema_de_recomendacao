$(document).ready(function () {
  
  $('#home').click(function (e) {
    e.preventDefault();
    localStorage.clear()
    loadPageForm()
  });

  function loadPageForm() {
    $('main').load("form.html", "data", function (response, status, request) {
      this;

      const usuario = getValueLocalStrage('usuario')
      if(usuario !== null){
        $('#nomeID').val(usuario.nome);
        $('#valorID').val(usuario.valor);
      }

      $('#formButton').click(function (e) {
        e.preventDefault();
        var name = $('#nomeID').val();
        var valor = $('#valorID').val();

        var usuarioObj = {
          "nome": name,
          "valor": valor
        };

        setValueLocalStorage("usuario", usuarioObj)

        loadPageQuests()
      });
    });
  }

  function loadPageQuests() {
    $('main').load("quests.html", "data", function (response, status, request) {
      this;
      var saldo = 0

      var usuario = getValueLocalStrage("usuario")

      setItens("#placaMaeID", placasMaes)
      setItens("#processadorID", processadores)
      setItens("#memoriaRamID", memoriaRam)
      setItens("#armazenamentoID", storage)
      setItens("#placaVideoID", placaVideo)
      setItens("#fonteID", fontes)


      calculateRecomendations(usuario.valor)

     $('.select-component').change(function (e) { 
       e.preventDefault();
       saldo += parseInt($(this).val()) ;
       $('.saldo').text('R$ '+saldo);
       $(this).attr("disabled", true);
     });
    
     $('#limparForm').click(function (e) { 
       $('.select-component').removeAttr('disabled');
       saldo = parseInt(0);
       $('.saldo').text('R$ '+saldo);
       clearMessage()
     });

    $('#voltarID').click(function (e) { 
      e.preventDefault();
      loadPageForm()
    });

    });
  }

  function setaRecomendacaoSelect(recomendation){
      $('#placaMaeID').val(recomendation.placaMae);
      $('#processadorID').val(recomendation.processador);
      $('#memoriaRamID').val(recomendation.memoriaRam);
      $('#armazenamentoID').val(recomendation.armazenamento);
      $('#placaVideoID').val(recomendation.placaVideo);
      $('#fonteID').val(recomendation.fonte);
      $('.saldo').text("R$ " + recomendation.total);
      $('.select-component').attr("disabled", true);
      addMessage("A recomendação de peças proposta!")
  }

  function addMessage(msg){
    $('.msg').text(msg);
  }

  function clearMessage(){
    $('.msg').text(" ");
  }

  function setValueLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getValueLocalStrage(key) {
    return JSON.parse(localStorage.getItem(key))
  }

  function setItens(select, array) {
    $.each(array, function (index, value) {
      $(select).append("<option value=" + value.preco + ">" + value.nome + " - R$ " + value.preco + "</option>");
    });
  }


  function setRecomendacao(id, total){
    recomendacoesDeHardware[id].id = id
    recomendacoesDeHardware[id].total = total
  }

  function calculateRecomendations(valor){
    atualizaRecomendacoes()
    const recomendacaoFinal = verificaMelhorRecomendacao(recomendacoesDeHardware ,valor)
    var i = recomendacaoFinal.id
    let recomendacaoTeste = {
      "placaMae": placasMaes[i].preco,
      "processador": processadores[i].preco,
      "memoriaRam": memoriaRam[i].preco,
      "armazenamento": storage[i].preco,
      "placaVideo": placaVideo[i].preco,
      "fonte": fontes[i].preco,
      "total": 0
    }

    recomendacaoTeste.total = caclTotal(recomendacaoTeste)

    setaRecomendacaoSelect(recomendacaoTeste)
  }

  function verificaMelhorRecomendacao(array ,valor){
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
       
        if(element.total != null && valor >= element.total && valor < array[index+1].total){
          return element
        }
    }
    
  }

  function atualizaRecomendacoes(){
    let i
    for(i = 0; i < 5; i++){
      let recomendacao = {
        "placaMae": placasMaes[i].preco,
        "processador": processadores[i].preco,
        "memoriaRam": memoriaRam[i].preco,
        "armazenamento": storage[i].preco,
        "placaVideo": placaVideo[i].preco,
        "fonte": fontes[i].preco,
        "total": 0
      }

      recomendacao.total = caclTotal(recomendacao)
      setRecomendacao(i, recomendacao.total)
    } 

  }

  function caclTotal(array){
    var total = 0
    Object.values(array).forEach(element => {
      total += element
    });
    return total
  }

  function max(array){
    var maior = 0
    for (let index = 0; index < array.length; index++) {
      if (index == 0) maior = array[0].preco
      if(array[index].preco > maior)
        maior = array[index].preco
    }
    return maior
  }

  var recomendacoesDeHardware = [
    {
      "id": 0,
      "total": null
    },
    {
      "id": 1,
      "total": null
    },
    {
      "id": 2,
      "total": null
    },
    {
      "id": 3,
      "total": null
    },
    {
      "id": 4,
      "total": null
    },
    {
      "id": 5,
      "total": null
    }
  ]

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
      "nome": "AMD Athlon 200GE",
      "preco": 285
    },
    {
      "nome": "Pentium Gold G5400",
      "preco": 339
    },
    {
      "nome": "AMD Ryzen 3 2200G",
      "preco": 479
    },
    {
      "nome": "AMD Ryzen 7 2700X",
      "preco": 999
    },
    {
      "nome": "Intel Core i5 9600K",
      "preco": 1209
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
      "nome": "Hd 500gb Pc Western",
      "preco": 99
    },
    {
      "nome": "SSD de 240GB G26 PLUS",
      "preco": 168
    },
    {
      "nome": "Hd 1tb Seagate",
      "preco": 269
    },
    {
      "nome": "SSD de 500GB 860 EVO",
      "preco": 509
    },
    {
      "nome": "SSD 1TB WD Black",
      "preco": 1699
    }
  ]

  var placaVideo = [
    {
      "nome": "AMD Radeon RX 550",
      "preco": 399
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
      "nome": "AMD Radeon RX 5700",
      "preco": 2099
    },
    {
      "nome": "N/ GeForce RTX 2080 ti",
      "preco": 8549
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