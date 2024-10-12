function calcular() {
  var QC = parseFloat(document.getElementById('caudal').value);
  var DC = parseFloat(document.getElementById('diametro').value);
  var nC = 1;
  var SC = 1;

  var CC = QC / Math.sqrt(9.81);
  var YC = 0.00001;
  var Ndc = 4;

  while (true) {
    var WC = 1 - 2 * (YC / DC);
    var ARCOCOSWC = 1.570796 - Math.atan(WC / Math.sqrt(1 - WC * WC));
    var XC = 2 * ARCOCOSWC;
    var AC = (XC - Math.sin(XC)) * Math.pow(DC, 2) / 8;
    var PC = XC * DC / 2;
    var FC = Math.pow(AC, 3 / 2) / Math.sqrt(DC * Math.sin(XC / 2)) - CC;

    if (Math.abs(FC) < 0.0001) {
      var VC = QC / AC;
      var TC = DC * Math.sin(XC / 2);
      var F2 = VC / Math.sqrt(9.81 * DC);

      var tiranteCritico = YC.toFixed(Ndc);
      var perimetro = PC.toFixed(Ndc);
      var areaHidraulica = AC.toFixed(Ndc);
      var radioHidraulico = (AC / PC).toFixed(Ndc);
      var espejoAgua = (DC * Math.sin(XC / 2)).toFixed(Ndc);
      var velocidad = (QC / AC).toFixed(4);
      var numeroFroude = "1";
      var energia = (YC + Math.pow((QC / AC), 2) / (2 * 9.81)).toFixed(Ndc);

      document.getElementById('tiranteCritico').innerHTML = tiranteCritico;
      document.getElementById('perimetro').innerHTML = perimetro;
      document.getElementById('areaHidraulica').innerHTML = areaHidraulica;
      document.getElementById('radioHidraulico').innerHTML = radioHidraulico;
      document.getElementById('espejoAgua').innerHTML = espejoAgua;
      document.getElementById('velocidad').innerHTML = velocidad;
      document.getElementById('numeroFroude').innerHTML = numeroFroude;
      document.getElementById('energia').innerHTML = energia;

      document.getElementById('resultados').style.display = "block";
      break;
    }

    YC += 0.00001;

    if (YC > DC) {
      document.getElementById('resultados').style.display = "none";
      alert("No se puede calcular el tirante crítico con los valores proporcionados.");
      break;
    }
  }
}

function limpiarCampos() {
  document.getElementById('formulario').reset();
  document.getElementById('resultados').style.display = "none";
}

function ejemploCalculo() {
  document.getElementById('caudal').value = "1.5";
  document.getElementById('diametro').value = "1.4";
}