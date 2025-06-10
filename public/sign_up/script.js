// signup
let password = document.querySelector('#password');
let cm_password = document.querySelector('#cm_password');
let input =document.querySelector('.f-input');
let span = document.querySelector('.message');
let msg = document.querySelector('.alert');

function checkPassword(){
    if(password.value == '' && cm_password.value == ''){
      
     span.innerHTML = '';
    
      
    }

    if(password.value === cm_password.value){
            span.innerHTML = ' Matched <i class="fa-solid fa-circle-check" ></i> ';
            span.style.color = "green";
            
           
    }else{
       span.innerHTML=' notMatched  <i class="fa-solid fa-circle-xmark" style = "color ="red";"></i>';
        span.style.color = "red";
        
    }
   }
  
 password.addEventListener('input', checkPassword);
 cm_password.addEventListener('input', checkPassword);
 
function validatePassword() {
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    // RegEx: at least one lowercase, one uppercase, one number, and @
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*@).+$/;
    if(password == ''){
      message.innerHTML = "";
    }
    if (regex.test(password)) {
      message.style.color = "";
      message.innerHTML = "";
    } else {
      message.style.color = "red";
      message.innerHTML = 'Password must include @, one uppercase, <br>one lowercase, and one number.';
    }
  }
   password.addEventListener('input', validatePassword);