<template>
<div class="shopCart">
	<perHeader ref="perHeader"></perHeader>
	<!-- <el-dialog title="温馨提示" :visible.sync="openDelate" width="20%" :lock-scroll="false" top="300px">
		<span>您确定要从购物车中删除该商品吗？</span>
		<span slot="footer" class="dialog-footer">
        <el-button @click="openDelate = false">取 消</el-button>
        <el-button type="primary" @click="delGoods">确 定</el-button>
      </span>
	</el-dialog>
	<el-dialog title="温馨提示" :visible.sync="openDelateSome" width="20%" :lock-scroll="false" top="300px">
		<span>您确定要从购物车中删除选中的商品吗？</span>
		<span slot="footer" class="dialog-footer">
        <el-button @click="openDelateSome = false">取 消</el-button>
        <el-button type="primary" @click="delGoods(1)">确 定</el-button>
      </span>
	</el-dialog> -->
	<div class="container">
		<div class="shop-cart-title box">
			<icon name="shop-cart" scale="2"></icon>&nbsp;
			<b>我的购物车</b>
		</div>
		<!-- <div class="shop-cart-tips">下单后您有30分钟的支付时间</div> -->
		<div class="shop-cart-content">
			<el-row class="shop-cart-header">
				<el-col :span="2" class="shop-card-checkbox">
					<el-checkbox v-model="checkAll" @change="choseBox('all')">全选</el-checkbox>
				</el-col>
				<el-col :span="22">
					<el-row>
						<el-col :span="10" class="box box-center">商品信息</el-col>
						<el-col :span="3" class="box box-center">单价（元）</el-col>
						<el-col :span="4" class="box box-center">数量（瓶）</el-col>
						<el-col :span="3" class="box box-center">小计（元）</el-col>
						<el-col :span="4" class="box box-center">操作</el-col>
					</el-row>
				</el-col>
			</el-row>
			<LoadError v-if="loadError"></LoadError>
			<NoData :message="'您的购物车空空如也'" v-else-if="shopCartdata.records&&shopCartdata.records.length==0"></NoData>
			<el-checkbox-group v-model="cartList" v-else>
				<el-row class="shop-cart-goods box box-align-center"  v-for="(item,index) in shopCartdata.records">
					<el-col :span="2" class="shop-card-checkbox">
						<el-checkbox :label="index" text-color="#fff" @change="choseBox" :disabled="item.state==5||item.stock==0"></el-checkbox>
					</el-col>
					<el-col class="shop-cart-goods-box" :class="{close:item.state==5||item.stock==0}">
						<el-row>
							<el-col :span="10" class="good-box box">
								<div class="goods-img-box">
									<router-link :to="{ path: '/Z29vZHNEZXRhaWw', query: {id:item.id}}">
										<img v-lazy="item.image" width="100%"></img>
									</router-link>
								</div>
								<div class="goods-detail-box box box-center">
									<router-link :to="{ path: '/Z29vZHNEZXRhaWw', query: {id:item.id}}">
										<div class="title-en text-overflow-more text-overflow-three">
											<span class="text-color-help" v-if="item.isShared == 1">【分享瓶】</span><b>{{item.enName}}</b>
										</div>
										<div class="title-cn text-color-help">
											<small>{{item.fullName}}</small>
										</div>
										<div class="title-en text-color-help">
											<small>净含量：{{item.volumn}}</small>&nbsp;&nbsp;&nbsp;&nbsp;<small v-if="item.state!=5">库存：{{item.stock}}</small>
										</div>
										<div class="colose-Tips" v-if="item.state==5">已下架</div>
										<div class="colose-Tips" v-else-if="item.stock==0">已售罄</div>
										<!-- <div class="limit-time box">
											<div class="icon">
												限时抢购
											</div>
											<div class="time">
												<span>剩余时间：</span>3小时30分21秒
											</div>
										</div> -->
									</router-link>
								</div>
							</el-col>
							<el-col :span="3" class="box box-center price-box">
								<p>{{item.priceStr}}</p>
							</el-col>
							<el-col :span="4" class="box box-center">
								<div class="chose-count-box box">
									<button class="chose-btn box box-center button" @click="minusCount(index)">
						                <icon name="minus" scale="1.4" class="icon"></icon>
					              	</button>
									<input name="goodsCount" type="number" v-model="item.count" @change="inputCount(index)">
									<button class="chose-btn box box-center button" @click="addCount(index)" :disabled="item.count>=item.stock">
					                    <icon name="add" scale="1.4" class="icon"></icon>
				                  	</button>
								</div>
								<div class="count-tips text-center font-red" v-if="item.count>item.stock&&item.stock!=0">超过库存</div>
							</el-col>
							<el-col :span="3" class="box box-center price-box">
								<p>{{parseFloat(item.price * item.count).toFixed(2)}}</p>
							</el-col>
							<el-col :span="4" class="box box-center action-box">
								<div class="action-box-position">
									<div class="delete-btn button text-center" @click="delId=item.id; delDetailId= item.detailId;delGoods();">删除</div>
									<div class="care-btn button text-center" @click="addToFocus(item.id,item.isFlavor)">
										<p v-if="!item.isFlavor">加入我的关注</p>
										<p v-else>移除关注</p>
									</div>
								</div>
							</el-col>
						</el-row>
					</el-col>
				</el-row>
			</el-checkbox-group>
		</div>
		<div class="settlement-box">
			<el-row class="settlement-content">
				<el-col :span="2" class="settlement-checkbox">
					<el-checkbox v-model="checkAll" @change="choseBox('all')">全选</el-checkbox>
				</el-col>
				<el-col :span="22">
					<el-row>
						<el-col :span="4" class="box box-center">
							<div class="button" @click="cartList.length&&delGoods(1);">删除选中商品</div>
						</el-col>
						<el-col :span="2" class="box box-center button">
							<div class="button" @click="clearCart">清除无效商品</div>
						</el-col>
						<el-col :span="14" class="box-center settlement-detail">
							<div>
								已选商品 <span class="font-dark-red">{{cartList.length}}</span> 件&nbsp;&nbsp;&nbsp;&nbsp; 总计：
								<span class="settlement-price"><small>￥</small>{{parseFloat(allPrice).toFixed(2)}}</span>
							</div>
							<div class="text-color-help">
								<!-- 活动优惠：-￥0&nbsp;&nbsp;&nbsp;&nbsp;  -->商品应付：￥{{parseFloat(allPrice).toFixed(2)}}&nbsp;&nbsp;&nbsp;&nbsp; 商品实际支付：￥{{parseFloat(allPrice).toFixed(2)}}
							</div>
						</el-col>
						<el-col :span="4" class="text-center settlement-btn box-center box">
							<div class="button" @click="orderSubmit">去结算</div>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
		</div>
		<div class="recommend-box">
			<div class="container white-bg">
				<div class="recommend-title-box">
					<div class="recommend-title">相关推荐</div>
				</div>
				<div class="recommend-content">
					<proList :goodsList="shopCartdata.recommends" @refresh="initData"></proList>
				</div>
			</div>
		</div>
	</div>
	<perFooter></perFooter>
</div>
</template>

<script>
import perHeader from '@/components/header/header'
import perFooter from '@/components/footer/footer'
import proList from '@/components/product/proList'
export default {
	name: 'shopCart',
	data() {
		return {
			loadError: false,
			checkAll: false,
			openDelate: false,
			openDelateSome: false,
			shopCartdata: '',
			cartList:[],
			delId:'',
			delDetailId:'',
			allPrice:0,
			checked: false
		}
	},
	components: {
		perHeader,
		perFooter,
		proList,
	},
	watch: {　　
		cartList(curVal, oldVal) {
			let goods=this.shopCartdata.records;
			let all = 0;
			for (var i in curVal){
				all += goods[curVal[i]].count * goods[curVal[i]].price;
			}
			this.allPrice = all;
		},
		shopCartdata:{
            handler:function(curVal,oldVal){
				let goods=curVal.records;
				let all = 0;
				for (var i in this.cartList){
					all += goods[this.cartList[i]].count * goods[this.cartList[i]].price;
				}
				for (var k in goods){
					goods[k].count = Math.ceil(goods[k].count)
				}
				this.allPrice = all;
            },
            deep:true
        }
	},
	methods: {
		initData(){
			let that=this;
			that.util.returnLogin(that);
			let params = {
				apiUrl: that.config.mallApi+"shopping/cart/detail",
				apiMethod: "get",
			}
			that.ajaxData(params, function(res) {
				if (res.data.code=="0000") {
					that.shopCartdata = res.data.data;
				}else {
					that.loadError = true;
				}
			})
		},
		choseBox(e){
			if (e=='all') {
				if (this.checkAll) {
					let arr = []
					for(var i in this.shopCartdata.records){
						if (this.shopCartdata.records[i].state!=5&&this.shopCartdata.records[i].stock!=0)arr.push(parseInt(i));
					}
					this.cartList=arr;
				}else {
					this.cartList=[];
				}
			}else {
				let count=0;
				for(var i in this.shopCartdata.records){
					if (this.shopCartdata.records[i].state==5||this.shopCartdata.records[i].stock==0)count++;
				}
				if (this.cartList.length==this.shopCartdata.records.length-count) {
					this.checkAll=true;
				}else {
					this.checkAll=false;
				}
			}
		},
		//从购物车中删除商品
		delGoods(e){
			let that = this;
			let data = {}
			let tel = '您确定要从购物车中删除该商品吗？';
			if (e!=1) {
				data = {
					productIds : [that.delId],
					detailIds : [that.delDetailId]
				}
			}else {
				data.productIds = [];
				data.detailIds = [];
				tel = '您确定要从购物车中删除选中的商品吗？';
				for(var i in that.cartList){
					data.productIds.push(that.shopCartdata.records[that.cartList[i]].id);
					data.detailIds.push(that.shopCartdata.records[that.cartList[i]].detailId);
				}
			}
			this.$confirm(tel, '温馨提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let params = data
				params.apiUrl=that.config.mallApi + "shopping/cart/del";
				that.ajaxData(params, function(res) {
					if (res.data.code=="0000") {
						that.$notify.success({
							message: '删除成功！'
						});
						that.cartList=[];
						that.initData();
						that.$refs.perHeader.shopCart();
						that.checkAll=false;
					}else {
						that.$notify.error({
							message: res.data.message
						})
					}
					that.openDelate= false;
					that.openDelateSome= false;
				})
			}).catch(() => {});
		},
		//清除无效商品
		clearCart(){
			let that = this;
			this.$confirm('确定要清除所有无效商品吗？', '温馨提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
			}).then(() => {
				let params = {
					apiUrl: that.config.mallApi + "shopping/cart/clean",
				}
				that.ajaxData(params, function(res) {
					if (res.data.code=="0000") {
						that.$notify.success({
							message: '清除成功！'
						});
						that.cartList=[];
						that.checkAll=false;
						that.initData();
						that.$refs.perHeader.shopCart();
					}else {
						that.$notify.error({
							message: res.data.message
						})
					}
				})
			}).catch(() => {});
		},
		//加入我的关注
		addToFocus: function(proId,boolean) {
			let that = this;
			let care = boolean?0:1;
			let params = {
				apiUrl: that.config.mallApi + "center/favorit/set/" + proId + "/" + care,
				apiMethod: 'get',
			}
			that.ajaxData(params, function(res) {
				if (res.data.code=="0000") {
					let message = boolean?'已取消关注':'关注成功'
					that.$notify({
						type: 'success',
						message: message
					});
					that.initData();
				}else {
					that.$notify({
						type: 'error',
						message: '操作失败'
					});
				}
			})
		},
		//减数量
		minusCount(index){
			let goods=this.shopCartdata.records[index];
			goods.count = goods.count>1?goods.count-1:goods.count;
			this.saveGoodsCount(index);
		},
		//加数量
		addCount(index){
			let goods=this.shopCartdata.records[index];
			var stock = goods.stock;
			if(stock <= goods.count) return;
			goods.count++;
			this.saveGoodsCount(index);
		},
		//结算
		orderSubmit(){
			let that= this;
			if (that.cartList.length>0) {
				if(that.allPrice<=0){
					that.$notify.error({
						message:'结算商品数量不正确'
					});
					return;
				}
				let data = [];
				let lock = true;
				for(var i in that.cartList){
					if (that.shopCartdata.records[that.cartList[i]].count>that.shopCartdata.records[that.cartList[i]].stock) {
						lock=false;
					}
					data.push(that.shopCartdata.records[that.cartList[i]])
				}
				if (lock) {
					sessionStorage.orderSubmitInfo=JSON.stringify(data);
					this.$router.push('/Z2V0T3JkZXJJbmZv?type=2');
				}else {
					that.$notify.error({
						message:'商品购买数量大于库存'
					})
				}
			}else{
				that.$notify.error({
					message:'请至少选择一个商品结算'
				})
			}
		},
		//修改商品数量
		saveGoodsCount(index){
			let that = this;
			let goods= that.shopCartdata.records[index];
			if (goods.count==0) return;
			let params = {
				apiUrl: that.config.mallApi + "shopping/cart/edit",
				productId: goods.id,
				productDetailId: goods.detailId,
				count: goods.count
			}
			that.ajaxData(params);
		},
		//输入商品数量
		inputCount(index){
			var goods = this.shopCartdata.records[index];
			var stock = goods.stock;
			if(stock <= goods.count){
				goods.count = stock;
			}
			goods.count = goods.count>0?goods.count:1;
			this.saveGoodsCount(index);
		}
	},
	mounted(){
		this.initData();
	},
}
</script>

<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
@import url('../../components/product/recommend.less'); //引入相关推荐样式
@import url('css/shopCart.less');
</style>
