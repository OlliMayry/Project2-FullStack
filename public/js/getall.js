// Get a reference to the song-list tbody element
const songList = document.getElementById('song-list');

// Attach a click event listener to the song list
songList.addEventListener('click', event => {
  // Check if the click target is a table cell
  if (event.target.nodeName === 'TD') {
    // Get a reference to the song id, name, artist, and album
    const id = event.target.parentNode.getAttribute('data-id');
    const name = event.target.parentNode.childNodes[1].textContent; 
    const artist = event.target.parentNode.childNodes[3].textContent;
    const album = event.target.parentNode.childNodes[5].textContent; 

    // Redirect the user to the update page with the song data
    window.location.href = `/update.html?id=${id}&name=${name}&artist=${artist}&album=${album}`;
  }
});

fetch('/api/getall')
  .then(response => response.json())
  .then(songs => {
    // Get a reference to the song-list tbody element
    const songList = document.getElementById('song-list');

    // Loop through each song and add it to the table
    songs.forEach(song => {
      const tr = document.createElement('tr');
      tr.setAttribute('data-id', song._id); // set the data-id attribute to the song id
      tr.innerHTML = `
        <td>${song.name}</td>
        <td>${song.artist}</td>
        <td>${song.album}</td>
      `;
      songList.appendChild(tr);
    });
  })
  .catch(error => console.error(error));




