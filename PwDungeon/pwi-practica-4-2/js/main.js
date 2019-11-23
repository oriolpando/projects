var ataque = false;
var nivellReal = 0;
var femMasc = "";


/* Inicializar el juego */
function iniciarJuego() {

  windowRegistre();
  var out = 0;
  nivellReal = 0;
  document.getElementById("visor").addEventListener('click', function(){ realitzaAccio(); });
  crearMapaEstandar(mapa);
  situarElementosPrimerMapa();
  situarElementosSegundoMapa();
  crearMinimap();
  actualizarMinimap(3,1,0);
  actualizarMinimap(3,0,10);
  player.mochila[0] = "garrote";
  player.manoderecha = "";
  player.manodizquierda = "";
  player.nivel = 1;
  player.ataque = 0;
  player.defensa = 0;
  ompleObjectes();
  ompleCaracteristiques();
  console.log("dir: " + player.estadoPartida.direccion);
  console.log("x: " + player.estadoPartida.x);
  console.log("y: " + player.estadoPartida.y);
  if (player.estadoPartida.direccion == 0){
    pintaPosicion(player.estadoPartida.x, player.estadoPartida.y-1);
  }else if(player.estadoPartida.direccion == 1){
    pintaPosicion(player.estadoPartida.x, player.estadoPartida.y+1);
  }else if(player.estadoPartida.direccion == 2){
    pintaPosicion(player.estadoPartida.x+1, player.estadoPartida.y);
  }else if(player.estadoPartida.direccion == 3){
    pintaPosicion(player.estadoPartida.x-1,player.estadoPartida.y);
  }

  $(document).ready(function(){
      $(document).keypress(function(e) {
            //quan pulsem la tecla a
            if(e.which == 97) {
                  movimentPersonatge(3);
            }
            //quan pulsem la tecla s
            if(e.which == 115) {
                  movimentPersonatge(1);
            }
            //quan pulsem la tecla d
            if(e.which == 100) {
                  movimentPersonatge(2);
            }
            //quan pulsem la tecla w
            if(e.which == 119) {
                  movimentPersonatge(0);
            }
      });
  });

}

function windowStart(){
  var seccioRegistre = document.getElementById("seccioRegistre");
  seccioRegistre.style.display = "none";
  var seccioStart = document.getElementById("seccioStart");
  seccioStart.style.display = "block";
}

function windowRegistre(){
  var seccioStart = document.getElementById("seccioStart");
  seccioStart.style.display = "none";
}

function tancarFinestra(){
  player.nombre = window.document.getElementById('inputNom').value;

  if(document.getElementById("M").checked){
   femMasc = "Hombre";
  }else{
   femMasc = "Mujer";
  }

  document.getElementById('nombre').innerHTML = "Nombre: "+player.nombre;
  document.getElementById('sexo').innerHTML = "Sexo: "+femMasc;

  if(player.nombre != ""){
    windowStart();
  }
}

function ompleObjectes(){
  objetos.metal_sword = new Object();
  objetos.metal_sword.ataque = 5;
  objetos.metal_sword.defensa = 2;
  objetos.simple_sword = new Object();
  objetos.simple_sword.ataque = 3;
  objetos.simple_sword.defensa = 1;
  objetos.metal_shield = new Object();
  objetos.metal_shield.ataque = 1;
  objetos.metal_shield.defensa = 5;
  objetos.simple_shield = new Object();
  objetos.simple_shield.ataque = 1;
  objetos.simple_shield.defensa = 3;

}
/* Convierte lo que hay en el mapa en un archivo de imagen */
function mapaToImg(x, y) {

    var estado;
    var img;

    if ((x == -1) && (y == -1)) {
      img = "game_over.png";
    }else{
          for (var h = 0; h < 100; h++){
            if (x == mapa[nivellReal][h].posx && y == mapa[nivellReal][h].posy){
              estado = mapa[nivellReal][h].elemento;
            }
          }
          if (estado == "none"){
            img = "dungeon_step.png";
          }
          if (estado == "wall"){
            img = "dungeon_wall.png";
          }
          if (estado == "door"){
            img = "dungeon_door.png";
          }
          if (estado == "pocion"){
            img = "potion.png";
          }
          if (estado == "portal"){
            img = "dungeon_step.png";
          }
          if (estado == "simple-sword"){
            img = "simple_sword.png";
          }
          if (estado == "simple-shield"){
            img = "simple_shield.png";
          }
          if (estado == "metal-sword"){
            img = "metal_sword.png";
          }
          if (estado == "metal-shield"){
            img = "metal_shield.png";
          }
          if (estado == "key"){
            img = "final_key.png";
          }
          if (estado == "enemy1"){
            img = "enemy1.png";
          }
          if (estado == "enemy2"){
            img = "enemy2.png";
          }
          if (estado == "enemy3"){
            img = "enemy3.png";
          }
    }


    return img;
  }

  function crearMinimap(){
    var x = 0;
    var y = 0;

    for (var h = 0; h < 10; h++){
      var row =  document.createElement("div");
      row.className = "row" + h;
      row.style.height = "20px";
      row.style.width = "200px";
      var section = document.getElementById("minimap");

      for (var l = 0; l < 10; l++){
        var img =  document.createElement("img");
        img.id = l + "_" + h;
        img.src = "media/images/black.png";
        img.style.height = "20px";
        img.style.width = "20px";
        row.appendChild(img);
      }
      section.appendChild(row);
    }
  }


  function cleanMinimap(){
    for (var h = 0; h < 10; h++){
      for (var l = 0; l < 10; l++){
        var img = document.getElementById(l + "_" + h);
        img.src = "media/images/black.png";
      }
    }
    actualizarMinimap(8,6);
    actualizarMinimap(8,5);
  }

  function limpiarCasilla(){
    var casilla;
    var img = document.getElementById(player.estadoPartida.x + "_" + player.estadoPartida.y);
    for (var h = 0; h < 100; h++){
      if (player.estadoPartida.x == mapa[nivellReal][h].posx && player.estadoPartida.y == mapa[nivellReal][h].posy){
        casilla = mapa[nivellReal][h].elemento;
      }
    }
    if (casilla == "none"){
      img.src = "media/images/gray.png";
    }
    if (casilla == "wall"){
      img.src = "media/images/brown.png";
    }
    if (casilla == "door"){
      img.src = "media/images/dungeon_door.png";
    }
    if (casilla == "portal"){
      img.src = "media/images/purple.png";
    }
    if (casilla == "key"){
      img.src = "media/images/gray.png";
    }
    if (casilla == "simple-sword"){
      img.src = "media/images/blue.jpg";
    }
    if (casilla == "simple-shield"){
      img.src = "media/images/blue.jpg";
    }
    if (casilla == "metal-sword"){
      img.src = "media/images/blue.jpg";
    }
      if (casilla == "metal-shield"){
      img.src = "media/images/blue.jpg";
    }
    if (casilla == "enemy1"){
      img.src = "media/images/red.jpg";
    }
    if (casilla == "enemy2"){
      img.src = "media/images/red.jpg";
    }
    if (casilla == "enemy3"){
      img.src = "media/images/red.jpg";
    }
    if (casilla == "pocion"){
      img.src = "media/images/green.jpg";
    }
  }


  function actualizarMinimap(x, y, jugador){
    var posicio;
    var img = document.getElementById(x + "_" + y);
    if (jugador != 10){
      if (player.estadoPartida.direccion == 0){
        img.src = "media/images/Player_T.png";
      }else if(player.estadoPartida.direccion == 1){
        img.src = "media/images/Player_B.png";
      }else if(player.estadoPartida.direccion == 2){
        img.src = "media/images/Player_R.png";
      }else if(player.estadoPartida.direccion == 3){
        img.src = "media/images/Player_L.png";
      }
    }else{
      for (var h = 0; h < 100; h++){
        if (x == mapa[nivellReal][h].posx && y == mapa[nivellReal][h].posy){
          posicio = mapa[nivellReal][h].elemento;
        }
      }
      if (posicio == "none"){
        img.src = "media/images/gray.png";
      }
      if (posicio == "wall"){
        img.src = "media/images/brown.png";
      }
      if (posicio == "door"){
        img.src = "media/images/dungeon_door.png";
      }
      if (posicio == "portal" && portal == true){
        img.src = "media/images/purple.png";
      }else if (posicio == "portal"){
        img.src = "media/images/gray.png";
      }
      if (posicio == "key"){
        img.src = "media/images/yellow.png";
      }
      if (posicio == "simple-sword"){
        img.src = "media/images/blue.jpg";
      }
      if (posicio == "simple-shield"){
        img.src = "media/images/blue.jpg";
      }
      if (posicio == "metal-sword"){
        img.src = "media/images/blue.jpg";
      }
      if (posicio == "metal-shield"){
        img.src = "media/images/blue.jpg";
      }
      if (posicio == "enemy1"){
        img.src = "media/images/red.jpg";
      }
      if (posicio == "enemy2"){
        img.src = "media/images/red.jpg";
      }
      if (posicio == "enemy3"){
        img.src = "media/images/red.jpg";
      }
      if (posicio == "pocion"){
        img.src = "media/images/green.jpg";
      }
    }
  }

  function crearMapaEstandar(mapa){
    var x = 0;
    var y = 0;
    mapa[0] = new Array(100);
    mapa[1] = new Array(100);
    for (var h = 0; h < 100; h++){
      if ( x == 10){
        x = 0;
        y++;
      }
      mapa[0][h] = new Object();
      mapa[1][h] = new Object();
      var aux = new Object();
      mapa[0][h].posx = x;
      mapa[1][h].posx = x;
      mapa[0][h].posy = y;
      mapa[1][h].posy = y;

      if (x == 0 ||  x == 9 || y == 0 || y == 9){
        mapa[0][h].elemento = "wall";
        mapa[1][h].elemento = "wall";
        aux.elemento = "wall";
      }else{
        mapa[0][h].elemento = "none";
        mapa[1][h].elemento = "none";
        aux.elemento = "none";
      }

      x++;
    }

  }

  function situarElementosPrimerMapa(){
  var x = 0;
  var y = 0;
    for (var h = 0; h < 100; h++){
      if(mapa[0][h].posx == 9 && mapa[0][h].posy == 6){
        mapa[0][h].elemento = "door";
      }
      if(mapa[0][h].posx == 1 && mapa[0][h].posy == 8){
        mapa[0][h].elemento = "key";
      }
      if(mapa[0][h].posx == 3 && mapa[0][h].posy == 3){
        mapa[0][h].elemento = "enemy1";
      }
      if(mapa[0][h].posx == 7 && mapa[0][h].posy == 3){
        mapa[0][h].elemento = "enemy1";
      }
      if(mapa[0][h].posx == 2 && mapa[0][h].posy == 7){
        mapa[0][h].elemento = "enemy1";
      }
      if(mapa[0][h].posx == 8 && mapa[0][h].posy == 7){
        mapa[0][h].elemento = "enemy2";
      }
      if(mapa[0][h].posx == 6 && mapa[0][h].posy == 1){
        mapa[0][h].elemento = "wall";
      }
      if(mapa[0][h].posx == 6 && mapa[0][h].posy == 2){
        mapa[0][h].elemento = "wall";
      }
      if(mapa[0][h].posx == 4 && mapa[0][h].posy == 5){
        mapa[0][h].elemento = "wall";
      }
      if(mapa[0][h].posx == 5 && mapa[0][h].posy == 5){
        mapa[0][h].elemento = "wall";
      }
      if(mapa[0][h].posx == 6 && mapa[0][h].posy == 5){
        mapa[0][h].elemento = "wall";
      }
      if(mapa[0][h].posx == 7 && mapa[0][h].posy == 5){
        mapa[0][h].elemento = "wall";
      }
      if(mapa[0][h].posx == 8 && mapa[0][h].posy == 5){
        mapa[0][h].elemento = "wall";
      }
      if(mapa[0][h].posx == 6 && mapa[0][h].posy == 6){
        mapa[0][h].elemento = "wall";
      }
      if(mapa[0][h].posx == 6 && mapa[0][h].posy == 7){
        mapa[0][h].elemento = "wall";
      }
      if(mapa[0][h].posx == 1 && mapa[0][h].posy == 3){
        mapa[0][h].elemento = "simple-shield";
      }
      if(mapa[0][h].posx == 8 && mapa[0][h].posy == 1){
        mapa[0][h].elemento = "simple-sword";
      }
      if(mapa[0][h].posx == 5 && mapa[0][h].posy == 6){
        mapa[0][h].elemento = "pocion";
      }
    }
  }

  function situarElementosSegundoMapa(){
  var x = 0;
  var y = 0;

    for (var h = 0; h < 100; h++){
      if(mapa[1][h].posx == 0 && mapa[1][h].posy == 1){
        mapa[1][h].elemento = "door";
      }
      if(mapa[1][h].posx == 2 && mapa[1][h].posy == 2){
        mapa[1][h].elemento = "portal";
      }
      if(mapa[1][h].posx == 1 && mapa[1][h].posy == 5){
        mapa[1][h].elemento = "key";
      }
      if(mapa[1][h].posx == 3 && mapa[1][h].posy == 1){
        mapa[1][h].elemento = "enemy3";
      }
      if(mapa[1][h].posx == 8 && mapa[1][h].posy == 3){
        mapa[1][h].elemento = "enemy2";
      }
      if(mapa[1][h].posx == 1 && mapa[1][h].posy == 7){
        mapa[1][h].elemento = "enemy2";
      }
      if(mapa[1][h].posx == 4 && mapa[1][h].posy == 8){
        mapa[1][h].elemento = "enemy2";
      }
      if(mapa[1][h].posx == 4 && mapa[1][h].posy == 1){
        mapa[1][h].elemento = "wall";
      }
      if(mapa[1][h].posx == 4 && mapa[1][h].posy == 3){
        mapa[1][h].elemento = "wall";
      }
      if(mapa[1][h].posx == 4 && mapa[1][h].posy == 4){
        mapa[1][h].elemento = "wall";
      }
      if(mapa[1][h].posx == 3 && mapa[1][h].posy == 4){
        mapa[1][h].elemento = "wall";
      }
      if(mapa[1][h].posx == 2 && mapa[1][h].posy == 4){
        mapa[1][h].elemento = "wall";
      }
      if(mapa[1][h].posx == 1 && mapa[1][h].posy == 4){
        mapa[1][h].elemento = "wall";
      }
      if(mapa[1][h].posx == 2 && mapa[1][h].posy == 5){
        mapa[1][h].elemento = "wall";
      }
      if(mapa[1][h].posx == 2 && mapa[1][h].posy == 6){
        mapa[1][h].elemento = "wall";
      }
      if(mapa[1][h].posx == 4 && mapa[1][h].posy == 6){
        mapa[1][h].elemento = "wall";
      }
      if(mapa[1][h].posx == 5 && mapa[1][h].posy == 6){
        mapa[1][h].elemento = "wall";
      }
      if(mapa[1][h].posx == 6 && mapa[1][h].posy == 7){
        mapa[1][h].elemento = "wall";
      }
      if(mapa[1][h].posx == 6 && mapa[1][h].posy == 6){
        mapa[1][h].elemento = "wall";
      }
      if(mapa[1][h].posx == 6 && mapa[1][h].posy == 5){
        mapa[1][h].elemento = "wall";
      }
      if(mapa[1][h].posx == 7 && mapa[1][h].posy == 5){
        mapa[1][h].elemento = "wall";
      }
      if(mapa[1][h].posx == 8 && mapa[1][h].posy == 5){
        mapa[1][h].elemento = "wall";
      }
      if(mapa[1][h].posx == 7 && mapa[1][h].posy == 3){
        mapa[1][h].elemento = "wall";
      }
      if(mapa[1][h].posx == 7 && mapa[1][h].posy == 2){
        mapa[1][h].elemento = "wall";
      }
      if(mapa[1][h].posx == 7 && mapa[1][h].posy == 1){
        mapa[1][h].elemento = "wall";
      }
      if(mapa[1][h].posx == 5 && mapa[1][h].posy == 7){
        mapa[1][h].elemento = "metal-shield";
      }
      if(mapa[1][h].posx == 8 && mapa[1][h].posy == 1){
        mapa[1][h].elemento = "metal-sword";
      }
      if(mapa[1][h].posx == 7 && mapa[1][h].posy == 6){
        mapa[1][h].elemento = "pocion";
      }
    }
  }



  function ompleCaracteristiques(){
    //var nom = document.getElementById(name);
    textnode = document.createTextNode(name);
    var lvl = document.getElementById('lvl');
    textnode = document.createTextNode(player.nivel + 1);
    lvl.appendChild(textnode);
    var exp = document.getElementById('exp');
    textnode = document.createTextNode(player.xp);
    exp.appendChild(textnode);
    var atq = document.getElementById('atq');
    var derecha = new Object();
    var izquierda = new Object();
    derecha.ataque = 0;
    derecha.defensa = 0;
    izquierda.ataque = 0;
    izquierda.defensa = 0;
    if (player.manoderecha == "garrote"){
      derecha = objetos.garrote;
    }
    if (player.manoizquierda == "garrote"){
      izquierda = objetos.garrote;
    }
    //textnode = document.createTextNode(player.ataque + derecha.ataque + izquierda.ataque);
    textnode = document.createTextNode(player.ataque);
    atq.appendChild(textnode);
    var def = document.getElementById('def');
    textnode = document.createTextNode(player.defensa);
    def.appendChild(textnode);
    var hp = document.getElementById('hp');
    textnode = document.createTextNode(player.vida);
    hp.appendChild(textnode);
    var obj = document.getElementById('obj');
    for (var i = 0; i < player.mochila.length; i++){
      var img = document.createElement("img");
      if (player.mochila[i] == "garrote"){
        img.src = "media/images/wooden_club.png";
        img.setAttribute("id", "garrote");
        img.style.height = "40px";
        img.style.width = "40px";
      }
      obj.appendChild(img);
    }
    document.getElementById("garrote").addEventListener('click', function(){ actualitzaObjetoMano("garrote"); });
  }

  function movimentPersonatge(tecla){
    if(!ataque){
      limpiarCasilla();
      actualitzarEstado(tecla);
      if (player.estadoPartida.direccion == 0){
        actualizarMinimap(player.estadoPartida.x, player.estadoPartida.y-1, 10);
        pintaPosicion(player.estadoPartida.x, player.estadoPartida.y-1);
      }else if(player.estadoPartida.direccion == 1){
        actualizarMinimap(player.estadoPartida.x, player.estadoPartida.y+1, 10);
        pintaPosicion(player.estadoPartida.x, player.estadoPartida.y+1);
      }else if(player.estadoPartida.direccion == 2){
        pintaPosicion(player.estadoPartida.x+1, player.estadoPartida.y);
        actualizarMinimap(player.estadoPartida.x+1, player.estadoPartida.y, 10);
      }else if(player.estadoPartida.direccion == 3){
        pintaPosicion(player.estadoPartida.x-1,player.estadoPartida.y);
        actualizarMinimap(player.estadoPartida.x-1, player.estadoPartida.y, 10);
      }


      if (player.estadoPartida.x == 2 && player.estadoPartida.y == 2 && nivellReal == 1){
        limpiarCasilla();
        player.estadoPartida.x = 8;
        player.estadoPartida.y = 6;
        player.estadoPartida.direccion = 0;
        portal = true;
      }
      actualizarMinimap(player.estadoPartida.x, player.estadoPartida.y, tecla);
      console.log("dir: " + player.estadoPartida.direccion);
      console.log("x: " + player.estadoPartida.x);
      console.log("y: " + player.estadoPartida.y);
      var casellaVisualitzada = identificaCasella();

      if(casellaVisualitzada == "enemy1" || casellaVisualitzada == "enemy2" ||casellaVisualitzada == "enemy3"){
        ataque = true;
      }
    }
  }

  function actualitzarEstado(tecla){
    var casella = "null";
    var n = 0;
    if (player.estadoPartida.direccion == 0){
      do{
        if (mapa[nivellReal][n].posx == player.estadoPartida.x && mapa[nivellReal][n].posy == player.estadoPartida.y-1){
          casella = mapa[nivellReal][n].elemento;
        }
        n++;
        console.log("casella: " + casella);
      }while(casella == "null");
      if(tecla == 0 &&  casella != "wall"){
        player.estadoPartida.y--;
      }else if(tecla == 1){
        player.estadoPartida.direccion = 1;
      }else if(tecla == 2){
        player.estadoPartida.direccion = 2;
      }else if(tecla == 3){
        player.estadoPartida.direccion = 3;
      }
    }else if(player.estadoPartida.direccion == 1){
      do{
        if (mapa[nivellReal][n].posx == player.estadoPartida.x && mapa[nivellReal][n].posy == player.estadoPartida.y+1){
          casella = mapa[nivellReal][n].elemento;
        }
        n++;
        console.log("casella: " + casella);
      }while(casella == "null");
      if(tecla == 0 && casella != "wall"){
        player.estadoPartida.y++;
      }else if(tecla == 1){
        player.estadoPartida.direccion = 0;
      }else if(tecla == 2){
        player.estadoPartida.direccion = 3;
      }else if(tecla == 3){
        player.estadoPartida.direccion = 2;
      }
    }else if(player.estadoPartida.direccion == 2){
      do{
        if (mapa[nivellReal][n].posy == player.estadoPartida.y && mapa[nivellReal][n].posx == player.estadoPartida.x+1){
          casella = mapa[nivellReal][n].elemento;
        }
        n++;
        console.log("casella: " + casella);
      }while(casella == "null");
      if(tecla == 0 && casella != "wall" && casella != "door"){
        player.estadoPartida.x++;
      }else if(tecla == 1){
        player.estadoPartida.direccion = 3;
      }else if(tecla == 2){
        player.estadoPartida.direccion = 1;
      }else if(tecla == 3){
        player.estadoPartida.direccion = 0;
      }
    }else if(player.estadoPartida.direccion == 3){
      do{
        if (mapa[nivellReal][n].posy == player.estadoPartida.y && mapa[nivellReal][n].posx == player.estadoPartida.x-1){
          casella = mapa[nivellReal][n].elemento;
        }
        n++;
        console.log("casella: " + casella);
      }while(casella == "null");
      if(tecla == 0 && casella != "wall"){
        if(casella == "door" && nivellReal == 0){
            player.estadoPartida.x = 8;
            player.estadoPartida.y = 6;
            player.estadoPartida.direccion = 0;
            nivellReal++;
        }else{
          if(casella == "door"){
            console.log("WIN!!!!!!!");
          }else{
              player.estadoPartida.x--;
          }
        }
      }else if(tecla == 1){
        player.estadoPartida.direccion = 2;
      }else if(tecla == 2){
        player.estadoPartida.direccion = 0;
      }else if(tecla == 3){
        player.estadoPartida.direccion = 1;
      }
    }
  }


function realitzaAccio(){
  var nextlvl = false;
  var encontrada = false;
  var casellaVisualitzada = identificaCasella();
  if(casellaVisualitzada == "pocion"){
    //sumamos 10 de vida
    player.vida = player.vida + 10;
    var hp = document.getElementById('hp').remove();
    var vida = document.getElementById('vida');
    var textnode = document.createTextNode(player.vida);
    hp = document.createElement('span');
    hp.id = "hp";
    vida.appendChild(hp);
    hp.appendChild(textnode);
    eliminaCasella();

  }else if(casellaVisualitzada == "enemy1" || casellaVisualitzada == "enemy2" || casellaVisualitzada == "enemy3"){
    if(casellaVisualitzada == "enemy1"){
      enemigo.vida = 3;
      enemigo.ataque = 3;
      enemigo.defensa = 0;
      enemigo.xp = 3;
      enemigo.objetos[0] = "simple-shield";
      ataca();

    }else if( casellaVisualitzada == "enemy2"){
      enemigo.vida = 6;
      enemigo.ataque = 4;
      enemigo.defensa = 1;
      enemigo.xp = 6;
      enemigo.objetos[0] = "simple-sword";
      ataca();

    }else if(casellaVisualitzada == "enemy3"){
      enemigo.vida = 12;
      enemigo.ataque = 13;
      enemigo.defensa = 4;
      enemigo.xp = 10;
      enemigo.objetos[0] = "metal-shield";
      enemigo.objetos[1] = "metal-sword";
      ataca();
    }

  }else if(casellaVisualitzada == "key"){
    player.mochila[player.mochila.length] = "key";
    actualizaMochila();
    eliminaCasella();

  }else if(casellaVisualitzada == "garrote"){
    player.mochila[player.mochila.length] = "garrote";
    actualizaMochila();
    document.getElementById("garrote").addEventListener('click', function(){ actualitzaObjetoMano("garrote"); });
    eliminaCasella();

  }else if(casellaVisualitzada == "metal-shield"){
    player.mochila[player.mochila.length] = "metal-shield";
    actualizaMochila();
    document.getElementById("metal-shield").addEventListener('click', function(){ actualitzaObjetoMano("metal-shield"); });
    eliminaCasella();

  }else if(casellaVisualitzada == "simple-shield"){
    player.mochila[player.mochila.length] = "simple-shield";
    actualizaMochila();
    document.getElementById("simple-shield").addEventListener('click', function(){ actualitzaObjetoMano("simple-shield"); });
    eliminaCasella();

  }else if(casellaVisualitzada == "metal-sword"){
    player.mochila[player.mochila.length] = "metal-sword";
    actualizaMochila();
    document.getElementById("metal-sword").addEventListener('click', function(){ actualitzaObjetoMano("metal-sword"); });
    eliminaCasella();

  }else if(casellaVisualitzada == "simple-sword"){
    player.mochila[player.mochila.length] = "simple-sword";
    actualizaMochila();
    document.getElementById("simple-sword").addEventListener('click', function(){ actualitzaObjetoMano("simple-sword"); });
    eliminaCasella();

  }else if(casellaVisualitzada == "door"){

    for(var i = 0; i < player.mochila.length; i++){
      if(player.mochila[i] == "key"){
        nextlvl = true;
        encontrada = true;
      }
    }
    if(!encontrada){
      alert("¿Has perdido la llave por el mapa?");
      nextlvl = false;
    }

    if(nextlvl){
      nivellReal++;
      if(nivellReal == 2){
        alert("Felicidades! Has conseguido pasarte el juego!");
      }/*else if(player.xp < 19){
        alert("Experiencia insuficiente!");
      }*/

      for(var j = 0; j < player.mochila.length; j++){
        if(player.mochila[j] == "key"){
          player.mochila.splice(j,1);
          actualizaMochila();
        }
      }
      cleanMinimap();
      pintaImagen("black",player.estadoPartida.x-1, player.estadoPartida.y -1);
    }
  }
}

function ataca(){
  var derrotado = false;
  var gameOver = false;

  ataque = true;
  do{
    //ataca jugador
    if(player.ataque > enemigo.defensa){
      enemigo.vida -= (player.ataque - enemigo.defensa);
    }
    //enemigo muere
    if(enemigo.vida < 1){
      derrotado = true;
      player.xp += enemigo.xp;
      alert("Has ganado el combate!");
      if (player.xp > ((player.nivel + 1)*10 + player.nivel * 10)){
        pujaNivell();
      }
      actualizaJugador();
      ataque = false;
      for(var i = 0; i < enemigo.objetos.length; i++){
        player.mochila[player.mochila.length] = enemigo.objetos[i];
      }

      actualizaMochila();
      eliminaCasella();
    }else{
      alert("¡El enemigo ha encajado el golpe! ¡Preparate para recibir su ataque!      Vida enemigo restante: " + enemigo.vida);
      //ataca enemigo
      if(enemigo.ataque > player.defensa){
        player.vida -= (enemigo.ataque - player.defensa);
      }
      if(player.vida < 1){
        derrotado = true;
        gameOver = true;
        ataque = false;
        alert("Game Over!");
        showGameOver();
        //cleanMinimap();
      }
      actualizaJugador();
    }
    if(!gameOver && !derrotado){
      alert("Clica en aceptar para contraatacar!");
    }
  }while(!derrotado);

  return !gameOver;
}

function pujaNivell(){
  player.nivel ++;
  if(player.nivel % 2 == 0){
    player.ataque ++;
  }
  player.defensa ++;
  player.vida = player.vida + 10;
}

function showGameOver(){
  pintaImagen(mapaToImg(-1, -1), 0, 0);
  var equipcarac = document.getElementById("equipocarac");
  equipcarac.style.display = "none";
  var controls = document.getElementById("controls");
  controls.style.display = "none";
  var minimapa = document.getElementById("mapapetit");
  minimapa.style.display = "none";
  var equipo = document.getElementById("mochilaObjectes");
  equipo.style.display = "none";
}

  function actualitzaObjetoMano(objeto){
    //cada vez que clicamos a un objeto de la mochila, automaticamente se cambiara por el objeto que tengamos en la mano derecha,
    //y el de la derecha pasara a la izquierda y de la izquerda a la mochila (cua)
      var objDerecha = player.manoderecha;
      var objIzquierda = player.manoizquierda;
      var mano;
      var spmano;
      var img;
      var entrado = false;

      for(var i = 0; i < player.mochila.length; i++){
        if (player.mochila[i] == objeto && !entrado){
          entrado = true;
          if(objIzquierda != ""){
            player.mochila[i] = objIzquierda;
            if(objIzquierda == "garrote"){
              player.ataque -= 1;
            } else if(objIzquierda == "metal-shield"){
              player.ataque -= 1;
              player.defensa -= 5;
            }else if(objIzquierda == "simple-shield"){
              player.ataque -= 1;
              player.defensa -= 3;
            }else if(objIzquierda == "metal-sword"){
              player.ataque -= 5;
              player.defensa -= 2;
            }else if(objIzquierda == "simple-sword"){
              player.ataque -= 3;
              player.defensa -= 1;
            }

          }else{
            player.mochila.splice(i, 1);
          }

            objIzquierda = objDerecha;
            objDerecha = objeto;
            player.manoderecha = objDerecha;
            player.manoizquierda = objIzquierda;
            spmano = document.getElementById('spmano').remove();
            mano = document.getElementById('mano');
            spmano = document.createElement('span');
            spmano.id = "spmano";
          }
        }
        entrado = false;

        if(objIzquierda == "garrote"){
           img = document.createElement('img');
           img.src = "media/images/wooden_club.png";
           img.setAttribute("id", "garroteMano1");
           img.style.height = "40px";
           img.style.width = "40px";
           spmano.appendChild(img);
         }else if(objIzquierda == "metal-shield"){
           img = document.createElement('img');
           img.src = "media/images/final_shield.png";
           img.setAttribute("id", "metal-shieldMano1");
           img.style.height = "40px";
           img.style.width = "40px";
           spmano.appendChild(img);
         }else if(objIzquierda == "simple-shield"){
           img = document.createElement('img');
           img.src = "media/images/try.png";
           img.setAttribute("id", "simple-shieldMano1");
           img.style.height = "40px";
           img.style.width = "40px";
           spmano.appendChild(img);
         }else if(objIzquierda == "metal-sword"){
           img = document.createElement('img');
           img.src = "media/images/final_sword.png";
           img.setAttribute("id", "metal-swordMano1");
           img.style.height = "40px";
           img.style.width = "40px";
           spmano.appendChild(img);
         }else if(objIzquierda == "simple-sword"){
           img = document.createElement('img');
           img.src = "media/images/sword.png";
           img.setAttribute("id", "simple-swordMano1");
           img.style.height = "40px";
           img.style.width = "40px";
           spmano.appendChild(img);
         }

          if(objDerecha == "garrote"){
            img = document.createElement('img');
            img.src = "media/images/wooden_club.png";
            img.setAttribute("id", "garroteManoMano2");
            img.style.height = "40px";
            img.style.width = "40px";
            spmano.appendChild(img);
          }else if(objDerecha == "metal-shield"){
            img = document.createElement('img');
            img.src = "media/images/final_shield.png";
            img.setAttribute("id", "metal-shieldMano2");
            img.style.height = "40px";
            img.style.width = "40px";
            spmano.appendChild(img);
          }else if(objDerecha == "simple-shield"){
            img = document.createElement('img');
            img.src = "media/images/try.png";
            img.setAttribute("id", "simple-shieldMano2");
            img.style.height = "40px";
            img.style.width = "40px";
            spmano.appendChild(img);
          }else if(objDerecha == "metal-sword"){
            img = document.createElement('img');
            img.src = "media/images/final_sword.png";
            img.setAttribute("id", "metal-swordMano2");
            img.style.height = "40px";
            img.style.width = "40px";
            spmano.appendChild(img);
          }else if(objDerecha == "simple-sword"){
            img = document.createElement('img');
            img.src = "media/images/sword.png";
            img.setAttribute("id", "simple-swordMano2");
            img.style.height = "40px";
            img.style.width = "40px";
            spmano.appendChild(img);
          }
          mano.appendChild(spmano);
          actualizaJugador();
          actualizaMochila();
  }

  function actualizaJugador(){
    var entradoDerecha = false;
    var entradoIzquierda = false;
    //calculamos ataque y defensa del jugador

    if( player.manoderecha == "garrote" && !entradoDerecha){
      //si tiene mas de un objeto igual, solo lo puede utilizar una vez
      entradoDerecha = true;
      player.ataque += objetos.garrote.ataque;
      player.defensa += objetos.garrote.defensa;
    }else if(player.manoderecha == "metal-shield" && !entradoDerecha){
      entradoDerecha = true;
      player.ataque += objetos.metal_shield.ataque;
      player.defensa += objetos.metal_shield.defensa;

    }else if(player.manoderecha == "simple-shield" && !entradoDerecha){
      entradoDerecha = true;
      player.ataque += objetos.simple_shield.ataque;
      player.defensa += objetos.simple_shield.defensa;
    }else if(player.manoderecha == "metal-sword" && !entradoDerecha){
      entradoDerecha = true;
      player.ataque += objetos.metal_sword.ataque;
      player.defensa += objetos.metal_sword.defensa;
    }else if(player.manoderecha == "simple-sword" && !entradoDerecha){
      entradoDerecha = true;
      player.ataque += objetos.simple_sword.ataque;
      player.defensa += objetos.simple_sword.defensa;
    }


    if( player.manoizquierda == "garrote" && !entradoIzquierda){
      //si tiene mas de un objeto igual, solo lo puede utilizar una vez
      entradoIzquierda = true;
      player.ataque += objetos.garrote.ataque;
      player.defensa += objetos.garrote.defensa;
    }else if(player.manoizquierda == "metal-shield" && !entradoIzquierda){
      entradoIzquierda = true;
      player.ataque += objetos.metal_shield.ataque;
      player.defensa += objetos.metal_shield.defensa;

    }else if(player.manoizquierda == "simple-shield" && !entradoIzquierda){
      entradoIzquierda = true;
      player.ataque += objetos.simple_shield.ataque;
      player.defensa += objetos.simple_shield.defensa;
    }else if(player.manoizquierda == "metal-sword" && !entradoIzquierda){
      entradoIzquierda = true;
      player.ataque += objetos.metal_sword.ataque;
      player.defensa += objetos.metal_sword.defensa;
    }else if(player.manoizquierda == "simple-sword" && !entradoIzquierda){
      entradoIzquierda = true;
      player.ataque += objetos.simple_sword.ataque;
      player.defensa += objetos.simple_sword.defensa;
    }

    var atq = document.getElementById('atq').remove();
    var ataque = document.getElementById('ataque');
    var textnode = document.createTextNode(player.ataque);
    atq = document.createElement('span');
    atq.id = "atq";
    ataque.appendChild(atq);
    atq.appendChild(textnode);

    var def = document.getElementById('def').remove();
    var defensa = document.getElementById('defensa');
    textnode = document.createTextNode(player.defensa);
    def = document.createElement('span');
    def.id = "def";
    defensa.appendChild(def);
    def.appendChild(textnode);

    var exp = document.getElementById('exp').remove();
    var experiencia = document.getElementById('experiencia');
    textnode = document.createTextNode(player.xp);
    exp = document.createElement('span');
    exp.id = "exp";
    experiencia.appendChild(exp);
    exp.appendChild(textnode);

    var hp = document.getElementById('hp').remove();
    var vida = document.getElementById('vida');
    textnode = document.createTextNode(player.vida);
    hp = document.createElement('span');
    hp.id = "hp";
    vida.appendChild(hp);
    hp.appendChild(textnode);

    var lvl = document.getElementById('lvl').remove();
    var nivel = document.getElementById('nivel');
    textnode = document.createTextNode(player.nivel);
    lvl = document.createElement('span');
    lvl.id = "lvl";
    nivel.appendChild(lvl);
    lvl.appendChild(textnode);
  }

function actualizaMochila(){
  var img;
  var mochila = document.getElementById('mochila');
  var obj = document.getElementById('obj').remove();
  obj = document.createElement('span');
  obj.id = "obj";
  for(var i = 0; i < player.mochila.length; i++){
    if(player.mochila[i] == "garrote"){
       img = document.createElement('img');
       img.src = "media/images/wooden_club.png";
       img.setAttribute("id", "garrote");
       img.style.height = "40px";
       img.style.width = "40px";
       img.addEventListener('click', function(){ actualitzaObjetoMano("garrote"); });
       obj.appendChild(img);
     }else if(player.mochila[i] == "metal-shield"){
       img = document.createElement('img');
       img.src = "media/images/final_shield.png";
       img.setAttribute("id", "metal-shield");
       img.style.height = "40px";
       img.style.width = "40px";
       img.addEventListener('click', function(){ actualitzaObjetoMano("metal-shield"); });
       obj.appendChild(img);
     }else if(player.mochila[i] == "simple-shield"){
       img = document.createElement('img');
       img.src = "media/images/try.png";
       img.setAttribute("id", "simple-shield");
       img.style.height = "40px";
       img.style.width = "40px";
       img.addEventListener('click', function(){ actualitzaObjetoMano("simple-shield"); });
       obj.appendChild(img);
     }else if(player.mochila[i] == "metal-sword"){
       img = document.createElement('img');
       img.src = "media/images/final_sword.png";
       img.setAttribute("id", "metal-sword");
       img.style.height = "40px";
       img.style.width = "40px";
       img.addEventListener('click', function(){ actualitzaObjetoMano("metal-sword"); });
       obj.appendChild(img);
     }else if(player.mochila[i] == "simple-sword"){
       img = document.createElement('img');
       img.src = "media/images/sword.png";
       img.setAttribute("id", "simple-sword");
       img.style.height = "40px";
       img.style.width = "40px";
       img.addEventListener('click', function(){ actualitzaObjetoMano("simple-sword"); });
       obj.appendChild(img);
     }else if(player.mochila[i] == "key"){
       img = document.createElement('img');
       img.src = "media/images/key.png";
       img.setAttribute("id", "key");
       img.style.height = "40px";
       img.style.width = "40px";
       obj.appendChild(img);
     }
  }
  mochila.appendChild(obj);
}

function identificaCasella(){
  var casellaVisualitzada = "null";
    if(player.estadoPartida.direccion == 0){
      casellaVisualitzada = mapa[player.nivel][player.estadoPartida.x + ((player.estadoPartida.y - 1) * 10)].elemento;
    }else if(player.estadoPartida.direccion == 1){
      casellaVisualitzada = mapa[player.nivel][player.estadoPartida.x + ((player.estadoPartida.y + 1) * 10)].elemento;
    }else if(player.estadoPartida.direccion == 2){
      casellaVisualitzada = mapa[player.nivel][player.estadoPartida.x +1 + ((player.estadoPartida.y) * 10)].elemento;
    }else if(player.estadoPartida.direccion == 3){
      casellaVisualitzada = mapa[player.nivel][player.estadoPartida.x -1 + ((player.estadoPartida.y) * 10)].elemento;
    }
    return casellaVisualitzada;
}

function eliminaCasella(){
  if (player.estadoPartida.direccion == 0){
    mapa[player.nivel][player.estadoPartida.x + ((player.estadoPartida.y - 1) * 10)].elemento = "none";
    pintaPosicion(player.estadoPartida.x, player.estadoPartida.y-1);
    actualizarMinimap(player.estadoPartida.x, player.estadoPartida.y-1, 10);

  }else if(player.estadoPartida.direccion == 1){
    mapa[player.nivel][player.estadoPartida.x + ((player.estadoPartida.y + 1) * 10)].elemento = "none";
    pintaPosicion(player.estadoPartida.x, player.estadoPartida.y+1);
    actualizarMinimap(player.estadoPartida.x, player.estadoPartida.y+1, 10);


  }else if(player.estadoPartida.direccion == 2){
    mapa[player.nivel][player.estadoPartida.x + 1 + ((player.estadoPartida.y) * 10)].elemento = "none";
    pintaPosicion(player.estadoPartida.x + 1, player.estadoPartida.y);
    actualizarMinimap(player.estadoPartida.x + 1, player.estadoPartida.y, 10);


  }else if(player.estadoPartida.direccion == 3){
    mapa[player.nivel][player.estadoPartida.x -1 + ((player.estadoPartida.y) * 10)].elemento = "none";
    pintaPosicion(player.estadoPartida.x-1,player.estadoPartida.y);
    actualizarMinimap(player.estadoPartida.x - 1, player.estadoPartida.y, 10);

  }
}

























/*function obrirFinestra(){
  window.open("index2.html", "popupId", 'status=yes,width =790,height=531,top=' + (screen.height-531)/2+',left=' + (screen.width-790)/2 + ',location=yes');*/
  //window.open("index2.html", "popupId", "location=no,menubar=no,titlebar=no,resizable=no,toolbar=no, menubar=no,width=500,height=500");

/*
  var minimapa = document.getElementById("mapapetit");
  minimapa.style.display = "block";
  var cpartida = document.getElementById("cargarpartida");
  cpartida.style.display = "block";
  var gpartida = document.getElementById("guardarpartida");
  gpartida.style.display = "block";
  var epartida = document.getElementById("esborrarpartida");
  epartida.style.display = "block";
  var com = document.getElementById("començar");
  com.style.display = "none";
  var cont = document.getElementById("contronooom
  cont.style.display = "block";
  var equipcarac = document.getElementById("equipocarac");
  equipcarac.style.display = "block";
  var nav = document.getElementById("navegacion");
  nav.style.display = "block";
  var comen = document.getElementById("començar");
  comen.style.display = "none";
*/
//}

/*function tancarFinestra(){

  name = window.document.getElementById('inputNom').value;
//  var nom = document.getElementById('nom');
//  var textnode = document.createTextNode(name);
//  console.log(textnode);
  //nom.appendChild(name);


  if(document.getElementById("M").checked){
    opciomascfem = 0;
  }else{
    opciomascfem = 1;
  }

  console.log(name);
  console.log(opciomascfem);

  //window.opener.document.getElementById('nombre').innerHTML = "Este texto viene de la página hijo: "+name;
//  window.opener.document.getElementById('nooom').innerHTML = "Nombre/Sexo:" + name;
  start = true;

  iniciarJuego();

  //console.log(window.opener);
  //this.window.close();
/*
  var minimapa = this.document.getElementById("mapapetit");
  minimapa.style.display = "block";
  var cpartida = document.getElementById("cargarpartida");
  cpartida.style.display = "block";
  var gpartida = document.getElementById("guardarpartida");
  gpartida.style.display = "block";
  var epartida = document.getElementById("esborrarpartida");
  epartida.style.display = "block";
  var com2 = document.getElementById("començar2");
  com2.style.display = "block";
  var cont = document.getElementById("controls");
  cont.style.display = "block";
  var equipcarac = document.getElementById("equipocarac");
  equipcarac.style.display = "block";
  var nav = document.getElementById("navegacion");
  nav.style.display = "block";
  var comen = document.getElementById("començar");
  comen.style.display = "none";
*/
//}

//function pantallaPrincipal(){

  /*var botoComençar = document.getElementById("començar");
  botoComençar.style.display = "none";
  var botoComençar2 = document.getElementById("començar2");
  botoComençar2.style.display = "none";*/
  //eliminem elements al començar el joc
  /*var minimapa = document.getElementById("mapapetit");
  minimapa.style.display = "none";
  var cpartida = document.getElementById("cargarpartida");
  cpartida.style.display = "none";
  var gpartida = document.getElementById("guardarpartida");
  gpartida.style.display = "none";
  var epartida = document.getElementById("esborrarpartida");
  epartida.style.display = "none";
  var com2 = document.getElementById("començar2");
  com2.style.display = "none";
  var cont = document.getElementById("controls");
  cont.style.display = "none";
  var equipcarac = document.getElementById("equipocarac");
  equipcarac.style.display = "none";
  var nav = document.getElementById("navegacion");
  nav.style.display = "none";
  var comen = document.getElementById("començar");
  comen.style.display = "block";*/

//}
