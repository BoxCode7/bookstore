<template>
	<view class="container">
		<view v-if="!isLogin" class="empty">
			<image src="../../static/cart-empty.png" mode="aspectFit"></image>
			<view class="empty-tips">
				空空如也
				<navigator class="navigator" url="../index/index" open-type="switchTab">随便逛逛</navigator>
			</view>
			<view class="empty-tips">
				空空如也
				<view class="navigator" @click="navToLogin">去登陆</view>
			</view>
		</view>

		<view v-else>
			<!-- 列表 -->
			<view class="cart-list">
				<block v-for="(item,index) in carts" :key="item.id">
					<view class="cart-item">
						<view class="image-wrapper">
							<image :src="getImgUrl(item.picture)" mode="aspectFill" lazy-load></image>
							<view>
								<uni-icons class="checkbox" type="checkbox" :class="{checked:item.checked}"
									@click="check('item',index)"></uni-icons>
								<!-- 			  <uni-icons class="checkbox" type="checkbox" :class="active===index?'active':''" @click="check('item',index)"></uni-icons> -->
							</view>
						</view>
						<view class="item-right">
							<text class="clamp title">{{item.name}}</text>
							<text class="attr">{{item.publisher}}</text>
							<text class="price">￥{{item.price}}</text>
							<uni-number-box class="step" :min="1" :max="100" v-model="item.num" @change="numberChange">
							</uni-number-box>
						</view>
						<uni-icons class="del-btn" type="close" @click="deleteCartitem(index)"></uni-icons>
					</view>


				</block>
			</view>
			<!-- 底部菜单栏 -->
			<view class="action-section">
				<view class="checkbox">
					<image :src="allChecked?'/static/selected.png':'/static/select.png'" mode="aspectFit"
						@click="check('all')"></image>
					<view class="clear-btn" :class="{show:allChecked}" @click="clearCart">
						清空
					</view>
				</view>
				<view class="total-box">
					<text class="price">￥{{total}}</text>
					<text class="coupon">
						已优惠
						<text>74.35</text>元
					</text>
				</view>
				<button type="primary" class="no-border confirm-btn" @click="createOrder">去结算</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				total: 0, //总价格
				allChecked: false, //全选状态 true|false
				empty: false, //空白页现实 true|false
				carts: [],
				number: 1,
				active: false,
				isLogin: false,
				pickItems: []
			}
		},
		onLoad() {

		},
		onShow() {
			console.log("onShow")
			let token = uni.getStorageSync("token");
			console.log("token=" + token)
			if (token == undefined || token.length < 1) {
				this.isLogin = false;
			} else {
				this.isLogin = true;
				if (this.carts.length < 1) {
					this.loadData();
				}
			}

		},
		methods: {

			//请求数据
			async loadData() {
				this.$getT("/api/fore/cart/findAll").then(resp => {
					console.log(resp)
					if (resp.code == 200) {
						let aa = resp.data;
						for (let i = 0; i < aa.length; i++) {
							let c = {}
							c.id = aa[i].cart.id;
							c.name = aa[i].book.name;
							c.picture = aa[i].book.picture;
							c.publisher = aa[i].book.publisher;
							c.bookid = aa[i].cart.bookid;
							c.num = aa[i].cart.num;
							c.price = aa[i].book.price;
							c.checked = false;
							this.carts.push(c)
						}
						console.log(this.carts)
					} else {
						console.log(resp.msg)
					}
				})
			},
			getImgUrl(picid) {
				return this.BASE_URL + "/api/public/showImg/" + picid
			},
			check(type, index) {
				this.active = index
				if (type === 'item') {
					this.carts[index].checked = !this.carts[index].checked;
				} else {
					const checked = !this.allChecked
					const list = this.carts;
					list.forEach(item => {
						item.checked = checked;
					})
					this.allChecked = checked;
				}
				this.calcTotal(type);
			},
			//数量
			numberChange(val, ) {
				console.log("number Changes:" + val)
				/* 	this.carts[index].num = val; */
				// this.carts[index].num=val;
				this.calcTotal();
			},
			//删除
			deleteCartitem(index) {
				let list = this.carts;
				let row = list[index];
				let id = row.index;

				this.carts.splice(index, 1);
				this.calcTotal();
				uni.hideLoading();
			},
			//清空
			clearCart() {
				uni.showModal({
					content: '清空购物车？',
					success: (e) => {
						if (e.confirm) {
							this.carts = [];
						}
					}
				})
			},
			//计算总价
			calcTotal() {
				let list = this.carts;
				if (list.length === 0) {
					this.empty = true;
					return;
				}
				let total = 0;
				let checked = true;
				list.forEach(item => {
					if (item.checked === true) {
						total += item.price * item.num;

					} else if (checked === true) {
						checked = false;
					}
				})
				this.allChecked = checked;
				this.total = Number(total.toFixed(2));
			},



			/* var that = this;
			var items = [];
			if (this.pickItems.length == 0) {
				that.$message({
					showClose: true,
					message: "购物车为空",
					type: 'error'
				});
				return;
			}
			this.$store.state.query = this.pickItems;
			console.log(this.$store.state.query)
			this.$router.push({
				path: '/ord/mark',
				query: {}
			}) */


			//创建订单
			createOrder() {

				let list = this.carts;

				let goodsData = [];
				list.forEach(item => {
					console.log(item.checked)
					if (item.checked == false) {
						uni.showToast({
							title: "购物车为空",
							duration: 2000
						});
					} else {
						goodsData.push({
							bookid: item.bookid,
							name: item.name,
							num: item.num,
							publisher: item.publisher,
							picture: item.picture,
							price: item.price,

						})
						uni.navigateTo({
							/* url: '/pages/pics/pics' */
							url: `/pages/order/order?data=${JSON.stringify({
									goodsData: goodsData
								})}`
						})
					}

				})

				/* this.$api.msg('跳转下一页 sendData');
				this.$message({
					type:''
				}) */
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding-bottom: 134upx;

		/* 空白页 */
		.empty {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100vh;
			padding-bottom: 100upx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			background: #fff;

			image {
				width: 240upx;
				height: 160upx;
				margin-bottom: 30upx;
			}

			.empty-tips {
				display: flex;
				// font-size: $font-sm+2upx;
				// color: $font-color-disabled;

				.navigator {
					// color: $uni-color-primary;
					margin-left: 16upx;
				}
			}
		}
	}

	/* 购物车列表项 */
	.cart-item {


		height: 115px;
		border: 1px solid #eee;
		border-radius: 20upx;
		display: flex;
		position: relative;
		padding: 30upx 40upx;

		.image-wrapper {
			width: 230upx;
			height: 230upx;
			flex-shrink: 0;
			position: relative;

			image {
				width: 260rpx;
				height: 280rpx;
				border-radius: 8upx;
			}

			.checked {

				color: white;
				border: 1px solid #e5e5e5;
				background-color: #ff5d00;

			}
		}

		.checkbox {
			position: absolute;
			left: -26upx;
			top: -16upx;
			z-index: 8;
			font-size: 44upx;
			line-height: 1;
			padding: 4upx;
			// color: $font-color-disabled;
			background: #fff;
			border-radius: 50px;
		}

		.item-right {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow: hidden;
			position: relative;
			padding-left: 65upx;

			.title,
			.price {
				// font-size: $font-base + 2upx;
				// color: $font-color-dark;
				height: 40upx;
				line-height: 40upx;
			}

			.attr {
				// font-size: $font-sm + 2upx;
				// color: $font-color-light;
				height: 50upx;
				line-height: 50upx;
			}

			.price {
				height: 50upx;
				line-height: 50upx;
			}
		}

		.del-btn {
			padding: 4upx 10upx;
			font-size: 34upx;
			height: 50upx;
			// color: $font-color-light;
		}
	}

	/* 底部栏 */
	.action-section {
		/* #ifdef H5 */
		margin-bottom: 100upx;
		/* #endif */
		position: fixed;
		left: 30upx;
		bottom: 30upx;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 690upx;
		height: 100upx;
		padding: 0 30upx;
		background: rgba(255, 255, 255, .9);
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, .5);
		border-radius: 16upx;

		.checkbox {
			height: 52upx;
			position: relative;

			image {
				width: 52upx;
				height: 100%;
				position: relative;
				z-index: 5;
			}
		}

		.clear-btn {
			position: absolute;
			left: 26upx;
			top: 0;
			z-index: 4;
			width: 0;
			height: 52upx;
			line-height: 52upx;
			padding-left: 38upx;
			// font-size: $font-base;
			color: #fff;
			// background: $font-color-disabled;
			border-radius: 0 50px 50px 0;
			opacity: 0;
			transition: .2s;

			&.show {
				opacity: 1;
				width: 120upx;
			}
		}

		.total-box {
			flex: 1;
			display: flex;
			flex-direction: column;
			text-align: right;
			padding-right: 40upx;

			.price {
				// font-size: $font-lg;
				// color: $font-color-dark;
			}

			.coupon {
				// font-size: $font-sm;
				// color: $font-color-light;

				text {
					// color: $font-color-dark;
				}
			}
		}

		.confirm-btn {
			padding: 0 38upx;
			margin: 0;
			border-radius: 100px;
			height: 76upx;
			line-height: 76upx;
			font-size: $font-base + 2upx;
			background: $uni-color-primary;
			box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72)
		}
	}

	/* 复选框选中状态 */
	.action-section .checkbox.checked,
	.cart-item .checkbox.checked {
		color: $uni-color-primary;

	}
</style>
