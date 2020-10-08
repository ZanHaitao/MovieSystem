<template>
    <div class="admin-header">
        <div class="logo"></div>
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
            goIndex(){
                console.log('123')
                this.$router.push('/index')
            },
            loginOut(){
                localStorage.removeItem('adminToken');
                this.$router.push({ name: 'adminLogin' })
            }
        },
    }
</script>

<style lang="scss">
    @import '@/assets/scss/admin/header/header.scss';
</style>