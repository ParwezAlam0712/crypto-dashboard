import { getBlogs } from "./data.js";

export function renderBlogList(container) {
  container.innerHTML = "";

  getBlogs().forEach(blog => {
    const li = document.createElement("li");

    li.innerHTML = `
      <h3>${blog.title}</h3>
      <p>${blog.body}</p>
      <button data-id="${blog.id}">Delete</button>
    `;

    container.appendChild(li);
  });
}

export function bindDeleteEvents(container, onDelete) {
  container.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const id = Number(e.target.dataset.id);
      onDelete(id);
    }
  });
}