<template>
	<view class="home">
		<!-- 空白页面 -->
		<view v-if="token == false" class="blank">
			<navigator url="../../user/login">还未登录,前往登录</navigator>
		</view>
		<!-- 主体 -->
		<view v-if="token != false" class="subject">
			<!-- 购物车为空 -->
			<view v-if="cartList.length == 0" class="blank">
				<navigator url="../../commodity/commodity">购物车空空如也</br>先去逛逛</navigator>
			</view>
			<!-- 购物车 -->
			<view v-if="cartList.length != 0" class="cart">
				<!-- 列表 -->
				<view class="cart-item" v-for="(item,index) in cartList">
					<image :src="getImgUrl(item.picture)"></image>
					<view class="text">
						<text class="name">{{item.name}}</text>
						<text>{{item.publisher}}</text>
						<text class="price">价格：{{item.price}}￥</text>
						<view>
							<uni-number-box class="num" :min="1" :max="99" v-model="item.num" @change="number">
							</uni-number-box>
						</view>
					</view>
					<view class="ico">
						<view class="select">
							<uni-icons @click="check(item,index),checkAll" type="checkbox-filled" size="25"
								color="#f52443" v-if="item.carts == true"></uni-icons>
							<uni-icons @click="check(item,index),checkAll" type="circle" size="25"
								v-if="item.carts == false"></uni-icons>
						</view>
						<view class="delete">
							<uni-icons @click="delet(index)" type="clear" size="25" color="#f52443"></uni-icons>
						</view>
					</view>
				</view>
				<!-- 底部结算 -->
				<view class="bottom">
					<view class="checkbox">
						<view class="ioc">
							<text>全选</text>
							<uni-icons @click="Allcheck(checkAll)" type="checkbox-filled" size="25" color="#f5f5f5"
								v-if="checkAll == true"></uni-icons>
							<uni-icons @click="Allcheck(checkAll)" type="circle" size="25" color="#f5f5f5"
								v-if="checkAll == false"></uni-icons>
						</view>
						<view class="button">
							<text>总价：{{summarizing}}</text>
						</view>
						<button type="primary" size="mini" @click="settle()">结算</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		$getT,
		BASE_URL,postJsonT
	} from '../../api/request.js'
	export default {
		data() {
			return {
				token: false,
				cartList: [],
				checkAll: false,
				totals: 0, //总价
				addCart: [], //订单
			}
		},
		methods: {
			getImgUrl(pic) { //图片显示
				return BASE_URL + "/api/public/showImg/" + pic
			},
			//获取数据
			getCartList() {
				this.$getT('/api/fore/cart/findAll')
					.then(res => {
						let cartArr = res.data
						for (let i = 0; i < cartArr.length; i++) {
							let cart = {}
							cart.id = cartArr[i].cart.id
							cart.name = cartArr[i].book.name
							cart.picture = cartArr[i].book.picture
							cart.publisher = cartArr[i].book.publisher
							cart.bookid = cartArr[i].cart.bookid
							cart.num = cartArr[i].cart.num
							cart.price = cartArr[i].book.price
							cart.carts = false
							this.cartList.push(cart)
						}
					})
				console.log("购物车", this.cartList)
			},
			//选择
			check(item, index) {
				let count = 0;
				if (this.cartList[index].carts == false) {
					this.cartList[index].carts = true
					for (let i = 0; i < this.cartList.length; i++) {
						if (this.cartList[i].carts) {
							count++;
						}
					}
					if (count == this.cartList.length) {
						this.checkAll = true;
					} else this.checkAll = false;
				} else {
					this.cartList[index].carts = false
					this.checkAll = false
				}
			},
			//全选
			Allcheck(checkAll) {
				if (checkAll == false) {
					this.checkAll = true
					this.addCart = []
					for (let i = 0; i < this.cartList.length; i++) {
						this.cartList[i].carts = true
					}
				}
				if (checkAll == true) {
					this.checkAll = false
					this.addCart = []
					for (let i = 0; i < this.cartList.length; i++) {
						this.cartList[i].carts = false
					}
				}
			},
			//删除
			delet(index) {
				console.log('删除', index)
				uni.showToast({
					title: "暂不支持"
				})
			},
			//数量
			number(num) {
				// console.log(num)
			},
			//结算
			settle() {
				for (let i = 0; i < this.cartList.length; i++) {
					if (this.cartList[i].carts == true) {
						let cart = {}
						cart.bookid = this.cartList[i].bookid
						cart.num = this.cartList[i].num
						cart.price = Number(this.cartList[i].price.toFixed(2))
						this.addCart.push(cart)
					}
				}
				this.$postJsonT('/api/fore/cart/addCart2Order',this.addCart)
				.then(res=>{
					uni.showToast({title: "下单成功"})
				})
			},
		},
		computed: {
			//计算总价
			summarizing() {
				let total = 0
				for (let i = 0; i < this.cartList.length; i++) {
					if (this.cartList[i].carts == true) {
						total += this.cartList[i].price * this.cartList[i].num
					}
				}
				return this.totals = Number(total.toFixed(2))
			}
		},
		onShow() {
			this.token = uni.getStorageSync('token')
			this.getCartList(this.cartList=[])
			console.log('订单', this.addCart)
		}
	}
</script>

<style lang="scss">
	.home {

		//空白
		.blank {
			navigator {
				font-size: 1.5em;
				text-align: center;
				margin-top: 450rpx;
				color: #f52443;
			}
		}

		//购物车
		.subject {

			// 购物车为空
			.blank {
				navigator {
					font-size: 1.5em;
					text-align: center;
					margin-top: 450rpx;
					color: #f52443;
				}
			}

			// 购物车
			.cart {
				margin-top: 30rpx;
				padding-bottom: 80rpx;

				//列表
				.cart-item {
					width: 670rpx;
					height: 300rpx;
					line-height: 250rpx;
					border: 1rpx solid #ED1C24;
					margin-left: 40rpx;
					margin-bottom: 20rpx;
					display: flex;
					cursor: 20rpx;
					background-color: #dfe4ea;
					border-radius: 30rpx; //圆角
					position: relative;

					image {
						width: 200rpx;
						height: 260rpx;
						margin-top: 20rpx;
						margin-left: 10rpx;
						// border: 1rpx solid #ED1C24;
					}

					.text {
						height: 260rpx;
						width: 410rpx;
						margin-top: 20rpx;
						margin-left: 10rpx;

						// border: 1rpx solid #ED1C24;
						text {
							display: block;
							// border: 1rpx solid #A5673F;
							line-height: 110%;
							// margin-top: 20rpx;
							text-align: 20rpx;
						}

						.name {
							font-size: 1.1em;
							font-weight: bold; //字体加粗
						}

						.price {
							color: #ED1C24;
							font-size: 1.3em;
						}

						.num {
							position: absolute;
							bottom: 20rpx;
						}
					}

					.ico {
						width: 40rpx;
						// border: 1rpx solid #1101ed;
						margin-right: 10rpx;

						.select {
							height: 30rpx;
							position: absolute;
							top: -105rpx;
						}

						.delete {
							height: 30rpx;
							position: absolute;
							top: 150rpx;
							z-index: 1;
						}
					}
				}

				// 底部结算
				.bottom {
					width: 100%;
					height: 80rpx;
					background-color: #f52443;
					position: fixed;
					z-index: 1000;
					bottom: 0rpx;
					margin-bottom: 100rpx;

					.checkbox {
						display: flex;

						.ioc {
							height: 80rpx;
							line-height: 80rpx;
							margin-left: 20rpx;

							text {
								font-size: 1.2em;
								font-weight: bold; //字体加粗
								margin-right: 10rpx;
							}

							// border: 1rpx solid #1101ed;

						}

						.button {
							// border: 1rpx solid #1101ed;
							height: 80rpx;
							line-height: 80rpx;

							text {
								hfont-size: 1.2em;
								font-weight: bold; //字体加粗
								margin: 20rpx;
							}
						}

						button {
							height: 60rpx;
							height: 60rpx;
							margin-top: 10rpx;
							position: absolute;
							right: 20rpx;
						}
					}
				}
			}
		}
	}
</style>
