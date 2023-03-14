
const blogId = localStorage.getItem("blogId");
console.log(blogId);

// COMMENTS CONTAINER
const comments_container = document.querySelector(".comments-container");

const gallery = document.querySelector(".gallery");

fetch(`http://127.0.0.1:4000/api/v1/blogs/${blogId}`, {
    method: "GET"
})
.then((res) => res.json())
.then((data) => {
    console.log(data.data.comments);
    renderComments(data.data.comments);
    renderBlog(data.data);
})
.catch(error => console.log(error));

const renderComments = (arr) => {

    arr.forEach((comment, index) => {

        let dateObj = new Date(comment.createdAt);
        
        const comment_box = document.createElement("div");
        comment_box.classList.add("comment-box");

        const title = document.createElement("h3");
        title.classList.add("comment-title");
        title.innerText = comment.title;

        const name = document.createElement("p");
        name.classList.add("comment-name");
        name.innerText = comment.name;

        const email = document.createElement("p");
        email.classList.add("comment-email");
        email.innerText = comment.email;

        const comment_body = document.createElement("p");
        comment_body.classList.add("comment-body")
        comment_body.innerText = comment.comment;

        const date = document.createElement("p");
        date.classList.add("comment-date");
        date.innerText = String(dateObj).split("GMT")[0];

        comment_box.appendChild(name);
        comment_box.appendChild(email);
        comment_box.appendChild(comment_body);
        comment_box.appendChild(date);

        comments_container.appendChild(comment_box);


    });

}

const renderBlog = (blog) => {

    gallery.innerHTML = `
    
    <a target="_blank" href="img/04.jfif">
    <img src=${blog.imageUrl} alt="Cinque Terre" width="600" height="400">
  </a>
  <div class="desc">${blog.title}</div>
  <div class="desc">${blog.content}</div>
    
    `

}




