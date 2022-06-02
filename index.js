const para = {
  0: "The Solar System consists of the Sun Moon and Planets. It also consists of comets, meteoroids and asteroids. The Sun is the largest member of the Solar System. In order of distance from the Sun, the planets are Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune and Pluto; the dwarf planet. The Sun is at the centre of the Solar System and the planets, asteroids, comets and meteoroids revolve around it.",
  1:"The peacock is the national bird of India. They have colourful feathers, two legs and a small beak. They are famous for their dance. When a peacock dances it spreads its feathers like a fan. It has a long shiny dark blue neck. Peacocks are mostly found in the fields they are very beautiful birds. The females are known as 'Peahen'. Their feathers are used for making jackets, purses etc. We can see them in a zoo.",
  2:"Delhi is the capital of India. It is situated on the banks of the river Yamuna. It is surrounded by Haryanaand Uttar Pradesh. It has some of the famous buildings and monuments such as the Qutub Minar, Reu Fort, Lotus Temple, Akshardham Temple etc. Some of the monuments are hundreds of years old. Apart from this, there is the Parliament House, the Central Secretariat and the famous Connaught place. Delhi is a beautiful city. But, it is becoming very crowded and polluted. I love Delhi a lot.",
  //By Brian E Pardee
  3:"Some feelings are shallow, some feelings are deep.Some make us smile, some make us weep.Some we love, some we don't.Some we'll savor, some we won't.Some grounding, some uplifting,Some long-lasting, some constantly shifting.No matter what feelings I'm feeling today, I know tomorrow is only a day away.",

  //Jack By Jane Yolen
  4:"Jack was quite nimble, Jack was quite quick, Jack gave the beanstalk A mighty big kick. Down came the giant -GIGANTIC fall- Bottoms up in a crater, Thus ending it all.",
  
  //Room with a View By Stephen Swinburne
  5:"I live in a room by the sea, where the view is great and the food is free. Some of the tenants come and go. Some I eat, if they’re too slow. One end of me is firmly locked. The other end just gently rocks. I live in a room by the sea. It’s perfect for an anemone.",

  //My Cat Is Fat By James McDonald
  6:"I’ve a cat named Vesters, And he eats all day. He always lays around, And never wants to play. Not even with a squeaky toy, Nor anything that moves. When I have him exercise, He always disapproves. So we’ve put him on a diet, But now he yells all day. And even though he’s thinner, He still won’t come and play.",

  //Snowball By Shel Silverstein
  7:"I made myself a snowballAs perfect as could be. I thought I’d keep it as a petAnd let it sleep with me. I made it some pajamas And a pillow for its head. Then last night it ran away,But first, it wet the bed.",

  // The Forest by Annette Wynne
  8:"The forest is the town of trees Where they live quite at their ease, With their neighbors at their side Just as we in cities wide.",

9:"Baa, baa, black sheep, Have you any wool? Yes sir, yes sir, Three bags full; One for the master, And one for the dame, And one for the little boy Who lives down the lane"
  
}


let originText = document.querySelector("#original-text").innerHTML;
const textArea = document.querySelector("#text-area");
const timer = document.querySelector("#timer");
const reset = document.querySelector("#reset");
let interval, timestamp;

let milisec,seconds,minutes = 0;

function start() {
  let textAreaLen = textArea.value.length;
  if (textAreaLen === 0 ) {
    timestamp = Date.now()
    interval = setInterval(timerStart, 10)
  }
}

function timerStart() {
  if (textArea.value.length === 0 ){
    clearInterval(interval);
  }
  let end = Date.now();
  let milliseconds = end - timestamp;
  milisec = checkTime(Math.trunc(milliseconds % 1000 / 10))
  seconds = checkTime(Math.trunc((milliseconds / 1000) % 60));
  minutes = checkTime(Math.trunc((milliseconds / (1000 * 60)) % 60));
  timer.innerHTML = `${minutes} : ${seconds} : ${milisec}`;
}

function checkTime(val) {
  if (val < 10) {
    val = "0" + val
  }
  return val
}

function spellCheck() {
  let textEntered = textArea.value;
  let originTextMatch = originText.substring(0,textEntered.length);

  if (textEntered == originText) {
      clearInterval(interval);
      textArea.style.borderColor = "#65CCf3";
  } else {
      if (textEntered == originTextMatch) {
        textArea.style.border = "10px solid #34c263";
      } else {
        textArea.style.border = "10px solid #e90f25";
      }
  }

}

function restart(){
  clearInterval(interval);
  interval = null;
  textArea.value = "";
  timer.innerHTML = "00:00:00";
  textArea.style.borderColor = "grey";
  document.querySelector("#original-text").innerHTML = para[Math.floor(Math.random()*10)]
}


textArea.addEventListener("keypress", start);
textArea.addEventListener("keyup", spellCheck);
reset.addEventListener("click",restart)


