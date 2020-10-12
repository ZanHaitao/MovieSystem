<template>
    <div class="cinema-header">
        <div class="logo"></div>
        <div class="tip">
            <p><span>当前登录用户：</span><span class="data">{{$store.state.loginCinema.name}}</span></p>
        </div>
        <div class="login">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <span class="portrait"></span><i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="goIndex">返回前台</el-dropdown-item>
                    <el-dropdown-item @click.native="loginOut">注销登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            goIndex() {
                this.$router.push('/index')
            },
            loginOut() {
                localStorage.removeItem('cinemaToken');
                this.$store.dispatch('changeCinema',{});
                this.$router.push({ name: 'cinemaLogin' })
            }
        },
    }
</script>

<style lang="scss">
    @import '@/assets/scss/cinema/header/header.scss';
</style>