/**
 * 商品列表 模板
 */
<template>
<div class="proList">
	<div class="goods-box">
		<el-row :gutter="26">
			<el-col :span="6" v-for="item in goodsList">
				<div class="good-box">
					<div class="img-box box box-center" ref="imgBox" :style="{ height: imgHeight }">
						<img class="goodsImg1" v-lazy="item.image" width="100%">
					</div>
					<div class="text-box">
						<div class="title-cn text-overflow text-center">
							{{item.enName}}
						</div>
						<div class="title-en text-overflow text-color-help text-center">
							<small>{{item.fullName}}</small>
						</div>
						<div class="price-box text-center">
							<div class="price">{{ item.priceStr > 0 ?'￥'+item.priceStr : '暂无报价' }}</div>
							<div class="detail">({{item.volumn}} / {{item.alcoholStrength}})</div>
							<div class="tag">
								<div v-if="item.tagIcons">
									<div v-if="item.tagIcons.indexOf(',')>0">
										<img :src="it" v-for="it in item.tagIcons.split(',')" width="50px" height="20px">
									</div>
									<img :src="item.tagIcons" width="50px" v-else>
								</div>
							</div>
						</div>
						<div class="buy-btn text-center">
							<router-link :to="{ path: '/Z29vZHNEZXRhaWw', query: {id:item.id}}" target="_blank">
                                <span v-if="item.stock==0">暂时缺货</span>
                                <span v-else>立即购买</span>
                            </router-link>
						</div>
						<!--工具箱-->
						<div class="good-box-tool">
							<div class="button" @click="addToFocus(item.id,item.isFlavor)">
								<icon name="heart2" scale="2.1" class="icon" v-show="item.isFlavor"></icon>
								<icon name="heart" scale="2.1" class="icon" v-show="!item.isFlavor"></icon>
							</div>
							<!-- <div class="button" v-on:click="addToCart(item.id)">
								<icon name="cart" scale="2.1" class="icon"></icon>
							</div> -->
						</div>
						<!--遮罩-->
						<div class="good-status box box-center box-just" v-if="item.state==5">
							<span class="good-status-txt">已下架</span>
							<a href="javascript:void(0);" @click="addToFocus(item.id,item.isFlavor)">删除</a>
						</div>
						<router-link :to="{ path: '/Z29vZHNEZXRhaWw', query: {id:item.id}}" target="_blank" v-if="item.stock== 0">
							<div class="good-status box box-center box-just">
								<span class="good-status-txt">已售罄</span>
							</div>
						</router-link>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</div>
</template>

<script>
export default {
	name: 'proList',
	props: ["goodsList"],
	data() {
		return {
			navType: "",
			imgHeight: "auto",
			show: true
		}
	},
	watch:{
		goodsList: function (newQuestion, oldQuestion) {
			this.$nextTick(function(){
				this.imgHeight = this.$refs.imgBox[0].offsetWidth + 'px';
            })
		}
	},
	methods: {
		addToFocus: function(proId, boolean) {
			let that = this;
			if (that.util.getCookie('token')) {
				let care = boolean ? 0 : 1;
				that.$ajax({
					method: "get",
					url: that.config.mallApi + "center/favorit/set/" + proId + "/" + care,
					headers: {
						'Content-type': 'application/json;charset=UTF-8',
						'Authentication': that.util.getCookie('token')
					},
					data: {}
				}).then(function(res) {
					if (res.data.code == "0000") {
						let message = boolean ? '已取消关注' : '关注成功'
						that.$notify({
							type: 'success',
							message: message
						});
						that.$emit('refresh');
					} else {
						that.$notify({
							type: 'error',
							message: res.data.message
						});
					}
				}).catch(function(err) {
					that.$notify({
						type: 'error',
						message: '操作失败'
					});
					console.log(err);
				})
			} else {
				this.$confirm('是否进入登录页面?', '您还没登录账号', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {
					this.$router.push('/bG9naW4');
				}).catch(() => {});
			}
		},
	},
	mounted() {
		this.navType = this.$route.query.type;

	},
}
</script>

<style lang="less" scoped>
@import url('proList.less');
</style>
