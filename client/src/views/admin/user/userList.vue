<template>
    <div class="user-list">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ name: 'adminIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <dir class="user-content">
            <el-card shadow="hover" :class="'data-item'">
                <div class="search">
                    <el-input @change="handleChange" placeholder="请输入用户ID" v-model="searchUserId">
                        <el-button @click="handleUserId" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-input @change="handleChange" placeholder="请输入用户账号ID" v-model="searchLoginId">
                        <el-button @click="handleSearchLoginId" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-input @change="handleChange" placeholder="请输入用户姓名" v-model="searchName">
                        <el-button @click="handleSearchName" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-input @change="handleChange" placeholder="请输入联系方式" v-model="searchMobile">
                        <el-button @click="handleSearchMobile" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>

                <el-table v-loading="loading" :data="userDataList" stripe style="width: 100%">
                    <el-table-column type="index" label="索引">
                    </el-table-column>
                    <el-table-column prop="createdAt" label="创建时间">
                    </el-table-column>
                    <el-table-column prop="id" label="用户ID">
                    </el-table-column>
                    <el-table-column prop="loginId" label="用户账号">
                    </el-table-column>
                    <el-table-column prop="name" label="用户姓名">
                    </el-table-column>
                    <el-table-column prop="sex" label="用户性别">
                    </el-table-column>
                    <el-table-column prop="mobile" label="联系方式">
                    </el-table-column>
                    <el-table-column prop="birthday" label="出生日期">
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

        <el-dialog title="用户信息修改" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="登录账号" :label-width="formLabelWidth">
                    <el-input disabled v-model="form.loginId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户姓名" :label-width="formLabelWidth">
                    <el-select v-model="form.sex" placeholder="请选择">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="联系方式" :label-width="formLabelWidth">
                    <el-input v-model="form.mobile" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="出生日期" :label-width="formLabelWidth">
                    <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期">
                    </el-date-picker>
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
    export default {
        data() {
            return {
                nowPage: 1,
                limit: 15,
                total: 0,
                userData: [],
                loading: true,
                searchUserId: '',
                searchLoginId: '',
                searchName: '',
                searchMobile: '',
                dialogFormVisible: false,
                formLabelWidth: '120px',
                form: {
                    id: '',
                    name: '',
                    loginId: '',
                    sex: '',
                    mobile: '',
                    birthday: ''
                },
            }
        },
        computed: {
            userDataList() {
                try {
                    return this.userData.slice(0).map(item => {
                        item.createdAt = moment(item.createdAt).local().format('YYYY-MM-DD HH:mm:ss');
                        item.sex = item.sex == 1 ? '男' : '女';
                        item.birthday = moment(item.birthday).local().format('YYYY-MM-DD');
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
                if (this.searchUserId === '' && this.searchLoginId === '' && this.searchName === '' && this.searchMobile === '') {
                    this.getData();
                    return
                }
            },
            handleEditUser() {
                if (this.form.name === '' || this.form.loginId === '' || this.form.sex === '' || this.form.mobile === '' || this.form.birthday === '') {
                    this.warning();
                    return;
                }
                this.$api.updateUser(this.form.id, {
                    loginId: this.form.loginId,
                    name: this.form.name,
                    sex: this.form.sex === '男' ? 1 : 0,
                    mobile: this.form.mobile,
                    birthday: this.form.birthday,
                },'admin').then(res => {
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
                this.form.sex = row.sex;
                this.form.mobile = row.mobile;
                this.form.birthday = row.birthday;
                this.dialogFormVisible = true;
            },
            handleDelete(row) {
                this.$confirm('此操作将删除该管理员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.deleteUser(row.id,'admin').then(res => {
                        console.log(res)
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
                this.$api.getUserList({
                    limit: this.limit,
                    page: this.nowPage,
                    ...options
                },'admin').then(res => {
                    this.total = res.count;
                    this.userData = res.data;
                    this.loading = false;
                })
            },
            handleSizeChange(page) {
                this.nowPage = page;
            },
            handleCurrentChange(page) {
                this.nowPage = page;
            },
            handleUserId() {
                if (this.searchUserId === '') {
                    this.getData();
                    return
                }
                this.loading = true;
                this.$api.getUserFindById(this.searchUserId,'admin').then(res => {
                    if (res) {
                        this.total = 1;
                        this.userData = [res];
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
            },
            handleSearchMobile() {
                if (this.searchMobile === '') {
                    this.getData();
                    return
                }
                this.getData({
                    mobile: this.searchMobile
                })
            }
        },
        watch: {
            nowPage() {
                const options = {}
                if(this.searchLoginId !== ''){
                    options.loginid = this.searchLoginId;
                }
                if(this.searchName !== ''){
                    options.name = this.searchName;
                }
                if(this.searchMobile !== ''){
                    options.mobile = this.searchMobile;
                }
                this.getData();
            },
        },
    }
</script>

<style lang="scss">
    @import '../../../assets/scss/admin/user/userList.scss';
</style>