import express from 'express';
import attractions from './attractions.json';

const router = express.Router();

router.get('/api/getAttractions', (req, res) => {
    return res.send({list: attractions, metaData: {numberOfResults: attractions.length}});
});

export {router as apiRoutes}