<template>
    <div class="layout-admin">
        <el-container>
            <el-aside width="initial">
                <div class="btn" @click="handleClick">
                    <i class="el-icon-s-fold" v-if="!isCollapse"></i>
                    <i class="el-icon-s-unfold" v-else></i>
                </div>

                <el-menu background-color="#304156" router :default-active="$route.path" text-color="#fff" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                    <el-menu-item index="/admin/index" @click="goIndex">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-s-custom"></i>
                            <span slot="title">管理员管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">管理员列表</el-menu-item>
                            <el-menu-item index="1-2">添加管理员</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-user-solid"></i>
                            <span slot="title">用户管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="2-1">用户列表</el-menu-item>
                            <el-menu-item index="2-2">添加用户</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-s-ticket"></i>
                            <span slot="title">影院管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="3-1">影院列表</el-menu-item>
                            <el-menu-item index="3-2">添加影院</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-star-on"></i>
                            <span slot="title">服务管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="4-1">服务列表</el-menu-item>
                            <el-menu-item index="4-2">添加服务</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-video-camera-solid"></i>
                            <span slot="title">电影管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="5-1">电影列表</el-menu-item>
                            <el-menu-item index="5-2">添加电影</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="6">
                        <template slot="title">
                            <i class="el-icon-s-help"></i>
                            <span slot="title">类型管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="6-1">类型列表</el-menu-item>
                            <el-menu-item index="6-2">添加类型</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="7">
                        <template slot="title">
                            <i class="el-icon-s-operation"></i>
                            <span slot="title">评论管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="7-1">评论列表</el-menu-item>
                            <el-menu-item index="7-2">添加评论</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="8">
                        <template slot="title">
                            <i class="el-icon-camera-solid"></i>
                            <span slot="title">影厅管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="8-1">影厅列表</el-menu-item>
                            <el-menu-item index="8-2">添加影厅</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    
                    <el-submenu index="9">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span slot="title">广告管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="9-1">广告列表</el-menu-item>
                            <el-menu-item index="9 -2">添加广告</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-menu-item index="/admin/order" >
                        <i class="el-icon-s-order"></i>
                        <span slot="title">订单查询</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header height="70px" :class="{'hide':isCollapse,'show':!isCollapse}">
                    <my-header />
                </el-header>
                <el-main :class="{'hide':isCollapse,'show':!isCollapse}">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import MyHeader from '../components/admin/header/header';
    export default {
        components: {
            MyHeader,
        },
        data() {
            return {
                isCollapse: false
            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClick() {
                this.isCollapse = !this.isCollapse;
            },
            selectOrder() {
                this.$router.push({ name: 'adminOrder' });
            },
            goIndex() {
                this.$router.push({ name: 'adminIndex' });
            }
        }
    }
</script>

<style lang="scss">
    .layout-admin {

        .el-aside {
            position: fixed;
            background: #304156;
            left: 0px;
            top: 0px;
            bottom: 0px;
            z-index: 999;
            overflow: hidden;
            box-sizing: border-box;

            i {
                color: #fff;
            }

            .el-menu-item-group__title {
                padding: 0;
            }

            .el-menu-vertical-demo.el-menu {
                margin-top: 70px;
                border: none;
            }

            .btn {
                position: absolute;
                width: 40px;
                height: 40px;
                bottom: 0px;
                right: 0;
                color: #fff;
                font-size: 20px;
            }

            .el-menu:not(.el-menu--collapse) {
                width: 200px;
            }
        }

        .el-header {
            position: fixed;
            left: 0px;
            right: 0px;
            top: 0px;
            z-index: 998;
            border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
            box-shadow: 0 0 5px rgba($color: #000000, $alpha: 0.1);
            background-color: #fff;

            &.show {
                padding-left: 210px;
            }

            &.hide {
                padding-left: 74px;
            }

        }

        .el-main {
            margin-top: 70px;
            background-color: #F0F2F5;

            &.hide {
                margin-left: 64px;
            }

            &.show {
                margin-left: 200px;
            }
        }
    }
</style>