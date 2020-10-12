<template>
    <div class="update-admin">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ name: 'adminIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'adminList' }">管理员列表</el-breadcrumb-item>
            <el-breadcrumb-item>添加管理员</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="update-admin-content">
            <el-card shadow="hover" :class="'data-item'">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item class="first" label="用户名 :" prop="LoginId">
                        <el-input disabled type="text" v-model="ruleForm.LoginId" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密　码 :" prop="LoginPwd">
                        <el-input type="password" v-model="ruleForm.LoginPwd" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="姓　名 :" prop="name">
                        <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item class="btn">
                        <el-button type="primary" @click="submitForm('ruleForm')">修　改</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            const validateLoginId = (rule, value, callback) => {
                const uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
                if (value === '') {
                    callback(new Error('请输入管理员登录用户名'));
                } else if (!uPattern.test(value)) {
                    callback(new Error('请输入用户名格式为4到16位（字母，数字，下划线）'));
                } else {
                    callback();
                }
            };
            const validateLoginPwd = (rule, value, callback) => {
                const pPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,16}$/;
                if (value === '') {
                    callback(new Error('请输入管理员密码'));
                } else if (!pPattern.test(value)) {
                    callback(new Error('密码必须为8-16位的字母数字或下划线组成'));
                } else {
                    callback();
                }
            };
            const validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入姓名'));
                } else if (value.length < 2) {
                    callback(new Error('姓名最低字数为2'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    LoginId: this.$store.state.loginAdmin.loginId,
                    LoginPwd: '',
                    name: this.$store.state.loginAdmin.name
                },
                rules: {
                    LoginId: [
                        { validator: validateLoginId, trigger: 'blur' }
                    ],
                    LoginPwd: [
                        { validator: validateLoginPwd, trigger: 'blur' }
                    ],
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                }
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
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$api.updateAdmin(this.$store.state.loginAdmin.id, {
                            loginPwd: this.ruleForm.LoginPwd,
                            name: this.ruleForm.name,
                        }).then(res => {
                            if (!res) {
                                this.error();
                            } else {
                                this.success();
                                this.$router.push({ name: 'adminList' });
                            }
                        })
                        return true
                    }
                    this.warning();

                    return false;

                });
            },
            success(userName, type) {
                this.$notify({
                    title: '修改成功',
                    message: `修改成功！`,
                    type: 'success'
                });
            },
            error() {
                this.$notify.error({
                    title: '修改失败',
                    message: '修改失败！'
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
    @import '../../../assets/scss/admin/admin/updateAdmin.scss';
</style>