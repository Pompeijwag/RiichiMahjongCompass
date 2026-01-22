const scoring = document.querySelector<HTMLDivElement>("#scoring-modal");
const compass = document.querySelector<HTMLButtonElement>("#middle");
const mask = document.querySelector<HTMLDivElement>("#mask");
const close = document.querySelector<HTMLButtonElement>("#close-scoring");
const ron = document.querySelector<HTMLButtonElement>("#ron");
const query = document.querySelector<HTMLDivElement>("#query-modal");
const step1 = `<span class="point">Who dealt in?</span>
      <button id="left2"  class="player">
        <span class="point">S</span>
      </button>
      <button id="up2"  class="player">
        <span class="point">W</span>
      </button>
      <button id="right2"  class="player">
        <span class="point">N</span>
      </button>
      <button id="down2"  class="player">
        <span class="point">E</span>
      </button>`
const step2 = `<span class="title">How many Han?</span>
      <button class="option">1</button>
      <button class="option">2</button>
      <button class="option">3</button>
      <button class="option">4</button>
      <button class="option">5-6</button>
      <button class="option">7-9</button>
      <button class="option">10-12</button>
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
var step = 0;
var han = 0;
var fu = 20;

ron?.addEventListener("click", () => {
  scoring?.classList.add("hidden");
  query?.classList.remove("hidden");
  dealInStage();
})

function dealInStage(): void {
  if(query){
    query.innerHTML = step1;
    document.querySelectorAll(".player").forEach(btn =>{
      btn.addEventListener("click", event => {
        const button = event.currentTarget as HTMLButtonElement;
        const question = query.querySelector<HTMLSpanElement>(".point")
        if(step == 0){
          step = 1;
          if(question){
            question.textContent = "Who Ron?"
          }
          dealtin = button.querySelector<HTMLSpanElement>(".point")?.textContent;
          console.log(dealtin);
        }
        else {
          roner = button.querySelector<HTMLSpanElement>(".point")?.textContent;
          getHan()
        }
      })
    })
  }
}

function getHan() : void{
  if(query){
    query.innerHTML = step2;
    document.querySelectorAll(".option").forEach(btn =>{
      btn.addEventListener("click", event => {
        const button = event.currentTarget as HTMLButtonElement;
        han = parseInt(button.textContent);
        getFu();
      })
    })
  }
}

function getFu() : void{
  if(han >= 5){
    finalscore()
  }
  if(query){
    query.innerHTML = step3;
    document.querySelectorAll(".option").forEach(btn =>{
      btn.addEventListener("click", event => {
        const button = event.currentTarget as HTMLButtonElement;
        fu = parseInt(button.textContent);
        finalscore()
      })
    })
  }
}

function finalscore() : void {
  if(query){
    query.innerHTML = step4;
    const title = query.querySelector<HTMLSpanElement>(".title")
    var finalscore = 1000;
    if(han > 12){
      finalscore = 32000;
    }
    if(title){
      title.textContent = "Han: " + han + " Fu: " + fu + " Final Score: " + finalscore
    }

  }
}