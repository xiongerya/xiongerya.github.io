let app = new Vue({
    el: "#wrap",
    data: {
        keyword: "",
        songs: [],
        musicUrl: "",
        picUrl: "./images/music.png",
        mvUrl: "",
        comments: [],
        music: false,
        mv: false
    },
    methods: {
        getSongs(){
            let that = this;
            axios
            .get("https://autumnfish.cn/search?keywords=" + that.keyword)
            .then(response => {
                let result =  response.data.result.songs;
                result.map(x => {
                    // 获取song的musicUrl
                    axios
                    .get("https://autumnfish.cn/song/url?id=" + x.id)
                    .then(response => {
                        x.musicUrl = response.data.data[0].url;
                    })
                    .catch(err => console.log("出错啦：" + err));
                    // 获取song的imgUrl
                    axios
                    .get("https://autumnfish.cn/song/detail?ids=" + x.id)
                    .then(response => {
                        x.picUrl = response.data.songs[0].al.picUrl;
                    })
                    .catch(err => console.log("出错啦：" + err));
                    // 获取song的mvUrl
                    axios
                    .get("https://autumnfish.cn/mv/url?id=" + x.id)
                    .then(response => {
                        x.mvUrl = response.data.data.url;
                    })
                    .catch(err => console.log("出错啦：" + err));
                    // 获取song的comments
                    axios
                    .get("https://autumnfish.cn/comment/hot?type=0&id=" + x.id)
                    .then(response => {
                        x.comments = response.data.hotComments;
                    })
                    .catch(err => console.log("出错啦：" + err));
                });
                setTimeout(() => that.songs = result, 500)
            })
            .catch(err => console.log("出错啦：" + err));
        },
        playMusic(obj){
            this.musicUrl = obj.musicUrl;
            this.picUrl = obj.picUrl ? obj.picUrl : this.picUrl;
            this.comments = obj.comments;
            // console.log(obj.name)
            // console.log(obj.id)
            // console.log(obj.musicUrl);
            // console.log(obj.picUrl)
        },
        playMv(str){
            this.mvUrl = str;
            // console.log(this.mvUrl)
        },
        isPlay(){
            this.music = true;
        },
        isPause(){
            this.music = false;
        }
    }
})

setTimeout(() => {
    app.keyword = "杨幂";
    app.getSongs();
    app.keyword = "";
}, 0)
