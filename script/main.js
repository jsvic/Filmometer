const outMovie= document.querySelector("#outMovie")
const btnSubmit= document.querySelector("#btn-submit")
const divResult= document.querySelector("#div-Result")

const outVictory= document.querySelector("#outVictory")
const outLose= document.querySelector("#outLose")
const outBalance= document.querySelector("#outBalance")
const outScore= document.querySelector("#outScore")

var victory= 0
var lose= 0

function modalInfor(){
    const modalInfor= document.querySelector("#modalInfor")
    const windowInfor= document.querySelector("#windowInfor")

    modalInfor.classList.add("open")
    windowInfor.classList.add("open")

}

function closeModal(event) {
    let elementId = event.target.id
    if(elementId == "close" || elementId == windowInfor){
        print(elementId)
        windowInfor.classList.remove("open")
    }
}

function modalStatistic(){
    const modalStatistic= document.querySelector("#modalStatistic")
    const windowStatistic= document.querySelector("#windowStatistic")

    modalStatistic.classList.add("open")
    windowStatistic.classList.add("open")

    modalStatistic.addEventListener("click", (e) => {
        if(e.target.id == "close" || e.target == windowStatistic){
            windowStatistic.classList.remove("open")
        }
    })

    let balance= victory - lose 
    let score= (victory * 3) + (lose * -1)
    
    outVictory.textContent= victory
    outLose.textContent= lose
    outBalance.textContent= balance
    outScore.textContent= score

    if(balance < 0){
        outBalance.style.color= "var(--color-fail)"
    }
    else{
        outBalance.style.color = "#000"
    }
}

const fetchApi= (value) => {
    const result= fetch(`http://www.omdbapi.com/?T=${value}&apikey=592d8f36`).then((res) => res.json()).then((data) => {
        return data
    })
    return result
} 


const movie= ["Saltburn", "City of God", "Poor Things", "Leave the World Behind", "Wonka", "Anyone But You", "Oppenheimer", "The Holdovers", "Harry Potter and the Sorcerer's Stone", "Harry Potter and the Chamber of Secrets", "Harry Potter and the Goblet of Fire", "Harry Potter and the Prisoner of Azkaban", "Harry Potter and the Order of the Phoenix", "Harry Potter and the Half-Blood Prince", "Harry Potter and the Deathly Hallows: Part 1", "Harry Potter and the Deathly Hallows: Part 2", "The Super Mario Bros. Movie", "Barbie", "Mean Girls", "Society of the Snow", "Maestro", "The Hunger Games: The Ballad of Songbirds & Snakes"," Killers of the Flower Moon", "Ferrari", "12th Fail", "Godzilla Minus One", "Animal", "Indiana Jones and the Dial of Destiny", "How to Have Sex", "May December", "Dungeons & Dragons: Honor Among Thieves", "Gladiator", "Fast X", "Finestkind", "Wish", "Everything Everywhere All at Once", "Foe", "X", "Mission: Impossible - Dead Reckoning Part One", "Trolls Band Together", "Napoleon", "Schindler's List", "A Nightmare on Elm Street", "Pulp Fiction", "Star Wars: Episode IV - A New Hope", "Star Wars: Episode V - The Empire Strikes Back","Léon: The Professional", "Whiplash", "1917", "Taxi Driver", "No Country for Old Men", "Catch Me If You Can", "The Godfather", "Star Wars: Episode I - The Phantom Menace", "Star Wars: Episode II - Attack of the Clones", "Star Wars: Episode III - Revenge of the Sith","The Godfather Part II", "The Godfather Part III", "Star Wars: Episode VI - Return of the Jedi", "Star Wars: Episode VII - The Force Awakens", "Star Wars: Episode VIII - The Last Jedi", "Star Wars: Episode IX - The Rise of Skywalker", "Solo: A Star Wars Story", "Rogue One: A Star Wars Story", "The Shawshank Redemption"]

const bestDirector=["Martin Scorsese", "Ridley Scott", "Quentin Tarantino", "Francis Ford Coppola", "Steven Spielberg", "Christopher Nolan", "Alfonso Cuarón"]


async function funSubmit(){
    victory = 0
    lose = 0
    const score= (victory * 3) + (lose * -1)

    if(movie.length == 0){
        const resultScore= document.querySelector("resultScore")

        let scoreMensage= ""
    
        if(score <= 49){
            scoreMensage=  `Mais sorte na proxima` 
        }
        else if(score <= 98){
            scoreMensage= `Quase lá`
        }
        else if(score <= 147){
            scoreMensage= `Parabens`
        }
        else{
            scoreMensage= `O Kubrick em pessoa`
        }

        return outMovie.innerHTML= `Os filmes acabaram 😊 <br>Score: ${score} <br>${scoreMensage}`
        
        
    }

    divResult.style.display= "block"

    newMovie()
}


const fail= `
<div id="fail">
<h2> Você Errou &#128579;!! </h2>
</div>
`
const succeed= `
<div id="succeed">
<h2> Você acertou &#129299;!! </h2>

</div>
`

async function newMovie() {
    const randomNumber= Math.round(Math.random() * ((movie.length - 1) - 0) + 0)
    console.log(randomNumber)
    console.log(movie[randomNumber])
    const result= await fetchApi(movie[randomNumber])

    let ratting= 0
    const numberSwitch= Math.round(Math.random() * (5 - 8) + 8)

    switch(numberSwitch){
        case 5:
            ratting=5
            break;
        case 6:
            ratting=6
            break;
        case 7:
            ratting=7
            break;
        default:
            ratting=8
    }


    /*Out-Data */
    const $htmlMovie= /*html*/` 
    <div id="data">
        <h2> A Nota deste filme é maior, menor ou igual a <span class="ratting">${ratting}</span>? </h2>
        <div id="button">
            <button id="btn-less" onclick="btnLess(${randomNumber}, ${ratting})"> Menor</button>
            <button id="btn-equal" onclick="btnEqual(${randomNumber}, ${ratting})">Igual</button>
            <button id="btn-greater" onclick="btnGreater(${randomNumber}, ${ratting})">Maior</button>
        </div>

        

        <figure id="figure">
        <div id="game-result"> </div> <br>
        <div id="movie">
            <figcaption>
            <h2>${result.Title}</h2>
            </figcaption>
            <div id="poster">
                <div id="posterFront"><img src="${result.Poster}" alt="imagem do filme"></div>
                <div id="posterBack" class="hide">
                    <h3>Genêro: </h3> <p>${result.Genre} </p>
                    <br>
                    <h3>Diretor: </h3> <p><span id="director">${result.Director}</span></p>
                    <br>
                    <h3>Principais Atores: </h3> <p> ${result.Actors}</p>
                    <br>
                    <h3>Plot: </h3> <p> ${result.Plot} </p>
                    <h3>Laçamento: </h3> <p> ${result.Released} </p>
                </div>
            </div>
            
            <button id="movie-infor" onClick="flipAnimation()"> Informações do Filme </button>
        </div>
        </figure>
    </div>

                      `
    const data= document.querySelector("#data")

    if(data == null){
        console.log("OK")
        outMovie.insertAdjacentHTML("beforeend", $htmlMovie)
    }
    else{
        outMovie.removeChild(data)
        outMovie.insertAdjacentHTML("beforeend", $htmlMovie)
    }
    
    const director= document.querySelector("#director")

    bestDirector.map((x) =>{
        if(x == result.Director){
            director.classList.add("director")
        }
    }
    )
    console.log("victory: ", victory)
    console.log("lose: ", lose)
    console.log("ratting" + ratting)
    console.log(result)
    console.log(movie)

    const rattingImdb= document.querySelector("#rattingImdb")
}
    async function btnLess(randomNumber, ratting){ 
        const figure= document.querySelector("#figure")
        const button= document.querySelector("#button")
        
        const gameResult= document.querySelector("#game-result")
        gameResult.style.display="flex";

        const result= await fetchApi(movie[randomNumber])
        const rattingMovie= Math.trunc(result.imdbRating)
        const outRatting=  `<img src="img/imdb-logo.png" alt="imagem da logo do IMDb" id="imdb-logo"> 
        <span id="outRatting">${result.imdbRating}</span> <br> <button  onclick="newMovie()" id="restart">Outro Filme</button>`
        if(rattingMovie < ratting){
            gameResult.insertAdjacentHTML("beforeend", succeed + outRatting)
            figure.style.backgroundColor= "var( --color-succeed)";
            victory+=1
        }
        else{
            gameResult.insertAdjacentHTML("beforeend", fail + outRatting)
            figure.style.backgroundColor= "var( --color-fail)";     
            lose+=1 
        }
        button.style.display= "none";
        
        movie.splice(randomNumber, 1)
        console.log(result)
        console.log(rattingMovie)
        console.log(ratting)
}


async function btnEqual(randomNumber, ratting){
    const figure= document.querySelector("#figure")
    const button= document.querySelector("#button")
    const gameResult= document.querySelector("#game-result")
    gameResult.style.display="flex";
    const result= await fetchApi(movie[randomNumber])
    const rattingMovie= Math.trunc(result.imdbRating)
    const outRatting=  `<img src="img/imdb-logo.png" alt="imagem da logo do IMDb" id="imdb-logo"> 
    <span id="outRatting">${result.imdbRating}</span> <br> <button onclick="newMovie()" id="restart">Outro filme</button>`
    if(ratting == rattingMovie){
        gameResult.insertAdjacentHTML("beforeend", succeed + outRatting)
        figure.style.backgroundColor= "var( --color-succeed)";
        victory+=1
    }
    else{
        gameResult.insertAdjacentHTML("beforeend", fail + outRatting)
        figure.style.backgroundColor= "var( --color-fail)";
        lose+=1
    }    

    button.style.display= "none";

    movie.splice(randomNumber, 1)
    console.log(result)
    console.log(rattingMovie)
    console.log(ratting)
}

async function btnGreater(randomNumber, ratting){
    const figure= document.querySelector("#figure")
    const button= document.querySelector("#button")
    const gameResult= document.querySelector("#game-result")
    gameResult.style.display="flex";
    const result= await fetchApi(movie[randomNumber])
    const rattingMovie= Math.trunc(result.imdbRating)
    const outRatting=  `<img src="img/imdb-logo.png" alt="imagem da logo do IMDb" id="imdb-logo"> 
    <span id="outRatting">${result.imdbRating}</span> <br> <button  onclick="newMovie()"  id="restart">Outro filme</button>`
    
    if(ratting < rattingMovie){
        gameResult.insertAdjacentHTML("beforeend", succeed + outRatting)
        figure.style.backgroundColor= "var( --color-succeed)";
        victory+=1
    }
    else{
        gameResult.insertAdjacentHTML("beforeend", fail + outRatting)
        figure.style.backgroundColor= "var( --color-fail)";
        lose+=1
    }
    button.style.display= "none";

    movie.splice(randomNumber, 1)
    console.log(result)
    console.log(rattingMovie)
    console.log(ratting)
}



const gameResult= document.querySelector("#game-result")

function flipAnimation(){
    const poster= document.querySelector("#poster")
    const back= document.querySelector("#posterBack")
    const front= document.querySelector("#posterFront")

    poster.classList.toggle("flip")

    back.classList.toggle("hide")
    front.classList.toggle("hide")
}







