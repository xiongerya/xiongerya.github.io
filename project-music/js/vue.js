let app = new Vue({
    el: ".wrap",
    data: {
        keyword: "胡歌",
        musicId: "",
        songs: [
            {name: "逍遥叹", id: 4875306}, 
            {name: "一吻天荒 ", id: 391566}, 
            {name: "倔强", id: 386175},
            {name: "练习", id: 554191989}, 
            {name: "爱的供养 ", id: 393335}, 
            {name: "来生缘", id: 112908}
        ],
        comments: [],
        music: false,
        musicUrl: "",
        imgUrl: "./images/music.png",
        mv: false,
        mvUrl: ""
    },
    methods: {
        getMusic: function(){
            let that = this;
            axios
            .get("https://autumnfish.cn/search?keywords=" + that.keyword)
            .then(response => {
                that.songs = response.data.result.songs;
            })
            .catch(error => console.log(error));
        },
        getMv: function(str){
            this.musicId = str;
            let that = this;
            // 获取歌曲MV
            axios
            .get("https://autumnfish.cn/mv/url?id=" + that.musicId)
            .then(response => {
                // console.log(response);
                that.mvUrl = response.data.data.url;
                console.log(that.mvUrl);
            })
            .catch(error => console.log(error));
            this.mv = !!this.mvUrl;
        },
        getDetail: function(str){
            this.musicId = str;
            let that = this;
            // 获取music地址
            axios
            .get("https://autumnfish.cn/song/url?id=" + that.musicId)
            .then(response => {
                that.musicUrl = response.data.data[0].url;
                // console.log(that.musicUrl);
            })
            .catch(error => console.log(error));
            // 获取歌曲封面地址
            axios
            .get("https://autumnfish.cn/song/detail?ids=" + that.musicId)
            .then(response => {
                that.imgUrl = response.data.songs[0].al.picUrl;
            })
            .catch(error => console.log(error));
            // 获取歌曲评论
            axios
            .get("https://autumnfish.cn/comment/hot?type=0&id=" + that.musicId)
            .then(response => {
                // console.log(response);
                that.comments = response.data.hotComments;
            })
            .catch(error => console.log(error));
        },
        isPlay: function(){
            this.music = true;
        },
        isPause: function(){
            this.music = false;
        }
    }
})