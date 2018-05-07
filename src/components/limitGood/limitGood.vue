/**
 * 限时商品 模板
 */
<template>
    <div class="limitGood">
        <div class="good-box box">
            <div class="img-box">
                <img>
            </div>
            <div class="detail-box">
                <div class="title-box">
                    <div class="title text-overflow-more text-overflow-two">Ben Nevis 63 Years Old 1926 Single</div>
                    <div class="title cn text-overflow-more text-overflow-one">麦卡伦 63年 1926 单一麦芽威士忌</div>
                </div>
				<el-row :gutter="20" class="progress-box box box-align-center text-center">
					<el-col :span="15">
						<el-progress :percentage="10" :show-text="false" color="#000000"></el-progress>
					</el-col>
	            	<el-col :span="9">
						已抢1000件
					</el-col>
				</el-row>
                <div class="price-box">暂无</div>
                <div class="stock-box buy box box-center">立即购买</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
	name: 'limitGood',
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
                color: @dark-red;
                font-size: 15px;
                margin-top: 10px;
                margin-bottom: 20px;

                small {
                    font-size: 12px;
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
                }
            }
        }
    }
}
</style>
