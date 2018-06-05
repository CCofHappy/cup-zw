<template>
<div class="choseAdd">
	<perHeader></perHeader>
	<div class="container">
		<div class="nav-title">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/aG9tZQ' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>新增商品</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-row :gutter="20">
			<el-col :span="4">
				<leftBar :navNum="tabIndex"></leftBar>
			</el-col>
			<el-col :span="20">
				<div class="add-container">
					<div class="add-nav box box-between">
						<el-breadcrumb separator-class="el-icon-arrow-right">
							<el-breadcrumb-item>新增商品</el-breadcrumb-item>
							<el-breadcrumb-item>录入数据</el-breadcrumb-item>
						</el-breadcrumb>
						<div class="button" @click="$router.back(-1)">
							返回
						</div>
					</div>
					<div class="goods-box">
						<el-row class="goods-row">
							<el-col :span="16">
								<span>商品全称：</span>{{productInfo.fullName}}
							</el-col>
							<el-col :span="8">
								<span>品 牌：</span>{{productInfo.brandName}}
							</el-col>
						</el-row>
						<el-row class="goods-row">
							<el-col :span="24">
								<span>商品英文名：</span>{{productInfo.enName}}
							</el-col>
						</el-row>
						<el-row class="goods-row">
							<el-col :span="8">
								<span>酒 精 度：</span>{{productInfo.alcoholStrength}}
							</el-col>
							<el-col :span="8">
								<span>木桶类型：</span>{{productInfo.bucketType}}
							</el-col>
							<el-col :span="8">
								<span>类 别：</span>{{productInfo.productType}}
							</el-col>
						</el-row>
						<el-row class="goods-row">
							<el-col :span="8">
								<span>木桶编号：</span>暂缺
							</el-col>
							<el-col :span="8">
								<span>系 列：</span>暂缺
							</el-col>
							<el-col :span="8">
								<span>装 瓶 厂：</span>{{productInfo.bottler}}
							</el-col>
						</el-row>
						<el-row class="goods-row">
							<el-col :span="8">
								<span>蒸馏时间：</span>{{productInfo.distillTime}}
							</el-col>
							<el-col :span="8">
								<span>装瓶时间：</span>{{productInfo.bottlingTime}}
							</el-col>
							<el-col :span="8">
								<span>装瓶数量：</span>暂缺
							</el-col>
						</el-row>
						<el-row class="input-row">
							<el-col :span="8">
								库存数量：&nbsp;&nbsp;<input v-model="total"></input>
							</el-col>
							<el-col :span="8" class="text-left">
								商品单价：&nbsp;&nbsp;<input v-model="price"></input>
							</el-col>
							<el-col :span="8" class="text-left">净含量：
								<el-select v-model="volumnIndex" placeholder="请选择" @change="changeVolumn">
									<el-option v-for="item in volumnList" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</el-col>
						</el-row>
					</div>
					<div class="box box-center">
						<el-button type="primary" class="register-btn button" @click="submit">提交审核</el-button>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
	<perFooter></perFooter>
</div>
</template>
<script>
import perHeader from '@/components/header/header'
import perFooter from '@/components/footer/footer'
import leftBar from './leftBar'
export default {
	name: 'choseAdd',
	data() {
		return {
			loadError: false,
			tabIndex: '1',
			productInfo: "",
			volumnList: [],
			volumnIndex: '',
			volumnValue: '',
			total: '',
			price: '',
		}
	},
	components: {
		perHeader,
		leftBar,
		perFooter
	},
	watch: {
		'$route' (to, from) {
			this.tabIndex = this.$route.query.tabIndex ? this.$route.query.tabIndex : 1;
		},
	},
	methods: {
		initData: function() {
			let id = this.$route.query.id,
				type = this.$route.query.type,
				url = type == "edit" ? "supplier/goods/detail/" : "supplier/goods/";
			let params = {
				apiUrl: this.config.mallApi + url + id,
				apiMethod: "get"
			};
			this.ajaxData(params, (res) => {
				if (res.data.code == "0000") {
					if (type == "edit") {
						this.productInfo = res.data.data;


					}else {
						this.productInfo = res.data.data.productInfo;
						this.volumnList = res.data.data.volumn;
					}
				} else {
					this.loadError = true;
				}
			})
		},
		changeVolumn: function(e) {
			for (var i = 0; i < this.volumnList.length; i++) {
				if (this.volumnList[i].id == e) this.volumnValue = this.volumnList[i].name;
			}
		},
		submit: function() {
			if (this.total && this.price && this.volumnIndex) {
				if (isNaN(this.total) || isNaN(this.price)) {
					this.$notify.error({
						message: "输入的商品数据不正确"
					});
					return;
				}
				let params = {
					apiUrl: this.config.mallApi + "supplier/goods/submit",
					type: 1,
					code: this.productInfo.code,
					details: [{
						total: this.total,
						price: this.price,
						specificationId: 31,
						specificationName: "净含量",
						specificationValueId: this.volumnIndex,
						specificationValue: this.volumnValue,
					}]
				};
				this.ajaxData(params, (res) => {
					if (res.data.code == "0000") {
						this.$notify.success({
							message: "录入成功！"
						});
					} else {
						this.$notify.error({
							message: res.data.message
						});
					}
				})
			} else {
				this.$notify.error({
					message: "请完善商品数据"
				});
				return;
			}
		}
	},
	mounted() {
		this.tabIndex = this.$route.query.tabIndex || 1;
		this.initData();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
@import url('css/order.less');
@import url('css/purchase.less');
</style>

<!-- 调整elementUI样式 -->
<style lang="less">
.choseAdd {
    .add-container {
        .el-select {
            width: 200px;
            input {
                line-height: 45px;
                height: 45px;
                border-radius: 0;
                border: 1px solid #bebebe;
            }
        }
    }
}
</style>
