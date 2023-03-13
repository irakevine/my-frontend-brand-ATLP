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

        
            //  if (localStorage.getItem("blogList")==null){
            //     allblogs= [];
            //  }else{
            //     allblogs=JSON.parse(localStorage.getItem("blogList"))  
            //  }
             const images= document.getElementById('images_Blogs');
             fetch('http://127.0.0.1:4000/api/v1/blogs',{
        method :"GET"
    })
     
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        const allblogs = data.data;
        console.log(allblogs)
             allblogs.forEach(function (k,index){
                console.log('heello');
                const blog_container = document.createElement("div");
blog_container.classList.add("Box1-Blog");

const imgContainer = document.createElement("div");
imgContainer.classList.add("First-image_Blogs");
const img = document.createElement("img");
img.src =k.imageUrl;
console.log(img.src);
imgContainer.appendChild(img);

const blog_name = document.createElement("h2");
blog_name.classList.add("mybox1");
blog_name.textContent = k.title;

const blog_info = document.createElement("p");
blog_info.classList.add("mybox1");
blog_info.textContent = k.content;

const form = document.createElement("form");
form.setAttribute("id", "form-comment")

let nameinput = document.createElement("input");
nameinput.setAttribute("type", "text");
nameinput.setAttribute("id", "name");
nameinput.setAttribute("placeholder", "Your name..");

let emailinput = document.createElement("input");
emailinput.setAttribute("type", "email");
emailinput.setAttribute("id", "email");
emailinput.setAttribute("placeholder", "Your Email..");

let commentinput = document.createElement("textarea");
commentinput.setAttribute("id", "comment");
commentinput.setAttribute("placeholder", "Write something..");

let submitbutton = document.createElement("input");
submitbutton.setAttribute("value", "Submit")
submitbutton.setAttribute("type", "submit");
submitbutton.setAttribute("id", "submit_comment");

// Attach an event listener to the submit button
submitbutton.addEventListener("click", (event) => {
    event.preventDefault();
    const commentObj = {
        name: nameinput.value,
        email: emailinput.value,
        comment: commentinput.value
    }

    fetch("http://127.0.0.1:4000/api/v1/blogs",)

    console.log(commentObj, k.imageUrl);
    // Do something with the name and email values here
  });

form.appendChild(nameinput);
form.appendChild(emailinput);
form.appendChild(commentinput);
form.appendChild(submitbutton);
blog_container.appendChild(imgContainer);
blog_container.appendChild(blog_name);
blog_container.appendChild(blog_info);
blog_container.appendChild(form);

images.appendChild(blog_container);
             
});
    });
         } 
         

         document.addEventListener("DOMContentLoaded", (e) => {
            e.preventDefault();
            const submit_button = document.getElementById("submit_comment");
            const email = document.getElementById("email");
            const form = document.getElementById("form-comment")
            submit_button.addEventListener("click", (e) => {
                e.preventDefault();
                console.log("Clicked", email.value);
            })

         })

         
         
         
         displayBlog()
         // Comment section ith likes pages

         const createComment= (id) => {
            console.log(id)
            console.log("Clicked");

               // DOM ELEMENTS
const name = document.getElementById("name");
const email = document.getElementById("email");
const comment = document.getElementById("comment");
let commentObj = {
    name: name.value,
    email: email.value,
    comment: comment.value
}

console.log(commentObj);
         }

