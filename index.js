const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 8080;

const router = express.Router();

router.get('/', (req, res) => {
    res.json({message:'It works!'});
});

app.use('/api', router);

app.listen(port);
console.log(`It works on port ${port}`);
