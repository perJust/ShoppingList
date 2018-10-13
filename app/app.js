
var vm = new Vue({
	el:'#app',
	data:{
		listshop:[
			{
				name:'2017新款黑色长袖',
				material:'90',
				img:'./img/2017blackbea.png',
				description:'黑色短款风采迷人啊沙发沙发沙发舒服撒放散阀阿斯顿撒大所多撒多撒多撒',
				origin:'成都',
				price:'600'
			},
			{
				name:'2017新款黑色长袖',
				material:'80',
				img:'./img/2017windnew.png',
				description:'黑色短款风采迷人啊沙发沙发沙发舒服撒放散阀阿斯顿撒大所多撒多撒多撒',
				origin:'西安',
				price:'500'
			},
			{
				name:'2017新款黑色长袖',
				material:'98',
				img:'./img/2017winternew.png',
				description:'黑色短款风采迷人啊沙发沙发沙发舒服撒放散阀阿斯顿撒大所多撒多撒多撒',
				origin:'北京',
				price:'1600'
			},
			{
				name:'2017新款黑色长袖',
				material:'90',
				img:'./img/2017yellownew.png',
				description:'黑色短款风采迷人啊沙发沙发沙发舒服撒放散阀阿斯顿撒大所多撒多撒多撒',
				origin:'成都',
				price:'1800'
			}
		],
		dataAbout:'∨  展开获取更多',
		num:[],
		dataBoolean:false,
		dataMediumOnce:true,
		// dataMoreColor:false
		dataDisabled:false,
		// sumAllval:0,
		sumAllMedium:[],
		// sumAllMediumS:[],
		dataCheck:[],  
		dataCheckval:[],
		allselectdata:false,
		// medium:0
		allSelectMedium:[],
		devDisabled:[]
	},
	methods:{
		addData(){
			if (!this.dataBoolean) {
				this.listshop.push(
				{
					name:'2017新款黑色长袖',
					material:'95',
					img:'./img/2017yellownew.png',
					description:'黑色短款风采迷人啊沙发沙发沙发舒服撒放散阀阿斯顿撒大所多撒多撒多撒',
					origin:'成都',
					price:'2800'
				})
    		this.num.push(1);
    		this.dataCheck.push(0);
    		this.dataBoolean = true;
    		this.dataAbout = '∧  暂无更多';
    		this.allselectdata = false;
    		this.devDisabled.push(0);//不能push(false)
    						// if(null !== false){console.log(1)} 仅判断null不等于false
    		// this.dataMoreColor = true;
    		}else if(this.dataBoolean && this.dataMediumOnce){ //做判断,确保已展开情况下删除展开数据正常，bug：如果展开数据后删除展开的数据，再点击"暂无更多"时会将继续删除上面的数据
    			this.listshop.pop();  						//如果要删除一个后隐藏的数据上升，需要增加判断 && !this.dataMoreColor
    			this.num.pop();//严谨    就是由于没有这一步，导致点击时，computed里报错
    			this.dataCheck.pop();
    			this.dataCheckval.sort(function(a,b){
    				return b-a
    			}).shift();
    			this.devDisabled.pop();

    			this.sumAllMedium.pop();
    			this.dataBoolean = false;
    			this.dataAbout = '∨  展开获取更多';
    			// this.dataMoreColor = false;
    			// if(this.listshop.length == 0){
    			// 	this.dataMoreColor = true;
    			// }
    		}
		},
		dataDelete(index){
					// if(!this.dataMoreColor){		//如果要删除一个后隐藏的数据上升，需要增加一个唯一一次的删除判断
					// 	this.addData();
					// 	this.dataMoreColor = true;
					// }
					// console.log(index);
		//	if(index == this.listshop.length-1){ //判断是否为列表最后一个
											//上面这个判断，未展开前删除最后一个，展开后就不能收回展开项了，如果想收回展开项，below
			if(index == this.listshop.length-1 && this.dataBoolean){	//增加一个条件即可，add：在展开时并且进行了删除最后一个
				this.dataMediumOnce = false;
			}
			// this.listshop =this.listshop.slice(index);
			this.listshop.splice(index,1);
			this.num.splice(index,1);
			this.dataCheck.splice(index,1);
			

			// console.log(this.dataCheckval);
			// if(this.dataCheckval.indexOf(index) >= 0){ //这步很关键，执行下面一步必须indexOf先找到，不然.splice(-1,1)就会固定删除最后一个
			// 	this.dataCheckval.splice(this.dataCheckval.indexOf(index),1);				
			// };
			
			// this.dataCheckval = [];
			// for(var i=0;i<this.dataCheck.length;i++){
			// 	this.checkJug(!this.dataCheck[i],i);
			// }


			//datacheckval之所以会存在bug，是因为每次视图删除数据时，页面组件更新，然而更新后的dataCheckval存值未将之前的删除
			// console.log(this.dataCheckval);
			// this.dataCheck.splice(index,1);
			// console.log("123"+this.sumAllMedium);
			// console.log("dataIndex:",index)
			// this.sumAllMedium.splice(index,1,null);
		
		},
		dataDeleteAll(){
			this.listshop = [];
			this.dataDisabled = true;
			this.dataAbout = '∧  暂无更多';
    		this.dataBoolean = true;
    		this.dataCheckval = [];//总金额为0
    		this.dataCheck = [];//选择项为空
		},
		sum(a,b){
			var num = a*Number(b);
			
			// console.log(b)  //这是有值的
			// console.log(num);//NaN  因为a没有值，也就是num[index]没有值，原因在于钩子函数mounted，组件加载完毕后执行fill(1)操作
			// console.log(this.sumAllval)
			// console.log(typeof num);
			// this.sumAllval =this.sumAllval + num  //这样实现不了的原因就是上述说明的，如果要实现，可以做个判断，给个Boolean值false，在mounted执行时，把这个Boolean值true
			// this.sumAllval = Number(val)
			// console.log( typeof Number(val));
			
			// this.sumAllMedium.push(num);  //这一步其实与上面相同理解
			
			return num;
		},
		checkJug(bool,ind){
			// console.log(ind);
			console.log("dataCheck[index]与v-model比较",bool);//由此可知，下面之所以是这样是因为传入的参数dataCheck[index]其实是还未改变的，在这里可以理解为先click后再响应v-model中data改变
			if(bool){ //难道是checkBox和@click
				this.dataCheckval.push(ind);
			}else if(typeof bool == 'boolean'){
				// this.dataCheckval.splice(this.dataCheckval.indexOf(0),1);
				this.dataCheckval.splice(this.dataCheckval.indexOf(ind),1);
			}
			if(this.dataCheckval.length == this.listshop.length){
				this.allselectdata = true;
			}else{
				this.allselectdata = false;	
			}
		},
		deleteSelect(){
			var medium = this.dataCheckval.sort(function(a,b){
				return b-a;
			});
			console.log("从大到小排列"+ medium); //不用medium也可以  因为.sort会返回修改后的数组
			// console.log("从大到小排列"+ this.dataCheckval);
			for(value of medium){
				this.listshop.splice(value,1);
				this.num.splice(value,1);
				this.dataCheck.splice(value,1);
			};
			this.dataCheckval = [];
			this.dataCheck.fill(0);
			// console.log(medium.indexOf(this.listshop.length));
			if(!medium.indexOf(this.listshop.length) && this.dataBoolean){	//增加一个条件即可，add：在展开时并且进行了删除最后一个
				this.dataMediumOnce = false;
			};
			if(this.allselectdata && this.dataBoolean){	//全选状态下，删除所选  之前bug是展开全选删除后，操作两次又可以展开
				this.dataMediumOnce = false;
			}

			return this.allselectdata = false;
		},
		allselecthandle(){
			// console.log(this.allselectdata);
			this.dataCheck = this.dataCheck.concat();
			var allmedium = [];
			if(!this.allselectdata && this.dataCheck.length){
				this.dataCheck.fill(1);
				for(var i=0;i<this.listshop.length;i++){
					allmedium[i] = i;
				}
			}else{
				this.dataCheck.fill(0);
			}
			this.dataCheckval = allmedium;
		},
		quantity(index){
			// this.num.push(0);//这两步纯粹是为了改变data中原有数据 使其监听到 从而实时绑定到下面更改的内容
			// this.num.pop();	//应该有其他相应的实施相应措施
			this.num = this.num.concat();//效果与上相同				
			this.sumAllMedium = this.sumAllMedium.concat();//由此可知，要想在点击中相应需要响应的data数据，需要体现在该事件中使其发生了改变，然后Vue才会去对应视图做对象改变
			//以上两步，分别想在该点击事件时，使视图更新关于这两个绑定的内容

			if(this.num[index] <= 0 || ! Number(this.num[index])){ //这里可以加一个或判断  如果输入的不是数字  也进入if
				// console.log("quantity in ",typeof Number(this.num[index]))
				// console.log(Number(this.num[index]));
				// console.log(typeof NaN,!NaN,NaN);//number  true   NaN
				this.num[index] = 1; //这样弄  vue是不能识别的   文档上有说明
			}else{
				this.devDisabled[index] = false;
			}
		},
		addquantity(index){
			// this.num.push(0);//这两步纯粹是为了改变data中原有数据 使其监听到 从而实时绑定到下面更改的内容
			// this.num.pop();	//应该有其他相应的实施相应措施
			this.num = this.num.concat();
			this.sumAllMedium = this.sumAllMedium.concat();
			// console.log(this.sumAllMedium)			

			this.num[index]++;
			this.devDisabled[index] = false;
			// console.log(this.num[index]=5) // 这样做没引起v-model的改变  是因为将数组里的一个值改变了 但是this.num依旧指向这个对象未改变，从而没监听到
			// console.log(this.num)	//可以这样测试  先点击+  然后再点击其他的 如删除或者checkbox 那么v-model立即改变了
		},
		devquantity(index){
			// this.num.push(0);//这两步纯粹是为了改变data中原有数据 使其监听到 从而实时绑定到下面更改的内容
			// this.num.pop();	//应该有其他相应的实施相应措施
			this.num = this.num.concat();
			this.sumAllMedium = this.sumAllMedium.concat();

			if(this.num[index] > 2){	//以下两步if可实现 当减为1时 disabled状态
				this.num[index]--;
			}else if(this.num[index] = 2){	//这里是2  如果是1  那么视图都变成1了  这边还可以进入判断，也就是要多点一次才可disabled
				this.num[index]--;	//变为1，立即使其disabled
				this.devDisabled[index] = true;
			}
			// console.log(this.num[index]=5) // 这样做没引起v-model的改变  是因为将数组里的一个值改变了 但是this.num依旧指向这个对象未改变，从而没监听到
			// console.log(this.num)	//可以这样测试  先点击+  然后再点击其他的 如删除或者checkbox 那么v-model立即改变了
		}
	},
	computed:{
		sumAll(){   //但是这样就要计算多次this.num[i] * this.listshop[i].price因为上面sum方法就要计算一次，可以把sum计算的值保存下来{{sumAllMedium[index] = sum(num[index],item.price)}}，然后再在这里调用
			// var sumVal = 0;
			// for(var i = 0;i < this.num.length;i++){
			// 	// console.log(this.num.length)
			// 	// sumVal = sumVal + this.num[i] * Number(this.listshop[i].price);
			// 	sumVal = sumVal + this.sumAllMedium[i];
			// };
			// return sumVal;
			
			var sumVal = 0;
			// console.log(this.dataCheckval)
			// if([]){ console.log("[]"); };//[]
			// if(this.sumAllMedium){
				for(value of this.dataCheckval){
					console.log("sumall",this.dataCheckval);
					console.log("sumAllMedium",this.sumAllMedium);
					sumVal = sumVal + this.sumAllMedium[value]
				};				
			// };

			return sumVal;
		}
	},
	watch:{
		// dataCheckval:function(val,oldval){
		// 	console.log(val,"+",oldval)
		// 	this.sumAllMedium = [];
		// },
		dataCheck:function(){
			console.log("dataCheck change");
			console.log(this.sumAllMedium);
			console.log(this.dataCheck);
			this.dataCheckval = [];
			// this.dataCheckval = Array(this.listshop.length);
			for(var i=0;i<this.dataCheck.length;i++){  //这里就是为啥删除后要this.dataCheck.splice原因
				this.checkJug(this.dataCheck[i],i);
			}
			console.log("change:",this.dataCheckval);
		}
		// sumAllMedium:function(val,oldval){
		// 	console.log(val,"++",oldval)
		// 	val = [];
		// },
	},
	mounted:function(){  //页面挂载后执行
	// console.log(this.listshop.length);
    this.num = Array(this.listshop.length).fill(1);
    this.dataCheck = Array(this.listshop.length).fill(0);

    // this.devDisabled.fill(true); 空数组fill？
	this.devDisabled = Array(this.listshop.length).fill(true);//可实现组件加载进去后，减号按钮disabled

	// this.sumAllMedium = this.sumAllMediumS.concat();
	// console.log(this.sumAllMediumS)
	}
});
