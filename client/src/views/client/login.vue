<template>
    <div class="page-login util-wrapper">
        <div class="content">
            <p class="logo">
            </p>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item class="first" label="用户名 :" prop="LoginId">
                    <el-input type="text" v-model="ruleForm.LoginId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密　码 :" prop="LoginPwd">
                    <el-input type="password" v-model="ruleForm.LoginPwd" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登　录</el-button>
                </el-form-item>
                <el-form-item class="btn">
                    <el-button @click="resetForm('ruleForm')">注　册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import loginVue from '../admin/login.vue';
    export default {
        data() {
            const validateLoginId = (rule, value, callback) => {
                const uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else if (!uPattern.test(value)) {
                    callback(new Error('请输入用户名格式为4到16位（字母，数字，下划线）'));
                } else {
                    callback();
                }
            };
            const validateLoginPwd = (rule, value, callback) => {
                const pPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,16}$/;
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (!pPattern.test(value)) {
                    callback(new Error('密码必须为8-16位的字母数字或下划线组成'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    LoginId: '',
                    LoginPwd: '',
                },
                rules: {
                    LoginId: [
                        { validator: validateLoginId, trigger: 'blur' }
                    ],
                    LoginPwd: [
                        { validator: validateLoginPwd, trigger: 'blur' }
                    ],
                }
            }
        },
        created() {
            setTimeout(() => {
                if (this.$store.state.loginUser.name !== undefined) {
                    this.$router.push({ name: 'index' })
                }
            }, 1000)
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$api.userLogin(this.ruleForm.LoginId, this.ruleForm.LoginPwd).then(res => {
                            if (!res) {
                                this.error();
                            } else {
                                this.success(res.name);
                                this.$store.dispatch('changeUser', res);
                                this.$router.push({ name: 'index' });
                            }
                        })
                        return true
                    }
                    this.warning();

                    return false;

                });
            },
            resetForm() {
                this.$router.push({ name: 'register' });
            },
            success(userName) {
                this.$notify({
                    title: '登录成功',
                    message: `登录成功，欢迎 "${userName}" 回家！`,
                    type: 'success'
                });
            },
            error() {
                this.$notify.error({
                    title: '账号或密码错误',
                    message: '请重新登录！'
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
    @import '@/assets/scss/client/login/login.scss'
</style>