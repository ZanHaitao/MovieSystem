<template>
    <div class="layout-cinema">
        <el-container>
            <el-aside width="initial">
                <div class="btn" @click="handleClick">
                    <i class="el-icon-s-fold" v-if="!isCollapse"></i>
                    <i class="el-icon-s-unfold" v-else></i>
                </div>

                <el-menu background-color="#304156" router :default-active="$route.path" text-color="#fff" class="el-menu-vertical-demo" :collapse="isCollapse">
                    <el-menu-item index="/cinemaadmin/index">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>

                    <el-menu-item index="/cinemaadmin/session">
                        <i class="el-icon-s-ticket"></i>
                        <span slot="title">影片场次</span>
                    </el-menu-item>

                    <el-menu-item index="/cinemaadmin/service">
                        <i class="el-icon-s-flag"></i>
                        <span slot="title">服务管理</span>
                    </el-menu-item>

                    <el-menu-item index="/cinemaadmin/order">
                        <i class="el-icon-s-order"></i>
                        <span slot="title">订单查询</span>
                    </el-menu-item>

                    <el-menu-item index="/cinemaadmin/info">
                        <i class="el-icon-s-open"></i>
                        <span slot="title">修改信息</span>
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
    import MyHeader from '../components/cinema/header/header';
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
            handleClick() {
                this.isCollapse = !this.isCollapse;
            },
        }
    }
</script>

<style lang="scss">
    .layout-cinema {
        height: 100%;

        .el-container {
            height: 100%;
        }

        .el-breadcrumb {
            padding-bottom: 10px;
            border-bottom: 1px dashed rgba($color: #000000, $alpha: 0.1);
        }

        .cell {
            white-space: nowrap;
        }

        .el-dialog__body {
            padding-right: 90px;
        }

        .el-form.demo-ruleForm {
            padding: 40px 60px 20px 0;
        }

        .el-breadcrumb__inner a:hover,
        .el-breadcrumb__inner.is-link:hover {
            color: #304156;
        }

        .el-pagination.is-background {
            text-align: center;
            margin: 50px 0 50px;

            .el-pager li:not(.disabled).active {
                background-color: #304156;
            }

            &.el-pager li:not(.disabled):hover {
                color: #304156;
            }

            .el-pager li:not(.disabled).active.el-pager li:not(.disabled):hover {
                color: #fff !important;
            }
        }

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
                max-height: calc(100% - 70px);
                overflow-y: scroll;

                &::-webkit-scrollbar {
                    /*滚动条样式*/
                    width: 0px;
                    height: 0px;
                }

                &::-webkit-scrollbar-thumb {
                    /*滑块的样式*/
                    background: #304156;
                }
            }

            .btn {
                position: absolute;
                width: 40px;
                height: 40px;
                top: 20px;
                right: 2px;
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
            padding-top: 30px;
            height: calc(100% - 60px);
            ;

            &.hide {
                margin-left: 64px;
            }

            &.show {
                margin-left: 200px;
            }

            &::-webkit-scrollbar {
                /*滚动条样式*/
                width: 10px;
                height: 0px;
            }

            &::-webkit-scrollbar-thumb {
                /*滑块的样式*/
                border-radius: 5px;
                background: #d1d4db;
            }
        }
    }
</style>