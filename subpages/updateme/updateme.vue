<template>
	<view class="up_me">
		<van-cell-group>
			<van-field placeholder="请输入新的用户名" label="用户名:" required @blur='getUserName' :maxlength='6' />
		</van-cell-group>
		<van-uploader :max-size='8388608' :value='fileList' multiple accept='image/*' @after-read='uploadImage'
			slot="right-icon">
			<view class="font_style">
				头像更新:
			</view>
			<view class="image_btn">+</view>
		</van-uploader>
		
		<view class="update_btn">
			<van-button type="primary" round size="large" @click='update'>更新</van-button>
		</view>
		<van-overlay :show="showWarning">
			<view class="wrapper">
				<view class="contant">
					<text>{{msg}}</text>
				</view>
			</view>
		</van-overlay>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref,
		computed
	} from 'vue';

	import {
		onReady,
		onLoad,
		onReachBottom
	} from '@dcloudio/uni-app'
	import {
		Store
	} from '../../stores/counter.js'
	import request from '../../request/index.js';
	const store = Store()
	// 从本地获取存储的 Cookie
	const storedCookie = uni.getStorageSync('sessionCookie');

	//文件上传
	const fileList = ref([])
	const msg_text = ref('')

	let from = {
		name: null,
		image: null
	}

	// 校验开关
	let a = ref(true)

	// 验证
	const getUserName = (e) => {
		if (e.detail.value.trim().length != 0) {
			from.name = e.detail.value
			a.value = true
		} else {
			a.value = false
		}
	}
	var pattern = /^1[3456789]\d{9}$/;



	//遮罩层开关
	const showWarning = ref(false)
	// 遮罩层消息
	const msg = ref('')
	
	//发送更新请求
	const update =  async () =>{
		console.log("更新请求");
		console.log(from.name);
		console.log(msg_text.value);
		await request({
			url: '/user/update/meNameAndAvatr',
			method: "POST",
			header: {
				'content-type': 'application/json',
				'Cookie': storedCookie
			},
			data: {
				"userName": from.name,
				"content": msg_text.value
				
			}
		}).then(res=>{
			if (res.data.code == 0) {
				msg.value = '更新成功！'
				showWarning.value = true
				setTimeout(() => {
					showWarning.value = false
					uni.switchTab({
						url: '/pages/me/me'
					})
				}, 1200)
			} else {
				msg.value = '更新失败,请检查输入信息是否正确！'
				showWarning.value = true
				setTimeout(() => {
					showWarning.value = false
				}, 800)
			}
		})
	}
	
	const uploadImage = (e) => {
		console.log(e);
		readFileAsBase64(e.detail.file, (res) => {
			fileList.value.push({
				url: res,
				name: e.name
			})
		})


	}




	const readFileAsBase64 = (file, callback) => {
		console.log(file);
		uni.getFileSystemManager().readFile({
			filePath: file[0].url,
			encoding: 'base64',
			success(res) {
				msg_text.value = res.data;
				// console.log(res.data);
				// send(1)
			},
			fail(err) {
				console.log('读取失败');
			}
		})
	}
</script>

<style lang="scss">
	.up_me{
		width: 100vw;
		height: 100vh;
		.font_style{
			margin: 3vw 0 0 3vw;
			font-size: 30rpx
		}
		.image_btn{
			width: 15vh;
			height: 15vh;
			line-height: 15vh;
			margin-left: 25vw;
			text-align: center;
			font-size: 100rpx;
			color: #ccc;
			float: right;
			border: 1rpx dotted #ccc;
			border-radius: 20%;
			
		}
		.update_btn{
			width: 80vw;
			position: absolute;
			left: 10vw;
			bottom: 5vh;
		}
	}
	.wrapper {
		width: 500rpx;
		height: 300rpx;
		background-color: #fff;
		border-radius: 30rpx;
		margin: 50%;
		transform: translateX(-50%);
		display: flex;
		justify-content: center;
		align-items: center;

		.contant {
			text-align: center;
			padding: 50rpx;
			font-size: 40rpx;
		}
	}
</style>