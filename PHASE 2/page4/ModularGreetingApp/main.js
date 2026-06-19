import { sayHello, sayGoodbye } from "./greetings.js";

console.log(sayHello("Nina"));
console.log(sayGoodbye("Nina"));

// Browser me bhi show karenge
const output = document.getElementById("output");

output.innerHTML = `
  <p>${sayHello("Nina")}</p>
  <p>${sayGoodbye("Nina")}</p>
`;