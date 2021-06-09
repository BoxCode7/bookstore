# android 软件 整包更新

 * 适用于 个人中心 > 检查更新 按钮，也可以在首页使用
 * 不适用于 app.vue界面
 * 不支持热更新
 * iso端未进行测试
 * 版本判断已在后台进行

#### 数据库表设计
属性名			  说明
APPID			APP应用标识
VERSION			App版本号
STATUS		    升级标志，true:需要升级；false:无需升级；版本是否需要升级，后台已进行了判断
NOTES		    升级内容
URL		        更新包下载地址

#### 使用说明
1、引用组件
import LunaUpgrade from '@/components/luna-upgrade/luna-upgrade.vue';
export default {
	components: {
		LunaUpgrade,
	},
}
2、使用组件
<luna-upgrade ref="showtip" :url="url" :notes="notes"></luna-upgrade>

this.$nextTick(() => {
	this.$refs['showtip'].open();
	this.notes = res.data.data.NOTES;
	this.url = this.$apkImgUrl + res.data.data.URL;								
});

