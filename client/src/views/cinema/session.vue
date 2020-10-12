<template>
    <div class="session-list">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ name: 'cinemaIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>影片场次</el-breadcrumb-item>
        </el-breadcrumb>

        <dir class="session-content">
            <el-card shadow="hover" :class="'data-item'">
                <div class="add-session" @click="handleAddScreen">
                    添加场次
                </div>

                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item v-for="value in movieListData.data" :key="value.id" :title="value.name" :name="value.id">
                        <el-table :data="value.session" stripe style="width: 100%">
                            <el-table-column prop="showDate" label="放映日期">
                            </el-table-column>
                            <el-table-column prop="showTime" label="放映时间">
                            </el-table-column>
                            <el-table-column prop="language" label="语言版本">
                            </el-table-column>
                            <el-table-column prop="screen" label="放映厅">
                            </el-table-column>
                            <el-table-column prop="price" label="售价">
                            </el-table-column>
                            <el-table-column prop="id" label="操作">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="handleEdit( scope.row)">编辑</el-button>
                                    <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                </el-collapse>
            </el-card>
        </dir>
        <el-dialog title="添加修改影厅" :visible.sync="dialogFormVisible">
            <el-form :model="form1">
                <el-form-item label="场次时间" :label-width="formLabelWidth">
                    <el-date-picker format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" v-model="form1.date" type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item disabled label="语言版本" :label-width="formLabelWidth">
                    <el-input v-model="form1.language" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item disabled label="场次售价" :label-width="formLabelWidth">
                    <el-input v-model="form1.price" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item disabled label="电影名称" :label-width="formLabelWidth">
                    <el-select v-model="form1.movieName" placeholder="请选择">
                        <el-option v-for="(item,index) in movieOptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item disabled label="影厅名称" :label-width="formLabelWidth">
                    <el-select @change="handleChangeScreen" v-model="form1.screenName" placeholder="请选择">
                        <el-option v-for="(item,index) in screenOptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
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
                            <li v-for="(item,index) in seat" :key="index">
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
                                <li class="row" v-for="(item,index) in seat" :key="index">
                                    <ul>
                                        <li class="col" :class="{
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
                <el-button type="primary" @click="handleAddSession">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="添加修改影厅" :visible.sync="EditFormVisible">
            <el-form :model="form2">
                <el-form-item label="场次时间" :label-width="formLabelWidth">
                    <el-date-picker format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" v-model="form2.date" type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item disabled label="语言版本" :label-width="formLabelWidth">
                    <el-input v-model="form2.language" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item disabled label="场次售价" :label-width="formLabelWidth">
                    <el-input v-model="form2.price" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item disabled label="电影名称" :label-width="formLabelWidth">
                    <el-select v-model="form2.movieName" placeholder="请选择">
                        <el-option v-for="(item,index) in movieOptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item disabled label="影厅名称" :label-width="formLabelWidth">
                    <el-select v-model="form2.screenName" placeholder="请选择">
                        <el-option v-for="(item,index) in screenOptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
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
                            <li v-for="(item,index) in seat" :key="index">
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
                                <li class="row" v-for="(item,index) in seat" :key="index">
                                    <ul>
                                        <li class="col" :class="{
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
                <el-button @click="EditFormVisible = false">关 闭</el-button>
                <el-button type="primary" @click="handleEditSession">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        data() {
            return {
                movieListData: {},
                activeName: '1',
                dialogFormVisible: false,
                EditFormVisible: false,
                movieOptions: [],
                screenOptions: [],
                formLabelWidth: '120px',
                seat: [],
                letterList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'],
                form1: {
                    date: '',
                    price: '',
                    language: '',
                    movieName: '',
                    screenName: ''
                },
                form2: {
                    id: '',
                    date: '',
                    price: '',
                    language: '',
                    movieName: '',
                    screenName: ''
                }
            }
        },
        created() {
            setTimeout(() => {
                if (this.$store.state.loginCinema.name === undefined) {
                    this.$router.push({ name: 'cinemaLogin' })
                }
                this.getData();
            }, 1000);


            this.getScreeenData().then(res => {
                this.screenOptions = res.data.map(item => {
                    return {
                        value: item.name,
                        label: item.name
                    }
                })
            })

            this.getMovieData().then(res => {
                this.movieOptions = res.data.map(item => {
                    return {
                        value: item.name,
                        label: item.name
                    }
                });
            })

        },
        methods: {
            handleAddScreen() {
                this.dialogFormVisible = true;
            },
            async handleChangeScreen() {
                const screen = await this.getScreeenData({
                    name: this.form1.screenName
                })

                this.seat = JSON.parse(screen.data[0].seat);
            },
            async handleAddSession() {
                if (this.form1.date === '' || this.form1.language === '' || this.form1.movieName === '' || this.form1.screenName === '' || this.form1.price === '') {
                    this.warning();
                    return;
                }

                const movie = await this.getMovieData({
                    name: this.form1.movieName
                })

                const screen = await this.getScreeenData({
                    name: this.form1.screenName
                })

                const result = await this.$api.addSession({
                    showDate: this.form1.date.split(' ')[0],
                    showTime: this.form1.date.split(' ')[1],
                    language: this.form1.language,
                    price: this.form1.price,
                    CinemaId: this.$store.state.loginCinema.id,
                    MovieId: movie.data[0].id,
                    ScreenId: screen.data[0].id,
                    seat: JSON.stringify(this.seat)
                }, 'cinema')

                if (result) {
                    this.success('添加成功');
                    this.getData();
                    this.dialogFormVisible = false;
                    this.seat = [];
                    this.form1.date = '';
                    this.form1.price = '';
                    this.form1.language = '';
                    this.form1.movieName = '';
                    this.form1.screenName = '';
                } else {
                    this.error('添加');
                }
            },
            handleEdit(row) {
                this.form2.id = row.id;
                this.form2.date = row.showDate + " " + row.showTime;
                this.form2.price = row.price;
                this.form2.language = row.language;
                this.form2.movieName = row.Movie.name;
                this.form2.screenName = row.Screen.name;
                this.seat = JSON.parse(row.seat);
                this.EditFormVisible = true;
            },
            handleDelete(row) {
                this.$confirm('此操作将删除该管理员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.deleteSession(row.id, 'cinema').then(res => {
                        if (res) {
                            this.success("删除成功");
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
            async handleEditSession() {
                if (this.form2.date === '' || this.form2.language === '' || this.form2.movieName === '' || this.form2.screenName === '' || this.form2.price === '') {
                    this.warning();
                    return;
                }

                const movie = await this.getMovieData({
                    name: this.form2.movieName
                })

                const screen = await this.getScreeenData({
                    name: this.form2.screenName
                })

                const result = await this.$api.updateSession(this.form2.id, {
                    showDate: this.form2.date.split(' ')[0],
                    showTime: this.form2.date.split(' ')[1],
                    language: this.form2.language,
                    price: this.form2.price,
                    CinemaId: this.$store.state.loginCinema.id,
                    MovieId: movie.data[0].id,
                    ScreenId: screen.data[0].id,
                    seat: JSON.stringify(this.seat)
                }, 'cinema')

                if (result) {
                    this.success('修改成功');
                    this.EditFormVisible = false;
                    this.getData();
                } else {
                    this.error('修改');
                }
            },
            async getMovieData(options) {
                return await this.$api.getMovieList({
                    limit: 9999999,
                    ...options
                }, 'cinema')
            },
            async getScreeenData(options) {
                return await this.$api.getScreensList({
                    limit: 99999,
                    ...options
                }, 'cinema')
            },
            getData() {
                this.$api.getSessionList({
                    cinemaid: this.$store.state.loginCinema.id,
                    limit: 999
                }, 'cinema').then(res => {
                    const movieObj = {}

                    for (let i = 0; i < res.data.length; i++) {
                        const item = res.data[i];
                        if (!movieObj[item.Movie.name]) {
                            movieObj[item.Movie.name] = item.Movie
                        }
                    }

                    for (let key in movieObj) {
                        const item = movieObj[key]
                        this.$api.getSessionList({
                            cinemaid: this.$store.state.loginCinema.id,
                            movieid: item.id
                        }, 'cinema').then(res => {
                            movieObj[key].session = res.data;
                            movieObj[key].session = movieObj[key].session.map((item, index) => {
                                item.screen = res.data[index].Screen.name;
                                return item;
                            })

                        })
                    }

                    this.$set(this.movieListData, 'data', movieObj);
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
    @import '@/assets/scss/cinema/session/session.scss';
</style>