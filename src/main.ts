import './style.css';
import './scoring.ts';


const riichi = document.querySelector<HTMLSpanElement>("#riichi");



document.querySelectorAll(".player").forEach(btn =>{
  btn.addEventListener("click", event => {
    const button = event.currentTarget as HTMLButtonElement;
    const point = button.querySelector<HTMLSpanElement>(".point");
    if(point){
      if (button.dataset.state == "1"){
        button.dataset.state = "0";
        point.textContent = String(Number(point.textContent) + 1000);
        if(riichi){
          riichi.textContent = "Riichi: " + (parseInt(riichi.textContent.split(" ")[1], 10) - 1);
        }
      }
      else{
        button.dataset.state = "1";
        point.textContent = String(Number(point.textContent) - 1000);
        if(riichi){
          riichi.textContent = "Riichi: " + (parseInt(riichi.textContent.split(" ")[1], 10) + 1);
        }
      }
    }
  })
})
