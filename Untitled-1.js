<script>
/* =========================
   ARCANE ACADEMY CORE ENGINE
   Dev: Kyter | Patch AAA
========================= */

let game = {};
let prof = { nome:"Aprendiz", lvl:1, xp:0, totalGames:0 };
let cfg = {};
let timer = null;
let tempo = 0;
let cartas = [];
let travado = false;
let pares = 0;
let total = 0;
let hp = 0;
let hpMax = 0;
let paused = false;

/* ===== SAFE STORAGE ===== */
function saveGame() {
    localStorage.setItem("aa_save", JSON.stringify(game));
}
function loadGame() {
    const s = localStorage.getItem("aa_save");
    if(s) game = JSON.parse(s);
}
function clearSave() {
    localStorage.removeItem("aa_save");
}

/* ===== SAFE TIMER ===== */
function startTimer(t){
    clearInterval(timer);
    tempo = t;
    document.getElementById("ui-tempo").innerText = tempo;

    timer = setInterval(()=>{
        if(paused) return;
        tempo--;
        document.getElementById("ui-tempo").innerText = tempo;
        if(tempo<=0){
            clearInterval(timer);
            showMagicAlert("Tempo esgotado!");
            sairParaMenu();
        }
    },1000);
}

/* ===== PAUSE SYSTEM ===== */
function togglePause(){
    paused = !paused;
    document.body.classList.toggle("paused", paused);
}

/* ===== HP SAFE ===== */
function updateHP(){
    document.getElementById("hp-bar").style.width = ((hpMax?hp/hpMax:0)*100)+"%";
}

/* ===== DIFFICULTY SCALE ===== */
function getDifficulty(){
    return Math.min(1 + Math.floor(game.fase/3),5);
}

/* ===== GAME FLOW ===== */
function novoJogo(){
    clearSave();
    game = {
        fase:1,
        score:0,
        infiniteMode:false,
        chaosCount:0,
        matches:0,
        mistakes:0,
        startTime:Date.now()
    };
    prof.totalGames++;
    localStorage.setItem("aa_prof", JSON.stringify(prof));
    transitionFase(1);
}

/* ===== SAFE TRANSITION ===== */
function transitionFase(f){
    clearInterval(timer);
    game.fase = f;
    saveGame();
    carregarFase(f);
}

/* ===== FASE LOADER ===== */
function carregarFase(f){
    const board = document.getElementById("board");
    board.innerHTML = "";

    const difficulty = getDifficulty();

    const nC = 8 + difficulty*2;
    const p = nC/2;

    hpMax = p;
    hp = p;
    updateHP();

    total = p;
    pares = 0;
    cartas = [];
    travado = false;

    let deck = items.slice(0, Math.min(p, items.length));
    deck = [...deck,...deck].sort(()=>Math.random()-0.5);

    deck.forEach(icon=>{
        const c = document.createElement("div");
        c.className = "card";
        c.dataset.icon = icon;
        c.innerHTML = `<div class="face front">${icon}</div><div class="face back"></div>`;
        c.onclick = ()=>cardClick(c,icon);
        board.appendChild(c);
    });

    startTimer(40 + difficulty*5);
}

/* ===== CARD LOGIC ===== */
function cardClick(c,val){
    if(travado || paused) return;
    if(c.classList.contains("flipped")) return;

    c.classList.add("flipped");
    cartas.push({el:c,v:val});

    if(cartas.length===2){
        travado = true;
        const [c1,c2] = cartas;
        game.matches++;

        if(c1.v===c2.v){
            c1.el.classList.add("matched");
            c2.el.classList.add("matched");
            pares++;
            hp--;
            updateHP();

            cartas=[];
            travado=false;

            if(pares===total){
                clearInterval(timer);
                game.score+=100;
                prof.xp+=50;
                localStorage.setItem("aa_prof",JSON.stringify(prof));
                setTimeout(()=>transitionFase(game.fase+1),1000);
            }
        } else {
            game.mistakes++;
            setTimeout(()=>{
                c1.el.classList.remove("flipped");
                c2.el.classList.remove("flipped");
                cartas=[];
                travado=false;
            },700);
        }
    }
}

/* ===== MENU ===== */
function sairParaMenu(){
    clearInterval(timer);
    saveGame();
    navegar("screen-menu");
}

/* ===== UTIL ===== */
function showMagicAlert(t){
    document.getElementById("magic-alert-text").innerText=t;
    document.getElementById("magic-alert-modal").classList.add("show");
}
function closeMagicAlert(){
    document.getElementById("magic-alert-modal").classList.remove("show");
}

/* ===== AUDIO SAFE ===== */
function playS(k){
    if(sfx[k]){
        const a = sfx[k].cloneNode(true);
        a.play().catch(()=>{});
    }
}

/* ===== INIT ===== */
window.onload=()=>{
    if(localStorage.getItem("aa_prof")) prof=JSON.parse(localStorage.getItem("aa_prof"));
    if(localStorage.getItem("aa_cfg")) cfg=JSON.parse(localStorage.getItem("aa_cfg"));
    loadGame();
};
</script>
