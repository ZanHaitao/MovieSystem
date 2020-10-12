<template>
    <div class="cinema-list">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ name: 'adminIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>影院列表</el-breadcrumb-item>
        </el-breadcrumb>

        <dir class="cinema-content">
            <el-card shadow="hover" :class="'data-item'">
                <div class="search">
                    <el-input @change="handleChange" placeholder="请输入影院ID" v-model="searchCinemaId">
                        <el-button @click="handleCinemaId" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-input @change="handleChange" placeholder="请输入影院账号ID" v-model="searchLoginId">
                        <el-button @click="handleSearchLoginId" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-input @change="handleChange" placeholder="请输入影院名称" v-model="searchName">
                        <el-button @click="handleSearchName" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-input @change="handleChange" placeholder="请输入城市" v-model="searchCity">
                        <el-button @click="handleSearchCity" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>

                <el-table v-loading="loading" :data="cinemaDataList" stripe style="width: 100%">
                    <el-table-column type="index" label="索引">
                    </el-table-column>
                    <el-table-column prop="createdAt" label="创建时间">
                    </el-table-column>
                    <el-table-column prop="id" label="影院ID">
                    </el-table-column>
                    <el-table-column prop="loginId" label="影院账号">
                    </el-table-column>
                    <el-table-column prop="name" label="影院名称">
                    </el-table-column>
                    <el-table-column prop="address" label="影院地址">
                    </el-table-column>
                    <el-table-column prop="City.city" label="城市">
                    </el-table-column>
                    <el-table-column prop="mobile" label="联系方式">
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

        <el-dialog title="影院信息修改" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="登录账号" :label-width="formLabelWidth">
                    <el-input disabled v-model="form.loginId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="影院名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="影院地址" :label-width="formLabelWidth">
                    <el-input v-model="form.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="选择城市" :label-width="formLabelWidth">
                    <el-cascader v-model="form.city" :options="form.options" :props="{ expandTrigger: 'hover' }"></el-cascader>
                </el-form-item>
                <el-form-item label="联系方式" :label-width="formLabelWidth">
                    <el-input v-model="form.mobile" autocomplete="off"></el-input>
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
    export default {
        data() {
            return {
                nowPage: 1,
                limit: 15,
                total: 0,
                cinemaData: [],
                loading: true,
                searchCinemaId: '',
                searchLoginId: '',
                searchName: '',
                searchCity: '',
                dialogFormVisible: false,
                formLabelWidth: '120px',
                form: {
                    id: '',
                    name: '',
                    loginId: '',
                    address: '',
                    mobile: '',
                    imgUrl: '',
                    city: '',
                    options: []
                },
            }
        },
        computed: {
            cinemaDataList() {
                try {
                    return this.cinemaData.slice(0).map(item => {
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

            this.$api.getCityList({
                limit: 500
            },'admin').then(res => {
                this.cityList = res.data;
                const options = [];
                const provinceObj = {}
                for (let i = 0; i < this.cityList.length; i++) {
                    const item = this.cityList[i];
                    if (!provinceObj[item.province]) {
                        if (item.province == '北京' || item.province == '上海' || item.province == '重庆' || item.province == '天津') {
                            if (!provinceObj['直辖市']) {
                                provinceObj['直辖市'] = {}
                                provinceObj['直辖市'].id = i;
                                provinceObj['直辖市'].province = "直辖市";
                                provinceObj['直辖市'].cityArr = [];
                            }
                            provinceObj['直辖市'].cityArr.push(item.city)
                            continue;
                        }
                        provinceObj[item.province] = {};
                        provinceObj[item.province].id = i;
                        provinceObj[item.province].province = item.province + "省";
                        provinceObj[item.province].cityArr = [];
                        provinceObj[item.province].cityArr.push(item.city)
                    } else {
                        provinceObj[item.province].cityArr.push(item.city)
                    }
                }

                for (let key in provinceObj) {
                    const arr = [];
                    for (let item of provinceObj[key].cityArr) {
                        arr.push({
                            value: item,
                            label: item,
                        })
                    }
                    options.push({
                        value: key,
                        label: key,
                        children: arr
                    })
                }

                this.form.options = options;
            })
        },
        methods: {
            handleChange() {
                if (this.searchCinemaId === '' && this.searchLoginId === '' && this.searchName === '' && this.searchCity === '') {
                    this.getData();
                    return
                }
            },
            async handleEditUser() {
                if (this.form.name === '' || this.form.loginId === '' || this.form.address === '' || this.form.mobile === '' || this.form.imgUrl === '') {
                    this.warning();
                    return;
                }

                const CityId = await this.getCityId(typeof this.form.city === 'object' ? this.form.city[1] : this.form.city)


                this.$api.updateCinema(this.form.id, {
                    loginId: this.form.loginId,
                    name: this.form.name,
                    CityId: CityId.data[0].id,
                    mobile: this.form.mobile,
                    address: this.form.address,
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
                this.form.address = row.address;
                this.form.mobile = row.mobile;
                this.form.city = row.City.city;
                this.form.imgUrl = row.imgUrl;
                this.dialogFormVisible = true;
            },
            handleDelete(row) {
                this.$confirm('此操作将删除该管理员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.deleteCinema(row.id,'admin').then(res => {
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
            getCityId(key) {
                return this.$api.getCityList({
                    key: key
                },'admin')
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
                this.$api.getCinemaList({
                    limit: this.limit,
                    page: this.nowPage,
                    ...options
                },'admin').then(res => {
                    this.total = res.count;
                    this.cinemaData = res.data;
                    this.loading = false;
                })
            },
            handleSizeChange(page) {
                this.nowPage = page;
            },
            handleCurrentChange(page) {
                this.nowPage = page;
            },
            handleCinemaId() {
                if (this.searchCinemaId === '') {
                    this.getData();
                    return
                }
                this.loading = true;
                this.$api.getCinemaFindById(this.searchCinemaId,'admin').then(res => {
                    if (res) {
                        this.total = 1;
                        this.cinemaData = [res];
                        this.loading = false;
                    } else {
                        this.loading = false;
                        this.error()
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
            async handleSearchCity() {
                if (this.searchCity === '') {
                    this.getData();
                    return
                }
                const CityId = await this.getCityId(this.searchCity);
                this.getData({
                    cityid: CityId.data[0] ? CityId.data[0].id : '9999'
                })
            }
        },
        watch: {
            async nowPage() {
                const options = {}
                if (this.searchLoginId !== '') {
                    options.loginid = this.searchLoginId;
                }
                if (this.searchName !== '') {
                    options.name = this.searchName;
                }
                if (this.searchCity !== '') {
                    const CityId = await this.getCityId(this.searchCity);
                    options.cityid = CityId.data[0] ? CityId.data[0].id : '9999';
                }
                this.getData(options);
            },
        },
    }
</script>

<style lang="scss">
    @import '../../../assets/scss/admin/cinema/cinemaList.scss';
</style>