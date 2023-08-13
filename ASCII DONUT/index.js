(function () {
    var preTag = document.getElementById('donut');

    // angulos, raios e constantes
    var A = 1;
    var B = 1;
    var R1 = 1;
    var R2 = 2;
    var K1 = 150;
    var K2 = 5;

    // Function para o render ASCII frame
    function renderAsciiFrame() {
        var b = []; // Array onde fica os ascii char
        var z = []; // Array para guardar os valores de profundidade

        var width = 280; // Width do frame
        var height = 160; // Height do frame

        A += 0.07; // Incremento do angulo a
        B += 0.03; // Incremento do angulo b
        // seno e cosseno dos angulos
        var cA = Math.cos(A),
            sA = Math.sin(A),
            cB = Math.cos(B),
            sB = Math.sin(B);

        // Inicialização dos arrays com os angulos padrões
        for (var k = 0; k < width * height; k++) {
            // setar o caractere ascii padrão
            b[k] = k % width == width - 1 ? '\n' : ' ';
            // setar a profundidade padrão
            z[k] = 0;
        }

        // Gerar o frame ascii
        for (var j = 0; j < 6.28; j += 0.07) {
            var ct = Math.cos(j); //cosseno de j
            var st = Math.sin(j); //seno de j

            for (var i = 0; i < 6.28; i+= 0.02) {
                var sp = Math.sin(i); // seno de i
                cp = Math.cos(i), // cosseno de i
                    h = ct + 2, // calculo da altura
                    // calculo da distancia 
                    D = 1 / (sp * h * sA + st * cA + 5),
                    // variavel temporaria
                    t = sp * h * cA - st * sA;
            
                // calcular as coordenadas do ascii char
                var x = Math.floor(width / 2 + (width / 4) * D * (cp * h * cB - t * sB));
                var y = Math.floor(height / 2 + (height / 4) * D * (cp * h * sB + t * cB));
                
                // calcular o index dentro do array 
                var o = x + width * y;
                // calcular o index do ascii char
                var N = Math.floor(8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));
            
                // update do ascii char e produndidade se as condições são atendidas
                if (y < height && y >= 0 && x >= 0 && x < width && D > z[o]) {
                    z[o] = D;
                    // update o ascii char baseado no index
                    b[o] = '.,-~:;=!*#$@'[N > 0 ? N : 0];
                }

            }
        
        }

        // Update do elemento html com o ascii frame
        preTag.innerHTML = b.join('');

    }

    // function para começar a animação
    function startAsciiAnimation() {
        // Start chamando o renderAsciiAnimation a cada 50ms
        window.asciiIntervalId = setInterval(renderAsciiFrame, 50);
    }

    renderAsciiFrame(); // Render o frame ascii inicial
    // Adciona um event listener para começar a animação quando a pagina está carregada
    if(document.all) {
        // para versões antigas do explorer
        window.attachEvent('onload', startAsciiAnimation);
    } else { 
        // para navegadores modernos
        window.addEventListener('load', startAsciiAnimation, false);
    }

    // adciona um event listener para atualizar o ascii frame quando a janela é redimensionada
    window.addEventListener('resize', renderAsciiFrame);
})();