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
     function insertBlog(){

        let myObject = {};
        myObject.query_blogName= document.getElementById('blogname').value
        myObject.query_blogInf = document.getElementById('bloginf').value
        myObject.query_blogImgs = document.getElementById('imgname').src
        if(localStorage.getItem('blogList')){
         allblogs=JSON.parse(localStorage.getItem("blogList"))
 
        }
        allblogs.push(myObject)
        localStorage.setItem("blogList",JSON.stringify(allblogs))
        document.getElementById('blogname').value=''
        document.getElementById('bloginf').value=''
        document.getElementById('imgname').src=''
        document.getElementById('blogimgs').value=''
     displayBlog()

     }
     
    //  localStorage.removeItem('blogList')
function displayBlog(){

    allblogs=JSON.parse(localStorage.getItem("blogList"))
    
         if (localStorage.getItem("blogList")==null){
            allblogs= [];
         }else{
            allblogs=JSON.parse(localStorage.getItem("blogList"))  
         }
         document.getElementById('allblog').innerHTML=''
         allblogs.forEach(function (k,index){
          document.getElementById('allblog').innerHTML+=`
          <div class="singleBlog" > 
          <div class="imgBlog">
           <div class="imgBlog_1"><img src="${k.query_blogImgs}" alt=""></div>
          </div>
          <div class="blog_details">
              <div class="BlogTittle">
               <div><p> <b>${k.query_blogName}</b></p></div>

              </div>
              <div class="Blogcontent">
               <div>
                   <p>${k.query_blogInf}</p>
               </div>
              </div>
              <div class="BlogButton">
               <div class="deletebutton" data-bindex=${index} onclick="deleteBlog()">
                    <button >Delete Item</button>
               </div>
               <div class="editbutton" data-bindex=${index} onclick="updateBlog()">
                   <button >Edit</button>  
               </div>
              </div>
          </div>
       </div> `  
         });
     }      

     displayBlog()
     function updateBlog(){
        document.getElementById('cancel_updatebtn').style.display='flex'
        document.getElementById('btnId').style.display='none'
        
        let editbutton=document.getElementsByClassName('editbutton');
        let editbtn=Array.from(editbutton)
        editbtn.forEach((el,index)=>{
         el.addEventListener('click',function(){
            localStorage.setItem('myid',el.dataset.bindex)
            location.href="#";
            location.href="#postId"
            let myid=localStorage.getItem('myid')
        if(myid==index){
           
            let all=JSON.parse(localStorage.getItem('blogList'))
            document.getElementById('blogname').value=all[index].query_blogName
            document.getElementById('bloginf').value=all[index].query_blogInf
            document.getElementById('imgname').src=all[index].query_blogImgs
            
            const Cancel=document.getElementsByClassName('Cancel');
            const can_btn=Array.from(Cancel);
            can_btn.forEach((n,index)=>{
               n.addEventListener('click',function(){
                  if(n.id == 'Cancelbtn'){
                    displayBlog();
                  }
                  else{

                //    change

                all.splice(myid,1)
                localStorage.setItem('blogList',JSON.stringify(all))
                // change
                   let myObject = {};
                   myObject.query_blogName= document.getElementById('blogname').value
                   myObject.query_blogInf = document.getElementById('bloginf').value
                   myObject.query_blogImgs = document.getElementById('imgname').src
                  all=JSON.parse(localStorage.getItem('blogList')) 
                   all.push(myObject);
                   localStorage.setItem('blogList',JSON.stringify(all))
                   displayBlog()
                     document.getElementById('blogname').value=''
        document.getElementById('bloginf').value=''
        document.getElementById('imgname').src=''
        document.getElementById('blogimgs').value='' 
                  }
                  document.getElementById('cancel_updatebtn').style.display='none'
        document.getElementById('btnId').style.display='block'
               })
            })
        }
    })
        })
    }

  function deleteBlog(){
    let deletebutton=document.getElementsByClassName('deletebutton');
    let dltbtn=Array.from(deletebutton)
    dltbtn.forEach((el,index)=>{
     el.addEventListener('click',function(){
         
         if(el.dataset.bindex==index){
             let all=JSON.parse(localStorage.getItem('blogList'))
            
             all.splice(index,1)
             localStorage.setItem('blogList',JSON.stringify(all))
             displayBlog()
         }
     })
    })
   }