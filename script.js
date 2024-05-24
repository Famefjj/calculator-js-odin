let firstNum = "";
let operator = "";
let secondNum = "";
let lastValue = ""; // display or stored value
let isEntered = false;


let buttons = document.querySelectorAll("button");
let display = document.querySelector(".calculator-display");
display.textContent = "";

let add = (fNum, sNum) => fNum+sNum;

let subtract = (fNum, sNum) => fNum-sNum;

let multiply = (fNum, sNum) => fNum*sNum;

let divide = (fNum, sNum) => fNum/sNum;

function display_value(num){
    
    
    let isOverflow = false;

    display.textContent = num;
    if (display.scrollWidth > display.clientWidth){
        //text overflow
        isOverflow = true;
        if(isEntered){
            console.log("text overflow!");
            display.textContent = "Error";
        }else{
            console.log("text overflow!");
            display.textContent = display.textContent.slice(0,-1);
            operator === "" ? firstNum = firstNum.slice(0,-1) : secondNum = secondNum.slice(0,-1);
        }
    }
    
    (isOverflow && isEntered) ? lastValue = "" : lastValue = display.textContent;
    isOverflow = false;
    
}

function operate(fNum, sNum, op){
    let resultValue = 0;
    if (fNum === ""){
        fNum = "0";
    }
    if (sNum === ""){
        sNum = "0";
    }
    switch(op){
        case "plus":
            resultValue = parseFloat(fNum)+parseFloat(sNum);
            break;
        case "minus":
            resultValue = parseFloat(fNum)-parseFloat(sNum);
            break;
        case "multiply":
            resultValue = parseFloat(fNum)*parseFloat(sNum);
            break;
        case "divide":
            resultValue =  parseFloat(fNum)/parseFloat(sNum);
            break;
    }
    resultValue = parseFloat(resultValue.toFixed(4));
    display_value(resultValue);
    
    
}


buttons.forEach((btn)=>{
    btn.addEventListener("click", (e)=>{
        if (e.target.className === "operator"){
            switch(e.target.id){
                case "plus":
                    operator = "plus";
                    break;
                case "minus":
                    operator = "minus";
                    break;
                case "multiply":
                    operator = "multiply";
                    break;
                case "divide":
                    operator = "divide";
                    break;
            }
        } else if (e.target.id === "clear"){
            display.textContent = "";
            firstNum = "";
            secondNum = "";
            lastValue = "";
            operator = "";
        } else if (e.target.id === "delete"){
            display.textContent = display.textContent.slice(0,-1);
            lastValue = lastValue.slice(0,-1);
            operator === "" ? firstNum = lastValue : secondNum = lastValue;

        } else if (e.target.id === "equal"){
            isEntered = true;
            operate(firstNum, secondNum, operator);
            isEntered = false;
            firstNum = lastValue;
            secondNum = "";
            operator = "";
    
        } else {
            if (operator != ""){
                if (e.target.textContent === "." && secondNum.includes(".")){
                    //pass
                }
                else{
                    secondNum += e.target.textContent;
                    secondNum == "00" ? secondNum="0" : 0;
                }
                
            } else if (operator === ""){
                if (e.target.textContent === "." && firstNum.includes(".")){
                    //pass
                }
                else{
                    firstNum += e.target.textContent;
                    firstNum == "00" ? firstNum="0" : 0;
                }
                
            }
            
            operator === "" ? display_value(firstNum) : display_value(secondNum);
    
        }
        
    });

});







