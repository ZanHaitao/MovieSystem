<template>
    <div class="cinema-detail">
        <my-detail :detailData="cinemaData" type="cinema" />

        <div class="util-wrapper nav">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/cinema' }">影院</el-breadcrumb-item>
                <el-breadcrumb-item>{{ cinemaData.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="content util-wrapper">
            <div class="left-content">
                <div class="title">
                    影片列表
                </div>
                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item v-for="value in movieListData.data" :key="value.id" :title="value.name" :name="value.id">
                        <el-table :data="value.session" stripe style="width: 100%" @row-click="clickHandle">
                            <el-table-column prop="showDate" label="放映日期">
                            </el-table-column>
                            <el-table-column prop="showTime" label="放映时间">
                            </el-table-column>
                            <el-table-column prop="language" label="语言版本">
                            </el-table-column>
                            <el-table-column prop="screen" label="放映厅">
                            </el-table-column>
                            <el-table-column prop="price" label="售价">
                            </el-table-column>
                            <el-table-column prop="id" label="选座购票">
                                <span class="buy-btn">选座购票</span>
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                </el-collapse>
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
    import MyDetail from '../components/detail/detail';
    import MyMovie from '../components/movie/movie'

    export default {
        data() {
            return {
                cinemaId: this.$route.params.id,
                cinemaData: {},
                movieListData: {},
                activeName: '1',
                movieListData: []
            }
        },
        components: {
            MyDetail,
            MyMovie
        },
        mounted() {
            this.getData();
        },
        methods: {
            clickHandle(row) {
                if (this.$store.state.loginUser.name != undefined) {
                    localStorage.setItem('payment',JSON.stringify(row))
                    this.$router.push({ name: 'payment' })
                }else{
                    this.$router.push({ name: 'login'});
                    this.warning();
                }
            },
            warning() {
                this.$notify({
                    title: '警告',
                    message: '登录后才可以选座购票！',
                    type: 'warning'
                });
            },
            getData() {
                this.$api.getMovieList({
                    limit: 15
                }).then(res => {
                    this.movieListData = res.data;
                })

                this.$api.getCinemaFindById(this.cinemaId).then(res => {
                    this.cinemaData = res;
                })

                this.$api.getCinemaServiceList({
                    cinemaid: this.cinemaId
                }).then(res => {
                    this.$set(this.cinemaData, 'server', res.data);
                })

                this.$api.getSessionList({
                    cinemaid: this.cinemaId,
                    limit: 999
                }).then(res => {
                    const movieObj = {}

                    for (let i = 0; i < res.data.length; i++) {
                        const item = res.data[i];
                        if (!movieObj[item.Movie.name]) {
                            movieObj[item.Movie.name] = item.Movie
                        }
                    }

                    for (let key in movieObj) {
                        const item = movieObj[key]
                        this.$api.getSessionList({
                            cinemaid: this.cinemaId,
                            movieid: item.id
                        }).then(res => {
                            movieObj[key].session = res.data;
                            movieObj[key].session = movieObj[key].session.map((item, index) => {
                                item.screen = res.data[index].Screen.name;
                                return item;
                            })

                        })
                    }

                    this.$set(this.movieListData, 'data', movieObj);
                })
            }
        },
    }
</script>

<style lang="scss">
    @import '../assets/scss/cinema/cinemaDetail.scss'
</style>