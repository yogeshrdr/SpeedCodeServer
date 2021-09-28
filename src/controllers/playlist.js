const User = require('../models/user');
const Vedio = require('../models/vedio');
const Playlist = require('../models/playlist');
const ytlist = require('youtube-playlist');

//add playlist

exports.addPlaylist = async (req, res)=>{
    try {
        const user = await User.findById(req.body.userId);

        if(!user) 
            return res.status(404).json({success: false,message: "User not exists"});

        if(user.role !== 'admin') return res.status(400).json({success: false,message: "You don't have permission to access this"});

        const newPlaylist = req.body;
        delete newPlaylist.userId;

        const playlist = new Playlist(newPlaylist);
        playlist.userId = user;
        const newplaylist = await playlist.save();

        user.playlists.push(playlist);
        const user_ = await user.save();


        req.body.vedios?.map(async(d, i) => {
            const vedio = await Vedio.findById(d);
            vedio.playlistId = newplaylist;
            await vedio.save();
        })

        res.status(200).json({success: true,playlist: newplaylist, user: user_});

    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

//get all playlist
exports.getallPlaylist = async (req, res)=>{
    try {
        const playlists = await Playlist.find({});
        res.status(200).json({success: true,playlists});
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}


//get user playlist
exports.getuserPlaylist = async(req, res) =>{
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if(!user)
            return res.status(404).json({success: false,message: "User not exists"});

        const playlists = await Playlist.find({userId});
        res.status(200).json({success: true,playlists});

    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}


//delete blog
exports.deletePlaylist= async(req, res) => {
    try {
        const userId = req.body.userId
        const user_ = await User.findById(userId);

        if(user_.role !== 'admin') return res.status(400).json({success: false,message: "You don't have permission to access this"});

        const playlist = await Playlist.findByIdAndRemove(req.params.id);

        if(!playlist) {
            return res.status(404).json({success: false,message: "playlist Doesnot exits"});
        }

        const user = await User.findById(playlist.userId);
        user.playlists.pull(playlist);
        await user.save();

        res.status(200).json({success: true,user});

    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}


//update blog
exports.updatePlaylist = async(req, res) => {
    try {
        const userId = req.body.userId
        const user = await User.findById(userId);

        if(user.role !== 'admin') return res.status(400).json({success: false,message: "You don't have permission to access this"});

        await Playlist.findByIdAndUpdate(req.params.id, req.body)

        const playlist = await Playlist.findById(req.params.id);

        res.status(200).json({success: true,message: "Playlist is updated",  playlist});
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

//get all vedios of playlist
exports.getplaylistvedios = async(req,res) =>{
    try {
        const playlistId = req.params.id;
        const playlist = await Playlist.findById(playlistId);
        if(!playlist )
            return res.status(404).json({success: false,message: "Playlist not exists"});

        const vedios = await Vedio.find({playlistId});
        res.status(200).json({success: true,vedios});
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}





