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

      allblogs=[]
     document.getElementById("btnId").addEventListener("click",
     function (e){
        e.preventDefault()

        
       const title= document.getElementById('blogname').value
       const content= document.getElementById('bloginf').value
       const imageUrl= document.getElementById('imgname').src
        
        // if(localStorage.getItem('blogList')){
        //  allblogs=JSON.parse(localStorage.getItem("blogList"))
 
        // }
        // allblogs.push(myObject)
        // localStorage.setItem("blogList",JSON.stringify(allblogs))

        const data = {title,content,imageUrl};
        console.log(data)
        const cookie= document.cookie.split('=')[1]
        // console.log(cookie)
        fetch("http://127.0.0.1:4000/api/v1/blogs",{
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
            
        })

        .catch(error => alert(error))

        });
        document.getElementById('blogname').value=''
        document.getElementById('bloginf').value=''
        document.getElementById('imgname').src=''
        document.getElementById('blogimgs').value=''
    //  displayBlog() 
    //  localStorage.removeItem('blogList')

function displayBlog(){

    fetch('http://127.0.0.1:4000/api/v1/blogs',{
        method :"GET"
    })
     
    .then((response) => response.json())
    .then((data) => {
    const blogs = data.data
     console.log(blogs)
     document.getElementById('allblog').innerHTML=''
    blogs.forEach((k,index)=>{
        document.getElementById('allblog').innerHTML+=`
              <div class="singleBlog" > 
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
                  </div>
              </div>
        
           </div>`
          
    })
})
    .catch (err => alert(err))
}
          

     displayBlog()
   
     // update blog 
     
     function updateBlog(id){
     console.log(id)

     const title= document.getElementById('blogname').value
     const content= document.getElementById('bloginf').value
     const imageUrl= document.getElementById('imgname').src
 
     const blogUpdated = {title,content,imageUrl};
     console.log(blogUpdated)
 
      
        fetch(`http://127.0.0.1:4000/api/v1/blogs/${id}`,{
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
 
            fetch(`http://127.0.0.1:4000/api/v1/blogs/${id}`,{
                method:"PUT",
                headers:{"Content-Type":"application/json",
                "credentials":`${tokenAccess}`
            },body:JSON.stringify(blogUpdated)
            })
            .then((response)=>{
                return response.json()
                
            })
            .then((data)=>{
                console.log(data)
            })
        
        })
        })
        .catch(error => alert(error))
        
    }
    
    const token = document.cookie.split("=")[1];    
  function deleteBlog(id){
    console.log(id)
    fetch(`http://127.0.0.1:4000/api/v1/blogs/${id}`,{
        method: "DELETE",
        headers: {
            "credentials": `${token}`
        }
    })
    .then((response) => response.json())
  .then((data) => {
    console.log(data)
    // alert(data.message)
  })
 
}
displayBlog()

   function showData(){
    fetch('http://127.0.0.1:4000/api/v1/query',{
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