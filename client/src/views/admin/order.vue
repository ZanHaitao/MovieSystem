<template>
    <div class="admin-order">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ name: 'adminIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>

        <dir class="order-content">
            <el-card shadow="hover" :class="'data-item'">
                <el-table v-loading="loading" :data="orderDataList" stripe style="width: 100%">
                    <el-table-column type="index">
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
                loading: true
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
            if (this.$store.state.loginAdmin.name === undefined) {
                this.$router.push({ name: 'adminLogin' })
            }
            this.getData();
        },
        methods: {
            getData() {
                this.loading = true;
                this.$api.getOrderList({
                    limit: this.limit,
                    page: this.nowPage
                }).then(res => {
                    this.total = res.count;
                    this.orderData = res.data;
                    this.loading = false;
                })
            },
            handleSizeChange(page) {
                this.nowPage = page;
            },
            handleCurrentChange(page) {
                this.nowPage = page;
            },
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