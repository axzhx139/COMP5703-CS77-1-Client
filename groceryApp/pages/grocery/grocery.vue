<template>
	<view>
		<hx-navbar ref="hxnb" v-show="addItemToList" :config="config1" @clickBtn="onClickBtn">
		</hx-navbar>
		<hx-navbar ref="hxnb" v-show="needAddItem" :config="config2" @clickBtn="onClickBtn">
		</hx-navbar>
		<view v-if="addItemToList">
			<view class="content" >
				<view>
					<text :class="['selected-item',iisSelect?'selected-item':'un-select-item']" @click="changeTab('is')">In Stock</text>
					<text style="padding: 0 5px 0 5px;">|</text>
					<text :class="[issSelect?'selected-item':'un-select-item']" @click="changeTab('hs')">History</text>
				</view>
			</view>
			<view class="content" v-if="iisSelect">
				<view class="stock-card">
					<view>
						<u-row gutter="16" justify="space-between">
							<u-col span="6">
								<view class="demo-layout bg-purple">
									<text style="font-weight: 900;">Expiring  Products</text>
								</view>
							</u-col>
							<u-col span="5" style="text-align: right;">
								<view class="demo-layout bg-purple-light">
									<view style="text-align: center;">
										<xfl-select @change="selectSortingItemList"
											:list="sortingMethod"
											:clearable="false"
											:showItemNum="5" 
											:listShow="false"
											:isCanInput="false"  
											:style_Container="'height: 30px; font-size: 15px;'"
											:placeholder = "'Default'"
											:selectHideType="'hideAll'"
											style="width: 100%; background-color: #FFFFFF;"
										>
										</xfl-select>
									</view>
									
								</view>
							</u-col>
						</u-row>
					</view>
					<view style="margin-top: 5px;">
						<u-row gutter="16" justify="space-between">
							<u-col span="6">
								<view class="demo-layout bg-purple">
									<text>Item</text>
								</view>
							</u-col>
							<u-col span="6" style="text-align: right;">
								<view class="demo-layout bg-purple-light">
									<text>Expiring Date</text>
										
								</view>
							</u-col>
						</u-row>
					</view>
					<view style="margin-top: 5px;">
						<!-- <inline>
							
							<uni-row class="demo-uni-row" :width="nvueWidth">
								<uni-col :span="3">
									<view class="demo-uni-col dark">1</view>
								</uni-col>
								<uni-col :span="3">
									<view class="demo-uni-col light">2</view>
								</uni-col>
								<uni-col :span="3">
									<view class="demo-uni-col dark">3</view>
								</uni-col>
								<uni-col :span="3">
									<view class="demo-uni-col light">4</view>
								</uni-col>
							</uni-row>
						</inline> -->
						<scroll-view :scroll-y="true" :style="{'height':getDeviceHeight()-240+'px'}"  >
							<div v-if="stockList.length==0" style="margin-top: 20px;">Please add some products</div>
							<block v-for="(item,index) in stockList">
								<view style="margin-top: 10px;" @click="edit(item, index)">
									
									<u-row gutter="16">
										<u-col span="3">
											<!-- <view class="demo-layout bg-purple"> -->
												<image :src="'http://101.35.91.117:7884/item/picture/'+item.itemId+'?'+Math.random()" style="width: 65px;height: 65px;">
											<!-- </view> -->
										</u-col>
										<u-col span="3">
											<u-row style=" margin: 0px 0px 10px 5px;">{{ item.name }}</u-row>
											<u-row style=" font-size: 5px;margin: 10px 0px 0px 5px;">{{ item.category }}</u-row>
										</u-col>
										<u-col span="3">
											<view class="demo-layout bg-purple-light">
												<!-- <u-row gutter="18" justify="space-between"> -->
												<u-row style="justify-content: flex-end; margin-bottom: 5px">
												<!-- <text>{{ item.name }}</text> -->
												<!-- <view style="text-align: right;"> -->
													<!-- <uni-icons type="cart" size="30" v-if="!item.potential" style="height: 50rpx; width: 50rpx; float:right;  margin-right: 6%;" @click.stop="saveList(item.itemId)"></uni-icons> -->
													<!-- <uni-icons type="cart-filled" size="30" v-if="!item.potential" style="height: 50rpx; width: 50rpx; float:right;  margin-right: 6%;" @click.stop="deleteList(item.itemId)"></uni-icons> -->
													<image v-if="!item.potential" src="../../static/cart.png" style="height: 50rpx; width: 50rpx; float:right;  margin-right: 6%;" @click.stop="saveList(item.itemId)"></image>
													<image v-if="item.potential" src="../../static/cart_fill.png" style="height: 50rpx; width: 50rpx; float:right;  margin-right: 6%;" @click.stop="deleteList(item.itemId)"></image>
													<!-- <img src="../../static/knife_fork.png" style="height: 50rpx; width: 50rpx; float:right;  margin-right: 6%;" @click="changeAmount(index)"></img> -->
													<!-- <u-button shape="circle" size="mini" style="background-color: #F3F1F1; " @click="changeAmount(index)">consume</u-button> -->
															
												<!-- </view>	 -->
												</u-row>
												<u-row style="justify-content: flex-end; margin-bottom: 5px">
													<image src="../../static/knife_fork.png" style="height: 45rpx; width: 45rpx; float:right;  margin-right: 6%;" @click.stop="changeAmount(index)"></image>
												</u-row>
												<!-- <view>
													<u-row gutter="18" justify="space-between">
														<u-col span="4" style="text-align: left;">														
														</u-col>
														<u-col span="6" style="text-align: right;">	
																		
															<view class="demo-layout bg-purple-light" >														
																<u-button shape="circle" size="mini" style="background-color: #F3F1F1; " @click="changeAmount(index)">consume</u-button>
															</view>
														</u-col>
													</u-row>
												</view> -->
											</view>
										</u-col>
										<u-col span="3">
											<view class="demo-layout bg-purple-dark" style="text-align: right">
												<!-- <view class="demo-layout bg-purple">
													<text style="font-weight: 900;float:right;">{{item.expDate}}</text>
												</view>
												<text style="font-size:12px;">Remind before {{ item.time }} Days</text> -->
												<text style="font-size:12px; text-align: right;">{{ item.expireDays }} Days</text>
												<!-- <view>5 Days</view> -->
											</view>
										</u-col>
									</u-row>
								</view>
								<u-divider half-width="60%"></u-divider>
							</block>
						</scroll-view>
					</view>
				</view>
			</view>

<!--  -->
<!--  -->
<!--  -->
			<hqs-popup style="z-index: 999;"title="" :from="popFrom" v-model="itemEditor" :round="round" :showClose="false" height="600px">
				<view class="t-bg">

					<view style="text-align: left;width: 100%;">
						<text style="margin-left: 25px;font-size: 20px;">Name</text>
						<view style="text-align: center;">
							<u-input style="width: 80%;font-weight: 900;display: inline-block;background-color: #F3F1F1;border-radius: 10px;" placeholder="" v-model="iName" class="fn-input" height="90" input-align="center" :clearable="false"/>
						</view>
					</view>
					
					<view style="text-align: left;width: 100%;margin-top: 15px;">
						<text style="margin-left: 25px;font-size: 20px;">Category</text>
						<view style="text-align: center;">
							<xfl-select @change="getCategory"
								:list="options"
								:clearable="true"
								:showItemNum="10" 
								:listShow="false"
								:isCanInput="false"  
								:style_Container="'height: 50px; font-size: 16px;'"
								:placeholder = "iCategory"
								:selectHideType="'hideAll'"
								style="width: 80%;background-color: #F3F1F1;"
							>
							</xfl-select>
						</view>
					</view>
					
					<view style="text-align: left;width: 100%;margin-top: 15px;">
						<text style="margin-left: 25px;font-size: 20px;">Expire Date</text>
						<view style="text-align: center;">
							<u-input @click="openTime" style="width: 80%;font-weight: 900;display: inline-block;background-color: #F3F1F1;border-radius: 10px;" :clearable="false" placeholder="Time" v-model="iTimeInAussieFormat" class="fn-input" height="90" input-align="center"/>
							<u-calendar  :safe-area-inset-bottom="true" max-date="9999" v-model="cshow" @change="changeTime"></u-calendar>
						</view>
					</view>
					
					<view style="text-align: left;width: 100%;">
						<view  class="aline" style="text-align: center;">
							<text style="font-size: 20px;">Remind me</text>
							<u-input :clearable="false" style="margin-left: 5px; margin-right: 5px; width: 10px; font-weight: 900;display: inline-block;background-color: #F3F1F1;border-radius: 10px;" placeholder="" v-model="iCitime" class="fn-input" height="90" input-align="center"/>
							<text style="font-size: 20px;">days before</text>
						</view>
					</view>
					
					<view style="text-align: left;width: 100%;">
						<text style="margin-left: 25px;font-size: 20px;">Other details</text>
						<view style="text-align: center;">
							<u-input :clearable="false" style="width: 80%;font-weight: 900;display: inline-block;background-color: #F3F1F1;border-radius: 10px;" placeholder="details" v-model="iDetails" class="fn-input" height="90" input-align="center"/>
						</view>
					</view>

					<u-row gutter="16">
						<u-col span="3" style="text-align: left;float:left">
							<view style="margin-top: 20px;">
								<u-button shape="circle" :hair-line="false" style="width: 150px;background-color: #F5C979;border-color: #F5C979;" @click="changePhoto">Change photo</u-button>
							</view>
						</u-col>
						<u-col span="3" style="text-align: right;float:right">
							<view style="margin-top: 20px;margin-left: 120%;">
								<u-button shape="circle" :hair-line="false" style="width: 150px;background-color: #F5C979;border-color: #F5C979;" @click="editClient">Save</u-button>
							</view>
						</u-col>
					</u-row>							
				</view>
			</hqs-popup>
			
			
			<hqs-popup  title="" :from="popFrom" v-model="chNum" :round="round" :showClose="false" height="300px">
				<view class="t-bg">
					<text style="font-size: 20px;font-weight: 900;">Have you consumed already？</text>
					<view class="sm-ipbox">
						<!-- <text>-</text> -->
						<!-- <view style="margin-top: 10px;font-size: 20px;margin-right: 15px;" @click=" packs-= 1">-</view>
						<u-input style="font-weight: 900;display: inline-block;background-color: #F3F1F1;border-radius: 10px;" placeholder="Amount" v-model="packs"  class="fn-input" height="90" input-align="center"/>
						<view class="sum-item" @click=" packs+= 1">+</view> -->
					</view>
					<view style="margin-top: 30px;">
						<u-button shape="circle" :hair-line="false" style="width: 130px;background-color: #F5C979;border-color: #F5C979;" @click="consume('yes')">Yes</u-button>
						<u-button shape="circle" :hair-line="false" style="width: 130px;background-color: #F5C979;border-color: #F5C979;margin-top: 10px;" @click="consume('no')">No</u-button>
					</view>
				</view>
			</hqs-popup>
			<view class="content" v-if="issSelect">
				<view class="stock-card">
					<view>
						<u-row gutter="16" justify="space-between">
							<u-col span="6">
								<view class="demo-layout bg-purple">
									<text style="font-weight: 900;">Choose tags</text>
								</view>
							</u-col>
							<u-col span="5" style="text-align: right;">
								<view class="demo-layout bg-purple-light">
									<view style="text-align: center;">
										<xfl-select @change="selectItemTags"
											:list="chooseTags"
											:clearable="false"
											:showItemNum="5" 
											:listShow="false"
											:isCanInput="false"  
											:style_Container="'height: 30px; font-size: 15px;'"
											:placeholder = "'All'"
											:selectHideType="'hideAll'"
											style="width: 100%; background-color: #FFFFFF;"
										>
										</xfl-select>
									</view>
									
								</view>
							</u-col>
						</u-row>
					</view>
<!-- 					<view style="margin-top: 5px;">
						<u-row gutter="16" justify="space-between">
							<u-col span="6">
								<view class="demo-layout bg-purple">
									<text>Item</text>
								</view>
							</u-col>
							<u-col span="6" style="text-align: right;">
								<view class="demo-layout bg-purple-light">
									<text>Expiring Date</text>
								</view>
							</u-col>
						</u-row>
					</view> -->
					<scroll-view :scroll-y="true" :style="{'height':getDeviceHeight()-210+'px'}"  >
						<view style="margin-top: 5px;">
							<div v-if="oldstockList.length==0" style="margin-top: 20px;">Nothing in history</div>
							<block v-for="(item,index) in oldstockList">
								<view style="margin-top: 10px;">
									<u-row gutter="16">
										<u-col span="3">
											<view class="demo-layout bg-purple">
												<image :src="'http://101.35.91.117:7884/item/picture/'+item.itemId+'?'+Math.random()" style="width: 65px;height: 65px;">
											</view>
										</u-col>
										
										<u-col span="3">
											<u-row style="margin: 0px 0px 10px 5px;">{{ item.name }}</u-row>
											<u-row style="font-size: 5px; margin: 10px 0px 0px 5px;">{{ item.category }}</u-row>
										</u-col>
										
										<u-col span="3">
											<view class="demo-layout bg-purple-light">
												<!-- <u-row gutter="18" justify="space-between"> -->
												<u-row style="justify-content: flex-end; margin-bottom: 5px">
												<!-- <text>{{ item.name }}</text> -->
												<!-- <view style="text-align: right;"> -->
													<!-- <uni-icons type="cart" size="30" v-if="!item.potential" style="height: 50rpx; width: 50rpx; float:right;  margin-right: 6%;" @click.stop="saveList(item.itemId)"></uni-icons> -->
													<!-- <uni-icons type="cart-filled" size="30" v-if="!item.potential" style="height: 50rpx; width: 50rpx; float:right;  margin-right: 6%;" @click.stop="deleteList(item.itemId)"></uni-icons> -->
													<image v-if="!item.potential" src="../../static/cart.png" style="height: 50rpx; width: 50rpx; float:right;  margin-right: 6%;" @click.stop="saveList(item.itemId)"></image>
													<image v-if="item.potential" src="../../static/cart_fill.png" style="height: 50rpx; width: 50rpx; float:right;  margin-right: 6%;" @click.stop="deleteList(item.itemId)"></image>
						
												</u-row>

											</view>
										</u-col>
										
										<u-col span="3">
											<view class="demo-layout bg-purple-dark">
												<!-- <view><text style="font-size: 14px;">{{ item.expDate }}</text></view> -->
												 <view v-if="item.status=='consume'"><text style="font-size: 12px;">{{getDate(item.conDate,'day')}}</text></view>
												 <view v-if="item.status=='expire'"><text style="font-size: 12px;">{{getDate(item.expDate,'day')}}</text></view>
												 <view v-if="item.status=='consume'" style="color: #FFA451;">Consumed</view>
												<view v-if="item.status=='expire'" style="color: #AA4A44;">Expired </view>
											</view>
										</u-col>
									</u-row>
								</view>
								<u-divider half-width="60%"></u-divider>
							</block>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<view class="add-card-item" v-if="needAddItem">
			<view style="text-align: left;width: 100%;">
				<text style=" line-height: 45px;margin-left: 25px;font-size: 20px;float:left">Name</text>
				<u-input style="float:left;margin-left: 55px;width: 50%;font-weight: 900;background-color: #F3F1F1;border-radius: 10px;" placeholder="Name" v-model="iName" class="fn-input" height="90" input-align="center" :clearable="false"/>
			</view>
			
			<view style="text-align: left;width: 100%;margin-top: 25px;">
				<text style=" line-height: 50px;float:left;margin-left: 25px;font-size: 20px;">Category</text>
					<xfl-select 
						:placeholder = "'Choose'"
						v-if="refreshiCategory"
						@change="getCategory"
						:list="options"
						:clearable="true"
						:showItemNum="10" 
						:listShow="false"
						:isCanInput="false"  
						:initValue="iCategory"
						:style_Container="'height: 50px; font-size: 16px;'"
						:selectHideType="'hideAll'"
						style="width: 50%;background-color: #F3F1F1;float:left;margin-left: 25px;border-radius: 10px;"
						>
					</xfl-select>
			</view>
			
			<view style="text-align: left;width: 100%;margin-top: 25px;">
				<text style="float:left;margin-left: 25px;line-height: 45px;font-size: 20px;">Expire Date</text>
				<view style="text-align: center;">
					<u-input
						type="text"
						disabled
						@click="openTime"
						style="float:left;margin-left: 10px;width: 40%;font-weight: 900;display: inline-block;background-color: #F3F1F1;border-radius: 10px;"
						:clearable="true"
						placeholder="Time"
						v-model="iTime"
						class="fn-input"
						height="90"
						input-align="center"/>
					<u-calendar
						v-model="cshow"
						@change="changeTime"
						max-date="9999">
					</u-calendar>
					<image src="../../static/scan.png" style="margin:10px 10px 0 10px;float:left;width: 25px;height: 25px;" @click="onClickBtn"/>	
				</view>
			</view>
			
			<view style="text-align: left;width: 100%;margin-top: 25px;">
				<view  class="aline" style="text-align: center;padding:0 25px 0 25px;">
					<text style="font-size: 20px;">Remind me</text>
					<u-input type="number" :clearable="false" style="margin-left: 5px; margin-right: 5px; margin-top: 10px; width: 10px; font-weight: 900;display: inline-block;background-color: #F3F1F1;border-radius: 10px;" placeholder="" v-model="iCitime" class="fn-input" height="90" input-align="center"/>
					<text style="font-size: 20px;">days before</text>
				</view>
			</view>
			
			<!-- <view style="text-align: left;width: 100%;margin-top: 25px;">
				<text style="margin-left: 25px;font-size: 20px;">Other details</text>
				<view style="text-align: center;">
					<u-input :clearable="false" style="width: 80%;font-weight: 900;display: inline-block;background-color: #F3F1F1;border-radius: 10px;" placeholder="details" v-model="iDetails" class="fn-input" height="90" input-align="center"/>
				</view>
			</view> -->
			
			<view style="margin-top: 30px;">
				<u-button shape="circle" :hair-line="false" style="margin-left: 25px;float:left;width: 150px;background-color: #F5C979;border-color: #F5C979;" @click="choosePhoto">Choose a photo</u-button>
				<u-button shape="circle" :hair-line="false" style="margin-right: 25px;float:right;width: 150px;background-color: #F5C979;border-color: #F5C979;" @click="save">save</u-button>
			
			</view>
			<view class="head-img"><u-image  :src='get_src()' width="300" height="300" style='margin:10px auto;'></u-image></view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<u-tabbar :list="tabbar" :mid-button="false" height="55px"></u-tabbar>
		<!-- #endif -->
		
		<!-- #ifdef H5 -->
		<u-tabbar :list="tabbar" :mid-button="false"></u-tabbar>
		<!-- #endif -->
		
	
		
	</view>
</template>


<script>
	import hxNavbar from "@/components/hx-navbar/hx-navbar";
	import xflSelect from '../../components/xfl-select/xfl-select.vue'; 
	export default {
		components: {hxNavbar},
		data() {
			return {
				tabbar: this.$store.state.tabbar,
				filepath:'',
				iisSelect: true,
				iTime: '',
				iTimeInAussieFormat: '',
				itemEditor: false,
				cshow: false,
				chNum: false,
				issSelect: false,
				popFrom: 'bottom',
				packs: 0,
				round: 20,
				needChangeItem: '',
				addItemToList: true,
				needAddItem: false,
				iDetails: '',
				iCitime: '',
				iName: '',
				iItemid: '',
				status:'instock',
                iCategory: '',
				value: '',
				refreshiCategory: true,
				shopList:[],
				oldstockList: [],
				stockList:[],
				add_src:'',
				editItem:null,
				icode:'',
				config1:{
					title: 'Grocery',
					color: 'black',
					backgroundColor: '#B0C07A',
					back: false,
	
					statusBarBackground:'#B0C07A',
					rightButton:[{
						key: 'scan',
						icon: '&#xe62c;',
						position: 'left'
					}],
					leftButton: [{
						key: 'add',
						icon: '&#xe603;',
						position: 'left'
					}],
				},
				config2:{
					title: 'Add product',
					color: 'black',
					back: false,
					backgroundColor: '#B0C07A',
					statusBarBackground:'#B0C07A',
					leftButton: [{
						key: 'back',
						icon: '&#xe679;',
						position: 'left'
					}],
					rightButton:[{
						key: 'scan',
						icon: '&#xe62c;',
						position: 'left'
					}],
				},
				options: ['Fruit','Vegetable','Dairy','Animal product','Frozen','Canned Goods','Frozen Foods','Deli','Others'],
				// sortingMethod: ['Recent Added', 'A-z', 'Expire Soon'],
				sortingMethod: ['Expired', 'Category', 'Name', 'Default'],
				chooseTags: ['Expired', 'Consumed', 'All'],
				deviceHeight:0,
			}
		},
		onLoad(){
			// console.log(uni.getStorageSync('userId'))
			this.getCol()
			// setInterval(() => {
			// 	this.getCol()
			// },1000)
		},
		onShow(){
			let that =this
			//判断是不是从shoppinglist添加
			uni.getStorage({
				key:'addToStock',
				success: function(res){
					if(res.data){
						if(res.data.iPicture && res.data.iPicture !=''){
							that.add_src='http://101.35.91.117:7884/item/picture/'+res.data.iId;
							that.filepath=[that.add_src];
						}else{
							that.filepath='';
							that.add_src='';
						}
						that.iName = res.data.iName;
						that.addItemToList = false;
						that.needAddItem = true;
						that.iCategory = res.data.iCategory;
						that.iTime = '';
						that.iCitime = '';
						that.iDetails = '';
						that.iItemid = '';
						uni.setStorageSync('addToStock', null);
					}
				}
			})
			//判断是不是从profile点数字点进来的，切tab
			uni.getStorage({
				key:'goToHistoty',
				success: function(res){
					console.log(res.data)
					if(res.data=='consumed' || res.data=='expired'){
						that.iisSelect = false
						that.issSelect = true
					}else{
						that.iisSelect = true
						that.issSelect = false
					}
					uni.setStorageSync('goToHistoty', '');
				}
			})
			this.getCol()
			this.showTooltip('inStockScanTip')
		},
		methods: {
			get_src(){
				if(this.add_src && this.add_src!=''){
					return this.add_src
				}else{
					return "../../static/noPhoto.png"
				}
				
			},
			getDeviceHeight(){
				let deviceInfo = uni.getSystemInfoSync();
				this.deviceHeight = deviceInfo.windowHeight;
				return this.deviceHeight
			},
			change(data){
				console.log(data.index);
				console.log(data.value);
			},
            getCategory(category){
                this.iCategory = category.newVal;
				this.$forceUpdate()
            },
            getDate(time,type){
            	var dt = new Date(time)
            	var year = dt.getFullYear();
            	var month = dt.getMonth()+1;
            	var day = dt.getDate();
            	var hour = dt.getHours();
            	var minut = dt.getMinutes();
            	var second = dt.getSeconds();
            	month =  month < 10 ? "0"+month : month;
            	day =  day < 10 ? "0"+day : day;
            	hour =  hour < 10 ? "0"+hour : hour;
            	minut =  minut < 10 ? "0"+minut : minut;
            	second =  second < 10 ? "0"+second : second;
            	if(type=='min')
            		var res = day+'-'+month+'-'+year+' '+hour+':'+minut
            	else if(type='day')
            		var res = day+'/'+month
            	return res
            },
			save(){
				
				var date = new Date();
				
				var nowMonth = date.getMonth() + 1;
				
				var strDate = date.getDate();
				
				var seperator = "-";
				
				if (nowMonth >= 1 && nowMonth <= 9) {
				   nowMonth = "0" + nowMonth;
				}
				
				if (strDate >= 0 && strDate <= 9) {
				   strDate = "0" + strDate;
				}
				// var nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
                
                // convert remind time to correct form
                var expDate = new Date(this.iTime);
				var remindTime = (expDate.getDate() - this.iCitime);
				var lsRemindTime = new Date(expDate.setDate(remindTime)).toISOString().split("T")[0];
				// console.log(remindTime);
				// console.log(lsRemindTime);

                //China Timezone needed
                // if(lsRemindTime[2].length === 1){
                //     lsRemindTime[2] = "0" + lsRemindTime[2]
                // }
                //Australian Timezone needed
				// console.log(new Date())
                // if(lsRemindTime[1].length === 1){
                //     lsRemindTime[1] = "0" + lsRemindTime[1]
                // }
                // var remindTime = lsRemindTime[0]+"-"+lsRemindTime[1]+"-"+lsRemindTime[2]
				// console.log(remindTime);
				// console.log(lsRemindTime);
				
                this.tab(this.iTime,date);
				let item = {
				  "addDate": new Date(),
				  "addMethod": "manual",
				  "category": this.iCategory,
				  "conDate": 0,
				  "detail": this.iDetails,
				  "expDate": this.iTime,
				  // "itemId": 0,
				  "name": this.iName,
				  "remindTime": lsRemindTime,
				  "status": this.status,
				  "otherDetail": this.iDetails,
				  "uid": uni.getStorageSync('userId'),
				  "isConsumed":0
				}
				console.log(JSON.stringify(item));
				let that=this
				uni.request({
					method:'POST',
					url:'http://101.35.91.117:7884/item/insert',
					data:JSON.stringify(item)
				}).then(res => {
					console.log(that.filepath[0])
					if(that.filepath[0]){
						uni.uploadFile({
							url: 'http://101.35.91.117:7884/item/update/picture', 
							filePath: that.filepath[0], 
							name: 'picture', 
							formData: {
								item_id: res[1].data
								// file: tempFilePath   
							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes);
							},
							fail: (err) => {
								console.log(err)
							}
						});
					}
										
				})
				this.needAddItem = false
				this.addItemToList = true

				setTimeout(() => {
					this.getCol()
				},1000)
			},
			
            
			getCol(){
				
				// if (uni.getStorageSync('userId')){
					
				// }
				
				uni.request({
					url:'http://101.35.91.117:7884/item/user/'+uni.getStorageSync('userId')
				}).then(res => {
					console.log('res[1].data is: ',res[1].data)
					this.getList()
					this.updateItemList(res[1].data)
				})
			},
			
			getList(){
				uni.request({
				url: "http://101.35.91.117:7884/potential/"+uni.getStorageSync('userId'),
				method: 'get',
				}).then(res=>{
					// console.log('load',res[1].data)
					this.shopList = res[1].data
				})
			},
			// 计算两个date相差多少天
			dateMinus(dateStart, dateEnd) {
				var sdate = new Date(dateStart); 
				sdate.setHours(7)
				var now = new Date(dateEnd); 
				var days = now.getTime() - sdate.getTime(); 
				var day = Math.floor(days / (1000 * 60 * 60 * 24)); 
					
				return day;
			},
			updateItemList(itemList){
				let stockList = []
                let oldstockList = []
				let todayDate = new Date(Date.now())
				for (var i=0;i<itemList.length;i++){
                    var item = itemList[i]
					var exp = new Date(item.expDate.substr(0,10))
					// console.log('exp is: ', exp)
					// console.log('与今天差的天数：', this.dateMinus(todayDate, exp))
					var expireDays = this.dateMinus(todayDate, exp)
					var remind = new Date(item.remindTime.substr(0,10))
					// this.getImgById(item.itemId)
					var temp = item.picture
					// console.log("img", item.picture)
					if(temp==null){
						temp = "../../static/stock-icon.png"
					}
					var itemInfo = {
                        "addDate": item.addDate,
                        "addMethod": item.addMethod,
                        "category": item.category,
                        "conDate": item.conDate.substr(0,10),
                        "detail": item.detail,
                        "expDate": item.expDate.substr(0,10),
                        "itemId": item.itemId,
						"img":temp,
                        "name": item.name,
                        "remindTime": item.remindTime,
                        "status": item.status,
						"time":this.DateDiff(remind,exp),
						"potential": item.potential,
                        "uid": uni.getStorageSync('userId'),
						"expireDays": expireDays
					}
					
					if (itemList[i].status === 'instock'){
						stockList.push(itemInfo)
					}else{
						oldstockList.push(itemInfo)
					}
					
				}
				// console.log(stockList)
				// console.log(this.oldstockList)
				this.stockList = stockList
                this.oldstockList = oldstockList
				// console.log(this.stockList)
			},
			
			consumeItem(item){
				let itemUpdated = {
				  "addDate": item.addDate,
				  "addMethod": item.addMethod,
				  "category": item.category,
				  "conDate": new Date(),
				  "detail": item.detail,
				  "expDate": item.expDate,
				  "itemId": item.itemId,
				  "name": item.name,
				  "remindTime": item.remindTime,
				  "status": "consume",
				}
				
				uni.request({
					method:'POST',
					url:'http://101.35.91.117:7884/item/update',
					data:JSON.stringify(itemUpdated)
				}).then(res => {
					console.log(res)
					this.getCol()
				})
			},

			changeTime(e){
				this.iTime = e.result
				// var array = this.iTime.split('-')
				// this.iTimeInAussieFormat = array[2]+"-"+array[1]+"-"+array[0]
				this.iTimeInAussieFormat =  e.result
				console.log(this.iTimeInAussieFormat)
				console.log(this.iTime)
                
			},
			openTime(){
				this.cshow = true
			},
			changeTab(e){
				if (e === 'is'){
					this.issSelect = false
					this.iisSelect = true
				}else if(e === 'hs'){
					this.iisSelect = false
					this.issSelect = true
				}
			},
			changeAmount(e){
				this.packs = parseInt(this.stockList[e].packs)
				this.chNum = true
				this.needChangeItem = e
				
				
			},
			consume(e){
				var changedItem = this.stockList[this.needChangeItem]
				var lsConsumeTime = new Date().toLocaleDateString().split("/");
                //China Timezone needed
                // if(lsConsumeTime[2].length === 1){
                //     lsConsumeTime[2] = "0" + lsConsumeTime[2]
                // }
				//Australian Timezone needed
                if(lsConsumeTime[1].length === 1){
                    lsConsumeTime[1] = "0" + lsConsumeTime[1]
                }
				var consumeTime = lsConsumeTime[2]+"-"+lsConsumeTime[0]+"-"+lsConsumeTime[1]
				changedItem.conDate = consumeTime
                
				if (e === 'yes'){
					this.consumeItem(changedItem)
					console.log(changedItem)
					console.log(changedItem.itemId)
                    
                    
					uni.request({
						url: 'http://101.35.91.117:7884/item/update/status/'+"consume"+"/id/"+changedItem.itemId,
					}).then(res => {
						this.getCol()
						console.log(res[1])
					})
				}
				this.chNum = false
				this.itemEditor=false
				
			},

            scanCode(){
				// let that = this
				uni.scanCode({
					success: (res) => {
						console.log('type：' + res.scanType);
						console.log('codeID：' + res.result);
						this.icode = res.result;
						uni.request({
							url: "https://world.openfoodfacts.org/api/v2/product/" + this.icode,		
						}).then(ires=>{
							var name = ires[1].data.product.product_name
							console.log(name)
							var categories = ires[1].data.product.categories.split(',')
							console.log(categories[1])
							this.iName = name
							this.iCategory = categories[1]
							this.refreshiCategory = false
							this.$nextTick(function(){
								this.refreshiCategory = true
							})
							// this.$forceUpdate()
						});
					}
				});		
			},
			// searchProduct(){
			// 	if(this.iCategory === ''){
			// 		this.list = this.options  
			// 	}else{
			// 		this.showList = []
			// 		this.showList = this.options.filter((item)=>{
			// 			return item.label.indexOf(this.iCategory)>=0
			// 		})
			// 	} 
			// 	console.log(this.showList)
			// 	this.showSelect = true
			// },   
            scanDate(){
				let that = this
				uni.chooseImage({
					count: 1, 
					sizeType: ['original', 'compressed'], 

					sourceType: ['camera', 'album'], 

					success:  (res) => {
						console.log(String(res.tempFilePaths[0]));
						uni.previewImage({
							urls: res.tempFilePaths,
						});
						
						//跳过服务器
						console.log("上传了: " + String(res.tempFilePaths[0]) + "  --------")
						console.log("ocr 的返回结果：");
						
						that.iTime = "2022-11-22";
						// console.log(that.iTime);
						// uni.uploadFile({
							// url: 'http://localhost:8080/ocr', // ------------------- 每次测之前改一下 ------------------------
							// method : 'POST',
							// // filePath : res.tempFilePaths[0],
							// filePath : String(res.tempFilePaths[0]),
							// name : 'media',
							// header: {
							// 	'content-type': 'multipart/form-data' 
							// },
							
							// success: (res) => {
							// 	console.log(res.statusCode)
							// 	console.log("上传了: " + String(res.tempFilePaths[0]) + "  --------")
							// 	console.log("ocr 的返回结果：");
							// 	console.log(res.data);

							// 	that.iTime = uploadFileRes;
							// 	console.log(that.iTime);
							// },
							// fail: (uploadFileRes) => {
							// 	console.log(uploadFileRes.statusCode)
								
							// 	console.log("爷失败了");
							// 	console.log(uploadFileRes+"\n==============");
								
							// }
							
						// });
						

					}
				});
			},
            
			onClickBtn(e){
				console.log("e.key is: ", e.key)
				if (e.key == 'add'){
					// console.log('111')
					this.addItemToList = false
					this.needAddItem = true
					// this.iName = '';
					
					// this.iCategory = ''; ////// ------
					
					this.iTime = '';
					this.iCitime = '';
					this.iDetails = '';
					this.iItemid = '';
					this.filepath='';
					this.add_src='';
					// console.log('change')
					this.showTooltip("addScanTip")
				}else if(e.key == 'back'){
					this.addItemToList = true
					this.needAddItem = false
					this.filepath='';
					this.add_src='';

				}else if(e.key == 'scan'){
                    this.scanCode();
					this.needAddItem = true
					this.addItemToList = false
                }else{
					this.scanDate();
				}
			},
            
			DateDiff(date1, date2) {
				const date1utc = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
				const date2utc = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
				var day = 1000*60*60*24;
				return (date2utc - date1utc)/day
			},
			choosePhoto(){
				let that = this
				uni.chooseImage({
				    count: 1, 
				    sizeType: ['original', 'compressed'], 
				    sourceType: ['album','camera'], 
				    success: function (res) {
				        console.log(JSON.stringify(res.tempFilePaths));
						that.filepath = res.tempFilePaths
						that.add_src=res.tempFilePaths[0]
						// console.log(that.add_src)
						// uni.previewImage({
						// 	urls: res.tempFilePaths,
						// });
				    }
				});
			},
			tab(date1,date2){
                // console.log(date1, date2)
				// exp 1, today2
				var oDate1 = new Date(date1);
                // console.log(oDate1)
				var oDate2 = new Date(date2);
                // console.log(oDate2)
				if(oDate1.getTime() >= oDate2.getTime()){
					// console.log('instock');
					this.status='instock';
				} else if(oDate1.getTime() < oDate2.getTime()){
					console.log('expire');
					this.status='expire';
				}
			},
			edit(item, index){
				this.itemEditor = true;
				// Object.keys(item).forEach(key => {
				// 	console.log(key, item[key]);
				// });
				this.iName = item.name;
				this.iCategory = item.category;
				// this.iTime = item.expDate;
				this.iTimeInAussieFormat = item.expDate
				this.iCitime = item.time;
				this.iDetails = item.detail;
				this.iItemid = item.itemId;
				this.editItem = item
			},
			editClient(){

					var date = new Date();
					
					var nowMonth = date.getMonth() + 1;
					
					var strDate = date.getDate();
					
					var seperator = "-";
					
					if (nowMonth >= 1 && nowMonth <= 9) {
					   nowMonth = "0" + nowMonth;
					}
					
					if (strDate >= 0 && strDate <= 9) {
					   strDate = "0" + strDate;
					}
					// var nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
				    
				    // convert remind time to correct form
				    var expDate = new Date(this.iTime);
				    var remindTime = (expDate.getDate() - this.iCitime);
				    var lsRemindTime = new Date(expDate.setDate(remindTime)).toISOString().split("T")[0];
					
					console.log(lsRemindTime)
				    // console.log(remindTime);
				    // console.log(lsRemindTime);
					//China Timezone needed
				    // if(lsRemindTime[2].length === 1){
				    //     lsRemindTime[2] = "0" + lsRemindTime[2]
				    // }
				    //Australian Timezone needed
					// // console.log(new Date())
				 //    if(lsRemindTime[1].length === 1){
				 //        lsRemindTime[1] = "0" + lsRemindTime[1]
				 //    }
				 //    var remindTime = lsRemindTime[0]+"-"+lsRemindTime[1]+"-"+lsRemindTime[2]
					// console.log(remindTime);
					// console.log(lsRemindTime);
					
					this.tab(this.iTime,date);
					let item = {
					  "addDate": this.editItem.addDate,
					  "addMethod": this.editItem.addMethod,
					  "category": this.iCategory,
					  "conDate": this.editItem.conDate,
					  "detail": this.iDetails,
					  "expDate": this.iTimeInAussieFormat,
					  "itemId": this.iItemid,
					  "name": this.iName,
					  "remindTime": lsRemindTime,
					  "status": this.editItem.status,
					  "otherDetail": this.iDetails,
					}
					console.log(JSON.stringify(item))
					uni.request({
						method:'POST',
						url:'http://101.35.91.117:7884/item/update',
						data:JSON.stringify(item)
					}).then(res => {
						console.log(res)
					})
					this.needAddItem = false
					this.addItemToList = true
				
					setTimeout(() => {
						this.getCol()
					},1000)
					this.itemEditor = false;
					
			},
			calExpreDays(stockList) {
				let todayDate = new Date(Date.now())
				for (var i=0;i<stockList.length;i++){
                    var item = stockList[i]
					var exp = new Date(item.expDate.substr(0,10))
					// console.log('exp is: ', exp)
					// console.log('与今天差的天数：', this.dateMinus(todayDate, exp))
					var expireDays = this.dateMinus(todayDate, exp)
					stockList[i].expireDays = expireDays
				}
				return stockList
			},
			// 1: 'Expired', 2: 'Category', 3: 'Name', 4: 'Default'
			selectSortingItemList(xflSelectResult){
				if (xflSelectResult.newVal == this.sortingMethod[0]) {
					uni.request({
					url: 'http://101.35.91.117:7884/item/user/'+uni.getStorageSync('userId') + '/1',
					method: 'get',
					}).then(res=>{
						let stockList = res[1].data
						this.stockList = this.calExpreDays(stockList)
					})
				} else if (xflSelectResult.newVal == this.sortingMethod[1]) {
					uni.request({
					url: 'http://101.35.91.117:7884/item/user/'+uni.getStorageSync('userId') + '/2',
					method: 'get',
					}).then(res=>{
						let stockList = res[1].data
						this.stockList = this.calExpreDays(stockList)
					})
				} else if (xflSelectResult.newVal == this.sortingMethod[2]) {
					uni.request({
					url: 'http://101.35.91.117:7884/item/user/'+uni.getStorageSync('userId') + '/3',
					method: 'get',
					}).then(res=>{
						let stockList = res[1].data
						this.stockList = this.calExpreDays(stockList)
					})
				} else if (xflSelectResult.newVal == this.sortingMethod[3]) {
					uni.request({
					url: 'http://101.35.91.117:7884/item/user/'+uni.getStorageSync('userId') + '/4',
					method: 'get',
					}).then(res=>{
						let stockList = res[1].data
						this.stockList = this.calExpreDays(stockList)
					})
				}


			},
			sortStockListAlphabetical(){
				// this function will sort the stocklist by the name of each item in ascending order
				this.stockList.sort(function(a, b){
				  let dateA = a.name;
				  let dateB = b.name;
				  if (dateA < dateB){
				    return -1;
				  } else if (dateA > dateB){
				    return 1;
				  }   
				  return 0;
				});
			}
			,
			sortStockListByExpDate(){
				// this function will sort the stocklist by the expire date of each item in ascending order
				// E.g. Apple expires at 2021/Dec/12, Orange expires at 2021/Nov/11, Tofu expires at 2021/Dec/31
				// the order after sort will be Orange -> Apple -> Tofu
				this.oldstockList.sort(function(a, b){
				  let dateA = a.expDate;
				  let dateB = b.expDate;
				  if (dateA < dateB){
				    return -1;
				  } else if (dateA > dateB){
				    return 1;
				  }   
				  return 0;
				});
			}
			,
			sortStockListByAddDate(){
				// this function will sort the stocklist by the date date of each item in ascending order
				// E.g. Apple added at 2021/Dec/12, Orange added at 2021/Nov/11, Tofu added at 2021/Dec/31
				// the order after sort will be Orange -> Apple -> Tofu
				this.stockList.sort(function(a, b){
				  let dateA = a.addDate;
				  let dateB = b.addDate;
				  if (dateA < dateB){
				    return -1;
				  } else if (dateA > dateB){
				    return 1;
				  }   
				  return 0;
				});
			},
			
			//history   -1:all, -2:expire, -3:consume
			selectItemTags(tags){
				if (tags.newVal === "Expired"){

					console.log('测试过期')
					
					uni.request({
					url: 'http://101.35.91.117:7884/item/user/'+uni.getStorageSync('userId') + '/-2',
					method: 'get',
					}).then(res=>{
						console.log('load',res[1].data)
						this.oldstockList = res[1].data
					})
					
					
					
				} else if (tags.newVal === "Consumed") {
					
					console.log('测试消耗')
					uni.request({
					url: 'http://101.35.91.117:7884/item/user/'+uni.getStorageSync('userId') + '/-3',
					method: 'get',
					}).then(res=>{
						console.log('load',res[1].data)
						this.oldstockList = res[1].data
					})
				} else if (tags.newVal === "All") {
					
					console.log('没有过滤器')
					uni.request({
					url: 'http://101.35.91.117:7884/item/user/'+uni.getStorageSync('userId') + '/-1',
					method: 'get',
					}).then(res=>{
						console.log('load',res[1].data)
						this.oldstockList = res[1].data
					})
				}
			},		
			getImgById(id){
				uni.request({
				url: "http://101.35.91.117:7884/item/picture/"+id,
				method: 'get',
				}).then(res=>{
					console.log(res[1].data)
				})
			},
			
			saveList(id){
				// uni.showLoading({title: 'updating',mask:true});
				uni.request({
				url: "http://101.35.91.117:7884/potential/add/"+id+"/"+uni.getStorageSync('userId'),
				method: 'get',
				}).then(res=>{
					this.getCol()
					// setTimeout(function () {uni.hideLoading();}, 1000);
				})
			},
			deleteList(id){
				// uni.showLoading({title: 'updating',mask:true});
				uni.request({
				url: "http://101.35.91.117:7884/potential/remove/"+id+"/"+uni.getStorageSync('userId'),
				method: 'get',
				}).then(res=>{
					this.getCol()
					// setTimeout(function () {uni.hideLoading();}, 1000);
				})
			},		
			changePhoto(){
				let that = this
				uni.chooseImage({
				    count: 1, 
				    sizeType: ['original', 'compressed'], 
				    sourceType: ['album','camera'], 
				    success: function (res) {
						// console.log(that.iItemid)
						// console.log(res.tempFilePaths[0])
						uni.uploadFile({
							url: 'http://101.35.91.117:7884/item/update/picture', 
							filePath: res.tempFilePaths[0], 
							name: 'picture', 
							formData: {
								item_id: that.iItemid
								// file: tempFilePath   
							},
							success: (uploadFileRes) => {
								// console.log(uploadFileRes);
								// location.reload()
								setTimeout(() => {
									that.getCol()
								},1000)
							},
							fail: (err) => {
								console.log(err)
							}
						});
				    }
				});
				this.itemEditor=false	
			},
			showTooltip(tipName) {
				var userIdString = uni.getStorageSync('userId').toString()
				// console.log('userIdString is: ', userIdString)
				var userTooltip = uni.getStorageSync(userIdString)
				
				if (userTooltip == undefined || userTooltip == '') {
					var userTooltip = {}
					uni.setStorageSync(userIdString, userTooltip)
				}
				// console.log('userTooltip is: ', userTooltip)
				try {
					var inStockScanTip = userTooltip[tipName]
					// console.log(tipName, ' is: ', inStockScanTip)
				} catch (error) {
					console.log("error is :", error)
					userTooltip.tipName =  false
				}
				if (tipName == 'addScanTip') {
					var content = "You can click the scan button to scan the expire date, app will add it automatically."
				} else if (tipName == 'inStockScanTip') {
					var content = "Click the scan button on top right to add a new item in you list!"
				}
				console.log('show tool tip')
				// if (inStockScanTip == "") {
				// 	var inStockScanTip = 1
				// 	uni.setStorageSync(tipName, inStockScanTip)
				// } else {
				// 	uni.setStorageSync(tipName, inStockScanTip + 1)
				// }
				if (inStockScanTip == undefined) {
					uni.showModal({
						title: "Tool Tips",
						content: content,
						showCancel: false,
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
					userTooltip[tipName] =  false
					// console.log("userTooltip is: ", userTooltip)
					uni.setStorageSync(userIdString, userTooltip)
				}
			}
		},
	}
</script>

<style>
	page{
		background-color: #B0C07A;
	}
	.aline{
		display: flex;
		/* justify-content: center; */
		align-items: center;
	}
	.content{
		display: flex;
		justify-content: center;
		width: 100%;
	}
	.selected-item{
		font-size: 15px;
		font-weight: 900;
		color: black;
	}
	.un-select-item{
		font-size: 12px;
		font-weight: 300;
		color: #545b66;
	}
	.stock-card{
		width: 90%;
		/* height: 300rpx; */
		padding: 10px 10px 10px 10px;
		background-color: white;
		margin-top: 50rpx;
		border-radius: 10px;
		display: flex;
		justify-content: center;
		flex-direction: column;
		text-align: center;
	}
	.t-bg{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.sm-ipbox{
		margin-top: 40px;
		display: flex;
		justify-content: center;
		flex-direction: row;
		text-align: center;
		
		
		
	}
	.sum-item{
		margin-top: 10px;
		font-size: 20px;
		margin-left: 15px;
		font-weight: 1900;
	}
	.add-card-item{
		display: flex;
		justify-content: center;
		flex-direction: column;
		width: 100%;
		margin-top: 30px;
		/* text-align: center; */
		/* align-items: center; */
	}
</style>