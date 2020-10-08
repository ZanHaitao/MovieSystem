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
            <span class="portrait" :class="{'login-user':loginName != ''}"></span>
            <i class="el-icon-caret-bottom"></i>
            <div class="login-btn" :class="{ 'login': loginName != ''}">
                <template v-if="loginName != ''">
                    <a @click="goOrder" href="javascript:void(0)">我的订单</a>
                    <br>
                    <a @click="cancelLogin" href="javascript:void(0)">注销</a>
                </template>
                <template v-else>
                    <router-link :to="{ name:'login' }">登录</router-link>
                </template>
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
                cityName: '',
                loginName: this.$store.state.loginUser.name ? this.$store.state.loginUser.name : ''
            }
        },
        components: {
            MyCity,
        },
        methods: {
            cancelLogin() {
                this.$store.dispatch('changeUser', {});
                this.success()
                this.$router.push({name:'login'})
                localStorage.removeItem('userToken')
            },
            goOrder(){
                this.$router.push({name:'order'})
            },
            success(userName) {
                this.$notify({
                    title: '注销成功',
                    message: `注销成功，期待下次与您相见！`,
                    type: 'success'
                });
            },
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
            },
            UserName() {
                return this.$store.state.loginUser;
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
            },
            UserName() {
                this.loginName = this.$store.state.loginUser.name ? this.$store.state.loginUser.name : '';
            }
        },
    }
</script>

<style lang="scss" scope>
    @import '@/assets/scss/client/header/header.scss';

    .nav .router-link-exact-active.router-link-active {
        background-color: #EF4238;
        color: #fff;
    }
</style>