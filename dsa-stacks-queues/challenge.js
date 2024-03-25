const Stack = require("./stack");
const Queue = require("./queue")

function stringReversal(str){
    stringArray = str.split("");
    let strStack = new Stack();
    let output = [];
    console.log(stringArray);
    for(char of stringArray){
        console.log(char)
        strStack.push(char);
    }
    console.log(strStack);
    while(!strStack.isEmpty()){
        let letter = strStack.pop()
        console.log(letter)
        output.push(letter);
    }
    console.log(output);
    return output.join("");
}

function balancedBrackets(str){
    let count = 0;
    let bracket;
    stringArray = str.split("");
    let strStack = new Stack();
    for(char of stringArray){
        console.log(count)
        if (char == "{" || char == "[" || char == "("){
            strStack.push(char)
            console.log(strStack)
        }
        else if (char == "}" || char == "]" || char == ")"){
            if (strStack.isEmpty()){
                return "Not Balanced"
            }
            bracket = strStack.pop()
            if (((char == "}" && bracket != "{") || (char == ")" && bracket != "(") || (char == "[" && bracket != "]") )) {
                console.log(`char is ${char} bracket is ${bracket}`)
                return "Not Balanced";
            }
            //else if (char == ")" && bracket == "("){

           // }
            //else if (char == "]" && bracket == "["){

            //}
        }
        count+=1;
    }
    console.log(strStack)
    if (strStack.isEmpty()){
        return "Balanced";
    }
    return "Not Balanced";
    


}