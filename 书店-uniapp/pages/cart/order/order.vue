<template>
	<view>
		
	</view>
</template>

<script>
	import {$getT} from '../../../api/request.js'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			getOrd(){
				this.$getT('/api/fore/ord/findOrdLines')
				.then(res=>{
					console.log(res.data)
				})
			}
		},
		onShow(){
			this.getOrd()
		}
	}
</script>

<style>

</style>
