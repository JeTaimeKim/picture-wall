import React from "react";
import ReactDOM from "react-dom";
import Picture from "./Picture";
import NavControl from "./navControl";

//获取图片信息
let picData = require("../picData.json");    

let picDatas = ((arr)=>{
		for(let i=0;i<arr.length;i++){
			let pic = arr[i];
			pic.url = '../src/img/'+arr[i].name;
			arr[i] = pic;
		}
			return arr;
		})(picData);


export default class PicShow extends React.Component{

constructor(){
	super();
	this.state={
		imgArr:[]
	}

}

//翻转图片
		turnPic(index) {
			return()=>{
			let imgArr = this.state.imgArr;
			imgArr[index].back=!imgArr[index].back;
			this.setState({
				imgArr:imgArr
			});
		}
		}



//变换图片位置与状态
 changePosition(index) {
 	let imgArr = this.state.imgArr;
		
//图片位置范围(分为左右两个部分)
		const lXRangeMax = 600-115*3,
		      lXRangeMin = -115,
		      rXRangeMax = 1200-115,
		      rXRangeMin = 600+115,
		      YRangeMax = 500-350/2,
		      YRangeMin = -350/2;


//产生随机数
		let rangeRandom = (max,min) => Math.floor(Math.random()*(max-min)+min),
			degRandom = () => (Math.random()>0.5?" ":"-")+Math.ceil(Math.random()*30);

//中心图片

let imgCenterArr = imgArr.splice(index,1);
imgCenterArr[0]={
	pos:{
		left:"485px",
		top:"100px"
	},
	rotate:0,
	back:false,
	iscenter:true
};


//左右区域图片
		let length = imgArr.length;
		for(let i=0;i<length;i++){
			if(i<length/2){
				imgArr[i]={
				back:false,
				iscenter:false,
				rotate:degRandom(),
				pos:{
					left:rangeRandom(lXRangeMax,lXRangeMin)+"px",
					 top:rangeRandom(YRangeMax,YRangeMin)+"px"
				}
			}
			}		
			else{
				imgArr[i]={
				back:false,
				iscenter:false,
				rotate:degRandom(),
				pos:{left:rangeRandom(rXRangeMax,rXRangeMin)+"px",
					 top:rangeRandom(YRangeMax,YRangeMin)+"px"
				}
			}
			}
		}
		//将取出的中心图片再添加回数组
		imgArr.splice(index,0,imgCenterArr[0]);
		this.setState({
				imgArr:imgArr
			});

}
//中心图片
center(index){
	return()=>this.changePosition(index)
}
//页面组件加载完毕使第一张图位于中心位置
componentDidMount(){
	this.changePosition(0);
}

render(){

	let btnShow=[],imgShow=[];
	picDatas.forEach((value,index)=>{
		if(!this.state.imgArr[index]){
			this.state.imgArr[index]={
				pos:{
					left:0,
					top:0
				},
				rotate:0,
				back:false,
				iscenter:false
			};
		}
		imgShow.push(<Picture data={value} key={index} arrange={this.state.imgArr[index]} front={this.turnPic(index)} center={this.center(index)}/>);
		btnShow.push(<NavControl key={index} arrange={this.state.imgArr[index]} front={this.turnPic(index)} center={this.center(index)}/>)
	});
		return(
 				<div>
 					<section className="picture">
 					 {imgShow}
 					</section>
 					<section className="btn">
 						{btnShow}
 					</section>
 				</div>	
			)
	}
}