console.log("test")
const newFormHandler = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector('#post-comment').value.trim();
    console.log(comment);
  
    if (comment) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({comment}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/post');
      } else {
        alert('Failed to add comment');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/post');
      } else {
        alert('Failed to delete comment');
      }
    }
  };
  
  document
    .querySelector('.comment-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.comment-list')
    .addEventListener('click', delButtonHandler);
  