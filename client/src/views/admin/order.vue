<template>
    <div class="admin-order">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ name: 'adminIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>

        <dir class="order-content">
            <el-card shadow="hover" :class="'data-item'">
                <div class="search">
                    <el-input @change="handleChange" placeholder="请输入订单ID" v-model="searchOrderId">
                        <el-button @click="handleSearchOrderId" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-input @change="handleChange" placeholder="请输入用户ID" v-model="searchUserId">
                        <el-button @click="handleSearchUserId" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-input @change="handleChange" placeholder="请输入影院ID" v-model="searchCinemaId">
                        <el-button @click="handleSearchCinemaId" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-input @change="handleChange" placeholder="请输入电影ID" v-model="searchMovieId">
                        <el-button @click="handleSearchMovieId" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>

                <el-table v-loading="loading" :data="orderDataList" stripe style="width: 100%">
                    <el-table-column type="index" label="索引">
                    </el-table-column>
                    <el-table-column prop="createdAt" label="创建时间">
                    </el-table-column>
                    <el-table-column prop="id" label="订单ID">
                    </el-table-column>
                    <el-table-column prop="Movie.name" label="电影名称">
                    </el-table-column>
                    <el-table-column prop="Session.language" label="语言版本">
                    </el-table-column>
                    <el-table-column prop="Cinema.name" label="影院名称">
                    </el-table-column>
                    <el-table-column prop="User.name" label="购买用户">
                    </el-table-column>
                    <el-table-column prop="number" label="购买数量">
                    </el-table-column>
                    <el-table-column prop="price" label="订单金额">
                    </el-table-column>
                </el-table>
                <template v-if="total > limit">
                    <el-pagination :current-page="nowPage" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="limit" background layout="prev, pager, next" :total="total">
                    </el-pagination>
                </template>
            </el-card>
        </dir>
    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        data() {
            return {
                nowPage: 1,
                limit: 15,
                total: 0,
                orderData: [],
                loading: true,
                searchOrderId: '',
                searchUserId: '',
                searchCinemaId: '',
                searchMovieId: ''
            }
        },
        computed: {
            orderDataList() {
                try {
                    return this.orderData.slice(0).map(item => {
                        item.createdAt = moment(item.createdAt).local().format('YYYY-MM-DD HH:mm:ss');
                        item.price = (item.Session.price * item.number).toFixed(1) + "元";
                        return item;
                    })
                } catch {}
            },
        },
        created() {
            setTimeout(() => {
                if (this.$store.state.loginAdmin.name === undefined) {
                    this.$router.push({ name: 'adminLogin' })
                }

            }, 1000);
            this.getData();
        },
        methods: {
            getData(options = {}) {
                this.loading = true;
                this.$api.getOrderList({
                    limit: this.limit,
                    page: this.nowPage,
                    ...options
                },'admin').then(res => {
                    this.total = res.count;
                    this.orderData = res.data;
                    this.loading = false;
                })
            },
            handleChange() {
                if (this.searchOrderId === '' && this.searchUserId === '' && this.searchCinemaId === '' && this.searchMovieId === '') {
                    this.getData();
                    return;
                }
            },
            handleSizeChange(page) {
                this.nowPage = page;
            },
            handleCurrentChange(page) {
                this.nowPage = page;
            },
            handleSearchOrderId() {
                if (this.searchOrderId === '') {
                    this.getData();
                    return;
                }
                this.loading = true;
                this.$api.getOrderFindById(this.searchOrderId,'admin').then(res => {
                    if (res) {
                        this.total = 1;
                        this.orderData = [res];
                        this.loading = false;
                    }
                })
            },
            handleSearchUserId() {
                if (this.searchUserId === '') {
                    this.getData();
                    return;
                }
                this.getData({
                    userid: this.searchUserId
                })
            },
            handleSearchCinemaId() {
                if (this.searchCinemaId === '') {
                    this.getData();
                    return;
                }
                this.getData({
                    cinemaid: this.searchCinemaId
                })
            },
            handleSearchMovieId() {
                if (this.searchMovieId === '') {
                    this.getData();
                    return;
                }
                this.getData({
                    movieid: this.searchMovieId
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
    @import '@/assets/scss/admin/order/order.scss'
</style>