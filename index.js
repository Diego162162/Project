    const regform = document.getElementById("reg_form");
    const logform = document.getElementById("log_form");
    const regmessage = document.getElementById("regmessage");
    const logmessage = document.getElementById("logmessage");

    regform.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("regname").value;
        const email = document.getElementById("useremail").value;
        const password = document.getElementById("userpassword").value;
        const passwordConfirm = document.getElementById(
            "userpassword_confirm"
        ).value;

        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        function validatePassword(password) {
            // Password must be at least 8 characters long and contain at least one number and one special character
            const re = /^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
            return re.test(password);
        }

        if (name.trim() === "") {
            regmessage.textContent = "Name is required.";
            return;
        }

        if (!validateEmail(email)) {
            regmessage.textContent = "Invalid email format.";
            return;
        }

        if (!validatePassword(password)) {
            regmessage.textContent =
                "Eight characters length password containing at least one number and one special character is required.";
            return;
        }

        if (password !== passwordConfirm) {
            regmessage.textContent = "Passwords do not match.";
            return;
        }

        if (User.has(name)) {
            regmessage.textContent = "User already exists.";
            return;
        }

        User.set(name, {
            email: email,
            password: password,
        });

        regmessage.textContent = "Successfully registered.";
        regform.reset();
    });

    logform.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("logname").value;
        const password = document.getElementById("logpassword").value;
        const rememberMe = document.getElementById("rem_input").checked;

        if (name.trim() === "") {
            logmessage.textContent = "Name is required.";
            return;
        }

        if (password.trim() === "") {
            logmessage.textContent = "Password is required.";
            return;
        }

        if (User.has(name) && User.get(name).password === password) {
            logmessage.textContent = "Successfully logged in. Welcome " + name;
            logform.reset();

            if (rememberMe) {
                localStorage.setItem("username", name);
                localStorage.setItem("password", password);
            } else {
                localStorage.removeItem("username");
                localStorage.removeItem("password");
            }
        } else {
            logmessage.textContent =
                "Wrong name or password. Please make sure you're registered.";
        }
    });

    window.addEventListener("load", function () {
        const storedName = localStorage.getItem("username");
        const storedPassword = localStorage.getItem("password");

        if (storedName && storedPassword) {
            document.getElementById("logname").value = storedName;
            document.getElementById("logpassword").value = storedPassword;
            document.getElementById("rem_input").checked = true;
        }
    });