// =========================================================
// SIMULAÇÃO - SOMENTE SENSORES E BOMBA
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // BOMBA E SETA
    // =====================================================
    const bomba = document.getElementById("path8");
    const seta = document.getElementById("path1-0-8");

    // =====================================================
    // ELEMENTOS
    // =====================================================

    const sensores = {
        s1: document.getElementById("g1"),
        s2: document.getElementById("g2"),
        s3: document.getElementById("g3"),
        s4: document.getElementById("g4"),
        s5: document.getElementById("g5")
    };


    // =====================================================
    // ESTADO
    // =====================================================

    const estado = {
        s1: true,
        s2: true,
        s3: false,
        s4: false,
        s5: false,

        bomba: false
    };


    // =====================================================
    // ATUALIZA UM SENSOR
    // =====================================================

    function atualizarSensor(nome, ligado) {

        const elemento = sensores[nome];

        if (!elemento) {
            return;
        }

        elemento.classList.toggle(
            "vermelho",
            ligado
        );
    }

    // =====================================================
    // ATUALIZA NÍVEL VISUAL DA CAIXA
    // =====================================================

    function atualizarNivelCaixa() {

        // Remove todos os níveis
        document.body.classList.remove(
            "tanque-nivel-0",
            "tanque-nivel-1",
            "tanque-nivel-2",
            "tanque-nivel-3"
        );


        // S5 ligado = caixa cheia
        if (estado.s5) {

            document.body.classList.add(
                "tanque-nivel-3"
            );

            return;
        }


        // S4 ligado = nível médio
        if (estado.s4) {

            document.body.classList.add(
                "tanque-nivel-2"
            );

            return;
        }


        // S3 ligado = nível baixo
        if (estado.s3) {

            document.body.classList.add(
                "tanque-nivel-1"
            );

            return;
        }


        // Nenhum sensor ligado = caixa vazia
        document.body.classList.add(
            "tanque-nivel-0"
        );
    }


    // =====================================================
    // ATUALIZA NIVEL CISTERNA
    // =====================================================
    function atualizarNivelCisterna() {

        document.body.classList.remove(
            "cisterna-nivel-0",
            "cisterna-nivel-1",
            "cisterna-nivel-2"
        );

        if (estado.s1 && estado.s2) {
            document.body.classList.add("cisterna-nivel-2");
            return;
        }

        if (estado.s1) {
            document.body.classList.add("cisterna-nivel-1");
            return;
        }

        document.body.classList.add("cisterna-nivel-0");
    }

    // =====================================================
    // ATUALIZA TODOS OS SENSORES E BOMBA
    // =====================================================
    function atualizarSensores() {

        atualizarSensor("s1", estado.s1);
        atualizarSensor("s2", estado.s2);
        atualizarSensor("s3", estado.s3);
        atualizarSensor("s4", estado.s4);
        atualizarSensor("s5", estado.s5);

        atualizarNivelCaixa();

        atualizarNivelCisterna();

        atualizarBomba();
    }

    // =====================================================
    // ATUALIZA BOMBA E SETA
    // =====================================================
    function atualizarBomba() {

        // Liga somente quando S1 e S2 estão ligados
        if (estado.s1 && estado.s2) {
            estado.bomba = true;
        }

        // Desliga somente quando S1 e S2 estão desligados
        if (!estado.s1 && !estado.s2) {
            estado.bomba = false;
        }

        bomba.classList.toggle(
            "girar",
            estado.bomba
        );
        seta.classList.toggle(
            "subir",
            estado.bomba);
    }


    // =====================================================
    // CICLO
    // =====================================================

    function iniciarCiclo() {

        /*
            -----------------------------------------------
            ESTADO INICIAL
            -----------------------------------------------

            Cisterna cheia:

            S1 = ON
            S2 = ON

            Caixa vazia:

            S3 = OFF
            S4 = OFF
            S5 = OFF

        */

        estado.s1 = true;
        estado.s2 = true;

        estado.s3 = false;
        estado.s4 = false;
        estado.s5 = false;


        atualizarSensores();


        // =================================================
        // +2 SEGUNDOS
        // =================================================

        setTimeout(() => {

            /*
                S2 OFF
                S3 ON
            */

            estado.s2 = false;
            estado.s3 = true;

            atualizarSensores();

        }, 2000);


        // =================================================
        // +4 SEGUNDOS
        // =================================================

        setTimeout(() => {

            /*
                S4 ON
            */

            estado.s4 = true;

            atualizarSensores();

        }, 4000);


        // =================================================
        // +6 SEGUNDOS
        // =================================================

        setTimeout(() => {

            /*
                S5 ON
                S1 OFF
            */

            estado.s5 = true;
            estado.s1 = false;

            atualizarSensores();

        }, 6000);


        // =================================================
        // +8 SEGUNDOS
        // =================================================

        setTimeout(() => {

            /*
                S5 OFF
            */

            estado.s5 = false;

            atualizarSensores();

        }, 8000);


        // =================================================
        // +10 SEGUNDOS
        // =================================================

        setTimeout(() => {

            /*
                S4 OFF
                S1 ON
            */

            estado.s4 = false;
            estado.s1 = true;

            atualizarSensores();

        }, 10000);


        // =================================================
        // +12 SEGUNDOS
        // =================================================

        setTimeout(() => {

            /*
                S3 OFF
                S2 ON
            */

            estado.s3 = false;
            estado.s2 = true;

            atualizarSensores();

        }, 12000);


        // =================================================
        // +14 SEGUNDOS
        // =================================================

        setTimeout(() => {

            /*
                Ciclo terminado.

                Aguarda mais 2 segundos e começa
                novamente.
            */

            iniciarCiclo();

        }, 14000);
    }


    // =====================================================
    // INICIAR
    // =====================================================

    iniciarCiclo();









});


