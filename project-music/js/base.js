// 获取song的musicUrl
 getMusic(obj){
    axios
    .get("https://autumnfish.cn/song/url?id=" + obj.id)
    .then(response => {
        obj.musicUrl = response.data.data[0].url;
    })
    .catch(err => console.log("出错啦：" + err));
},
// 获取song的picUrl
getPic(obj){
    axios
    .get("https://autumnfish.cn/song/detail?ids=" + obj.id)
    .then(response => {
        obj.picUrl = response.data.songs[0].al.picUrl;
    })
    .catch(err => console.log("出错啦：" + err));
},
// 获取song的comments
getComments(obj){
    axios
    .get("https://autumnfish.cn/comment/hot?type=0&id=" + obj.id)
    .then(response => {
        obj.comments = response.data.hotComments;
    })
    .catch(err => console.log("出错啦：" + err));
},
// 获取song的mvUrl
getMv(obj){
    axios
    .get("https://autumnfish.cn/mv/url?id=" + obj.id)
    .then(response => {
        obj.mvUrl = response.data.data.url;
    })
    .catch(err => console.log("出错啦：" + err));
},
// 获取songs集合
getSongs(){
    let that = this;
    axios
    .get("https://autumnfish.cn/search?keywords=" + that.keyword)
    .then(value => 
        value.data.result.songs
        .map(x => ({name: x.name, id: x.id}))
    )
    .then(value => {that.songs
        value = value.map(x => {
            that.getMusic(x);
            that.getPic(x);
            that.getComments(x);
            that.getMv(x);
            return x;
        })
        setInterval(() => that.songs = value, 1000)
    })
    .catch(err => console.log("出错啦：" + err));
},