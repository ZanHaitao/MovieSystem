<template>
    <div class="update-cinema">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ name: 'adminIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'cinemaList' }">影院列表</el-breadcrumb-item>
            <el-breadcrumb-item>添加影院</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="update-cinema-content">
            <el-card shadow="hover" :class="'data-item'">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item class="first" label="用户名 :" prop="LoginId">
                        <el-input disabled type="text" v-model="ruleForm.LoginId" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密　码 :" prop="LoginPwd">
                        <el-input type="password" v-model="ruleForm.LoginPwd" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="影院名称 :" prop="CinemaName">
                        <el-input type="text" v-model="ruleForm.CinemaName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="选择城市 :" prop="CityName">
                        <el-cascader v-model="ruleForm.CityName" :options="options" :props="{ expandTrigger: 'hover' }"></el-cascader>
                    </el-form-item>
                    <el-form-item label="影院地址 :" prop="Address">
                        <el-input type="text" v-model="ruleForm.Address" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式 :" prop="Mobile">
                        <el-input type="text" v-model="ruleForm.Mobile" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="图片链接 :" prop="ImgUrl">
                        <el-input type="text" v-model="ruleForm.ImgUrl" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item class="btn">
                        <el-button type="primary" @click="submitForm('ruleForm')">修 改</el-button>
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
            const validateCinemaName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入影院名称'));
                } else if (value.length < 2) {
                    callback(new Error('影院名称最低字数为2'));
                } else {
                    callback();
                }
            };
            const validateCityName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择影院所在城市'));
                } else {
                    callback();
                }
            };
            const validateAddress = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入影院地址'));
                } else {
                    callback();
                }
            };
            const validateMobile = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入联系方式'));
                } else {
                    callback();
                }
            };
            const validateImgUrl = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入图片链接地址'));
                } else {
                    callback();
                }
            };
            return {
                options: [],
                ruleForm: {
                    LoginId: '',
                    LoginPwd: '',
                    CityName: '',
                    CinemaName: '',
                    Address: '',
                    Mobile: '',
                    ImgUrl: ''
                },
                rules: {
                    LoginId: [
                        { validator: validateLoginId, trigger: 'blur' }
                    ],
                    LoginPwd: [
                        { validator: validateLoginPwd, trigger: 'blur' }
                    ],
                    CinemaName: [
                        { validator: validateCinemaName, trigger: 'blur' }
                    ],
                    CityName: [
                        { validator: validateCityName, trigger: 'blur' }
                    ],
                    Address: [
                        { validator: validateAddress, trigger: 'blur' }
                    ],
                    ImgUrl: [
                        { validator: validateImgUrl, trigger: 'blur' }
                    ],
                    Mobile: [
                        { validator: validateMobile, trigger: 'blur' }
                    ]
                }
            }
        },
        created() {
            setTimeout(() => {
                if (this.$store.state.loginCinema.name === undefined) {
                    this.$router.push({ name: 'cinemaLogin' })
                }
                this.setData();
            }, 1000);


            this.$api.getCityList({
                limit: 500
            }, 'cinema').then(res => {
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

                this.options = options;

            })
        },
        methods: {
            setData() {
                this.ruleForm.LoginId = this.$store.state.loginCinema.loginId;
                this.ruleForm.CityName = this.$store.state.loginCinema.City.city;
                this.ruleForm.CinemaName = this.$store.state.loginCinema.name;
                this.ruleForm.Address = this.$store.state.loginCinema.address;
                this.ruleForm.Mobile = this.$store.state.loginCinema.mobile;
                this.ruleForm.ImgUrl = this.$store.state.loginCinema.imgUrl;
            },
            getCityId(key) {
                return this.$api.getCityList({
                    key: key
                }, 'cinema')
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.getCityId(this.ruleForm.CityName[1]).then(res => {
                            this.$api.updateCinema(this.$store.state.loginCinema.id, {
                                name: this.ruleForm.CinemaName,
                                loginPwd: this.ruleForm.LoginPwd,
                                address: this.ruleForm.Address,
                                CityId: res.data[0].id,
                                mobile: this.ruleForm.Mobile,
                                imgUrl: this.ruleForm.ImgUrl,
                            }, 'cinema').then(res => {
                                if (res) {
                                    this.$api.getCinemaFindById(this.$store.state.loginCinema.id, 'cinema').then(res => {
                                        this.$store.dispatch('changeCinema', res);
                                    })

                                    this.success();
                                    this.$router.push({ name: 'cinemaIndex' })
                                } else {
                                    this.error();
                                }
                            })
                        })

                        return true
                    }
                    this.warning();

                    return false;

                });
            },
            success() {
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
    @import '../../assets/scss/cinema/info/info.scss';
</style>