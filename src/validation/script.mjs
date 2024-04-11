      reload();

      const errMsg = document.getElementById("email_alert");

      function reload() {
        setTimeout(() => {
          errMsg.innerHTML = "";
        }, 4000);
      }

      function validate_input(field) {
        let input = document.getElementById(field).value.trim();
        let isValid =
          input.length > 0 && (field === "email" || !/\d/.test(input)); // Check if input is not empty and doesn't contain digits unless it's the email field
        if (!isValid) {
          document.getElementById(field + "_alert").style.color = "red";
          if (/\d/.test(input) && field !== "email") {
            document.getElementById(field + "_alert").innerHTML =
              "Numbers are not allowed";
          } else {
            document.getElementById(field + "_alert").innerHTML =
              "Please fill this field";
          }
        } else {
          document.getElementById(field + "_alert").innerHTML = "";
        }
      }

      function validate_password() {
        let pass = document.getElementById("pass").value;
        let confirm_pass = document.getElementById("confirm_pass").value;
        if (pass != confirm_pass) {
          document.getElementById("wrong_pass_alert").style.color = "red";
          document.getElementById("wrong_pass_alert").innerHTML =
            "☒ Use same password";
          document.getElementById("create").disabled = true;
          document.getElementById("create").style.opacity = 0.4;
        } else {
          document.getElementById("wrong_pass_alert").style.color = "green";
          document.getElementById("wrong_pass_alert").innerHTML =
            "🗹 Password Matched";
          document.getElementById("create").disabled = false;
          document.getElementById("create").style.opacity = 1;
        }
      }

      function validateForm() {
        let isValid = true;
        ["fullname", "lastname", "email"].forEach(function (field) {
          let input = document.getElementById(field).value.trim();
          if (input.length === 0 || (field !== "email" && /\d/.test(input))) {
            document.getElementById(field + "_alert").style.color = "red";
            if (/\d/.test(input) && field !== "email") {
              document.getElementById(field + "_alert").innerHTML =
                "Numbers are not allowed";
            } else {
              document.getElementById(field + "_alert").innerHTML =
                "Please fill this field";
            }
            isValid = false;
          }
        });

        if (!isValid) {
          return false;
        }

        let pass = document.getElementById("pass").value;
        let confirm_pass = document.getElementById("confirm_pass").value;
        if (pass != confirm_pass) {
          document.getElementById("wrong_pass_alert").style.color = "red";
          document.getElementById("wrong_pass_alert").innerHTML =
            "☒ Use same password";
          document.getElementById("create").disabled = true;
          document.getElementById("create").style.opacity = 0.4;
          return false;
        }

        return true;
      }
 