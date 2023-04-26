  const updateForm = document.getElementById('update-form');
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const nameInput = document.getElementById('name');
  const artistInput = document.getElementById('artist');
  const albumInput = document.getElementById('album');

  nameInput.value = decodeURIComponent(urlParams.get('name') || '');
  artistInput.value = decodeURIComponent(urlParams.get('artist') || '');
  albumInput.value = decodeURIComponent(urlParams.get('album') || '');

  updateForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const artist = artistInput.value.trim();
    const album = albumInput.value.trim();

    console.log(`/api/update/${id}`);

    fetch(`/api/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, artist, album })
    })
      .then(response => {
        if (response.ok) {
          console.log('OK!')
          window.location.href = '/';
        } else {
          throw new Error('Failed to update song');
        }
      })
      .catch(error => console.error(error));
  });