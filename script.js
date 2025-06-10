//Φόρτωση των Posts από το API
async function getPosts() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
//Εμφάνιση των πρώτων 10 Posts
    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = '';
    posts.slice(0, 10).forEach(post => {
    const postDiv = document.createElement('div');
    postDiv.textContent = post.title;
    postDiv.addEventListener('click', () => showDetails(post.id));
    postsDiv.appendChild(postDiv);
});

  } catch (error) {
    //Eμφάνιση σφάλματος σε περίπτωση αδυναμίας φόρτωσης των Posts
    document.getElementById('posts').innerText = 'Σφάλμα φόρτωσης δεδομένων';
  }
}


async function showDetails(id) {
  const detailsDiv = document.getElementById('details');
  detailsDiv.innerHTML = '';
  try {
    // Φόρτωση των δεδομένων του post με το συγκεκριμένο id
    const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const post = await postRes.json();
    // Φόρτωση των σχολίων που ανήκουν στο συγκεκριμένο post
    const commentsRes = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
    const comments = await commentsRes.json();
    //Προσθήκη των αποτελεσμάτων στα αντίστοιχα div
    detailsDiv.innerHTML = `
    <h2>${post.title}</h2>
    <p>${post.body}</p>
    <h3>Σχόλια:</h3>
    <ul>
    ${comments.map(comment => `<li><strong>${comment.name}</strong>: ${comment.body}</li>`).join('')}
  </ul>
`;

  } catch (error) {
    //Eμφάνιση σφάλματος σε περίπτωση αδυναμίας φόρτωσης
    detailsDiv.innerText = 'Σφάλμα φόρτωσης λεπτομερειών';
  }
}

document.addEventListener('DOMContentLoaded', getPosts);
