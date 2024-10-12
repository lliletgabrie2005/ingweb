function calcular() {
  var QTrapezio = parseFloat(document.getElementById('caudal').value);
  var BTrapezio = parseFloat(document.getElementById('anchoSolera').value);
  var zTrapezio = 0;
  var YTrapezio = parseFloat(document.getElementById('tiranteConocido').value);
  var JTrapezio = 6;
  var ATrapezio, RTrapezio, ENERGIATrapezio, TTrapezio, K1, K2, K3, K4, FTrapezio, DTrapezio;
  var Y1Trapezio, Y2Trapezio, E1Trapezio, A2Trapezio, E2Trapezio, E3Trapezio, Y3Trapezio;

  ATrapezio = (BTrapezio + (zTrapezio * YTrapezio)) * YTrapezio;
  RTrapezio = Math.pow(QTrapezio, 2) / (19.62 * YTrapezio * Math.pow(ATrapezio, 2));
  ENERGIATrapezio = YTrapezio + RTrapezio;


  if (zTrapezio === 0) {
    zTrapezio = 0.001;
  }

  var Ndec = 4;
  TTrapezio = BTrapezio / (zTrapezio * YTrapezio);
  K1 = (2.5 * TTrapezio) + 1;
  K2 = (1.5 * TTrapezio + 1) * (TTrapezio + 1);
  K3 = (0.5 * Math.pow(TTrapezio, 2)) + (TTrapezio - 6 * RTrapezio) * (TTrapezio + 1);
  K4 = 6 * RTrapezio * Math.pow(TTrapezio + 1, 2);
  FTrapezio = Math.pow(JTrapezio, 4) + K1 * Math.pow(JTrapezio, 3) + K2 * Math.pow(JTrapezio, 2) + K3 * JTrapezio - K4;

  while (Math.abs(FTrapezio) > 0.0001 || Math.abs(FTrapezio) === 0.0001) {
    DTrapezio = 4 * Math.pow(JTrapezio, 3) + 3 * K1 * Math.pow(JTrapezio, 2) + 2 * K2 * JTrapezio + K3;
    JTrapezio = JTrapezio - (FTrapezio / DTrapezio);
    FTrapezio = Math.pow(JTrapezio, 4) + K1 * Math.pow(JTrapezio, 3) + K2 * Math.pow(JTrapezio, 2) + K3 * JTrapezio - K4;
  }

  Y1Trapezio = YTrapezio;
  Y2Trapezio = JTrapezio * Y1Trapezio;
  E1Trapezio = Y1Trapezio + Math.pow(QTrapezio, 2) / (19.62 * Math.pow(ATrapezio, 2));
  A2Trapezio = (BTrapezio + zTrapezio * Y2Trapezio) * Y2Trapezio;
  E2Trapezio = Y2Trapezio + Math.pow(QTrapezio, 2) / (19.62 * Math.pow(A2Trapezio, 2));
  E3Trapezio = Math.abs(E2Trapezio - E1Trapezio);
  Y3Trapezio = Math.abs(Y1Trapezio - Y2Trapezio);

  document.getElementById('tiranteConjugado').textContent = 'Tirante conjugado (m): ' + Y2Trapezio.toFixed(Ndec);
  document.getElementById('numeroFroudeConjugado').textContent = 'Número de Froude conjugado: ' + ((QTrapezio / A2Trapezio) / Math.sqrt(9.81 * Y2Trapezio)).toFixed(Ndec);
  document.getElementById('alturaSalto').textContent = 'Altura del salto (m): ' + Y3Trapezio.toFixed(Ndec);
  document.getElementById('longitudSalto').textContent = 'Longitud del salto (m): ' + (Y3Trapezio * 5).toFixed(Ndec);
  document.getElementById('perdidaEnergia').textContent = 'Pérdida de energía (m): ' + (E2Trapezio - E1Trapezio).toFixed(Ndec);
  document.getElementById('pendienteCanal').textContent = 'Pendiente del canal: ' + JTrapezio.toFixed(Ndec);

  document.getElementById('resultados').style.display = 'block';
}

document.getElementById('calcularBtn').addEventListener('click', calcular);

function limpiarCampos() {
  document.getElementById('formulario').reset();
  document.getElementById('resultados').style.display = 'none';
}

function ejemploCalculo() {
  document.getElementById('caudal').value = '2';
  document.getElementById('anchoSolera').value = '1.5';
  document.getElementById('tiranteConocido').value = '0.85';
}
