function calcular() {
  var QT = parseFloat(document.getElementById("caudal").value);
  var BT = parseFloat(document.getElementById("anchoSolera").value);
  var ZT = parseFloat(document.getElementById("pendienteTalud").value);
  var nT = parseFloat(document.getElementById("rugosidad").value);
  var ST = parseFloat(document.getElementById("pendiente").value);

  var AT, PT, TT, FT, YT, CT, LT;

  var ErrT, D, Y1, E1, VT, L1, F1;

  if (QT < 0.9) {
    ErrT = 0.000000000001;
    YT = 0.000001;
  } else {
    YT = 0.001;
    ErrT = 0.001;
  }

  var Ndc = 4;
  CT = Math.pow(QT * (nT / Math.sqrt(ST)), 3);
  LT = Math.sqrt(1 + ZT * ZT);

  do {
    AT = (BT + ZT * YT) * YT;
    PT = BT + 2 * YT * LT;
    TT = BT + 2 * ZT * YT;
    FT = Math.pow(AT, 5) / Math.pow(PT, 2) - CT;

    D = (Math.pow(AT, 4) * (5 * PT * TT - 4 * AT * LT)) / Math.pow(PT, 3);
    Y1 = YT - FT / D;
    YT = Y1;
  } while (Math.abs(FT) > ErrT || Math.abs(FT) === ErrT);

  VT = QT / AT;
  L1 = AT / TT;
  F1 = VT / Math.sqrt(9.81 * L1);
  E1 = YT + (VT * VT) / 19.62;

  var tiranteNormal = YT.toFixed(Ndc);
  var perimetro = PT.toFixed(Ndc);
  var areaHidraulica = AT.toFixed(Ndc);
  var radioHidraulico = (AT / PT).toFixed(Ndc);
  var espejoAgua = TT.toFixed(Ndc);
  var velocidad = VT.toFixed(Ndc);
  var numeroFroude = F1.toFixed(Ndc);
  var energia = E1.toFixed(Ndc);
  var tipoFlujo =
    F1 < 1
      ? "Flujo subcrítico"
      : F1 > 1
        ? "Flujo supercrítico"
        : "Flujo crítico";

  document.getElementById("tiranteNormal").innerHTML =
    "Tirante Normal (m): " + tiranteNormal;
  document.getElementById("perimetro").innerHTML =
    "Perímetro Mojado (m): " + perimetro;
  document.getElementById("areaHidraulica").innerHTML =
    "Área Hidráulica (m²): " + areaHidraulica;
  document.getElementById("radioHidraulico").innerHTML =
    "Radio Hidráulico (m): " + radioHidraulico;
  document.getElementById("espejoAgua").innerHTML =
    "Espejo de Agua (m): " + espejoAgua;
  document.getElementById("velocidad").innerHTML =
    "Velocidad (m/s): " + velocidad;
  document.getElementById("numeroFroude").innerHTML =
    "Número de Froude: " + numeroFroude;
  document.getElementById("energia").innerHTML =
    "Energía Específica (m-kg/kg): " + energia;
  document.getElementById("tipoFlujo").innerHTML =
    "Tipo de Flujo: " + tipoFlujo;

  document.getElementById("resultados").style.display = "block";
}

function limpiarCampos() {
  document.getElementById("formulario").reset();
  document.getElementById("resultados").style.display = "none";
}

function ejemploCalculo() {
  document.getElementById("caudal").value = "2.3";
  document.getElementById("anchoSolera").value = "1.5";
  document.getElementById("pendienteTalud").value = "1.5";
  document.getElementById("rugosidad").value = "0.014";
  document.getElementById("pendiente").value = "0.0005";
}
