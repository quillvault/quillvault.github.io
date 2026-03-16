let users = JSON.parse(localStorage.getItem("users") || "{}")
let stories = JSON.parse(localStorage.getItem("stories") || "[]")

function saveUsers(){
localStorage.setItem("users", JSON.stringify(users))
}

function saveStories(){
localStorage.setItem("stories", JSON.stringify(stories))
}

function createAccount(){

let u = document.getElementById("username").value
let p = document.getElementById("password").value

if(users[u]){
document.getElementById("loginMessage").innerText="User already exists"
return
}

users[u] = p
saveUsers()

localStorage.setItem("currentUser", u)

document.getElementById("loginMessage").innerText="Account created!"
}

function login(){

let u = document.getElementById("username").value
let p = document.getElementById("password").value

if(users[u] === p){

localStorage.setItem("currentUser", u)
document.getElementById("loginMessage").innerText="Login successful"

}else{
document.getElementById("loginMessage").innerText="Incorrect login"
}

}

function postStory(){

let user = localStorage.getItem("currentUser")

if(!user){
alert("You must be logged in")
return
}

let story = {
title:document.getElementById("title").value,
author:user,
tags:document.getElementById("tags").value,
description:document.getElementById("description").value,
content:document.getElementById("content").value
}

stories.unshift(story)

saveStories()

alert("Story posted")
}

function renderStories(){

let list = document.getElementById("storyList")

if(!list) return

let search = document.getElementById("search").value.toLowerCase()

list.innerHTML=""

stories
.filter(s =>
s.title.toLowerCase().includes(search) ||
s.tags.toLowerCase().includes(search) ||
s.description.toLowerCase().includes(search)
)
.forEach((story,index)=>{

let div = document.createElement("div")
div.className="story"

let deleteButton=""

if(localStorage.getItem("currentUser") === story.author){

deleteButton = `<button onclick="deleteStory(${index})">Delete</button>`

}

div.innerHTML = `
<h3>${story.title}</h3>
<p><b>Author:</b> ${story.author}</p>
<p class="tags">${story.tags}</p>
<p>${story.description}</p>
${deleteButton}
`

list.appendChild(div)

})

}

function deleteStory(index){

stories.splice(index,1)
saveStories()
renderStories()

}
