import express from 'express';

import {getArtist} from '../controllers/songs.js'

const router = express.Router();

router.
    route('/:artist')
    .get(getArtist);

export default router;