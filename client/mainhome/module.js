// display: flex;
// let stack_warning = ;
function showWarning(text, description) {
    const pop_up_screen = document.getElementById('warning-pop-up');
    const pop_up_title = document.getElementById('warning-pop-up-title');
    const pop_up_description = document.getElementById('warning-pop-up-description');
    pop_up_screen.style.color = "white";
    pop_up_title.innerHTML = text;
    pop_up_description.innerHTML = description;
}

function closeWarning() {
    const pop_up_screen = document.getElementById('warning-pop-up');
    pop_up_screen.style.color = "black";
}

function showSuggestion(text, btn1, btn2, func1, func2) {
    const pop_up_screen = document.getElementById('suggest-pop-up');
    const pop_up_title = document.getElementById('suggest-pop-up-title');
    const btnele1 = document.getElementById('btn1');
    const btnele2 = document.getElementById('btn2');
    pop_up_screen.style.color = "white";
    pop_up_title.innerHTML = text;
    btnele1.innerHTML = btn1;
    btnele1.addEventListener("click", func1);
    btnele2.innerHTML = btn2;
    btnele2.addEventListener("click", func2);
}

function closeSuggestion() {
    const pop_up_screen = document.getElementById('suggest-pop-up');
    pop_up_screen.style.color = "black";
}