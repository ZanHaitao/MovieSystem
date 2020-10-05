<template>
    <div class="page-index util-wrapper">
        <!-- banner广告 -->
        <div class="banner">
            <img :src="imgUrl" alt="">
        </div>

        <div class="container">
            <div class="left-content">
                <div class="host-movie">
                    <p class="title">
                        正在热映
                        <router-link tag="span" to="/movie">
                            全部
                            <i class="el-icon-arrow-right"></i>
                        </router-link>
                    </p>
                    <my-movie :movieList="hostMovie" :type="'defaultMovie'" />
                </div>

                <div class="future-movie">
                    <p class="title">
                        即将上映
                        <router-link tag="span" to="/movie">
                            全部
                            <i class="el-icon-arrow-right"></i>
                        </router-link>
                    </p>
                    <my-movie :movieList="futureMovie" :type="'futureMovie'" />
                </div>
            </div>

            <div class="right-content">
                <my-ranking :title="'今日票房'" :type="'price'" :listData="highestMovie"/>
                <my-ranking :title="'最受期待'" :type="'forward'" :listData="forwardMovie"/>
                <my-ranking :title="'TOP 100'" :type="'likes'" :listData="likesMovie"/>
            </div>
        </div>
    </div>
</template>

<script>
    import MyMovie from '../components/movie/movie';
    import MyRanking from '../components/movie/ranking';
    export default {
        data() {
            return {
                imgUrl: '',
                hostMovie: [],
                futureMovie: [],
                highestMovie:[],
                forwardMovie:[],
                likesMovie:[]
            }
        },
        components: {
            MyMovie,
            MyRanking
        },
        created() {
            this.$api.getBanner().then(res => {
                this.imgUrl = res.data[0].imgUrl;
            });

            this.$api.getMovieList({
                limit: 25
            }).then(res => {
                this.hostMovie = res.data.slice(0, 8);
                this.futureMovie = res.data.slice(8,16);
                this.highestMovie = res.data.slice(0,5);
                this.forwardMovie = res.data.slice(5,15);
                this.likesMovie = res.data.slice(15);
            })
        },
    }
</script>

<style lang="scss">
    @import "@/assets/scss/index/index.scss";
</style>