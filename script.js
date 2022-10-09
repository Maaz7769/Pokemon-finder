var options = {"particles":{"number":{"value":200,"density":{"enable":true,"value_area":552.4033491425909}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":3},"image":{"src":"img/github.svg","width":70,"height":100}},"opacity":{"value":1,"random":true,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":2,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":3.5782952832645452,"direction":"none","random":true,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"repulse"},"onclick":{"enable":true,"mode":"repulse"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":100,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":false};
particlesJS("particle", options);

let container = document.querySelector('#overlay')
let root = document.querySelector('#root')

function random_bg_color(div) {
    let x = Math. floor(Math. random() * 256);
    let y = Math. floor(Math. random() * 256);
    let z = Math. floor(Math. random() * 256);
    let bgColor = "rgb(" + x + "," + y + "," + z + ")";
    let bgColor2 = "rgb(" + z + "," + x + "," + y + ")";
    let bgColor3 = "rgb(" + y + "," + z + "," + x + ")";
    div.style.backgroundImage = `linear-gradient(${bgColor},${bgColor2},${bgColor3})`
    }

let addData = (name,src,ability,exp,move,height,hoverSrc) => {
    let div = document.createElement('div')
    div.classList.add('card')
    let cardName = document.createElement('h3')
    cardName.innerHTML = `Name: ` + name
    let cardImg = document.createElement('img')
    cardImg.setAttribute('src', src)
    let cardAbility = document.createElement('h3')
    cardAbility.innerHTML = `Ability: ` + ability
    let cardExp = document.createElement('h3')
    cardExp.innerHTML = `Base Exp: ` + exp
    let cardMove = document.createElement('h3')
    cardMove.innerHTML = `Move: ` + move
    let cardHeight = document.createElement('h3')
    cardHeight.innerText = `Height: ` + height
    div.append(cardImg, cardName, cardAbility, cardExp, cardMove, cardHeight)
    root.append(div)
    random_bg_color(div)
}

let offset = 1;
let limit = 20;

async function getData(offset,limit){
   try {
    for(let i=offset; i<=limit; i++){
        let data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
        let dataAt = await data;
        let pokeData = dataAt.data
        let pokeName = pokeData.name;
        let pokeImgSrc = pokeData.sprites.other.home.front_default;
        let pokeHoverSrc = pokeData.sprites.other.home.front_shiny;
        let pokeAbility = pokeData.abilities[0].ability.name;
        let pokeExp = pokeData.base_experience;
        let pokeMove = pokeData.moves[0].move.name
        let pokeHeight = pokeData.height
        addData(pokeName, pokeImgSrc, pokeAbility, pokeExp, pokeMove, pokeHeight)
    }
   } catch (error) {
    console.log(error.message)
   }
}

getData(offset,limit)

let prev = document.querySelector('#prev');
let next = document.querySelector('#next');
let home = document.querySelector('#home')
let textBox = document.querySelector('#textbox')

prev.disabled = true;
home.disabled = true;

prev.addEventListener('click', () => {
    root.innerHTML=""
    offset -= 20;
    limit -= 20
    getData(offset,limit)
    if (offset === 1 ){
    prev.disabled = true;
    home.disabled = true;
}
})
next.addEventListener('click', () => {
    root.innerHTML=""
    offset += 20;
    limit += 20;
    getData(offset,limit)
    prev.disabled = false;
    home.disabled = false;
})
home.addEventListener('click', () => {
    root.innerHTML=""
    offset = 1;
    limit = 20
    getData(offset,limit)
    prev.disabled = true
    if (offset === 1 ){
    home.disabled = true;
}
})

let form = document.querySelector('#form')
form.addEventListener('click', (e) => {
    e.preventDefault();
})

let searchBtn = document.querySelector('#btn')
searchBtn.addEventListener('click', () => {
    let query = textBox.value.toLowerCase()
    root.innerHTML=""
    next.style.display = 'none'
    prev.style.display = 'none'
    async function searchData(){
        try {
             let data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query}`)
             let dataAt = await data;
             let pokeData = dataAt.data
             let pokeName = pokeData.name;
             let pokeImgSrc = pokeData.sprites.other.home.front_default;
             let pokeHoverSrc = pokeData.sprites.other.home.front_shiny;
             let pokeAbility = pokeData.abilities[0].ability.name;
             let pokeExp = pokeData.base_experience;
             let pokeMove = pokeData.moves[0].move.name
             let pokeHeight = pokeData.height
             addData(pokeName, pokeImgSrc, pokeAbility, pokeExp, pokeMove, pokeHeight)
         }
         catch (error) {
         console.log(error.message)
        }
     }
     searchData()
     textBox.value = ""
})

home.addEventListener('click', () =>{
    next.style.display = 'block'
    prev.style.display = 'block'
})

