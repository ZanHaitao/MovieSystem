<template>
    <div class="add-movie">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ name: 'adminIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'movieList' }">电影列表</el-breadcrumb-item>
            <el-breadcrumb-item>添加电影</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="add-movie-content">
            <el-card shadow="hover" :class="'data-item'">
                <el-form :model="form" label-width="100px">
                    <el-form-item label="影片名称">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="影片类型">
                        <el-input v-model="form.type" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="影片时长">
                        <el-input v-model="form.duration" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="上映时间">
                        <el-date-picker value-format="yyyy-MM-dd" v-model="form.publishDate" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="上映地区">
                        <el-input v-model="form.region" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="影片评分">
                        <el-input v-model="form.score" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="累计票房">
                        <el-input v-model="form.income" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="影片简介">
                        <el-input type="textarea" :rows="4" v-model="form.introduce" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="图片链接">
                        <el-input v-model="form.imgUrl" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item class="btn">
                        <el-button type="primary" @click="submitForm('ruleForm')">添　加</el-button>
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
                options: [],
                form: {
                    id: '',
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
        created() {
            setTimeout(() => {
                if (this.$store.state.loginAdmin.name === undefined) {
                    this.$router.push({ name: 'adminLogin' })
                }
            }, 1000);


        },
        methods: {
            submitForm() {
                if (this.form.name === '' || this.form.type === '' || this.form.duration === '' || this.form.publishDate === '' || this.form.imgUrl === '' || this.form.region === '' || this.form.score === '' || this.form.income === '' || this.form.introduce === '') {
                    this.warning();
                    return;
                }
                this.$api.addMovie({
                    name: this.form.name,
                    type: this.form.type,
                    duration: this.form.duration,
                    publishDate: this.form.publishDate,
                    region: this.form.region,
                    imgUrl: this.form.imgUrl,
                    score: this.form.score,
                    income: this.form.income,
                    introduce: this.form.introduce,
                },'admin').then(res => {
                    if (res) {
                        this.success();
                        this.$router.push({ name: 'movieList' })
                    } else {
                        this.error();
                    }
                })
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
    @import '../../../assets/scss/admin/movie/addMovie.scss';
</style>