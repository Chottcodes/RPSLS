let bestof1 = document.getElementById("bestof1");
let bestof5 = document.getElementById("bestof5");
let bestof7 = document.getElementById("bestof7");
bestof1.addEventListener("click", () => {
    localStorage.setItem('gameMode', 'Best out of 1');
});

bestof5.addEventListener("click", () => {
    localStorage.setItem('gameMode', 'Best out of 5');
});

bestof7.addEventListener("click", () =>{
    localStorage.setItem('gameMode', 'Best out of 7');
} )
