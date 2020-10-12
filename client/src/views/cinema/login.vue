<template>
    <div class="cinema-page-login">
        <div class="login-content">
            <div class="logo"></div>
            <div class="content">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item class="first" label="影院账号 :" prop="LoginId">
                        <el-input type="text" v-model="ruleForm.LoginId" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="影院密码 :" prop="LoginPwd">
                        <el-input type="password" v-model="ruleForm.LoginPwd" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item class="btn">
                        <el-button type="primary" @click="submitForm('ruleForm')">登　录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            const validateLoginId = (rule, value, callback) => {
                const uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
                if (value === '') {
                    callback(new Error('请输入影院账号'));
                } else if (!uPattern.test(value)) {
                    callback(new Error('请输入用户名格式为4到16位（字母，数字，下划线）'));
                } else {
                    callback();
                }
            };
            const validateLoginPwd = (rule, value, callback) => {
                const pPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,16}$/;
                if (value === '') {
                    callback(new Error('请输入影院密码'));
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
                if (this.$store.state.loginCinema.name !== undefined) {
                    this.$router.push({ name: 'cinemaIndex' });
                    this.success(this.$store.state.loginCinema.name);
                }
            }, 1000)

        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$api.cinemaLogin(this.ruleForm.LoginId, this.ruleForm.LoginPwd).then(res => {
                            if (!res) {
                                this.error();
                            } else {
                                this.success(res.name);
                                this.$store.dispatch('changeCinema', res);
                                this.$router.push({ name: 'cinemaIndex' });
                            }
                        })
                        return true
                    }
                    this.warning();

                    return false;

                });
            },
            success(userName) {
                this.$notify({
                    title: '登录成功',
                    message: `登录成功，欢迎 "${userName}"！`,
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
    @import '@/assets/scss/cinema/login/login.scss';
</style>