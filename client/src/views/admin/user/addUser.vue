<template>
    <div class="add-user">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ name: 'adminIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'userList' }">用户列表</el-breadcrumb-item>
            <el-breadcrumb-item>添加用户</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="add-user-content">
            <el-card shadow="hover" :class="'data-item'">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item class="first" label="用户名 :" prop="LoginId">
                        <el-input type="text" v-model="ruleForm.LoginId" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密　码 :" prop="LoginPwd">
                        <el-input type="password" v-model="ruleForm.LoginPwd" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="姓　名 :" prop="UserName">
                        <el-input type="text" v-model="ruleForm.UserName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="性　别 :" prop="UserSex">
                        <el-radio v-model="ruleForm.UserSex" label="1">男</el-radio>
                        <el-radio v-model="ruleForm.UserSex" label="2">女</el-radio>
                    </el-form-item>
                    <el-form-item label="生　日 :" prop="Birthday">
                        <el-date-picker v-model="ruleForm.Birthday" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="电　话 :" prop="Mobile">
                        <el-input type="text" v-model="ruleForm.Mobile" autocomplete="off"></el-input>
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
            const validateUserName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入姓名'));
                } else if (value.length < 2) {
                    callback(new Error('姓名最低字数为2'));
                } else {
                    callback();
                }
            };
            const validateUserSex = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择性别'));
                } else {
                    callback();
                }
            };
            const validateBirthday = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择出生年月'));
                } else {
                    callback();
                }
            };
            const validateMobile = (rule, value, callback) => {
                const pPattern = /^1[3456789]\d{9}$/;
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else if (!pPattern.test(value)) {
                    callback(new Error('手机号格式不正确'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    LoginId: '',
                    LoginPwd: '',
                    UserSex: '1',
                    UserName: '',
                    Birthday: '',
                    Mobile: ''
                },
                rules: {
                    LoginId: [
                        { validator: validateLoginId, trigger: 'blur' }
                    ],
                    LoginPwd: [
                        { validator: validateLoginPwd, trigger: 'blur' }
                    ],
                    UserName: [
                        { validator: validateUserName, trigger: 'blur' }
                    ],
                    UserSex: [
                        { validator: validateUserSex, trigger: 'blur' }
                    ],
                    Birthday: [
                        { validator: validateBirthday, trigger: 'blur' }
                    ],
                    Mobile: [
                        { validator: validateMobile, trigger: 'blur' }
                    ]
                }
            }
        },
        created() {
            if (this.$store.state.loginAdmin.name === undefined) {
                this.$router.push({ name: 'adminLogin' })
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$api.addUser({
                            name: this.ruleForm.UserName,
                            loginId: this.ruleForm.LoginId,
                            loginPwd: this.ruleForm.LoginPwd,
                            sex: this.ruleForm.UserSex === '男' ? true : false,
                            birthday: this.ruleForm.Birthday,
                            mobile: this.ruleForm.Mobile,
                        }).then(res => {
                            if (res) {
                                this.success();
                                this.$router.push({ name: 'userList' })
                            }else{
                                this.error();
                            }
                        })
                        return true
                    }
                    this.warning();

                    return false;

                });
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
    @import '../../../assets/scss/admin/user/addUser.scss';
</style>