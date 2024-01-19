$messageBox = $("p")
$wordsDiscovered = $("ul")
$score = $("#score")
$hiScore = $("#hi_score")
$num_of_plays = $("#num_of_plays")


class BoggleGame{
    constructor(duration, width, height){
        this.duration = duration
        this.width = width
        this.height = height
        this.currentScore = 0
        this.words = new Set()

        $("#guess").on("submit",this.handleSubmitEvent.bind(this))
        this.timer(this.duration)
    }

    async handleSubmitEvent(event){
        event.preventDefault();
        let guess = $(".guess").val()
        //const response = await axios.post("/check_guess", { user_guess: guess } )
        console.log(guess)
        const response = await axios.get("/check_guess", { params: { word: guess }});
        console.log(response.data)
        console.log(`clicked submit and got ${guess}`)
        if (response.data.result === "not-on-board"){
            $messageBox.text(`${guess} is not on the board`);
        }
        else if (response.data.result === "not-word"){
            $messageBox.text(`${guess} is not a word`)
        }
        else{
            if (!(this.words.has(guess))){
                this.words.add(guess)
                this.currentScore += guess.length
                $messageBox.text(`Added the word ${guess}`)
                $wordsDiscovered.append(`<li>${guess}</li>`)
                console.log(this.currentScore)
                $score.text( `${this.currentScore}` )
            }
            else{
                $messageBox.text(`Already added the word ${guess}`)
            }
            //console.log(guess.length)
            
        }
        $(".guess").empty()
    }
    
    async timer(duration){
        let id = setInterval(async ()=>{
            $("#guess").hide()
            console.log("HIDE")
            const response2 = await axios.post("/post_score",  { score: this.currentScore });
            $messageBox.text(`Final score is ${response2.data.score}`)
            $score.text(`${response2.data.score}`)
            $hiScore.text(`${response2.data.score}`)
            $num_of_plays.text(`${response2.data.num_of_plays}`)
            console.log(` Num of plays is ${response2.data.num_of_plays}`)
            clearInterval(id)
        },duration * 1000)
        
    }
}


