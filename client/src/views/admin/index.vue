<template>
    <div class="admin-index">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="data-show-content">
            <div class="data-row">
                <el-card shadow="hover" :class="'data-item'">
                    <div class="icon">
                        <i class="el-icon-user-solid"></i>
                    </div>
                    <div>
                        <p class="card-title">注册用户</p>
                        <p class="card-count">{{ userData.count }} 人</p>
                    </div>
                </el-card>
                <el-card shadow="hover" :class="'data-item'">
                    <div class="icon">
                        <i class="el-icon-s-ticket"></i>
                    </div>
                    <div>
                        <p class="card-title">运营影院</p>
                        <p class="card-count">{{ cinemaData.count }} 家</p>
                    </div>
                </el-card>
                <el-card shadow="hover" :class="'data-item'">
                    <div class="icon">
                        <i class="el-icon-video-camera-solid"></i>
                    </div>
                    <div>
                        <p class="card-title">上架电影</p>
                        <p class="card-count">{{ movieData.count }} 部</p>
                    </div>
                </el-card>
                <el-card shadow="hover" :class="'data-item'">
                    <div class="icon">
                        <i class="el-icon-s-order"></i>
                    </div>
                    <div>
                        <p class="card-title">累计订单</p>
                        <p class="card-count" v-if="priceSum === undefined">加载中</p>
                        <p class="card-count" v-else>{{ orderData.count }} 条</p>
                    </div>
                </el-card>

                <el-card shadow="hover" :class="'data-item'">
                    <div class="icon">
                        <i class="el-icon-s-finance"></i>
                    </div>
                    <div>
                        <p class="card-title">收入总计</p>
                        <p class="card-count" v-if="priceSum === undefined">加载中</p>
                        <p class="card-count" v-else>${{ priceSum }}</p>
                    </div>
                </el-card>
            </div>

            <div class="data-row">
                <el-card shadow="hover" :class="'data-list'">
                    <div>
                        <p class="title blue">最新用户</p>
                        <el-table v-loading="!userDateList" :data="userDateList" style="width: 100%">
                            <el-table-column prop="createdAt" label="日期">
                            </el-table-column>
                            <el-table-column prop="id" label="用户ID">
                            </el-table-column>
                            <el-table-column prop="loginId" label="账号ID">
                            </el-table-column>
                            <el-table-column prop="name" label="姓名">
                            </el-table-column>
                        </el-table>
                    </div>
                </el-card>
                <el-card shadow="hover" :class="'data-list'">
                    <div>
                        <p class="title green">最新订单</p>
                        <el-table v-loading="!orderDataList" :data="orderDataList" style="width: 100%">
                            <el-table-column prop="createdAt" label="日期">
                            </el-table-column>
                            <el-table-column prop="id" label="订单ID">
                            </el-table-column>
                            <el-table-column prop="Cinema.name" label="影院名">
                            </el-table-column>
                            <el-table-column prop="Movie.name" label="电影名">
                            </el-table-column>
                            <el-table-column prop="price" label="总价">
                            </el-table-column>
                            <el-table-column prop="User.name" label="用户名">
                            </el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </div>

            <div class="data-row">
                <el-card shadow="hover" :class="'data-list'">
                    <div>
                        <p class="title pink">最新影院</p>
                        <el-table v-loading="!cinemaDataList" :data="cinemaDataList" style="width: 100%">
                            <el-table-column prop="id" label="影院ID">
                            </el-table-column>
                            <el-table-column prop="name" label="影院名称">
                            </el-table-column>
                            <el-table-column prop="address" label="影院地址">
                            </el-table-column>
                            <el-table-column prop="mobile" label="联系方式">
                            </el-table-column>
                        </el-table>
                    </div>
                </el-card>
                <el-card shadow="hover" :class="'data-list'">
                    <div>
                        <p class="title">最新电影</p>
                        <el-table v-loading="!movieDataList" :data="movieDataList" style="width: 100%">
                            <el-table-column prop="id" label="电影ID">
                            </el-table-column>
                            <el-table-column prop="name" label="电影名称">
                            </el-table-column>
                            <el-table-column prop="type" label="电影类型">
                            </el-table-column>
                            <el-table-column prop="publishDate" label="上映时间">
                            </el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    export default {
        data() {
            return {
                userData: {},
                cinemaData: {},
                movieData: {},
                orderData: {}
            }
        },
        computed: {
            userDateList() {
                try {
                    const data = this.userData.data.slice(0, 5);
                    return data.map(item => {
                        item.createdAt = moment(item.createdAt).local().format('YYYY-MM-DD HH:mm:ss');
                        return item;
                    })
                } catch {}

            },
            orderDataList() {
                try {
                    const data = this.orderData.data.slice(0, 5);
                    return data.map(item => {
                        item.createdAt = moment(item.createdAt).local().format('YYYY-MM-DD HH:mm:ss');
                        item.price = (item.Session.price * item.number).toFixed(1);
                        return item;
                    })
                } catch {}
            },
            cinemaDataList() {
                try {
                    return this.cinemaData.data.slice(0, 5);
                } catch {}
            },
            movieDataList() {
                try {
                    return this.movieData.data.slice(0, 5);
                } catch {}
            },
            priceSum() {
                try {
                    let sum = 0;
                    for (let item of this.orderData.data) {
                        sum += Math.floor((item.Session.price * item.number));
                    }
                    return sum.toString().replace(/(?<=\d)(?<!\.\d*)(?=(\d{3})+(\.|$))/g, ',');
                } catch {}
            }
        },
        created() {
            setTimeout(() => {
                if (this.$store.state.loginAdmin.name === undefined) {
                    this.$router.push({ name: 'adminLogin' })
                }
            }, 1000);


            this.$api.getUserList({
                limit: 9999999
            },'admin').then(res => {
                this.userData = res;
            })

            this.$api.getCinemaList({
                limit: 9999999
            }).then(res => {
                this.cinemaData = res;
            },'admin')

            this.$api.getMovieList({
                limit: 9999999
            },'admin').then(res => {
                this.movieData = res;
            })

            this.$api.getOrderList({
                limit: 9999999
            },'admin').then(res => {
                this.orderData = res;
            })
        },
    }
</script>

<style lang="scss">
    @import '../../assets/scss/admin/index/index.scss'
</style>