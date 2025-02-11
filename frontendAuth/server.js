import express from 'express'

const PORT = 3000;

const app = express();
app.use(express.static('./'));
app.get("/", function(req, res) {
    res.setHeader("Content-Security-Policy", "frame-ancestors 'self' https://autofill.yandex.ru");

    res.sendFile("index.html");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
