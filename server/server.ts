import path from 'path';
import express from 'express';
import {apiRoutes} from './apiRoutes';
import favicon from 'serve-favicon';
import bodyParser from "body-parser";

const isDev = process.env.NODE_ENV !== 'production';

const app = express();
const pathToBuild = path.join(__dirname, '..', 'build');
const port = process.env.PORT || 3001;

app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')))
app.use(express.static(pathToBuild));
app.get('/ping', function (req, res) {
    return res.send('pong');
});

app.use(bodyParser.json())
app.use(apiRoutes);

if (!isDev) {
    app.disable('x-powered-by');
    app.get('/*', function (req, res) {
        res.sendFile(path.join(pathToBuild, 'index.html'));
    });
}

app.listen(port, () => console.log(`Server is up on port ${port}...`));

export {};