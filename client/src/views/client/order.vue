<template>
    <div class="page-order util-wrapper">
        <div class="title">
            我的订单
        </div>

        <div class="order-content" v-if="orderData.length !== 0">
            <ul>
                <li v-for="item in orderData" :key="item.id">
                    <div class="order-image">
                        <img :src="item.Movie.imgUrl" alt="">
                    </div>

                    <div class="order-info">
                        <p>订单号：<span>800000{{ item.id }}</span></p>
                        <p>影片名：<span>{{ item.Movie.name }}</span></p>
                        <p>影院：<span>{{ item.Cinema.name }}</span></p>
                        <p>语言版本：<span>{{ item.Session.language}}</span></p>
                        <p>场次：<span>{{ item.Session.showDate }} {{ item.Session.showTime }}</span></p>
                        <p>购买数量：<span>{{ item.number }} 张</span></p>
                        <p>总价：<span>{{ (item.number * item.Session.price).toFixed(1) }} 元</span></p>
                        <p>创建时间：<span>{{ momentDate(item.createdAt) }}</span></p>
                    </div>
                </li>
            </ul>
        </div>

        <template v-else>
            <div>
                没有查询到订单信息
            </div>
        </template>

        <template v-if="total > limit">

            <el-pagination :current-page="nowPage" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="limit" background layout="prev, pager, next" :total="total">
            </el-pagination>

        </template>
    </div>
</template>

<script>
    import moment from 'moment';
    export default {
        data() {
            return {
                orderData: [],
                total: 0,
                nowPage: 1,
                limit: 5
            }
        },
        created() {
            if (this.$store.state.loginUser.name == undefined) {
                this.$router.push({ name: 'login' })
            }
            this.getData();
        },
        methods: {
            momentDate(utc) {
                return moment(utc).local().format('YYYY-MM-DD HH:mm:ss')
            },
            handleSizeChange(page) {
                this.nowPage = page;
            },
            handleCurrentChange(page) {
                this.nowPage = page;
            },
            getData() {
                this.$api.getOrderList({
                    page: this.nowPage,
                    limit: this.limit,
                    userid: this.$store.state.loginUser.id
                }).then(res => {
                    this.total = res.count;
                    this.orderData = res.data;
                })
            }
        },
        watch: {
            nowPage() {
                this.getData();
            },
        },
    }
</script>

<style lang="scss">
    @import '@/assets/scss/client/order/order.scss'
</style>