<template>
    <div class="page-payment util-wrapper">
        <el-steps :active="2" align-center>
            <el-step title="选择影片场次" description=""></el-step>
            <el-step title="选择座位" description=""></el-step>
            <el-step title="影院取票观影" description=""></el-step>
        </el-steps>

        <div class="content">
            <div class="seat-content">
                <div class="title-tip">
                    <span>可选座位</span>
                    <span>已选座位</span>
                    <span>已售座位</span>
                </div>

                <div class="seat-container">
                    <div class="tip">
                        <ul>
                            <li v-for="(item,index) in seatData" :key="index">
                                {{ letterList[index] }}
                            </li>
                        </ul>
                    </div>
                    <div class="right">
                        <div class="screen">
                            银幕中央
                        </div>
                        <div class="screen-content">
                            <ul>
                                <li class="row" v-for="(item,index) in seatData" :key="index">
                                    <ul>
                                        <li @click="handleClick(item,index)" class="col" :class="{
                                            'active1':seat === 0,
                                            'active2':seat === 1,
                                            'active3':seat === 2,
                                            'active4':seat === 3
                                        }" v-for="(seat,index) in item" :key="index">
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="movie-detail">
                <div class="movie-top">
                    <div class="movie-image">
                        <img :src="paymentData.Movie.imgUrl" alt="">
                    </div>
                    <div class="movie-info">
                        <p class="title">{{ paymentData.Movie.name }}</p>
                        <p class="type">类型：<span>{{ paymentData.Movie.type }}</span></p>
                        <p class="duration">时长：<span>{{ paymentData.Movie.duration }}</span></p>
                    </div>
                </div>
                <div class="cinema-content">
                    <p class="cinema-name">影院：<span>{{ paymentData.Cinema.name }}</span></p>
                    <p class="cinema-screen">影厅：<span>{{ paymentData.screen }}</span></p>
                    <p class="cinema-language">版本：<span>{{ paymentData.language }}</span></p>
                    <p class="cinema-session">场次：<span>{{ paymentData.showDate }} {{ paymentData.showTime }}</span></p>
                    <p class="cinema-price">票价：<span>￥{{ paymentData.price }} / 张</span></p>
                </div>
                <div class="tip-container">
                    <p class="tip-title">座位：一次最多选6个座位</p>
                    <p class="tip-tip">请<span>点击左侧</span>座位图选择座位</p>
                    <p class="tip-sum">总价: <span class="tip-symbol">￥</span><span class="tip-price">{{ price }}</span> </p>
                </div>
                <div class="submit">

                    <el-popover @hide="handleHide" placement="top" width="440" trigger="click">

                        <template v-if="seatCount !==0 ">
                            <div v-loading="flag">
                                <div class="logo"></div>
                                <div class="tip">
                                    <p>选座成功，请前往影院取票！</p>
                                </div>
                            </div>
                        </template>

                        <template v-else>
                            <div>
                                <div class="logo"></div>
                                <div class="tip">
                                    <p>还没有选择座位！</p>
                                </div>
                            </div>
                        </template>

                        <el-button @click="submit" slot="reference" round>确认选座</el-button>

                    </el-popover>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                paymentData: {},
                seatData: [],
                letterList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'],
                seatCount: 0,
                flag: true
            }
        },
        created() {
            if (this.$store.state.loginUser.name == undefined) {
                this.$router.push({ name: 'login' })
            }
            this.paymentData = JSON.parse(localStorage.getItem('payment'));

            this.seatData = JSON.parse(this.paymentData.seat);

        },
        computed: {
            price() {
                return (this.seatCount * this.paymentData.price).toFixed(1);
            }
        },
        methods: {
            handleHide(){
                this.seatCount = 0;
                this.flag = true;
            },
            submit() {
                if (this.seatCount === 0) {
                    this.warning('还没有选择座位！')
                    return;
                }
                for (let i = 0; i < this.seatData.length; i++) {
                    for (let j = 0; j < this.seatData[i].length; j++) {
                        if (this.seatData[i][j] === 1) {
                            this.seatData[i].splice(j, 1, 2);
                        }
                    }
                }

                this.$api.updateSession(this.paymentData.id, {
                    seat: JSON.stringify(this.seatData)
                }).then(res => {
                    if (res) {
                        this.$api.addOrderList({
                            number:this.seatCount,
                            CinemaId:this.paymentData.CinemaId,
                            UserId:this.$store.state.loginUser.id,
                            MovieId:this.paymentData.MovieId,
                            SessionId:this.paymentData.id
                        })

                        setTimeout(() => {
                            this.flag = false;
                            this.changeData();
                            this.success();
                        }, 1000)
                    }
                })
            },
            handleClick(row, col) {
                if (row[col] === 1) {
                    row.splice(col, 1, 0);
                    this.seatCount--;
                } else if (row[col] !== 2 && row[col] !== 3 && !this.checked()) {
                    row.splice(col, 1, 1)
                    this.seatCount++;
                }
            },
            checked() {
                const flag = this.seatCount === 6;
                if (flag) {
                    this.warning('一次最多可以选择6个座位！')
                }
                return flag;
            },
            warning(text) {
                this.$notify({
                    title: '警告',
                    message: text,
                    type: 'warning'
                });
            },
            success() {
                this.$notify({
                    title: '选座成功',
                    message: `恭喜您选座成功，请您前往影院取票！`,
                    type: 'success'
                });
            },
            changeData() {
                this.$set(this.paymentData, 'seat', JSON.stringify(this.seatData))
                localStorage.removeItem('payment');
                localStorage.setItem('payment', JSON.stringify(this.paymentData));
            }
        }
    }
</script>

<style lang="scss">
    @import '@/assets/scss/client/payment/payment.scss'
</style>