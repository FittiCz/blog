
const API_ADDRESS = "http://127.0.0.1:8080"

const API_ENDPOINTY = {
    SEZNAM: "/seznam",
    PRIDEJ_PRISPEVEK: "/pridejprispevek"
}
const API_METHODS = {
    POST: "POST",
    GET: "GET"
}

const blogPostTemplate = document.getElementById("blog-post-template")
const blogPostBox = document.getElementById("blog-posts")
const noPosts = blogPostBox.querySelector(".no-posts")
const titleInput = document.getElementById("title")
const authorInput = document.getElementById("author")
const textarea = document.querySelector(".new-post__content")
const sendButton = document.getElementById("send-new-post")

sendButton.addEventListener("click", sendBlogPost)
async function sendBlogPost() {
    const data = {
        title: titleInput.value,
        author: authorInput.value,
        content: textarea.value,
        slug: titleInput.value
    }
    await fetch(`${API_ADDRESS}${API_ENDPOINTY.PRIDEJ_PRISPEVEK}`, {
        method: API_METHODS.POST,
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
}

function resetPosts() {
    const vsechnyBlogPosty = blogPostBox.querySelectorAll(".blog-post")
    for (const blogPost of vsechnyBlogPosty) {
        blogPostBox.removeChild(blogPost)
    }
}

async function seznamPostu() {
    const endPointUrl = API_ADDRESS + API_ENDPOINTY.SEZNAM
    const odpovedServeru = await fetch(endPointUrl)
    const data = await odpovedServeru.json()
    console.log(data);
    if (data.length === 0) {
        resetPosts()
        console.log("nic tu není");
        noPosts.style.display = "block"
        return
    }
    noPosts.style.display = "none"
    resetPosts()
    for (const blogPost of data) {
        const newBlogPost = createBlogPost(blogPost)
        blogPostBox.appendChild(newBlogPost)
    }
}

function createBlogPost(blogData) {
    const newBlogPost = blogPostTemplate.content.cloneNode(true)
    newBlogPost.querySelector(".blog-post__title").textContent = blogData.title
    newBlogPost.querySelector(".blog-post__author .text").textContent = blogData.author
    newBlogPost.querySelector(".blog-post__content").textContent = blogData.content
    return newBlogPost
}



document.querySelector(".load").onclick = seznamPostu
window.onload = seznamPostu
