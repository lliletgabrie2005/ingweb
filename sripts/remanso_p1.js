let arrDatosInputFileXI = [];
        let arrDatosInputFileYI = [];

        function performCalculation() {
            let Ndec = 4; // Set this to the desired number of decimal places

            let Q = parseFloat(document.getElementById("TbCaudalI").value);
            let B = parseFloat(document.getElementById("TbBI").value);
            let Z = parseFloat(document.getElementById("TbzI").value);
            let S = parseFloat(document.getElementById("TbSI").value);
            let N = parseFloat(document.getElementById("TbNI").value);
            let Y3 = parseFloat(document.getElementById("TbY3I").value);
            let Y2 = parseFloat(document.getElementById("TbY2I").value);
            let Y1 = parseFloat(document.getElementById("TbY1I").value);
            let YO = Y1;
            let FO = 0;
            let X = 0;

            Y3 = (Y2 - Y1) / Y3;

            let i = 0;
            let Y = Y1;

            while(Y <= Y2 + Y3) {

                let A = (B + Z * Y) * Y;
                let P = B + 2 * Y * Math.sqrt(1 + Math.pow(Z, 2));
                let R = A / P;
                let T = B + 2 * Z * Y;
                let V = Q / A;
                let S1 = Math.pow((N * V / Math.pow(R, (2 / 3))), 2);
                let N1 = 1 - Math.pow(Q, 2) * T / (9.81 * Math.pow(A, 3));
                let D1 = S - S1;
                let F = N1 / D1;
                let DELTX = ((FO + F) / 2) * (Y - YO);
                X = X + Math.abs(DELTX);
                YO = Y;
                FO = F;

                let fila = [
                    Number(Y.toFixed(Ndec)),
                    Number(A.toFixed(Ndec)),
                    Number(T.toFixed(Ndec)),
                    Number(R.toFixed(Ndec)),
                    Number(V.toFixed(Ndec)),
                    Number(S1.toFixed(Ndec)),
                    Number(N1.toFixed(Ndec)),
                    Number(D1.toFixed(Ndec)),
                    Number(F.toFixed(Ndec)),
                    Number(DELTX.toFixed(Ndec)),
                    Number(X.toFixed(Ndec)),
                ];

                arrDatosInputFileXI.push(X);
                arrDatosInputFileYI.push(Y);

                let filaTabla2 = document.createElement('tr');

                for (let i = 0; i <= 10; i++) {
                    let cell = document.createElement('td');
                    cell.innerText = fila[i].toString();
                    filaTabla2.appendChild(cell);
                }

                document.getElementById('Tabla2').appendChild(filaTabla2);

                i++;

                if (i - 1 === Y3) {
                    break;
                }

                Y += Y3;
            }

            document.getElementById("Label41").style.visibility = "visible";
            subGraficarI();
        }

        function subGraficarI() {
            var ctx = document.getElementById('myChart').getContext('2d');
            var chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: arrDatosInputFileXI,
                    datasets: [{
                        label: 'My First Dataset',
                        data: arrDatosInputFileYI,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                }
            });
        }

        function limpiarCampos() {
            document.getElementById('formulario').reset();
            document.getElementById('resultados').style.display = 'none';

            let tabla = document.getElementById('Tabla2');
            while (tabla.rows.length > 1) {
                tabla.deleteRow(1);
            }

            // Restablecer los arrays
            arrDatosInputFileXI = [];
            arrDatosInputFileYI = [];

            // Eliminar el gráfico
            var ctx = document.getElementById('myChart').getContext('2d');
            if (ctx) {
                ctx.canvas.parentNode.removeChild(ctx.canvas);
            }

            // Crear nuevamente el canvas del gráfico
            var newCanvas = document.createElement('canvas');
            newCanvas.setAttribute('id', 'myChart');
            document.querySelector('.graph-container').appendChild(newCanvas);
        }
        
          function ejemploCalculo() {
            document.getElementById('TbCaudalI').value = '5';
            document.getElementById('TbBI').value = '2.5';
            document.getElementById('TbzI').value = '1.5';
            document.getElementById('TbSI').value = '0.0005';
            document.getElementById('TbNI').value = '0.025';
            document.getElementById('TbY3I').value = '5';
            document.getElementById('TbY2I').value = '2.3';
            document.getElementById('TbY1I').value = '1.4';
          }