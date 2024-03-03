<template>
	<view class="school_home">
		<van-search
		  ref="search"
		  label="学校"
		  placeholder="请输入学校名称"
		  background="#4fc08d"
		  shape="round"
		  @blur='getSchool'
		>
		</van-search>
		<template v-for="i in schoolList" :key='i.id'>
			<view class="school_item" v-if="i.isShow" @click="selectSchool(i)">
				{{i.school_name}}
			</view>
		</template>
	</view>
</template>

<script setup>
	import {
		onReady,
		onLoad,
		onShow,
		onReachBottom,
	} from '@dcloudio/uni-app';
	import {
		ref,
		computed
	} from 'vue';
	import request from '@/request/index.js'
	import {Store} from '@/stores/counter.js'
	//搜索框节点
	const search =ref()
	const store = new Store()
	const schoolList = ref([])
	onLoad(async()=>{
		await request({
			url:'school/list/page/vo',
			method:'POST',
			data:{
			  "city": "",
			  "createTime": "",
			  "current": 0,
			  "id": 0,
			  "isDelete": 0,
			  "pageSize": 10,
			  "province": "",
			  "school_name": "",
			  "sortField": "",
			  "sortOrder": "",
			  "updateTime": "",
			  "user_id": 0
			}
		}).then((res)=>{
			schoolList.value=[]
			schoolList.value=res.data.data.records
			schoolList.value.forEach(i=>{
				i.isShow=true
			})
			console.log(schoolList.value);
		})
	})
	
	//获取关键词
	const getSchool = ()=>{
		schoolList.value.forEach(i=>{
			if(i.school_name.includes(search.value.__data__.value)||i.city.includes(search.value.__data__.value)||i.province.includes(search.value.__data__.value)){ 
				i.isShow=true
			}else{
				i.isShow=false
			}
		})
	}
	
	// 选择学校
	const selectSchool =(i)=>{
		store.SchoolId = i.id
		store.SchoolName = i.school_name
		console.log(store.SchoolId,store.SchoolName);
		uni.setStorageSync('schoolId',i.id)
		uni.setStorageSync('schoolName',i.school_name)
		uni.switchTab({
			url:'../../pages/index/index'
		})
	}
</script>

<style lang="scss">
.school_home{
	width: 100vw;
	height: 100vh;
	overflow-y: scroll;
	.school_item{
		width: 90vw;
		height: 8vh;
		line-height: 8vh;
		margin-left: 5vw;
		margin-top: 1vh;
		padding-left: 1vw;
		box-sizing: border-box;
		border: 3rpx solid #ccc;
		border-radius: 10rpx;
	}
}
</style>
