<template>
    <div class="layout-default">
        <el-container>
            <el-header style="height:81px" class="top-bar">
                <my-header />
            </el-header>
            <el-main style="margin-top:81px;padding:0;">
                <router-view></router-view>
            </el-main>
            <el-footer style="height:100%" class="bottom-bar">
                <my-footer />
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    import MyHeader from '../components/client/header/header'
    import MyFooter from '../components/client/footer/footer'
    export default {
        components: {
            MyHeader,
            MyFooter
        }
    }
</script>

<style>
    .top-bar {
        position: fixed;
        background: #fff;
        z-index: 999;
        left: 0;
        top: 0;
        right: 0;
        height: 80px;
        border-bottom: 1px solid rgba(0, 0, 0, .1);
        box-shadow: 0 0 5px rgba(0, 0, 0, .1);
    }

    .bottom-bar {
        width: 100%;
        background: #262426;
    }
</style>