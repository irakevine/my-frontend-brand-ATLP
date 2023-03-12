const email = document.getElementById('email');
const password = document.getElementById('password');

function emailvalidation() {
  var validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let result = '';
  if (email.value.match(validEmail)) {
    document.getElementById('email_error').style.visibility = 'hidden';
    result = 'valid email';
    document.getElementById('email_error').innerText = result;
    document.getElementById('email').dataset.check = "valid";
  } else {
    result = 'invalid email';
    document.getElementById('email_error').innerText = result;
    document.getElementById('email').dataset.check = "invalid";
    document.getElementById('email_error').style.visibility = 'unset';
  }
}


function CheckPassword(inputtxt) {
  let result = '';

  if (document.getElementById(inputtxt).value.split('').length > 7) {

    document.getElementById('password_error').style.visibility = 'hidden';
    result = 'Strong password';
    document.getElementById('password_error').innerText = result;
    document.getElementById('password').dataset.check = "valid";
  }
  else {
    result = ' weak password';
    document.getElementById('password_error').innerText = result;
    document.getElementById('password').dataset.check = "invalid";
    document.getElementById('password_error').style.visibility = 'unset';
  }
}

document.getElementById('btn_logo').addEventListener('click', function (e) {
  e.preventDefault();
  const myemail = document.getElementById('email').dataset.check;
  const mypassword = document.getElementById('password').dataset.check;
  
  const myData = {email:email.value,password:password.value}
  if (myemail == 'valid' && mypassword == 'valid') {
    
     fetch("http://127.0.0.1:4000/api/v1/login",{
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },body:JSON.stringify(myData)
     })
     .then((response) =>{
     return response.json()
      
     })
     .then((myData) =>{
      
      const token=myData.token
               if(token){
                document.cookie=`token=${token}; Path=/;`
                location.href="./dashboard.html"
            }
          else{
         console.log('wrong credentials')}   
     })
     .catch((error)=>{
      console.log(error)
     })

          

  } 
  else {
    emailvalidation();
    CheckPassword('password');
    return;
  }

});

/* Local storage*/

const myemail = 'irakevine@gmail.com';
localStorage.setItem('myemail',myemail)
localStorage.removeItem('myname')
const mypassword='Password123'
localStorage.setItem('mypassword',mypassword)
