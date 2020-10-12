<template>
    <div class="comment-list">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ name: 'adminIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>评论列表</el-breadcrumb-item>
        </el-breadcrumb>

        <dir class="comment-content">
            <el-card shadow="hover" :class="'data-item'">
                <div class="search">
                    <el-input @change="handleChange" placeholder="请输入电影ID" v-model="searchCommentId">
                        <el-button @click="handleCommentId" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-input @change="handleChange" placeholder="请输入电影名称" v-model="searchMovieName">
                        <el-button @click="handleSearchMovieName" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-input @change="handleChange" placeholder="请输入用户名称" v-model="searchUserName">
                        <el-button @click="handleSearchUserName" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>

                <el-table v-loading="loading" :data="commentDataList" stripe style="width: 100%">
                    <el-table-column type="index" label="索引">
                    </el-table-column>
                    <el-table-column prop="createdAt" label="创建时间">
                    </el-table-column>
                    <el-table-column prop="id" label="评论ID">
                    </el-table-column>
                    <el-table-column prop="Movie.name" label="电影名称">
                    </el-table-column>
                    <el-table-column prop="User.name" label="用户名称">
                    </el-table-column>
                    <el-table-column prop="content" label="内容">
                    </el-table-column>
                    <el-table-column prop="score" label="评分">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit( scope.row)">查看</el-button>
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

        <el-dialog title="评论信息查看" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="电影名称" :label-width="formLabelWidth">
                    <el-input disabled v-model="form.MovieName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item disabled label="发布用户" :label-width="formLabelWidth">
                    <el-input disabled v-model="form.UserName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="发布内容" :label-width="formLabelWidth">
                    <el-input type="textarea" :rows="4" disabled v-model="form.content" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="影片评分" :label-width="formLabelWidth">
                    <el-input disabled v-model="form.score" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="累计喜欢" :label-width="formLabelWidth">
                    <el-input disabled v-model="form.likes" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="发布时间" :label-width="formLabelWidth">
                    <el-input disabled v-model="form.publishDate" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">关 闭</el-button>
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
                commentData: [],
                loading: true,
                searchCommentId: '',
                searchMovieName: '',
                searchUserName: '',
                dialogFormVisible: false,
                formLabelWidth: '120px',
                form: {
                    id: '',
                    MovieName: '',
                    UserName: '',
                    content: '',
                    publishDate: '',
                    score: '',
                    likes: ''
                },
            }
        },
        computed: {
            commentDataList() {
                try {
                    return this.commentData.slice(0).map(item => {
                        item.createdAt = moment(item.createdAt).local().format('YYYY-MM-DD HH:mm:ss');
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
            handleChange() {
                if (this.searchCommentId === '' && this.searchUserName === '' && this.searchMovieName === '') {
                    this.getData();
                    return
                }
            },
            handleEdit(row) {
                this.form.id = row.id;
                this.form.MovieName = row.Movie.name
                this.form.UserName = row.User.name;
                this.form.content = row.content;
                this.form.publishDate = row.publishDate;
                this.form.score = row.score;
                this.form.likes = row.likes;
                this.dialogFormVisible = true;

            },
            handleDelete(row) {
                this.$confirm('此操作将删除该管理员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.deleteComment(row.id,'admin').then(res => {
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
                this.$api.getCommentList({
                    limit: this.limit,
                    page: this.nowPage,
                    ...options
                },'admin').then(res => {
                    this.total = res.count;
                    this.commentData = res.data;
                    this.loading = false;
                })
            },
            handleSizeChange(page) {
                this.nowPage = page;
            },
            handleCurrentChange(page) {
                this.nowPage = page;
            },
            handleCommentId() {
                if (this.searchCommentId === '') {
                    this.getData();
                    return
                }
                this.loading = true;
                this.$api.getCommentFindById(this.searchCommentId,'admin').then(res => {

                    if (res) {
                        this.total = 1;
                        this.commentData = [res];
                        this.loading = false;
                    } else {
                        this.loading = false;
                        this.error()
                    }
                })
            },
            async handleSearchMovieName() {
                if (this.searchMovieName === '') {
                    this.getData();
                    return
                }

                const result = await this.$api.getMovieList({
                    name: this.searchMovieName
                },'admin')

                if (result.count === 0) {
                    this.error();
                    return;
                }

                this.getData({
                    movieid: result.data[0].id
                })
            },
            async handleSearchUserName() {
                if (this.searchUserName === '') {
                    this.getData();
                    return
                }

                const result = await this.$api.getUserList({
                    name: this.searchUserName,
                },'admin')

                if (result.count === 0) {
                    this.error();
                    return;
                }

                this.getData({
                    userid: result.data[0].id
                })
            }
        },
        watch: {
            nowPage() {
                const options = {}
                if (this.searchUserName !== '') {
                    options.name = this.searchUserName;
                }
                if (this.searchMovieName !== '') {
                    options.type = this.searchMovieName;
                }

                this.getData(options);
            },
        },
    }
</script>

<style lang="scss">
    @import '../../../assets/scss/admin/Comment/CommentList.scss';
</style>