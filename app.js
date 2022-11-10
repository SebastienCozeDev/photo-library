const express = require('express');

const port = 3001;

const app = express();

app.get('/', (req, res) => {
    res.send("Server running.");
});

app.use((req, res) => {
    res.status(404);
    res.send('Erreur 404 : Page non trouvé...');
});

app.listen(port, () => {
    console.log(`Server running at ${port} port.`)
});