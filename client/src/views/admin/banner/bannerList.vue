<template>
    <div class="banner-list">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ name: 'adminIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>广告列表</el-breadcrumb-item>
        </el-breadcrumb>

        <dir class="banner-content">
            <el-card shadow="hover" :class="'data-item'">
                <div class="search">
                    <el-input @change="handleChange" placeholder="请输入广告ID" v-model="searchBannerId">
                        <el-button @click="handleBannerId" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-input @change="handleChange" placeholder="请输入标题" v-model="searchTitle">
                        <el-button @click="handleSearchTitle" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>

                <el-table v-loading="loading" :data="bannerDataList" stripe style="width: 100%">
                    <el-table-column type="index" label="索引">
                    </el-table-column>
                    <el-table-column prop="createdAt" label="创建时间">
                    </el-table-column>
                    <el-table-column prop="id" label="广告ID">
                    </el-table-column>
                    <el-table-column prop="title" label="标题">
                    </el-table-column>
                    <el-table-column prop="imgUrl" label="图片链接">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit( scope.row)">修改</el-button>
                            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <template v-if="total > limit">
                    <el-pagination :current-page="nowPage" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="limit" background layout="prev, pager, next" :total="total">
                    </el-pagination>
                </template>
            </el-card>
        </dir>

        <el-dialog title="Banner信息修改" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="标题" :label-width="formLabelWidth">
                    <el-input v-model="form.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item disabled label="链接" :label-width="formLabelWidth">
                    <el-input v-model="form.imgUrl" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">关 闭</el-button>
                <el-button type="primary" @click="handleEditBanner">确 定</el-button>
            </div>
        </el-dialog>
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
                bannerData: [],
                loading: true,
                searchBannerId: '',
                searchTitle: '',
                dialogFormVisible: false,
                formLabelWidth: '120px',
                form: {
                    id: '',
                    title: '',
                    imgUrl: '',
                },
            }
        },
        computed: {
            bannerDataList() {
                try {
                    return this.bannerData.slice(0).map(item => {
                        item.createdAt = moment(item.createdAt).local().format('YYYY-MM-DD HH:mm:ss');
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
            handleChange() {
                if (this.searchBannerId === '' && this.searchTitle === '') {
                    this.getData();
                    return
                }
            },
            handleEdit(row) {
                this.form.id = row.id;
                this.form.title = row.title
                this.form.imgUrl = row.imgUrl
                this.dialogFormVisible = true;

            },
            handleEditBanner(){
                if(this.form.title =='' || this.form.imgUrl == ''){
                    this.warning();
                    return;
                }

                this.$api.updateBanner(this.form.id, {
                    title: this.form.title,
                    imgUrl: this.form.imgUrl,
                }).then(res => {
                    if (res) {
                        this.dialogFormVisible = false;
                        this.success('修改成功');
                        this.getData();
                    }
                })
            },
            handleDelete(row) {
                this.$confirm('此操作将删除该管理员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.deleteBanner(row.id).then(res => {
                        if (res) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!',
                            });
                            this.getData();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            warning() {
                this.$notify({
                    title: '警告',
                    message: '信息填写不完整！',
                    type: 'warning'
                });
            },
            success(type) {
                this.$notify({
                    title: type,
                    message: type + "!",
                    type: 'success'
                });
            },
            error() {
                this.$notify.error({
                    title: '失败',
                    message: '未查询到数据！'
                });
            },
            getData(options = {}) {
                this.loading = true;
                this.$api.getBannerList({
                    limit: this.limit,
                    page: this.nowPage,
                    ...options
                }).then(res => {
                    this.total = res.count;
                    this.bannerData = res.data;
                    this.loading = false;
                })
            },
            handleSizeChange(page) {
                this.nowPage = page;
            },
            handleCurrentChange(page) {
                this.nowPage = page;
            },
            handleBannerId() {
                if (this.searchBannerId === '') {
                    this.getData();
                    return
                }
                this.loading = true;
                this.$api.getBannerFindById(this.searchBannerId).then(res => {

                    if (res) {
                        this.total = 1;
                        this.bannerData = [res];
                        this.loading = false;
                    } else {
                        this.loading = false;
                        this.error()
                    }
                })
            },
            async handleSearchTitle() {
                if (this.searchTitle === '') {
                    this.getData();
                    return
                }
                this.getData({
                    title: this.searchTitle
                })
            },
        },
        watch: {
            nowPage() {
                const options = {}
                if (this.searchTitle !== '') {
                    options.title = this.searchTitle;
                }

                this.getData(options);
            },
        },
    }
</script>

<style lang="scss">
    @import '../../../assets/scss/admin/banner/bannerList.scss';
</style>