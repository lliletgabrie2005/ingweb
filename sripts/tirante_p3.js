function calcular() {
  var QC = parseFloat(document.getElementById('caudal').value);
  var DC = parseFloat(document.getElementById('diametro').value);
  var nC = parseFloat(document.getElementById('rugosidad').value);
  var SC = parseFloat(document.getElementById('pendiente').value);

  var CC = (QC * nC) / Math.sqrt(SC);
  var YC = 0.3 + 0.001;

  var ndc = 3;
  while (true) {
    var WC = 1 - 2 * (YC / DC);
    var ARCOCOSWC = 1.570796 - Math.atan(WC / Math.sqrt(1 - WC * WC));
    var XC = 2 * ARCOCOSWC;
    var AC = (XC - Math.sin(XC)) * Math.pow(DC, 2) / 8;
    var PC = XC * DC / 2;
    var FC = Math.pow(AC, 5 / 3) / Math.pow(PC, 2 / 3) - CC;

    if (Math.abs(FC) < 0.0001) {
      var VC = QC / AC;
      var TC = DC * Math.sin(XC / 2);
      var F2 = VC / Math.sqrt(9.81 * DC);

      var tiranteNormal = YC.toFixed(ndc);
      var perimetro = PC.toFixed(ndc);
      var areaHidraulica = AC.toFixed(ndc);
      var radioHidraulico = (AC / PC).toFixed(ndc);
      var espejoAgua = VC.toFixed(ndc);
      var velocidad = TC.toFixed(ndc);
      var numeroFroude = F2.toFixed(ndc);
      var energia = (YC + Math.pow(VC, 2) / (2 * 9.81)).toFixed(ndc);
      var tipoFlujo = F2 < 1 ? "Flujo subcrítico" : (F2 > 1 ? "Flujo supercrítico" : "Flujo crítico");

      document.getElementById('tiranteNormal').innerHTML = "Tirante Normal (m): " + tiranteNormal;
      document.getElementById('perimetro').innerHTML = "Perímetro Mojado (m): " + perimetro;
      document.getElementById('areaHidraulica').innerHTML = "Área Hidráulica (m²): " + areaHidraulica;
      document.getElementById('radioHidraulico').innerHTML = "Radio Hidráulico (m): " + radioHidraulico;
      document.getElementById('espejoAgua').innerHTML = "Espejo de Agua (m): " + espejoAgua;
      document.getElementById('velocidad').innerHTML = "Velocidad (m/s): " + velocidad;
      document.getElementById('numeroFroude').innerHTML = "Número de Froude: " + numeroFroude;
      document.getElementById('energia').innerHTML = "Energía Específica (m-Kg/Kg): " + energia;
      document.getElementById('tipoFlujo').innerHTML = "Tipo de Flujo: " + tipoFlujo;

      document.getElementById('resultados').style.display = "block";
      break;
    }

    YC += 0.0001;

    if (YC > DC) {
      document.getElementById('resultados').style.display = "none";
      alert("No se puede calcular el flujo con los valores proporcionados.");
      break;
    }
  }
}

function limpiarCampos() {
  document.getElementById('formulario').reset();
  document.getElementById('resultados').style.display = "none";
}

function ejemploCalculo() {
  document.getElementById('caudal').value = "1";
  document.getElementById('diametro').value = "3";
  document.getElementById('rugosidad').value = "0.015";
  document.getElementById('pendiente').value = "0.0005";
}
