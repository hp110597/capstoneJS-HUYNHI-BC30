import Register from "../models/Register.js";

document.getElementById("btnsubmit").onclick =  function (e) {
  e.preventDefault()
  let isValid = validation();
  if (!isValid) {
    return alert("Vui lòng kiểm tra giá trị input");
  } else {

    var register = new Register();
    register.email = document.getElementById("email").value;
    register.password = document.getElementById("password").value;
    register.name = document.getElementById("name").value;
    register.phone = document.getElementById("phone").value;
    register.gender = document.querySelector(
      'input[name="radio"]:checked'
    ).value;
    console.log(register);

    var promise = axios({
      url: "https://shop.cyberlearn.vn/api/Users/signup",
      method: "POST",
      data: register,
    });

    promise.then(function (result) {
      alert(result.data.message);
      resetForm()
    });
    promise.catch((err) => {
      alert(err.response?.data.message);
    });
  }
};

//Kiểm tra hợp lệ

let validation = () => {
  let isValid = document.getElementById("formRegister").checkValidity();
  if (!isValid) {
    //Dom tới email và kiểm tra hợp lệ
    var inpEmail = document.getElementById("email");
    var spanEmail = document.getElementById("tbEmail");

    if (inpEmail.validity.patternMismatch) {
      spanEmail.innerHTML = "Email không đúng định dạng";
    } else if (inpEmail.validity.valueMissing) {
      spanEmail.innerHTML = "Email không được để trống";
    } else {
      spanEmail.innerHTML = "";
    }
  }

  // Dom tới mật khẩu và kiểm tra hợp lệ
  var inpPassword = document.getElementById("password");
  var spanPassword = document.getElementById("tbPassword");

  if (inpPassword.validity.valueMissing) {
    spanPassword.innerHTML = "Mật khẩu không được để trống";
  } else if (inpPassword.validity.patternMismatch) {
    spanPassword.innerHTML = "Mật khẩu không đúng định dạng";
  } else {
    spanPassword.innerHTML = "";
  }

  // Dom tới xác nhận mật khẩu và kiểm tra hợp lệ
  var inpPasswordConfirm = document.getElementById("passwordconfirm");
  var spanPasswordConfirm = document.getElementById("tbPasswordConfirm");

  if (inpPasswordConfirm.value !== inpPassword.value) {
    spanPasswordConfirm.innerHTML = "Mật khẩu xác nhận không trùng khớp";
  } else {
    spanPasswordConfirm.innerHTML = "";
  }

  // Dom tới name và kiểm tra hợp lệ
  var inpName = document.getElementById("name");
  var spanName = document.getElementById("tbName");

  if (inpName.validity.valueMissing) {
    // input đang bị lỗi required
    spanName.innerHTML = "Tên không được để trống";
  } else if (inpName.validity.patternMismatch) {
    // input đang bị lỗi không đúng định dạng
    spanName.innerHTML = "Tên không đúng định dạng";
  } else {
    spanName.innerHTML = "";
  }

  // Dom tới phone và kiểm tra hợp lệ
  var inpPhone = document.getElementById("phone");
  var spanPhone = document.getElementById("tbPhone");

  if (inpPhone.validity.patternMismatch) {
    spanPhone.innerHTML = "Số điện thoại không đúng";
  } else if (inpPhone.validity.valueMissing) {
    spanPhone.innerHTML = "Số điện thoại không được để trống";
  } else {
    spanPhone.innerHTML = "";
  }
  return isValid;
};

let resetForm = () => {
  //reset input
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("passwordconfirm").value = "";
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.querySelector('input[name="radio"]:checked').value = "";

  //reset span
  document.getElementById("tbEmail").innerHTML = "";
  document.getElementById("tbPassword").innerHTML = "";
  document.getElementById("tbPasswordConfirm").innerHTML = "";
  document.getElementById("tbName").innerHTML = "";
  document.getElementById("tbPhone").innerHTML = "";
};
