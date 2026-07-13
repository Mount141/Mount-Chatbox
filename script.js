// ==============================
// THE MOUNT CHATBOT SCRIPT
// ==============================



const chatButton =
document.getElementById("chatButton");


const chatWindow =
document.getElementById("chatWindow");


const closeChat =
document.getElementById("closeChat");


const sendButton =
document.getElementById("sendButton");


const userInput =
document.getElementById("userInput");


const chatMessages =
document.getElementById("chatMessages");


const typing =
document.getElementById("typingIndicator");



let faqData=[];



// Load Questions

fetch("faq.json")

.then(response=>response.json())

.then(data=>{

    faqData=data;

})

.catch(error=>{

console.log(
"FAQ loading error:",
error
);

});





// Open chatbot


chatButton.onclick=function(){


chatWindow.classList.add("active");


};




// Close chatbot


closeChat.onclick=function(){


chatWindow.classList.remove("active");


};






// Send message


sendButton.onclick=function(){


sendMessage();


};




userInput.addEventListener(
"keypress",
function(event){


if(event.key==="Enter"){


sendMessage();


}


});







function sendMessage(){


let question=
userInput.value.trim();



if(question===""){

return;

}




// Display user message


addMessage(
question,
"user"
);



userInput.value="";




// Show typing

typing.style.display="block";





setTimeout(()=>{


let answer =
findAnswer(question);



typing.style.display="none";



addMessage(
answer,
"bot"
);



},700);



}







function addMessage(text,type){


let div=document.createElement("div");


div.className=
type==="user"
?
"user-message"
:
"bot-message";



div.innerHTML=
`

<div class="message">

${text}

</div>

`;



chatMessages.appendChild(div);



chatMessages.scrollTop=
chatMessages.scrollHeight;


}








function findAnswer(question){



question=
question.toLowerCase();



let bestMatch=null;



faqData.forEach(item=>{


let storedQuestion =
item.question.toLowerCase();



let words =
question.split(" ");



let score=0;



words.forEach(word=>{


if(
storedQuestion.includes(word)
){

score++;

}


});



if(
!bestMatch ||
score > bestMatch.score
){


bestMatch={

answer:item.answer,

score:score

};


}



});





if(
bestMatch &&
bestMatch.score>0
){


return bestMatch.answer;


}



return `

Sorry, I couldn't find an answer
to your question.

Please contact The Mount team
for assistance.

<br><br>

📞 (902) 370-8888

`;

}
