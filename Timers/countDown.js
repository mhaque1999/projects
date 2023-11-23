function countDown(num){
    let decrementNum=num-1;
    let id=setInterval(function(){
        if (decrementNum!=0){
            console.log(decrementNum);
            decrementNum-=1;
        }
        else{
            console.log("DONE!");
            clearInterval(id);
        }
    },1000)
}
countDown(3);

