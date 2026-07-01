const highScoresList = document.getElementById("highScoresList");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores.map(score => {
    return `<li class="high_score">${score.name} - ${score.questions} Q => ${score.score} ⭐ </li>`;
}).join("");

function clearScores(){
    localStorage.removeItem("highScores");
    location.reload();
}