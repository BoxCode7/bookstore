<template>
	<view class="main-box" v-if="show">
		<view class="box-view">
			<view class="view-title">
				<image class="title-img" src="./assets/upgrade.png" mode="aspectFill"></image>
				<text class="title-text">发现新版本啦!</text>
			</view>
			<view class="view-content">
				<text class="content-text">{{ notes }}</text>
				<view class="content-btn" v-if="!update">
					<text class="btn-close" @click="close">下次在说</text>
					<text class="btn-update" @click="updateNow">立即更新</text>
				</view>
				<view class="content-progress" v-if="update">
					<text class="progress-label">下载进度</text>
					<progress :percent="percent" activeColor="#007aff" :show-info="true" stroke-width="6"></progress>
				</view>
				<view class="content-btn" v-if="update">
					<text class="btn-update" v-if="percent >= 100" @click="install()">立即安装</text>
					<text class="btn-close" v-else>立即安装</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * android 整包更新
 * 适用于 个人中心 > 检查更新 按钮，也可以在首页使用
 * 不适用于 app.vue界面
 *
 * 数据库表设计，字段有:
 * ID、
 * APPID(APP应用标识)、
 * VERSION(App版本号)、
 * STATUS(升级标志，true:需要升级；false:无需升级)、是否需要更新，后台已进行了判断
 * NOTES(升级内容)、
 * URL(更新包下载地址)
 *
 * 使用方法:
 * <luna-upgrade ref="showtip" :url="url" :notes="notes"></luna-upgrade>
 * this.$nextTick(() => {
 * this.$refs['showtip'].open();
 * this.notes = res.data.data.NOTES;
 * this.url = this.$apkImgUrl + res.data.data.URL;
 * });
 */

export default {
	name: 'LunaUpgrade',
	props: {
		// 更新包地址
		url: {
			type: String,
			default: ''
		},
		// 更新描述
		notes: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			show: false,
			percent: 0,
			update: false,
			updatePath: ''
		};
	},
	methods: {
		open() {
			this.show = true;
			uni.hideTabBar();
			this.$emit('change', {
				show: true
			});
		},
		close() {
			this.$nextTick(() => {
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					this.$emit('change', {
						show: false
					});
					this.show = false;
					uni.showTabBar();
				}, 300);
			});
		},
		updateNow() {
			//检测是否下载过更新
			let _that = this; //必须先获取到this并赋值给其他变量，因为之后this的意义将发生变化
			_that.updatePath = uni.getStorageSync('update_path');
			plus.io.resolveLocalFileSystemURL(
				// https://www.html5plus.org/doc/zh_cn/io.html#plus.io.resolveLocalFileSystemURL
				_that.updatePath,
				function(entry) {
					console.log(entry);
					_that.install();
					return;
				},
				function(e) {
					console.log(e);
					// https://www.html5plus.org/doc/zh_cn/downloader.html
					let dtask = plus.downloader.createDownload(_that.url, { filename: '_downloads/' });
					dtask.addEventListener('statechanged', onStateChanged, false); //下载任务完成回调函数
					dtask.start();
				}
			);

			//下载进度
			function onStateChanged(download, status) {
				let totalSize = download.totalSize;
				let downloadedSize = download.downloadedSize;
				_that.percent = ((downloadedSize / totalSize) * 100).toFixed(0);
				_that.update = true;
				// 下载完成
				if (download.state == 4 && status == 200) {
					_that.updatePath = download.filename;
					uni.setStorageSync('update_path', _that.updatePath);
				}
			}
		},
		install() {
			this.close();
			plus.nativeUI.showWaiting('安装中,请稍后...');
			console.log(this.updatePath);
			plus.runtime.install(
				this.updatePath,
				{},
				res => {
					plus.nativeUI.closeWaiting();
					plus.runtime.restart();
					uni.removeStorageSync('update_path');
				},
				e => {
					plus.nativeUI.closeWaiting();
					plus.nativeUI.alert('安装出错 ' + e.code, '', '提示');
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
.main-box {
	position: fixed;
	/* #ifndef APP-NVUE */
	display: flex;
	flex-direction: column;
	/* #endif */
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	justify-content: center;
	align-items: center;
	background: rgba(0, 0, 0, 0.3);
	.box-view {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		width: 300px;
		background-color: #fff;
		border-radius: 30rpx;

		.view-title {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			justify-content: center;
			background-color: #007aff;
			padding: 15rpx;
			color: #ffffff;
			border-top-right-radius: 30rpx;
			border-top-left-radius: 30rpx;
			.title-img {
				width: 60rpx;
				height: 60rpx;
			}
			.title-text {
				font-size: 16px;
				margin-left: 10rpx;
			}
		}

		.view-content {
			/* #ifndef APP-NVUE */
			display: flex;
			flex-direction: column;
			/* #endif */
			padding: 15rpx;
			font-size: 14px;

			.content-text {
				margin: 15rpx 15rpx;
			}

			.content-btn {
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				flex-direction: row;
				margin: 15rpx 0;

				color: #ffffff;
				.btn-close {
					flex: 1;
					text-align: center;
					background-color: #e2e2e2;
					border-radius: 30rpx;
					padding: 10rpx 0;
				}

				.btn-update {
					flex: 1;
					text-align: center;
					background-color: #007aff;
					border-radius: 30rpx;
					padding: 10rpx 0;
				}
			}

			.content-progress {
				/* #ifndef APP-NVUE */
				display: flex;
				flex-direction: column;
				/* #endif */
				margin-left: 15rpx;
				.progress-label {
					font-size: 14px;
				}
			}
		}
	}
}
/*进度条*/
.uni-progress-info {
	font-size: 14px;
}
</style>
