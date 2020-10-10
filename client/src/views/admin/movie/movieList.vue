<template>
    <div class="movie-list">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ name: 'adminIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>电影列表</el-breadcrumb-item>
        </el-breadcrumb>

        <dir class="movie-content">
            <el-card shadow="hover" :class="'data-item'">
                <div class="search">
                    <el-input @change="handleChange" placeholder="请输入电影ID" v-model="searchMovieId">
                        <el-button @click="handleMovieId" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-input @change="handleChange" placeholder="请输入电影名称" v-model="searchName">
                        <el-button @click="handleSearchName" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-input @change="handleChange" placeholder="请输入电影类型" v-model="searchMovieType">
                        <el-button @click="handleSearchMovieType" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-input @change="handleChange" placeholder="请输入语言地区" v-model="searchRegion">
                        <el-button @click="handleSearchRegion" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>

                <el-table v-loading="loading" :data="movieDataList" stripe style="width: 100%">
                    <el-table-column prop="id" label="电影ID">
                    </el-table-column>
                    <el-table-column prop="name" label="电影名称">
                    </el-table-column>
                    <el-table-column prop="type" label="电影类型">
                    </el-table-column>
                    <el-table-column prop="duration" label="影片时长">
                    </el-table-column>
                    <el-table-column prop="region" label="语言地区">
                    </el-table-column>
                    <el-table-column prop="publishDate" label="上映时间">
                    </el-table-column>
                    <el-table-column prop="score" label="影片评分">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit( scope.row)">编辑</el-button>
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

        <el-dialog title="电影信息修改" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="影片名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="影片类型" :label-width="formLabelWidth">
                    <el-input v-model="form.type" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="影片时长" :label-width="formLabelWidth">
                    <el-input v-model="form.duration" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="上映时间" :label-width="formLabelWidth">
                    <el-input v-model="form.publishDate" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="上映地区" :label-width="formLabelWidth">
                    <el-input v-model="form.region" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="影片评分" :label-width="formLabelWidth">
                    <el-input v-model="form.score" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="累计票房" :label-width="formLabelWidth">
                    <el-input v-model="form.income" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="影片简介" :label-width="formLabelWidth">
                    <el-input v-model="form.introduce" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="图片链接" :label-width="formLabelWidth">
                    <el-input v-model="form.imgUrl" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleEditUser">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import moment from 'moment'
    import loginVue from '../login.vue'
    export default {
        data() {
            return {
                nowPage: 1,
                limit: 15,
                total: 0,
                movieData: [],
                loading: true,
                searchMovieId: '',
                searchMovieType: '',
                searchName: '',
                searchRegion: '',
                dialogFormVisible: false,
                formLabelWidth: '120px',
                form: {
                    id:'',
                    name: '',
                    type: '',
                    duration: '',
                    publishDate: '',
                    region: '',
                    score: '',
                    income: '',
                    introduce: '',
                    imgUrl: ''
                },
            }
        },
        computed: {
            movieDataList() {
                try {
                    return this.movieData.slice(0).map(item => {
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
                if (this.searchMovieId === '' && this.searchName === '' && this.searchRegion === '' && this.searchMovieType === '') {
                    this.getData();
                    return
                }
            },
            async handleEditUser() {
                if (this.form.name === '' || this.form.type === '' || this.form.duration === '' || this.form.publishDate === '' || this.form.imgUrl === '' || this.form.region === '' || this.form.score === '' || this.form.income === '' || this.form.introduce === '') {
                    this.warning();
                    return;
                }
                this.$api.updateMovie(this.form.id, {
                    name: this.form.name,
                    type: this.form.type,
                    duration: this.form.duration,
                    publishDate: this.form.publishDate,
                    region: this.form.region,
                    imgUrl: this.form.imgUrl,
                    score: this.form.score,
                    income: this.form.income,
                    introduce: this.form.introduce,
                }).then(res => {
                    if (res) {
                        this.dialogFormVisible = false;
                        this.success('修改成功');
                        this.getData();
                    }
                })
            },
            handleEdit(row) {
                this.form.id = row.id;
                this.form.name = row.name;
                this.form.type = row.type;
                this.form.duration = row.duration;
                this.form.publishDate = row.publishDate;
                this.form.region = row.region;
                this.form.imgUrl = row.imgUrl;
                this.form.score = row.score;
                this.form.income = row.income;
                this.form.introduce = row.introduce;
                this.dialogFormVisible = true;
            },
            handleDelete(row) {
                this.$confirm('此操作将删除该管理员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.deleteMovie(row.id).then(res => {
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
                this.$api.getMovieList({
                    limit: this.limit,
                    page: this.nowPage,
                    ...options
                }).then(res => {
                    this.total = res.count;
                    this.movieData = res.data;
                    this.loading = false;
                })
            },
            handleSizeChange(page) {
                this.nowPage = page;
            },
            handleCurrentChange(page) {
                this.nowPage = page;
            },
            handleMovieId() {
                if (this.searchMovieId === '') {
                    this.getData();
                    return
                }
                this.loading = true;
                this.$api.getMovieFindById(this.searchMovieId).then(res => {
                    if (res) {
                        this.total = 1;
                        this.movieData = [res];
                        this.loading = false;
                    } else {
                        this.loading = false;
                        this.error()
                    }
                })
            },
            handleSearchMovieType() {
                if (this.searchMovieType === '') {
                    this.getData();
                    return
                }
                this.getData({
                    type: this.searchMovieType
                })
            },
            handleSearchName() {
                if (this.searchName === '') {
                    this.getData();
                    return
                }
                this.getData({
                    name: this.searchName
                })
            },
            handleSearchRegion() {
                if (this.searchRegion === '') {
                    this.getData();
                    return
                }
                this.getData({
                    region: this.searchRegion
                })
            }
        },
        watch: {
            nowPage() {
                const options = {}
                if (this.searchName !== '') {
                    options.name = this.searchName;
                }
                if (this.searchMovieType !== '') {
                    options.type = this.searchMovieType;
                }
                if (this.searchRegion !== '') {
                    options.region = this.searchRegion;
                }

                this.getData(options);
            },
        },
    }
</script>

<style lang="scss">
    @import '../../../assets/scss/admin/movie/movieList.scss';
</style>