<!--
限时商品 模板
 -->
<template>
    <div class="limitGood">
        <div class="good-box box">
            <div class="img-box">
				<img class="goodsImg1" v-lazy="itemData.image">
            </div>
            <div class="detail-box">
                <div class="title-box">
                    <div class="title text-overflow-more text-overflow-two">{{itemData.enName}}</div>
                    <div class="title cn text-overflow-more text-overflow-one">{{itemData.fullName}}</div>
                </div>
				<el-row :gutter="20" class="progress-box box box-align-center text-center">
					<el-col :span="15">
						<el-progress :percentage="10" :show-text="false" color="#000000"></el-progress>
					</el-col>
	            	<el-col :span="9">
						已抢1000件
					</el-col>
				</el-row>
                <div class="price-box">
				 	<div class="font-dark-red">￥{{itemData.activityPrice}}<span>￥{{itemData.price}}</span></div>
				</div>
				<div v-if="nowTime>itemData.beginDate&&nowTime<itemData.endDate">
					<div  v-if="itemData.productCount>0">
						<router-link class="stock-box buy box box-center" :to="{ name: 'goodsDetail', query: {id:itemData.productId}}">立即购买</router-link>
					</div>
                	<div class="stock-box buy box box-center" v-else>已抢光</div>
				</div>
                <div class="stock-box box box-center" v-if="nowTime>itemData.endDate">已结束</div>
                <div class="stock-box box box-center" v-if="nowTime<itemData.beginDate">即将开始</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
	name: 'limitGood',
	props: ["itemData","nowTime"],
	data() {
		return {
		}
	},
	methods: {

	},
	mounted() {
	},
	beforeDestroy() {
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
.limitGood{
    .good-box {
        margin-bottom: 50px;

        .img-box {
            width: 220px;
            height: 220px;
            background: #eee;
            flex-shrink: 0
        }

        .detail-box {
            position: relative;
            padding: 20px 10px 0 10px;

            .title-box {
                .title {
                    font-size: 16px;
                    color: #000;
					&:first-child{
						height: 42px;
					}
                    &.cn{
                        font-size: 14px;
                        margin: 10px 0;
                    }
                }
            }

            .describe-box {
                padding-bottom: 10px;
            }

			.progress-box{
				font-size: 12px;
			}

            .price-box {
                font-size: 20px;
                margin-top: 10px;
                margin-bottom: 20px;

                span {
                	margin-left: 10px;
                    font-size: 12px;
					color: #979797;
					text-decoration: line-through;
                }
            }

            .stock-box {
                height: 38px;
                line-height: 38px;
                width: 100px;
                background: #f2f2f2;
                font-size: 14px;

                .icon {
                    margin-right: 10px;
                }

                &.buy {
                    background: #000;
                    color: #fff;
					cursor: pointer;
                }
            }
        }
    }
}
</style>
