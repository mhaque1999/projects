function randomGame(){
    let counter=0;
    let id=setInterval(function(){
        let randomNum=Math.random();
        counter+=1;
        console.log(randomNum); //debug statement
        if(Math.round(randomNum*100)/100>Math.round(0.75*100)/100){
            if(counter==1){
                console.log(`It took ${counter} attempt to get a number above 0.75`); 
            }
            else{
                console.log(`It took ${counter} attempts to get a number above 0.75`);
            }
            clearInterval(id);
        }
    },1000)
}

randomGame()