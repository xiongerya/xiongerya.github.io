let app = new Vue({
    el: "#app",
    data: {
        keyword: "",
        songs: [],
        musicUrl: "",
        picUrl: "./images/music.png",
        mvUrl: "",
        comments: [],
        music: "music name",
        isPlay: false
    },
    methods: {
        getSongs(){
            let that = this;
            axios
            .get("https://autumnfish.cn/search?keywords=" + that.keyword)
            .then(
                response => response.data.result.songs
            )
            .then(value => {
                let result =  value.map(x => {
                    let song = {name: x.name, id: x.id, mvId: x.mvid};
                    // 获取song的musicUrl
                    axios
                    .get("https://autumnfish.cn/song/url?id=" + x.id)
                    .then(response => {
                        song.musicUrl = response.data.data[0].url;
                    })
                    .catch(err => console.log("出错啦：" + err));
                    // 获取song的imgUrl
                    axios
                    .get("https://autumnfish.cn/song/detail?ids=" + song.id)
                    .then(response => {
                        song.picUrl = response.data.songs[0].al.picUrl;
                    })
                    .catch(err => console.log("出错啦：" + err));
                    // 获取song的mvUrl
                    axios
                    .get("https://autumnfish.cn/mv/url?id=" + song.mvId)
                    .then(response => {
                        song.mvUrl = response.data.data.url;
                    })
                    .catch(err => console.log("出错啦：" + err));
                    // 获取song的comments
                    axios
                    .get("https://autumnfish.cn/comment/hot?type=0&id=" + song.id)
                    .then(response => {
                        song.comments = response.data.hotComments;
                    })
                    .catch(err => console.log("出错啦：" + err));
                    return song;
                });
                return result;
            })
            .then(value => {
                // setTimeout(() => that.songs = value, 1000)
                that.songs = value;
            })
            .catch(err => console.log("出错啦：" + err));
        },
        playMusic(obj){ 
            // console.log(obj);
            if(!obj.musicUrl){
                alert("歌曲地址走丢了")
            }else{
                this.music = obj.name;
                this.musicUrl = obj.musicUrl;
                this.picUrl = obj.picUrl ? obj.picUrl : this.picUrl;
                this.comments = obj.comments;
                this.isPlay = true;
            }
        },
        change(){
            this.isPlay = !this.isPlay;
            this.isPlay ? this.$refs.audio.play() : this.$refs.audio.pause();
        },
        playMv(str){
            this.mvUrl = str;
            this.$refs.audio.pause();
        },
        stopMv(){
            this.mvUrl = "";
        }
    }
})



//开始前执行getSongs()，构建一份歌曲目录
app.keyword = "胡歌";
app.getSongs();
app.keyword = "";