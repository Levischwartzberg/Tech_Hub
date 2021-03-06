const newFormHandler = async (event) => {
  event.preventDefault();
  if(document.getElementById("create-btn").getAttribute("style") === "display: block") {
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    if (title && content) {
      const response = await fetch(`/api/posts/`, {
        method: 'POST',
        body: JSON.stringify({ title, content}),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create project');
      }
    }
  }
  else {
    updateHandler();
  }
};

const updateHandler = async (event) => {
  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();
  const id = document.getElementById("update-btn").getAttribute('data-id');

    console.log("test");
    if (title && content) {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to edit post');
      }
    }

};

const delButtonHandler = async (event) => {
  if (event.target.getAttribute('id') === "delete") {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

const updatePostHandler = async (event) => {
  event.preventDefault();
  if (event.target.getAttribute('id') === "update") {
    const id = event.target.getAttribute('data-id');

    document.getElementById("update/create").textContent = "Update Post";
    document.getElementById("update-btn").setAttribute("style", "display: block;")
    document.getElementById("update-btn").setAttribute("data-id", id)
    document.getElementById("create-btn").setAttribute("style", "display: none;")

    document.querySelector('#post-title').defaultValue = document.getElementById(`posttitle${id}`).textContent;
    document.querySelector('#post-content').textContent = document.getElementById(`postcontent${id}`).textContent;
  }
};

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.post-list')
  .addEventListener('click', delButtonHandler);

  document
  .querySelector('.post-list')
  .addEventListener('click', updatePostHandler);
