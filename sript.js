// localStorage.clear()
const email = document.getElementById('email')
const name = document.getElementById('name')
const message = document.getElementById('message')

function emailvalidation() {
    var validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let result= ''
    if (email.value.match(validEmail)) {
       document.getElementById('email_error').style.visibility='hidden'
       result ='valid email'
       document.getElementById('email_error').innerText= result
       document.getElementById('email').dataset.check="valid"
    } else {
        result ='invalid email'
       document.getElementById('email_error').innerText= result
       document.getElementById('email').dataset.check="invalid"
       document.getElementById('email_error').style.visibility='unset'
    }
}

     function namevalidation(){

        let validName = ''
       
        if(document.getElementById('name').value.trim()==''){

            document.getElementById('name_error').style.visibility='unset'

            validName = 'field must not be empty'

            document.getElementById('name_error').innerText= validName
            document.getElementById('name').dataset.check="invalid"
        }else{

            let check= document.getElementById('name').value.split('').length
            if(check > 8){
                document.getElementById('name_error').style.visibility='hidden'
                document.getElementById('name').dataset.check="valid"
            }else {
                document.getElementById('name_error').style.visibility='unset'

            validName = 'field must be more than 8 characters'

            document.getElementById('name_error').innerText= validName
            document.getElementById('name').dataset.check="invalid"
            }
        } 

     }
     
         function messagevalidation(){

        let validmessage = ''
       
        if(document.getElementById('message').value.trim()==''){

            document.getElementById('textarea_error').style.visibility='unset'

            validmessage = 'field must not be empty'

            document.getElementById('textarea_error').innerText= validmessage
            document.getElementById('message').dataset.check="invalid"
        }else{

            let check= document.getElementById('message').value.split('').length
            if(check > 8){
                document.getElementById('textarea_error').style.visibility='hidden'
                document.getElementById('message').dataset.check="valid"
            }else {
                document.getElementById('textarea_error').style.visibility='unset'

            validmessage = 'field must be more than 8 characters'

            document.getElementById('textarea_error').innerText= validmessage
            document.getElementById('message').dataset.check="invalid"
            }
        } 

     }
         document.getElementById('mybtn').addEventListener('click',function (e){
        e.preventDefault()
        const myemail = document.getElementById('email').dataset.check
        const myname = document.getElementById('name').dataset.check
        const mymessage = document.getElementById('message').dataset.check
        const email= document.getElementById('email').value
        const name= document.getElementById('name').value
        const message=document.getElementById('message').value

        if(myemail == 'valid' && myname == 'valid' && mymessage  =='valid'){
            const data = {email,name,message}
        console.log(data)
        
        fetch(`http://127.0.0.1:4000/api/v1/query`,{
            method:"POST",
           headers:{
            "Content-Type": "application/json"
            

        },
        body:JSON.stringify(data)
        })
        .then((response) =>{
         return response.json()
          
        })
        .then((data) => {
             console.log(data)

        //   alert(data)
            
        })
        .catch(error => alert(error))
        document.getElementById('email').value=''
        document.getElementById('name').value=''
        document.getElementById('message').value=''
        }else{
            emailvalidation()
            namevalidation()
            messagevalidation()
            return
        }
    })
   
       function displayBlog(){

        
             if (localStorage.getItem("blogList")==null){
                allblogs= [];
             }else{
                allblogs=JSON.parse(localStorage.getItem("blogList"))  
             }
             document.getElementById('images_Blogs').innerHTML=''
             allblogs.forEach(function (k,index){
              document.getElementById('images_Blogs').innerHTML+=`
              <div class="Box1-Blog">
            <div class="First-image_Blogs"><img src="${k.query_blogImgs}" alt="kk"></div>
            <h2 class="mybox1">${k.query_blogName}</h2>
            <p class="mybox1">
            ${k.query_blogInf}
            </p>
          </div> `  
             });
         }  
         displayBlog()