import mahjongPoints from './scoringTable.json'

const scoring = document.querySelector<HTMLDivElement>("#scoring-modal");
const compass = document.querySelector<HTMLButtonElement>("#middle");
const mask = document.querySelector<HTMLDivElement>("#mask");
const close = document.querySelector<HTMLButtonElement>("#close-scoring");
const query = document.querySelector<HTMLDivElement>("#query-modal");
const ron = document.querySelector<HTMLButtonElement>("#ron");
const tsumo = document.querySelector<HTMLButtonElement>("#tsumo");
const riichi = document.querySelector<HTMLSpanElement>("#riichi");

var honba = 0
var round = "East";
var roundnumber = 1;
var tsumobool = false;

const up = document.querySelector('#up .wind');
const right = document.querySelector('#right .wind');
const down = document.querySelector('#down .wind');
const left = document.querySelector('#left .wind');

const step1 = `<span class="point">Who dealt in?</span>
      <button id="left2"  class="player">
        <span class="point">N</span>
      </button>
      <button id="up2"  class="player">
        <span class="point">W</span>
      </button>
      <button id="right2"  class="player">
        <span class="point">S</span>
      </button>
      <button id="down2"  class="player">
        <span class="point">E</span>
      </button>`
const step2 = `<span class="title">How many Han?</span>
      <button class="option">1</button>
      <button class="option">2</button>
      <button class="option">3</button>
      <button class="option">4</button>
      <button class="option">5</button>
      <button class="option">6-7</button>
      <button class="option">8-10</button>
      <button class="option">11-12</button>
      <button class="option">13+</button>
      `
const step3 = `<span class="title">How many Fu?</span>
      <button class="option">20</button>
      <button class="option">25</button>
      <button class="option">30</button>
      <button class="option">40</button>
      <button class="option">50</button>
      <button class="option">60</button>
      <button class="option">70</button>
      <button class="option">80</button>
      <button id="cont" class="option">Fu Calculator</button>
      `

const fustep1 = `<span id="question-grid">
  <div class="row">
    <label><input type="checkbox" value="r1c1"> Pon?</label>
    <label><input type="checkbox" value="r1c2"> Terminal?</label>
    <label><input type="checkbox" value="r1c3"> Closed?</label>
    <label><input type="checkbox" value="r1c3"> Quad?</label>
  </div>
  <div class="row">
    <label><input type="checkbox" value="r2c1"> Pon?</label>
    <label><input type="checkbox" value="r2c2"> Terminal?</label>
    <label><input type="checkbox" value="r1c3"> Closed?</label>
    <label><input type="checkbox" value="r2c3"> Quad?</label>
  </div>
  <div class="row">
    <label><input type="checkbox" value="r3c1"> Pon?</label>
    <label><input type="checkbox" value="r3c2"> Terminal?</label>
    <label><input type="checkbox" value="r1c3"> Closed?</label>
    <label><input type="checkbox" value="r3c3"> Quad?</label>
  </div>
  <div class="row">
    <label><input type="checkbox" value="r4c1"> Pon?</label>
    <label><input type="checkbox" value="r4c2"> Terminal?</label>
    <label><input type="checkbox" value="r1c3"> Closed?</label>
    <label><input type="checkbox" value="r4c3"> Quad?</label>
  </div>
  <button id="cont">Continue</button>
</span>`

const fustep2 = `<span class="title">Closed Ron?</span>
      <button id="yes" class="option">Yes</button>
      <button id="no" class="option">No</button>
      `

const fustep3 = `<span class="title">Ryanmen Wait?</span>
      <button id="yes" class="option">Yes</button>
      <button id="no" class="option">No</button>
      `

const fustep4 = `<span class="title">What is the winning pair?</span>
<button id="four" class="option">Seat Wind</button>
<button id="two" class="option">Honor</button>
<button id="zero" class="option">Other</button>
`

const step4 = `<span class="title">bleh</span>
      <button class="option">Continue</button>
      `


compass?.addEventListener("click", () => {
  scoring?.classList.remove("hidden");
  mask?.classList.remove("hidden");
})

close?.addEventListener("click", () => {
  scoring?.classList.add("hidden");
  mask?.classList.add("hidden");
})

var dealtin;
var roner;
var ronerPlayer: HTMLButtonElement;
var dealtinPlayer: HTMLButtonElement;
var step = 0;
var fustep = 0;
var han = 0;
var fu = 20;

ron?.addEventListener("click", () => {
  scoring?.classList.add("hidden");
  query?.classList.remove("hidden");
  fustep = 0;
  step = 0;
  tsumobool = false;
  dealInStage();
})

tsumo?.addEventListener("click", () => {
  scoring?.classList.add("hidden");
  query?.classList.remove("hidden");
  fustep = 0;
  step = 0;
  tsumobool = true;
  dealInStage();
})

function dealInStage(): void {
  if(query){
    query.innerHTML = step1;
    setWinds();
    const question = query.querySelector<HTMLSpanElement>(".point")
    if(tsumobool){
      question!.textContent = "Who Tsumo?"
    }
    document.querySelectorAll(".player").forEach(btn =>{
      btn.addEventListener("click", event => {
        const button = event.currentTarget as HTMLButtonElement;
        if(step == 0 && !tsumobool){
          step = 1;
          if(question){
            question.textContent = "Who Ron?"
          }
          dealtin = button.querySelector<HTMLSpanElement>(".point")?.textContent!;
          console.log(dealtin);
        }
        else if(step == 1 || tsumobool){
          if(tsumobool){
            if(question){
              console.log("man wtf")
            }
            roner = button.querySelector<HTMLSpanElement>(".point")?.textContent!;
            getHan()
          }
          else{
            roner = button.querySelector<HTMLSpanElement>(".point")?.textContent!;
            step = 0;
            getHan()
          }
        }
      })
    })
  }
}

function getHan() : void{
  if(query){
    query.innerHTML = step2;
    query.querySelectorAll(".option").forEach(btn =>{
      btn.addEventListener("click", event => {
        const button = event.currentTarget as HTMLButtonElement;
        han = parseInt(button.textContent);
        console.log("han = " + han);
        getFu();
      })
    })
  }
}

function getFu() : void{
  if(han >= 5){
    console.log("tf");
    finalscore();
  }
  else if(query){
    query.innerHTML = step3;
    query.querySelectorAll(".option").forEach(btn =>{
      btn.addEventListener("click", event => {
        const button = event.currentTarget as HTMLButtonElement;
        fu = parseInt(button.textContent);
        finalscore()
      })
    })
    query.querySelector<HTMLButtonElement>("#cont")?.addEventListener("click", event =>{
      fuCalculator()
    })
  }
}

function fuCalculator() : void {
  if(query){
    if(fustep == 0){
      fu = 20;
      if(tsumo){
        fu = 22;
      }
      query.innerHTML = fustep1;
      fustep = 1;
      query.querySelector<HTMLButtonElement>("#cont")?.addEventListener("click", event =>{
      fuCalculator()
      })
      
    }
    else if(fustep == 1){
      
      console.log(fu);
      const boxes = document.querySelectorAll('#question-grid input[type="checkbox"]');
      const result: number[] = [];
      boxes.forEach(box => {
        result.push((box as HTMLInputElement).checked ? 1 : 0);
      });

      console.log(result);

      for(let i = 0; i < 4; i++){
        if(result[4 * i] == 1 || result[3 + 4 * i] == 1){
          let value = 2;

          value *= result[1 + 4 * i] ? 2 : 1;
          value *= result[2 + 4 * i] ? 2 : 1;
          value *= result[3 + 4 * i] ? 4 : 1;

          fu = fu + value;
        }
      }

      console.log(fu);

      query.innerHTML = fustep2;

      fustep = 2;

      query.querySelector<HTMLButtonElement>("#yes")?.addEventListener("click", event =>{
      fu = fu + 10;
      fuCalculator();
      })
      query.querySelector<HTMLButtonElement>("#no")?.addEventListener("click", event =>{
      fuCalculator()
      })
    }
    else if(fustep == 2){
      console.log(fu);
      if(fu % 10 < 4 && fu % 10 > 1){
        finalscore()
      }
      else{
        query.innerHTML = fustep3
        fustep = 3;
        query.querySelector<HTMLButtonElement>("#yes")?.addEventListener("click", event =>{
        fuCalculator();
        })
        query.querySelector<HTMLButtonElement>("#no")?.addEventListener("click", event =>{
        fu = fu + 2;
        fuCalculator()
        })
      }
    }
    else if( fustep == 3){
      console.log(fu)
      if(fu % 10 < 6 && fu % 10 > 1){
        finalscore()
      }
      else {
        query.innerHTML = fustep4
        fustep = 3;
        query.querySelector<HTMLButtonElement>("#four")?.addEventListener("click", event =>{
        fu = fu + 4;
        finalscore();
        })
        query.querySelector<HTMLButtonElement>("#two")?.addEventListener("click", event =>{
        fu = fu + 2;
        finalscore()
        })
        query.querySelector<HTMLButtonElement>("#zero")?.addEventListener("click", event =>{
        finalscore()
        })
      }
    }
    
  }
}

function finalscore() : void {
  if(query){
    if(fu != 25){
      fu = Math.ceil(fu / 10) * 10
    }
    query.innerHTML = step4;
    ronerPlayer = Array.from(document.querySelectorAll('.player')).find(btn => btn.querySelector('.wind')?.textContent === roner!) as HTMLButtonElement;
    dealtinPlayer = Array.from(document.querySelectorAll('.player')).find(btn => btn.querySelector('.wind')?.textContent === dealtin!) as HTMLButtonElement;
    var score = getPoints(han, fu, roner! == 'E', tsumobool);
    var finalscore = score;
    query.querySelectorAll(".option").forEach(btn =>{
      btn.addEventListener("click", event => {
        handleTransfer(finalscore)
      })
    })
    const title = query.querySelector<HTMLSpanElement>(".title")
    if(han > 12){
      finalscore = 32000;
    }
    if(title){
      title.textContent = "Han: " + han + " Fu: " + fu + " Final Score: " + finalscore
    }
  }
}

function handleTransfer(score: number) : void {
  ronerPlayer.querySelector('.point')!.textContent! = (parseInt(ronerPlayer.querySelector('.point')!.textContent) + score).toString();
  dealtinPlayer.querySelector('.point')!.textContent! = (parseInt(dealtinPlayer.querySelector('.point')!.textContent!) - score).toString();
  query?.classList.add("hidden")
  mask?.classList.add("hidden");
  if(roner! != 'E') {
    rotateWinds();
    roundnumber++
    if(roundnumber >= 5){
      roundnumber = 1;
      round = nextWind[round];
    }
    honba = 0;
  }
  else{
    honba++;
  }
  updateInfo();
}

const nextWind: Record<string, string> = {
  "E": "S",
  "S": "W",
  "W": "N",
  "N": "E",
  "East": "South",
  "South": "West",
  "West": "North",
  "North": "East"
};


const players = document.querySelectorAll('#left, #up, #right, #down');
  

function rotateWinds() {

  players.forEach(player => {
    const windSpan = player.querySelector('.wind') as HTMLSpanElement;
    const current = windSpan.textContent!;
    windSpan.textContent = nextWind[current];
  });


}

function setWinds() {
  (document.querySelector('#left2 .point') as HTMLSpanElement).textContent  = left?.textContent!;
  (document.querySelector('#up2 .point') as HTMLSpanElement).textContent    = up?.textContent!;
  (document.querySelector('#right2 .point') as HTMLSpanElement).textContent = right?.textContent!;
  (document.querySelector('#down2 .point') as HTMLSpanElement).textContent  = down?.textContent!;
}

function updateInfo() {
  if(compass){
    compass.querySelector<HTMLSpanElement>('.round')!.textContent = round + " " + roundnumber;
    compass.querySelector<HTMLSpanElement>('.repeat')!.textContent = "Repeat: " + honba;
  }
}

function getPoints(han: number, fu: number, dealer: boolean, tsumo: boolean) {
  // limit hands
  if (han >= 5) {
    const limit = dealer ? mahjongPoints.limits.dealer : mahjongPoints.limits.nonDealer;

    if (han >= 13) return limit.yakuman;
    if (han >= 11) return limit.sanbaiman;
    if (han >= 8) return limit.baiman;
    if (han >= 6) return limit.haneman;
    return limit.mangan;
  }

  const fuKey = String(fu);
  const hanKey = String(han);

  if (tsumo) {
    return dealer
      ? (mahjongPoints as any).tsumo.dealer[fuKey]?.[hanKey] : (mahjongPoints as any).tsumo.nonDealer[fuKey]?.[hanKey];
  }
  return dealer
    ? (mahjongPoints as any).ron.dealer[fuKey]?.[hanKey] : (mahjongPoints as any).ron.nonDealer[fuKey]?.[hanKey];
}
