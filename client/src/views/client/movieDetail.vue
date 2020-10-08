<template>
    <div class="movie-detail">
        <my-detail :detailData="movieData" type="movie" />

        <div class="util-wrapper nav">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/movie' }">电影</el-breadcrumb-item>
                <el-breadcrumb-item>{{ movieData.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container util-wrapper">
            <div class="left-content">
                <my-comment :movieId="movieId" />
            </div>
            <div class="right-content">
                <div class="title">
                    相关电影
                </div>

                <div class="content">
                    <my-movie type="related" :movieList="movieListData"></my-movie>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MyDetail from '@/components/client/detail/detail'
    import MyComment from '@/components/client/comment/comment'
    import MyMovie from '@/components/client/movie/movie'
    export default {
        data() {
            return {
                movieId: this.$route.params.id,
                movieData: {},
                movieListData: []
            }
        },
        components: {
            MyDetail,
            MyComment,
            MyMovie
        },
        created() {
            this.movieId = this.$route.params.id;
        },
        methods: {
            changData() {
                this.$api.getMovieFindById(this.$route.params.id).then(res => {
                    this.movieData = res;
                });

                this.$api.getMovieList({
                    limit: 15
                }).then(res => {
                    this.movieListData = res.data;
                })
                this.movieId = this.$route.params.id;
            }
        },
        mounted() {
            this.changData();
        },
        watch: {
            $route() {
                this.changData();
            }
        },
    }
</script>

<style lang="scss">
    @import '@/assets/scss/client/movie/movieDetail.scss'
</style>