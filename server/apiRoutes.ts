import express from 'express';
import attractions from './attractions.json';
import Attraction from "../src/types/Attraction";

const router = express.Router();

export type GetAttractionsBody = { list: Attraction[], metaData: { numberOfResults: number } }
router.get('/api/getAttractions', (req, res) => {
    const body: GetAttractionsBody = {list: attractions, metaData: {numberOfResults: attractions.length}};
    return res.send(body);
});

export {router as apiRoutes}