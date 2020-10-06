<template>
    <div class="header util-wrapper">
        <div class="logo">
            <router-link to="/" tag="a"></router-link>
        </div>
        <div class="city">
            {{cityName}}市
            <i class="el-icon-caret-bottom"></i>
            <my-city :selectCity="cityName" :cityList="cityList"></my-city>
        </div>
        <div class="nav">
            <ul>
                <router-link tag="li" to="/index">首页</router-link>
                <router-link tag="li" to="/movie">电影</router-link>
                <router-link tag="li" to="/cinema">影院</router-link>
                <router-link tag="li" to="/ranking">榜单</router-link>
            </ul>
        </div>
        <div class="search">
            <el-select v-model="value" @change="searchMovie" filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading">
                <el-option v-for="item in options" :key="item" :label="item" :value="item">
                </el-option>
            </el-select>
        </div>
        <div class="login">
            <span class="portrait"></span>
            <i class="el-icon-caret-bottom"></i>
            <div class="login-btn">
                <router-link to="/login">登录</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import MyCity from './city';
    export default {
        data() {
            return {
                cityList: [],
                showIcon: 'down',
                options: [],
                value: [],
                list: [],
                loading: false,
                cityName: ''
            }
        },
        components: {
            MyCity,
        },
        methods: {
            searchMovie(val) {
                this.$api.getMovieList({
                    name: val
                }).then(res => {
                    this.$router.push({ name: 'movieDetail', params: { id: res.data[0].id } })
                })
            },
            remoteMethod(query) {
                this.loading = true;
                if (query !== '') {
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        this.$api.getMovieList({
                            name: query
                        }).then(res => {
                            if (res.data) {
                                this.options = res.data.map(item => {
                                    return item.name
                                });
                            }
                        })
                    }, 200);
                } else {
                    this.options = [];
                }
            },
        },
        computed: {
            CityId() {
                return this.$store.state.CityId;
            }
        },
        created() {
            this.$api.getCityList({
                limit: 500
            }).then(res => {
                this.cityList = res.data;
            })

            this.$api.getCityFindById(this.$store.state.CityId).then(res => {
                this.cityName = res.city;
            })
        },
        watch: {
            CityId() {
                this.$api.getCityFindById(this.$store.state.CityId).then(res => {
                    this.cityName = res.city;
                })
            }
        },
    }
</script>

<style lang="scss" scope>
    @import '../../assets/scss/header/header.scss';

    .router-link-exact-active.router-link-active {
        background-color: #EF4238;
        color: #fff;
    }
</style>