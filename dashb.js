let session = sessionStorage.getItem("isLoggedIn");
console.log(session)
if (session == "false") {
    window.location.href = '/login.html'
}

const navimg = (x)=>{
    document.getElementById(x).classList.toggle("hide")
}

const mypic=()=>{
    const myimg_input=document.getElementById('blogimgs').files[0];
    const myimg=document.getElementById('imgname')
    const reader=new FileReader();
    reader.readAsDataURL(myimg_input);
    reader.addEventListener('load',function(){
        myimg.src=reader.result
    })
}
const image1= document.getElementById('blogimgs')
let imageData=null
image1.addEventListener("change",()=>{
    const reader = new FileReader();

    reader.readAsDataURL(image1.files[0]);
    reader.onload = () => {
        imageData = reader.result;
        console.log(imageData)
    };
})


      allblogs=[]
     document.getElementById("btnId").addEventListener("click",
     function (e){
        e.preventDefault()

        
       const title= document.getElementById('blogname').value
       const content= document.getElementById('bloginf').value
        
        // if(localStorage.getItem('blogList')){
        //  allblogs=JSON.parse(localStorage.getItem("blogList"))
 
        // }
        // allblogs.push(myObject)
        // localStorage.setItem("blogList",JSON.stringify(allblogs))
        
        const data = {title,content,imageUrl:imageData};
        console.log(data)
        const cookie= document.cookie.split('=')[1]
        // console.log(cookie)
        fetch("https://my-brand-backend-lmiq.onrender.com/api/v1/blogs",{
            method:"POST",
           headers:{
            "Content-Type": "application/json",
            "credentials":`${cookie}`

        },
        body:JSON.stringify(data)
        })
        .then((response) =>{
         return response.json()
          
        })
        .then((data) => {
            // console.log(data)

          alert(data.message)
          window.location.reload()  
        })

        .catch(error => 
            console.log(error))

        });
        document.getElementById('blogname').value=''
        document.getElementById('bloginf').value=''
        document.getElementById('imgname').src=''
        document.getElementById('blogimgs').value=''
    //  displayBlog() 
    //  localStorage.removeItem('blogList')

function displayBlog(){

    fetch(`https://my-brand-backend-lmiq.onrender.com/api/v1/blogs`,{
        method :"GET"
    })
     
    .then((response) => response.json())
    .then((data) => {
    const blogs = data.data
     console.log(blogs)
    const allblog = document.getElementById('allblog');
    blogs.forEach((k,index)=>{
        const blog_box = document.createElement("div");
        blog_box.classList.add("singleBlog");
        blog_box.innerHTML = `
              <div class="imgBlog">
               <div class="imgBlog_1"><img src="${k.imageUrl}" alt=""></div>
              </div>
              <div class="blog_details">
                  <div class="BlogTittle">
                   <div><p> <b>${k.title}</b></p></div>
    
                  </div>
                  <div class="Blogcontent">
                   <div>
                       <p>${k.content}</p>
                   </div>
                  </div>
                  <div class="BlogButton">
                   <div class="deletebutton" data-bindex=${index} onclick="deleteBlog('${k._id}')">
                        <button >Delete Item</button>
                   </div>
                   <div class="editbutton" data-bindex=${index} onclick="updateBlog('${k._id}')">
                       <button >Edit</button>  
                   </div>
                   <div class="readmorebutton" data-bindex=${index} onclick="readMore('${k._id}')">
                   <button > Read More </button>
                   </div>
                  </div>
              </div>
             `
            
             const blogbutton = document.querySelector(".BlogButton");

        allblog.appendChild(blog_box);
          
    })
})
    .catch (err => console.log(err))
}
          
// REDIRECT TO SINGLE BLOG


function readMore(id) {

    localStorage.setItem("blogId", id);

    console.log(id);

    sessionStorage.setItem("isLoggedIn", false)

    setTimeout(() => {
        window.location.href = "/SingleBlog.html";
    }, 1000)

}

     // update blog 
     
     function updateBlog(id){
     console.log(id)

     const title= document.getElementById('blogname').value
     const content= document.getElementById('bloginf').value
     const imageUrl= document.getElementById('imgname').src
 
     const blogUpdated = {title,content,imageUrl};
     console.log(blogUpdated)
 
      
        fetch(`https://my-brand-backend-lmiq.onrender.com/api/v1/blogs/${id}`,{
        method: "GET"
        })
        .then((response) =>{
         return response.json()
          
        })
        .then(data => {
        document.getElementById('cancel_updatebtn').style.display='block'
        document.getElementById('btnId').style.display='none'   
        document.getElementById('blogname').value=data.data.title
        document.getElementById('bloginf').value=data.data.content
         document.getElementById('imgname').src=data.data.imageUrl
        document.getElementById('Updatebtn').addEventListener('click',function(e){
            e.preventDefault()
            const title= document.getElementById('blogname').value
            const content= document.getElementById('bloginf').value
            const imageUrl= document.getElementById('imgname').src
        
            const blogUpdated = {title,content,imageUrl}; 
            const tokenAccess = document.cookie.split("=")[1];
 
            fetch(`https://my-brand-backend-lmiq.onrender.com/api/v1/blogs/${id}`,{
                method:"PUT",
                headers:{"Content-Type":"application/json",
                "credentials":`${tokenAccess}`
            },body:JSON.stringify(blogUpdated)
            })
            .then((response)=>{
                return response.json()
                
            })
            .then((data)=>{
                alert(data.message)
                window.location.reload()
            })
        
        })
        })
        .catch(error => alert(error))
        
    }
    
    const token = document.cookie.split("=")[1];    
  function deleteBlog(id){
    console.log(id)
    fetch(`https://my-brand-backend-lmiq.onrender.com/api/v1/blogs/${id}`,{
        method: "DELETE",
        headers: {
            "credentials": `${token}`
        }
    })
    .then((response) => response.json())
  .then((data) => {
    console.log(data)
    // alert(data.message)
    setTimeout(() => {
        window.location.reload()
    , 2000})
  })
 
}
displayBlog()

   function showData(){
    fetch('https://my-brand-backend-lmiq.onrender.com/api/v1/query',{
        method :"GET"
    })
    .then((response) => response.json())
    .then((data) => {
    const queries = data.data
     console.log(queries)
     document.getElementById('querybody').innerHTML =''
     queries.forEach(function (element,index){
        document.getElementById('querybody').innerHTML+=`
        <tr>
        <td>${element.email}</td>
        <td> ${element.name}</td>
        <td>${element.message}</td>
        </tr>`
   
      })
    })
}

   showData()


//    localStorage.removeItem("queriesList")

const logout_btn = document.getElementById("logout-btn");

logout_btn.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.setItem("isLoggedIn", false);

    window.location.href = '/index.html'

    console.log(sessionStorage.getItem("isLoggedIn"));
})