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
         document.getElementById('mybtn').addEventListener('click',function(e){
        e.preventDefault()
        const myemail = document.getElementById('email').dataset.check
        const myname = document.getElementById('name').dataset.check
        const mymessage = document.getElementById('message').dataset.check
        if(myemail == 'valid' && myname == 'valid' && mymessage  =='valid'){
            // insertquery()
            
              document.getElementById('email').value =''
              document.getElementById('name').value =''
              document.getElementById('message').value =''
        }else{
            emailvalidation()
            namevalidation()
            messagevalidation()
            return
        }

     }) 
    //     allqueries=[]
    //  function insertquery(){
    //    let myObject = {};
    //    myObject.query_Email= document.getElementById('email').value
    //    myObject.query_Name = document.getElementById('name').value
    //    myObject.query_Name = document.getElementById('message').value
    //    if(localStorage.getItem('queriesList')){
    //     allqueries=JSON.parse(localStorage.getItem("queriesList"))

    //    }
    //    allqueries.push(myObject)
    //    localStorage.setItem("queriesList",allqueries)
    //  }



    //  function showData(){
    //  var queriesList;
    //  if (localStorage.getItem("queriesList")==null){
    //     queriesList= [];
    //  }else{
    //     queriesList=JSON.parse(localStorage.getItem("queriesList"));
    //  }
    //  var html = "";
    //  queriesList.forEach(function (element,index){
    //     html += "<tr>";
    //     html += "<td>" + element.email + "</td>";
    //     html += "<td>" + element.name + "</td>";
    //     html += "<td>" + element.message + "</td>";
    //     html += "<td>" + element.message + "</td>";
    //     html += '<td><button class="querEditbutton" id="querEditbutton">Edit</button>
    //     </td>;
    //     html+="</tr>";
    //  })
    // }

    // function deleteQuery(){
    //     let deletebutton=document.getElementsByClassName('deletebutton');
    //     let dltbtn=Array.from(deletebutton)
    //     dltbtn.forEach((el,index)=>{
    //      el.addEventListener('click',function(){
             
    //          if(el.dataset.bindex==index){
    //              let all=JSON.parse(localStorage.getItem('blogList'))
                
    //              all.splice(index,1)
    //              localStorage.setItem('blogList',JSON.stringify(all))
    //              displayBlog()
    //          }
    //      })
    //     })
    //    }

    //    function displayBlog(){

        
    //          if (localStorage.getItem("blogList")==null){
    //             allblogs= [];
    //          }else{
    //             allblogs=JSON.parse(localStorage.getItem("blogList"))  
    //          }
    //          document.getElementById('allblog').innerHTML=''
    //          allblogs.forEach(function (k,index){
    //           document.getElementById('images_Blog').innerHTML+=`
    //           <div class="Box1-Blog">
    //         <div class="First-image_Blogs"><img src="${k.query_blogsImgs}" alt="kk"></div>
    //         <h2>${k.query_blogName}</h2>
    //         <p>
    //         ${k.query_blogInf}
    //         </p>
    //       </div> `  
    //          });
    //      }  

    //      displayBlog()