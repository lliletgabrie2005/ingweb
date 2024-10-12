function calcular() {
  let QTrapezio = Number(document.getElementById("TbCaudal").value);
  let BTrapezio = Number(document.getElementById("TbBase").value);
  let zTrapezio = Number(document.getElementById("TbZ").value);
  let YTrapezio = Number(document.getElementById("TbY").value);
  let JTrapezio = 6;

  let ATrapezio = (BTrapezio + (zTrapezio * YTrapezio)) * YTrapezio;
  let RTrapezio = (Math.pow(QTrapezio, 2) / (19.62 * YTrapezio * Math.pow(ATrapezio, 2)));
  let ENERGIATrapezio = YTrapezio + RTrapezio;
  let TTrapezio = zTrapezio === 0
    ? (BTrapezio / (0.001 * YTrapezio))
    : (BTrapezio / (zTrapezio * YTrapezio));

  let K1 = (2.5 * TTrapezio) + 1;
  let K2 = (1.5 * TTrapezio + 1) * (TTrapezio + 1);
  let K3 = (0.5 * Math.pow(TTrapezio, 2)) + (TTrapezio - 6 * RTrapezio) * (TTrapezio + 1);
  let K4 = 6 * RTrapezio * Math.pow(TTrapezio + 1, 2);
  let FTrapezio = Math.pow(JTrapezio, 4) + (K1 * Math.pow(JTrapezio, 3)) + (K2 * Math.pow(JTrapezio, 2)) + (K3 * JTrapezio) - K4;
  let DTrapezio;
  var Ndec = 4;

  while (Math.abs(FTrapezio) > 0.0001 || Math.abs(FTrapezio) === 0.0001) {
    DTrapezio = (4 * Math.pow(JTrapezio, 3)) + (3 * K1 * Math.pow(JTrapezio, 2)) + (2 * K2 * JTrapezio) + K3;
    JTrapezio = JTrapezio - (FTrapezio / DTrapezio);
    FTrapezio = Math.pow(JTrapezio, 4) + (K1 * Math.pow(JTrapezio, 3)) + (K2 * Math.pow(JTrapezio, 2)) + (K3 * JTrapezio) - K4;
  }

  let Y1Trapezio = YTrapezio;
  let Y2Trapezio = JTrapezio * Y1Trapezio;
  let E1Trapezio = Y1Trapezio + (Math.pow(QTrapezio, 2) / (19.62 * Math.pow(ATrapezio, 2)));
  let A2Trapezio = (BTrapezio + zTrapezio * Y2Trapezio) * Y2Trapezio;
  let E2Trapezio = Y2Trapezio + (Math.pow(QTrapezio, 2) / (19.62 * Math.pow(A2Trapezio, 2)));
  let E3Trapezio = Math.abs(E2Trapezio - E1Trapezio);
  let Y3Trapezio = Math.abs(Y1Trapezio - Y2Trapezio);

  var pendienteCanal = JTrapezio.toFixed(Ndec);
  var tiranteConjugado = Y2Trapezio.toFixed(Ndec);
  var perdidaEnergia = E3Trapezio.toFixed(Ndec);
  var AlturaSalto = Y3Trapezio.toFixed(Ndec);
  var numeroFroude = ((QTrapezio / A2Trapezio) / (Math.pow(9.81 * Y2Trapezio, 0.5))).toFixed(Ndec);
  var longitudSalto = (Math.abs(5 * (Y2Trapezio - YTrapezio))).toFixed(Ndec);
  // Actualiza los valores en la interfaz del usuario
  document.getElementById('pendienteCanal').innerHTML = "Pediente de canal: " + pendienteCanal;
  document.getElementById('tiranteConjugado').innerHTML = "Tirante Conjugado: " + tiranteConjugado;
  document.getElementById('perdidaEnergia').innerHTML = "Perdida de Energia: " + perdidaEnergia;
  document.getElementById('AlturaSalto').innerHTML = " Altura del salto: " + AlturaSalto;
  document.getElementById('numeroFroude').innerHTML = "Número de Froude conjugado: " + numeroFroude;
  document.getElementById('longitudSalto').innerHTML = "Longitud del salto (m): " + longitudSalto;

  let label39 = document.getElementById("Label39");
  if ((QTrapezio / A2Trapezio) / (Math.pow(9.81 * Y2Trapezio, 0.5)) < 1) {
    label39.textContent = "tirante subcrítico";
  } else {
    label39.textContent = "tirante supercrítico";
  }
  document.getElementById('Label39').style.display = 'block';
  document.getElementById('resultados').style.display = 'block';
}

function limpiarCampos() {
  document.getElementById('formulario').reset();
  document.getElementById('resultados').style.display = "none";
}

function ejemploCalculo() {
  document.getElementById('TbCaudal').value = 2;
  document.getElementById('TbBase').value = 1.5;
  document.getElementById('TbZ').value = 1.5;
  document.getElementById('TbY').value = 0.85;
}