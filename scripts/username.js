const popup = document.querySelector('#popup')
const spanClose = document.querySelector('.close')
const setUser = document.querySelector('#userName')
const setUserNew = document.querySelector('#newUser')
const newH1 = document.querySelector('h1')

window.onload = function () {
    popup.style.display = 'block';
    end.style.display = 'none';
}

spanClose.onclick = function () {
    popup.style.display = 'none';
}

setUser.onclick = function () {
    setUserName();
    popup.style.display = 'none';
}

setUserNew.onclick = function () {
    popup.style.display = 'block';
}

document.querySelector('#inputTag').addEventListener('keyup', function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        setUser.click();
    }
});

function setUserName() {
    let myName = document.querySelector('#inputTag').value;
    if (!myName) {
        //setUserName();
    } else {
        localStorage.setItem('name', myName);
        newH1.textContent =
            myName + ', will you answer everything correctly?';
    }
}

if (!localStorage.getItem('name')) {
    setUserName();
} else {
    let storedName = localStorage.getItem('name');
    newH1.textContent =
        storedName + ', will you answer everything correctly?';
}