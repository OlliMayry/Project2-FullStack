const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000; // changed port number to use environment variable or default to 3000

// Set up middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB database
mongoose.connect('mongodb+srv://ollimayry:nIPRRhb1qiPvH5hT@cluster0.xf53rqo.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a schema for your data
const SongSchema = new mongoose.Schema({
  name: String,
  artist: String,
  album: String,
  file: String
});

// Create a model based on the schema
const Song = mongoose.model('Song', SongSchema);

// Serve static files from the "public" directory
app.use(express.static('public'));

// This will serve "index.html" from the "public" directory when someone makes a GET request to the root URL
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname + '/public' });
});

// Define routes
app.get('/api/getall', async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.status(200).json(song);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/add', async (req, res) => {
  try {
    const song = new Song({
      name: req.body.name,
      artist: req.body.artist,
      album: req.body.album
    });
    await song.save();
    res.redirect('/index.html');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/update/:id', async (req, res, next) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      artist: req.body.artist,
      album: req.body.album
    }, { new: true });

    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    res.json({ message: 'Song updated successfully' });
  } catch (err) {
    next(err);
  }
});


app.delete('/api/delete/:id', async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.status(200).json({ message: 'Song deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


