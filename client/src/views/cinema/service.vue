<template>
    <div class="service-list">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ name: 'cinemaIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>服务管理</el-breadcrumb-item>
        </el-breadcrumb>

        <dir class="service-content">
            <el-card shadow="hover" :class="'data-item'">
                <div class="add-service" @click="dialogFormVisible = true">
                    添加服务
                </div>
                <el-table v-loading="loading" :data="serviceListData" stripe style="width: 100%">
                    <el-table-column prop="name" label="标题">
                    </el-table-column>
                    <el-table-column prop="content" label="内容">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit( scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </dir>
        <el-dialog title="添加影院服务" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="标题" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="内容" :label-width="formLabelWidth">
                    <el-input v-model="form.content" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">关 闭</el-button>
                <el-button type="primary" @click="handleAddService">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改影院服务" :visible.sync="dialogFormEditVisible">
            <el-form :model="form2">
                <el-form-item label="标题" :label-width="formLabelWidth">
                    <el-input v-model="form2.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="内容" :label-width="formLabelWidth">
                    <el-input v-model="form2.content" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormEditVisible = false">关 闭</el-button>
                <el-button type="primary" @click="handleEditService">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        data() {
            return {
                serviceListData: [],
                dialogFormVisible: false,
                dialogFormEditVisible: false,
                formLabelWidth: '120px',
                loading: false,
                form: {
                    name: '',
                    content: ''
                },
                form2: {
                    id: '',
                    name: '',
                    content: ''
                },
            }
        },
        created() {
            setTimeout(() => {
                if (this.$store.state.loginCinema.name === undefined) {
                    this.$router.push({ name: 'cinemaLogin' })
                }
                this.getData();
            }, 1000);
        },
        methods: {
            handleEditService() {
                if (this.form2.name === '' || this.form2.content === '') {
                    this.warning();
                    return;
                }
                this.$api.updateCinemaService(this.form2.id, {
                    name: this.form2.name,
                    content: this.form2.content
                },'cinema').then(res => {
                    if (res) {
                        this.success("修改成功！");
                        this.getData();
                        this.dialogFormEditVisible = false;
                    } else {
                        this.error('修改');
                    }
                })
            },
            handleAddService() {
                if (this.form.name === '' || this.form.content === '') {
                    this.warning();
                    return;
                }
                this.$api.addCinemaService({
                    name: this.form.name,
                    content: this.form.content,
                    CinemaId: this.$store.state.loginCinema.id
                }, 'cinema').then(res => {
                    if (res) {
                        this.success("添加成功！")
                        this.getData();
                        this.dialogFormVisible = false;
                        this.form.name = '';
                        this.form.content = '';
                    } else {
                        this.error('添加')
                    }
                })
            },
            handleEdit(row) {
                this.dialogFormEditVisible = true;
                this.form2.name = row.name;
                this.form2.content = row.content;
                this.form2.id = row.id;
            },
            handleDelete(row) {
                this.$confirm('此操作将删除该管理员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.deleteCinemaService(row.id, 'cinema').then(res => {
                        if (res) {
                            this.success("删除成功！")
                            this.getData();
                        } else {
                            this.error('删除')
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            getData() {
                this.$api.getCinemaServiceList({
                    limit: 999999,
                    cinemaid: this.$store.state.loginCinema.id
                }, 'cinema').then(res => {
                    this.serviceListData = res.data;
                })
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
            error(type) {
                this.$notify.error({
                    title: '失败',
                    message: type + '失败！'
                });
            },
        },
    }
</script>

<style lang="scss">
    @import '@/assets/scss/cinema/service/service.scss';
</style>