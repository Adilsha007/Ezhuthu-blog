console.log("typin texyt checking");
let quote =
  "This is your Blog Site. Please log in and create your blog........";
let i = 0;
let speed = 50;

function typeQuote() {
  if (i < quote.length) {
    document.getElementById("typing-text").innerHTML += quote.charAt(i);
    i++;
    setTimeout(typeQuote, speed);
  }
}

typeQuote();
