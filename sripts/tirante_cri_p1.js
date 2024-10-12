function calcular() {
  var caudal = parseFloat(document.getElementById('caudal').value);
  var anchoSolera = parseFloat(document.getElementById('anchoSolera').value);
  var pendienteTalud = parseFloat(document.getElementById('pendienteTalud').value);

  var QT = caudal;
  var ZT = pendienteTalud;
  var BT = anchoSolera;
  var YT = 0.0000001;
  var ErrT = 0.0001;

  var CT, LT, AT, PT, TT, FT, VT, L1, F1, E1, P1, R1;

  CT = Math.pow(QT, 2) / 9.810001;
  LT = Math.sqrt(1 + Math.pow(ZT, 2));
  var Ndec = 4;
  while (true) {
    AT = (BT + ZT * YT) * YT;
    PT = BT + 2 * YT * LT;
    TT = BT + 2 * ZT * YT;
    FT = Math.pow(AT, 3) / TT - CT;

    var D = 3 * Math.pow(AT, 2) - (2 * ZT * Math.pow(AT, 3)) / Math.pow(TT, 2);
    var Y1 = YT - FT / D;

    if (Math.abs(FT) <= ErrT) {
      YT = Y1;
      break;
    }

    YT = Y1;
  }

  VT = QT / AT;
  L1 = AT / TT;
  F1 = VT / Math.sqrt(9.81 * L1);
  E1 = YT + Math.pow(VT, 2) / 19.62;

  P1 = BT + 2 * YT * Math.sqrt(1 + Math.pow(ZT, 2));
  R1 = AT / P1;


  document.getElementById('tiranteCritico').textContent = YT.toFixed(Ndec);
  document.getElementById('perimetro').textContent = P1.toFixed(Ndec);
  document.getElementById('areaHidraulica').textContent = AT.toFixed(Ndec);
  document.getElementById('radioHidraulico').textContent = R1.toFixed(Ndec);
  document.getElementById('espejoAgua').textContent = TT.toFixed(Ndec);
  document.getElementById('velocidad').textContent = VT.toFixed(Ndec);
  document.getElementById('froude').textContent = F1.toFixed(Ndec);
  document.getElementById('energia').textContent = E1.toFixed(Ndec);

  document.getElementById('resultados').style.display = 'block';
}

function limpiarCampos() {
  document.getElementById('formulario').reset();
  document.getElementById('resultados').style.display = 'none';
}

function ejemploCalculo() {
  document.getElementById('caudal').value = '2.3';
  document.getElementById('anchoSolera').value = '1.5';
  document.getElementById('pendienteTalud').value = '1.5';
}