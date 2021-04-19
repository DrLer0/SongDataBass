import {songsMapper, artistMapper} from '../index.js';

export const getArtist = async (req, res) => {
    try{
        const songsData = await artistMapper.find({artist_name: req.params.artist});
        
        res.status(200).json(songsData);
    } catch(error){
        res.status(404).json({message: error.message});
        console.log(error);
    }
};

export const getSongs = async (req, res) => {
    try{
        const songsData = await songsMapper.find({title: req.params.song});
        
        res.status(200).json(songsData);
    } catch(error){
        res.status(404).json({message: error.message});
        console.log(error);
        console.log(req);
    }
}