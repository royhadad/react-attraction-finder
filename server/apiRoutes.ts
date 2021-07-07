const express = require('express')

const router = express.Router();

router.get('/api/someRoute', (req, res) => {
    return res.send('Hello World!');
});

export {router as apiRoutes}