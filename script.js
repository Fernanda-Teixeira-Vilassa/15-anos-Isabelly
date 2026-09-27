/* =========================================================
   CONVITE DIGITAL — 15 ISABELLY MAURI
   SCRIPT.JS
========================================================= */


/* =========================================================
   CONFIGURAÇÕES
========================================================= */

const EVENT_DATE = new Date("2026-11-07T20:00:00-03:00");

/*
    ALTERE PARA O NÚMERO REAL DO WHATSAPP
    Formato:
    55 + DDD + número
*/
const WHATSAPP_NUMBER = "5527999999999";


/* =========================================================
   ELEMENTOS
========================================================= */

const opening = document.getElementById("opening");
const enterButton = document.getElementById("enterButton");

const videoScreen = document.getElementById("videoScreen");
const video = document.getElementById("inviteVideo");

const mainInvite = document.getElementById("mainInvite");

const skipVideo = document.getElementById("skipVideo");
const soundButton = document.getElementById("soundButton");

const backgroundMusic =
    document.getElementById("backgroundMusic");

const toast = document.getElementById("toast");


/* =========================================================
   ESTADO DO ÁUDIO
========================================================= */

let musicEnabled = true;

if (backgroundMusic) {
    backgroundMusic.volume = 0.72;
}


/* =========================================================
   ABRIR CONVITE
========================================================= */

enterButton.addEventListener("click", async () => {

    await startBackgroundMusic();

    opening.classList.add("opened");

    setTimeout(() => {

        opening.classList.add("hidden");

        videoScreen.classList.add("active");

        videoScreen.setAttribute(
            "aria-hidden",
            "false"
        );

        video.muted = true;

        video.play()
            .then(() => {

                console.log(
                    "🎬 Vídeo iniciado."
                );

            })
            .catch((error) => {

                console.warn(
                    "Não foi possível iniciar o vídeo:",
                    error
                );

                notify(
                    "Não foi possível iniciar o vídeo."
                );

            });

    }, 900);

});


/* =========================================================
   INICIAR MÚSICA
========================================================= */

async function startBackgroundMusic() {

    if (!backgroundMusic) {

        console.warn(
            "⚠️ Elemento backgroundMusic não encontrado."
        );

        return;
    }

    try {

        backgroundMusic.volume = 0.72;

        await backgroundMusic.play();

        musicEnabled = true;

        updateSoundButton();

        console.log(
            "🎵 Música iniciada."
        );

    } catch (error) {

        console.warn(
            "⚠️ O navegador bloqueou a reprodução da música:",
            error
        );

        musicEnabled = false;

        updateSoundButton();

    }

}


/* =========================================================
   CONTROLE DA MÚSICA
========================================================= */

soundButton.addEventListener(
    "click",
    async () => {

        if (!backgroundMusic) {
            return;
        }

        if (!backgroundMusic.paused) {

            backgroundMusic.pause();

            musicEnabled = false;

        } else {

            try {

                backgroundMusic.volume = 0.72;

                await backgroundMusic.play();

                musicEnabled = true;

            } catch (error) {

                console.warn(
                    "Não foi possível reproduzir a música.",
                    error
                );

                notify(
                    "Toque novamente para ativar a música."
                );

            }

        }

        updateSoundButton();

    }
);


/* =========================================================
   ATUALIZAR ÍCONE DO ÁUDIO
========================================================= */

function updateSoundButton() {

    if (!soundButton) {
        return;
    }

    if (
        backgroundMusic &&
        !backgroundMusic.paused &&
        musicEnabled
    ) {

        soundButton.textContent = "🔊";

        soundButton.setAttribute(
            "aria-label",
            "Desativar música"
        );

    } else {

        soundButton.textContent = "🔇";

        soundButton.setAttribute(
            "aria-label",
            "Ativar música"
        );

    }

}


/* =========================================================
   FINAL DO VÍDEO
========================================================= */

video.addEventListener(
    "ended",
    () => {

        showMainInvite();

    }
);


/* =========================================================
   MOSTRAR CONVITE PRINCIPAL
========================================================= */

function showMainInvite() {

    if (video) {

        video.pause();

        video.currentTime = 0;

    }

    videoScreen.classList.remove("active");

    videoScreen.setAttribute(
        "aria-hidden",
        "true"
    );

    mainInvite.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "auto";

    if (
        backgroundMusic &&
        musicEnabled &&
        backgroundMusic.paused
    ) {

        backgroundMusic.play()
            .catch(() => {});

    }

}


/* =========================================================
   PULAR VÍDEO
========================================================= */

skipVideo.addEventListener(
    "click",
    () => {

        showMainInvite();

    }
);


/* =========================================================
   TECLA V — PULAR VÍDEO
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key.toLowerCase() === "v" &&
            videoScreen.classList.contains("active")
        ) {

            showMainInvite();

        }

    }
);


/* =========================================================
   COUNTDOWN
========================================================= */

function updateCountdown() {

    const now = new Date();

    let difference =
        EVENT_DATE.getTime() -
        now.getTime();

    if (difference < 0) {
        difference = 0;
    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            difference /
            (1000 * 60 * 60)
        ) % 24;


    const minutes =
        Math.floor(
            difference /
            (1000 * 60)
        ) % 60;


    const seconds =
        Math.floor(
            difference / 1000
        ) % 60;


    document.getElementById("days").textContent =
        String(days).padStart(2, "0");


    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");


    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function notify(message) {

    if (!toast) {
        return;
    }

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);

}


/* =========================================================
   COPIAR PIX
========================================================= */

const copyPixButton =
    document.getElementById("copyPix");


if (copyPixButton) {

    copyPixButton.addEventListener(
        "click",
        async () => {

            const pixElement =
                document.getElementById("pixKey");


            if (!pixElement) {
                return;
            }


            const pix =
                pixElement.textContent.trim();


            try {

                await navigator.clipboard.writeText(
                    pix
                );

                notify(
                    "PIX copiado com sucesso! 💗"
                );

            } catch (error) {

                const temporaryInput =
                    document.createElement("input");

                temporaryInput.value = pix;

                document.body.appendChild(
                    temporaryInput
                );

                temporaryInput.select();

                document.execCommand(
                    "copy"
                );

                temporaryInput.remove();

                notify(
                    "PIX copiado!"
                );

            }

        }
    );

}


/* =========================================================
   LISTA DE PRESENTES
========================================================= */

const giftButtons =
    document.querySelectorAll(".gift");


giftButtons.forEach((button) => {

    button.addEventListener(
        "click",
        async () => {

            const giftText =
                button.dataset.copy || "";


            if (!giftText) {
                return;
            }


            try {

                await navigator.clipboard.writeText(
                    giftText
                );

                notify(
                    "Sugestão copiada! 🎁"
                );

            } catch (error) {

                notify(
                    giftText
                );

            }

        }
    );

});


/* =========================================================
   CONFIRMAÇÃO DE PRESENÇA
========================================================= */

const rsvpForm =
    document.getElementById("rsvpForm");


if (rsvpForm) {

    rsvpForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const guestName =
                document
                    .getElementById("guestName")
                    .value
                    .trim();


            const companions =
                document
                    .getElementById("guestCompanions")
                    .value
                    .trim();


            /*
                O campo guestMessage é opcional.
                Caso não exista no HTML, não gera erro.
            */

            const guestMessageElement =
                document.getElementById(
                    "guestMessage"
                );


            const guestMessage =
                guestMessageElement
                    ? guestMessageElement.value.trim()
                    : "";


            /* Validação */

            if (!guestName) {

                notify(
                    "Digite seu nome para confirmar. 💗"
                );

                document
                    .getElementById("guestName")
                    .focus();

                return;

            }


            /* =================================================
               MENSAGEM PARA WHATSAPP
            ================================================= */

            const whatsappMessage =
`Olá! Quero confirmar minha presença no aniversário de 15 anos da Isabelly. 💗

Nome: ${guestName}

Acompanhante(s):
${companions || "Nenhum"}

Mensagem:
${guestMessage || "Sem mensagem"}

Evento:
07/11/2026 às 20h

Casa Vila Cerimonial
Rua Elis Regina, 365 - Nova Itaparica
Vila Velha - ES`;


            const encodedMessage =
                encodeURIComponent(
                    whatsappMessage
                );


            const whatsappURL =
                `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;


            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );

        }
    );

}


/* =========================================================
   EFEITO PARALLAX DOS DISCOS
========================================================= */

document.addEventListener(
    "mousemove",
    (event) => {

        if (window.innerWidth <= 768) {
            return;
        }


        const x =
            (
                event.clientX /
                window.innerWidth -
                0.5
            ) * 2;


        const y =
            (
                event.clientY /
                window.innerHeight -
                0.5
            ) * 2;


        const discos =
            document.querySelectorAll(
                ".disco"
            );


        discos.forEach(
            (disco, index) => {

                const intensity =
                    4 + index * 1.2;


                disco.style.marginLeft =
                    `${x * intensity}px`;


                disco.style.marginTop =
                    `${y * intensity}px`;

            }
        );

    }
);


/* =========================================================
   ERRO NO VÍDEO
========================================================= */

video.addEventListener(
    "error",
    () => {

        console.warn(
            "Vídeo não encontrado ou inválido."
        );


        notify(
            "Vídeo não encontrado. Verifique assets/video/convite.mp4"
        );

    }
);


/* =========================================================
   ERRO NA MÚSICA
========================================================= */

if (backgroundMusic) {

    backgroundMusic.addEventListener(
        "error",
        () => {

            console.warn(
                "Música não encontrada ou inválida."
            );


            notify(
                "Música não encontrada. Verifique assets/audio/musica.mp3"
            );

        }
    );

}


/* =========================================================
   ORIENTAÇÃO DA TELA
========================================================= */

function checkOrientation() {

    if (
        window.innerWidth >
        window.innerHeight
    ) {

        document.body.classList.add(
            "landscape"
        );

    } else {

        document.body.classList.remove(
            "landscape"
        );

    }

}


window.addEventListener(
    "resize",
    checkOrientation
);


checkOrientation();


/* =========================================================
   BLOQUEIA SCROLL DURANTE A ABERTURA
========================================================= */

document.body.style.overflow = "hidden";


/* =========================================================
   LOG
========================================================= */

console.log(
    "✨ Convite Isabelly Mauri carregado!"
);

console.log(
    "🎵 Música de fundo preparada."
);

console.log(
    "🎬 Clique em 'ABRIR MEU CONVITE' para iniciar."
);
