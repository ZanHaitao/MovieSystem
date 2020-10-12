<template>
    <div class="add-screen">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ name: 'adminIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'screenList' }">影厅列表</el-breadcrumb-item>
            <el-breadcrumb-item>添加影厅</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="add-screen-content">
            <el-card shadow="hover" :class="'data-item'">
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
                <el-form :model="form" label-width="100px">
                    <el-form-item label="生成列表">
                        <el-select v-model="list" placeholder="选择位置列表">
                            <el-option label="10*16" value="10*16"></el-option>
                            <el-option label="11*16" value="11*16"></el-option>
                            <el-option label="12*16" value="12*16"></el-option>
                            <el-option label="13*16" value="13*16"></el-option>
                            <el-option label="11*17" value="11*17"></el-option>
                            <el-option label="12*17" value="12*17"></el-option>
                            <el-option label="13*17" value="13*17"></el-option>
                            <el-option label="11*18" value="11*18"></el-option>
                            <el-option label="12*18" value="12*18"></el-option>
                            <el-option label="12*18" value="12*18"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">生成</el-button>
                    </el-form-item>
                    <el-form-item label="影厅名称">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item class="btn">
                        <el-button type="primary" @click="submitForm">添　加</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                letterList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'],
                list: '',
                form: {
                    name: '',
                    seat: [],
                    people: 0,
                },
            }
        },
        created() {
            setTimeout(() => {
                if (this.$store.state.loginAdmin.name === undefined) {
                    this.$router.push({ name: 'adminLogin' })
                }
            }, 1000);

        },
        methods: {
            submitForm() {
                if (this.form.name === '' || this.form.people === 0) {
                    this.warning();
                    return;
                }
                this.$api.addScreens({
                    name: this.form.name,
                    people: this.form.people,
                    seat: JSON.stringify(this.form.seat),
                },'admin').then(res => {
                    if (res) {
                        this.success();
                        this.$router.push({ name: 'screenList' })
                    } else {
                        this.error();
                    }
                })
            },
            onSubmit() {
                this.form.seat = [];
                this.form.people = 0;
                if (this.list === '') {
                    this.warning();
                    return;
                }
                const row = parseInt(this.list.split('*')[0]);
                const col = parseInt(this.list.split('*')[1]);
                for (let i = 0; i < row; i++) {
                    const arr = [];
                    for (let j = 0; j < col; j++) {
                        arr.push(3);
                    }
                    this.form.seat.push(arr);
                }
            },
            handleClick(item, index) {
                if (item[index] === 0) {
                    item.splice(index, 1, 3);
                    this.form.people--;
                } else {
                    item.splice(index, 1, 0);
                    this.form.people++;
                }
            },
            success() {
                this.$notify({
                    title: '添加成功',
                    message: `添加成功！`,
                    type: 'success'
                });
            },
            error() {
                this.$notify.error({
                    title: '添加失败',
                    message: '添加失败！'
                });
            },
            warning() {
                this.$notify({
                    title: '警告',
                    message: '信息填写不完整！',
                    type: 'warning'
                });
            },
        },
    }
</script>

<style lang="scss">
    @import '../../../assets/scss/admin/screen/addScreen.scss';
</style>