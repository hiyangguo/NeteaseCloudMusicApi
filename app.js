const express = require('express');
const http = require('http');
const app = express();
app.set('port', (process.env.PORT || 3210));

app.all('*', function (req, res, next) {
    if (!req.get('Origin')) return next();
    // use "*" here to accept any origin
    res.set('x-powered-by', false);
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    // res.set('Access-Control-Allow-Max-Age', 3600);
    if ('OPTIONS' == req.method) return res.send(200);
    next();
});

//手机登录
app.use('/login/cellphone', require('./router/loginCellphone'));

//邮箱登录
app.use('/login', require('./router/login'));

//获取评论
app.use('/comment', require('./router/comment'));

// 获取每日推荐歌曲
app.use('/recommend/songs', require('./router/recommendSongs'));

// 获取每日推荐歌单
app.use('/recommend/resource', require('./router/recommendResource'));

// 获取歌词
app.use('/lyric', require('./router/lyric'));

// 获取专辑内容
app.use('/album', require('./router/album'));

// 获取歌手单曲
app.use('/artists', require('./router/artists'));

// 获取歌手专辑列表
app.use('/artist_album', require('./router/artist_album'));

// 歌单（网友精选碟） hot||new http://music.163.com/#/discover/playlist/
app.use('/top_playlist', require('./router/top_playlist'));

// 新碟上架 http://music.163.com/#/discover/album/
app.use('/new_albums', require('./router/new_albums'));

// 热门歌手 http://music.163.com/#/discover/artist/
app.use('/top_artists', require('./router/top_artists'));

// 获取用户歌单
app.use('/user/playlist', require('./router/userPlaylist'));

// 获取歌单内列表
app.use('/playlist/detail', require('./router/playlistDetail'));

//不明 api
app.use('/playlist/tracks', require('./router/playlistTracks'));

// 获取音乐 url
app.use('/music/url', require('./router/musicUrl'));

// 搜索
app.use('/search', require('./router/search'));

// 获取音乐详情
app.use('/music/songDetail', require('./router/songDetail'));

// 不明 api
app.use('/log/web', require('./router/logWeb'));

// 私人 FM
app.use("/personal_fm", require("./router/personal_fm"));

// 喜欢歌曲
app.use("/like", require("./router/like"));

//签到
app.use("/daily_signin", require("./router/daily_signin"));

//垃圾桶
app.use("/fm_trash", require("./router/fm_trash"));

//排行榜
app.use("/top_list", require("./router/top_list"));

//mv
app.use("/mv", require("./router/mv"));

//play_mv
app.use("/play_mv", require("./router/play_mv"));

process.on('SIGHUP', () => {
    console.log('server: bye bye')
    process.exit()
});


app.listen(app.get('port'), () => {
    console.log(`server running @${app.get('port')}`)
});

module.exports = app