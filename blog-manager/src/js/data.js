let blogs = [];

export function getBlogs() {
  return blogs;
}

export function addBlog(blog) {
  blogs.push(blog);
}

export function deleteBlog(id) {
  blogs = blogs.filter(blog => blog.id !== id);
}