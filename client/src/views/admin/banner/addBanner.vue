<template>
    <div class="add-banner">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ name: 'adminIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'bannerList' }">广告列表</el-breadcrumb-item>
            <el-breadcrumb-item>添加广告</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="add-banner-content">
            <el-card shadow="hover" :class="'data-item'">
                <el-form :model="form" label-width="100px">
                    <el-form-item label="标题">
                        <el-input v-model="form.title" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="链接">
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
                    title: '',
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
                if (this.form.title === '' || this.form.imgUrl === '') {
                    this.warning();
                    return;
                }
                this.$api.addBanner({
                    title: this.form.title,
                    imgUrl: this.form.imgUrl,
                }).then(res => {
                    if (res) {
                        this.success();
                        this.$router.push({ name: 'bannerList' })
                    } else {
                        this.error();
                    }
                },'admin')
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
    @import '../../../assets/scss/admin/banner/addBanner.scss';
</style>