function calcular() {
  function Procedimiento3() {
    AP = 4 * Math.sqrt(2 * KP) * Math.pow(YP, 3 / 2) / 3;
    TP = Math.sqrt(8 * KP * YP);
    if (YP / TP < 0.25 || YP / TP === 0.25) {
      PP = Math.sqrt(8 * KP) * (Math.sqrt(YP) + Math.pow(YP, 3 / 2) / (3 * KP));
    } else {
      var R1P = Math.sqrt(1 + 2 * YP / KP);
      PP = Math.sqrt(2 * KP * YP) * (R1P + Math.sqrt(KP / (2 * YP)) * Math.log(Math.sqrt(2 * YP / KP) + R1P));
    }
    FP = Math.pow(AP, 5 / 3) / Math.pow(PP, 2 / 3) - CP;
  }

  function Procedimiento3b() {
    AP = 2 * TP * YP / 3;
    if (YP / TP < 0.25 || YP / TP === 0.25) {
      PP = TP + 8 * Math.pow(YP, 2) / (3 * TP);
    } else {
      var R1P = Math.sqrt(1 + 16 * Math.pow(YP, 2) / Math.pow(TP, 2));
      PP = (TP / 2) * (R1P + (TP / (4 * YP)) * Math.log(4 * YP / TP + R1P));
    }
    KP = Math.pow(TP, 2) / (8 * YP);
    FP = Math.pow(AP, 5 / 3) / Math.pow(PP, 2 / 3) - CP;
  }
  var QP = parseFloat(document.getElementById('caudal').value);
  var nP = parseFloat(document.getElementById('rugosidad').value);
  var SP = parseFloat(document.getElementById('pendiente').value);
  var KP, TP, AP, PP, YP = 0.3, FP, CP;
  var XP;
  var Ndc = 4;
  const SECPAR = document.getElementById("SECPAR").selectedIndex;
  switch (SECPAR) {
    case 0:
      XP = 1;
      KP = parseFloat(document.getElementById("tipo").value);
      break;
    case 1:
      XP = 2;
      TP = parseFloat(document.getElementById("tipo").value);
      break;
  }


  if (XP === 1) {
    CP = (QP * nP) / Math.sqrt(SP);
    while (true) {
      Procedimiento3();
      F1P = FP;
      YP = YP + 0.0001;
      Procedimiento3();
      Y1P = YP - FP * 0.0001 / (FP - F1P);
      if (Math.abs(Y1P - YP) < 0.0001 || Math.abs(Y1P - YP) === 0.0001) {
        YP = Y1P;
        Procedimiento3();
        break;
      } else {
        YP = Y1P;
      }
    }
  } else if (XP === 2) {
    CP = (QP * nP) / Math.sqrt(SP);
    while (true) {
      Procedimiento3b();
      F1P = FP;
      YP = YP + 0.0000001;
      Procedimiento3b();
      Y1P = YP - FP * 0.0000001 / (FP - F1P);
      if (Math.abs(Y1P - YP) < 0.000001 || Math.abs(Y1P - YP) === 0.000001) {
        YP = Y1P;
        Procedimiento3b();
        break;
      } else {
        YP = Y1P;
      }
    }
  }
  const VP = QP / AP;
  const F2P = VP / Math.sqrt(9.81 * 2 * YP / 3);
  const EP = YP + Math.pow(VP, 2) / 19.62;

  document.getElementById("tiranteNormal").innerHTML = "Tirante Normal (m): " + YP.toFixed(Ndc);
  document.getElementById("perimetro").innerHTML = "Perímetro Mojado (m): " + PP.toFixed(Ndc);
  document.getElementById("areaHidraulica").innerHTML = "Área Hidráulica (m²): " + AP.toFixed(Ndc);
  document.getElementById("radioHidraulico").innerHTML = "Radio Hidráulico (m): " + (AP / PP).toFixed(Ndc);
  document.getElementById("focoParabola").innerHTML = "Foco de la parábola (m): " + KP.toFixed(Ndc);
  document.getElementById("espejoAgua").innerHTML = "Espejo de Agua (m): " + TP.toFixed(Ndc);
  document.getElementById("velocidad").innerHTML = "Velocidad (m/s): " + VP.toFixed(Ndc);
  document.getElementById("numeroFroude").innerHTML = "Número de Froude: " + F2P.toFixed(Ndc);
  document.getElementById("energia").innerHTML = "Energía Específica (m-kg/kg): " + EP.toFixed(Ndc);
  document.getElementById("tipoFlujo").innerHTML = "Tipo de Flujo: " + (F2P < 1 ? "Flujo subcrítico" : F2P > 1 ? "Flujo supercrítico" : "Flujo crítico");
  document.getElementById("resultados").style.display = "block";
}
// Procedimiento3b function



function limpiarCampos() {
  document.getElementById('formulario').reset();
  document.getElementById('resultados').style.display = "none";
}

function ejemploCalculo() {
  document.getElementById("SECPAR").selectedIndex = 0;
  document.getElementById('caudal').value = "1.8";
  document.getElementById('tipo').value = "0.5";
  document.getElementById('rugosidad').value = "0.025";
  document.getElementById('pendiente').value = "0.001";
}

