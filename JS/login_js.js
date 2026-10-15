let loginForm = document.getElementById("loginForm");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");

loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    const emailRegex = /^[a-zA-Z]+\.[a-zA-Z]+[0-9]{0,2}@e-uvt\.ro$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{7,}$/;

    if (!emailRegex.test(email)) {
        alert("Email invalid! Foloseste formatul nume.prenume[cifre]@e-uvt.ro");
        return;
    }

    if (!passwordRegex.test(password)) {
        alert("Parola trebuie sa contina minim 8 caractere (o litera mare, una mica, o cifra si un simbol)!");
        return;
    }

    alert("Login reusit!");
    window.location.href = "home.html";
});