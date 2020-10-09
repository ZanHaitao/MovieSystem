<template>
    <div class="admin-list">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ name: 'adminIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
        </el-breadcrumb>

        <dir class="admin-content">
            <el-card shadow="hover" :class="'data-item'">
                <div class="search">
                    <el-input @change="handleChange" placeholder="请输入管理员ID" v-model="searchAdminId">
                        <el-button @click="handleAdminId" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-input @change="handleChange" placeholder="请输入管理员账号ID" v-model="searchLoginId">
                        <el-button @click="handleSearchLoginId" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-input @change="handleChange" placeholder="请输入管理员姓名" v-model="searchName">
                        <el-button @click="handleSearchName" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>

                <el-table v-loading="loading" :data="adminDataList" stripe style="width: 100%">
                    <el-table-column type="index" label="索引">
                    </el-table-column>
                    <el-table-column prop="createdAt" label="创建时间">
                    </el-table-column>
                    <el-table-column prop="id" label="管理员ID">
                    </el-table-column>
                    <el-table-column prop="loginId" label="管理员账号">
                    </el-table-column>
                    <el-table-column prop="name" label="管理员姓名">
                    </el-table-column>
                    <el-table-column prop="type" label="管理员类别">
                    </el-table-column>
                    <el-table-column label="操作" v-if="$store.state.loginAdmin.type === '超级管理员'">
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

        <el-dialog title="管理员信息修改" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="登录账号" :label-width="formLabelWidth">
                    <el-input v-model="form.loginId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleEditAdmin">确 定</el-button>
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
                adminData: [],
                loading: true,
                searchAdminId: '',
                searchLoginId: '',
                searchName: '',
                dialogFormVisible: false,
                formLabelWidth: '120px',
                form: {
                    id: '',
                    name: '',
                    loginId: '',
                },
            }
        },
        computed: {
            adminDataList() {
                try {
                    return this.adminData.slice(0).map(item => {
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
            handleChange(){
                if (this.searchAdminId === '' && this.searchLoginId === '' && this.searchName === '') {
                    this.getData();
                    return
                }
            },
            handleEditAdmin() {
                if (this.form.name === '' || this.form.loginId === '') {
                    this.warning();
                    return;
                }
                this.$api.updateAdmin(this.form.id, {
                    loginId: this.form.loginId,
                    name: this.form.name
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
                this.form.loginId = row.loginId;
                this.dialogFormVisible = true;
            },
            handleDelete(row) {
                this.$confirm('此操作将删除该管理员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.deleteAdmin(row.id).then(res => {
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
            getData(options = {}) {
                this.loading = true;
                this.$api.getAdminList({
                    limit: this.limit,
                    page: this.nowPage,
                    type: '管理员',
                    ...options
                }).then(res => {
                    this.total = res.count;
                    this.adminData = res.data;
                    this.loading = false;
                })
            },
            handleSizeChange(page) {
                this.nowPage = page;
            },
            handleCurrentChange(page) {
                this.nowPage = page;
            },
            handleAdminId() {
                if (this.searchAdminId === '') {
                    this.getData();
                    return
                }
                this.loading = true;
                this.$api.getAdminFindById(this.searchAdminId).then(res => {
                    if (res) {
                        this.total = 1;
                        this.adminData = [res];
                        this.loading = false;
                    }
                })
            },
            handleSearchLoginId() {
                if (this.searchLoginId === '') {
                    this.getData();
                    return
                }
                this.getData({
                    loginid: this.searchLoginId
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
    @import '../../../assets/scss/admin/admin/adminList.scss';
</style>