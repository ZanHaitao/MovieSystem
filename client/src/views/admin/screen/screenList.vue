<template>
    <div class="screen-list">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ name: 'adminIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>影厅列表</el-breadcrumb-item>
        </el-breadcrumb>

        <dir class="screen-content">
            <el-card shadow="hover" :class="'data-item'">
                <div class="search">
                    <el-input @change="handleChange" placeholder="请输入影厅ID" v-model="searchScreenId">
                        <el-button @click="handleScreenId" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-input @change="handleChange" placeholder="请输入影厅名" v-model="searchName">
                        <el-button @click="handleSearchName" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>

                <el-table v-loading="loading" :data="screenDataList" stripe style="width: 100%">
                    <el-table-column type="index" label="索引">
                    </el-table-column>
                    <el-table-column prop="createdAt" label="创建时间">
                    </el-table-column>
                    <el-table-column prop="id" label="影厅ID">
                    </el-table-column>
                    <el-table-column prop="name" label="影厅名">
                    </el-table-column>
                    <el-table-column prop="seat" label="位置信息">
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

        <el-dialog title="影厅信息修改" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="影厅名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div class="seat-content">
                <div class="title-tip">
                    <span>可选座位</span>
                    <span>空白过道</span>
                </div>

                <div class="seat-container">
                    <div class="tip">
                        <ul>
                            <li v-for="(item,index) in form.seat" :key="index">
                                {{ letterList[index] }}
                            </li>
                        </ul>
                    </div>
                    <div class="right">
                        <div class="screen">
                            银幕中央
                        </div>
                        <div class="screen-content">
                            <ul>
                                <li class="row" v-for="(item,index) in form.seat" :key="index">
                                    <ul>
                                        <li @click="handleClick(item,index)" class="col" :class="{
                                            'active1':seat === 0,
                                            'active2':seat === 1,
                                            'active3':seat === 2,
                                            'active4':seat === 3
                                        }" v-for="(seat,index) in item" :key="index">
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">关 闭</el-button>
                <el-button type="primary" @click="handleEditScreen">确 定</el-button>
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
                screenData: [],
                loading: true,
                searchScreenId: '',
                searchName: '',
                dialogFormVisible: false,
                formLabelWidth: '120px',
                letterList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'],
                form: {
                    id: '',
                    name: '',
                    seat: [],
                    people: 0
                },
            }
        },
        computed: {
            screenDataList() {
                try {
                    return this.screenData.slice(0).map(item => {
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
            handleClick(item, index) {
                if (item[index] === 0) {
                    item.splice(index, 1, 3);
                    this.form.people--;
                } else {
                    item.splice(index, 1, 0);
                    this.form.people++;
                }
            },
            handleChange() {
                if (this.searchScreenId === '' && this.searchName === '') {
                    this.getData();
                    return
                }
            },
            handleEdit(row) {
                this.form.id = row.id;
                this.form.name = row.name
                this.form.people = row.people
                this.form.seat = JSON.parse(row.seat)
                this.dialogFormVisible = true;

            },
            handleEditScreen() {
                if (this.form.name == '') {
                    this.warning();
                    return;
                }

                this.$api.updateScreens(this.form.id, {
                    name: this.form.name,
                    seat: JSON.stringify(this.form.seat),
                    people: this.form.people
                },'admin').then(res => {
                    if (res) {
                        this.dialogFormVisible = false;
                        this.success('修改成功');
                        this.getData();
                    }
                })
            },
            handleDelete(row) {
                this.$confirm('此操作将删除该影厅, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.deleteScreens(row.id,'admin').then(res => {
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
                this.$api.getScreensList({
                    limit: this.limit,
                    page: this.nowPage,
                    ...options
                },'admin').then(res => {
                    this.total = res.count;
                    this.screenData = res.data;
                    this.loading = false;
                })
            },
            handleSizeChange(page) {
                this.nowPage = page;
            },
            handleCurrentChange(page) {
                this.nowPage = page;
            },
            handleScreenId() {
                if (this.searchScreenId === '') {
                    this.getData();
                    return
                }
                this.loading = true;
                this.$api.getScreensFindById(this.searchScreenId,'admin').then(res => {

                    if (res) {
                        this.total = 1;
                        this.screenData = [res];
                        this.loading = false;
                    } else {
                        this.loading = false;
                        this.error()
                    }
                })
            },
            async handleSearchName() {
                if (this.searchName === '') {
                    this.getData();
                    return
                }
                this.getData({
                    name: this.searchName
                })
            },
        },
        watch: {
            nowPage() {
                const options = {}
                if (this.searchName !== '') {
                    options.name = this.searchName;
                }

                this.getData(options);
            },
        },
    }
</script>

<style lang="scss">
    @import '../../../assets/scss/admin/screen/screenList.scss';
</style>