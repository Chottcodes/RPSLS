let bestof1 = document.getElementById("bestof1Comupter");
let bestof5 = document.getElementById("bestof5Computer");
let bestof7 = document.getElementById("bestof7Computer");
bestof1.addEventListener("click", () => {
    localStorage.setItem('gameModeComputer', 'Best out of 1');
});

bestof5.addEventListener("click", () => {
    localStorage.setItem('gameModeComputer', 'Best out of 5');
});

bestof7.addEventListener("click", () =>{
    localStorage.setItem('gameModeComputer', 'Best out of 7');
} )
