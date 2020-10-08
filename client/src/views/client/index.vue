<template>
    <div class="page-index util-wrapper">
        <!-- banner广告 -->
        <div class="banner">
            <img :src="imgUrl" alt="">
        </div>

        <div class="container">
            <div class="left-content">
                <template v-if="hostMovie.length !== 0">
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
                </template>

                <template v-if="futureMovie.length !== 0">
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
                </template>
            </div>

            <div class="right-content">
                <template v-if="highestMovie.length !== 0">
                    <my-ranking :title="'今日票房'" :type="'price'" :listData="highestMovie" />
                </template>
                <template v-if="forwardMovie.length !== 0">
                    <my-ranking :title="'最受期待'" :type="'forward'" :listData="forwardMovie" />
                </template>
                <template v-if="likesMovie.length !== 0">
                    <my-ranking :title="'TOP 100'" :type="'likes'" :listData="likesMovie" />
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import MyMovie from '@/components/client/movie/movie';
    import MyRanking from '@/components/client/movie/ranking';
    export default {
        data() {
            return {
                imgUrl: '',
                hostMovie: [],
                futureMovie: [],
                highestMovie: [],
                forwardMovie: [],
                likesMovie: []
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
                this.futureMovie = res.data.slice(8, 16);
                this.highestMovie = res.data.slice(0, 5);
                this.forwardMovie = res.data.slice(5, 15);
                this.likesMovie = res.data.slice(15);
            });

            this.$api.whoAmI().then(res => {
                if (res.data !== null) {
                    this.$store.dispatch('changeUser', res)
                }
            }).catch(err => {
                console.log("未获取到用户");
            })
        },
    }
</script>

<style lang="scss">
    @import "@/assets/scss/client/index/index.scss";
</style>