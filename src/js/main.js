import React from "react";
import ReactDOM from "react-dom";
const picData = require("../picData.json");    //获取图片信息


		//获取图片信息

let picDatas = ((arr)=>{
		for(let i=0;i<arr.length;i++){
			let pic = arr[i];
			pic.url = '../src/img/'+arr[i].name;
			arr[i] = pic;
		}
			return arr;
		})(picData);

 class Picture extends React.Component{
	constructor(){
			super();
			this.picClick=this.picClick.bind(this);
		}
picClick(e){
	if(this.props.arrange.center){
		this.props.turnPic();
	}
	else{
		this.props.center();
	}
}

		
	render(){

let styleObj={};
if (this.props.arrange.pos){
	styleObj = this.props.arrange.pos;
}
if(this.props.arrange.rotate){
	styleObj['transform']=`rotate({this.props.arrange.rotate}deg)`
}
if(this.props.arrange.center){
	styleObj.zIndex = 111;
}
let imgClassName = 'pic';
imgClassName += this.props.arrange.front ? 'front' : '';


return(
	<div className={imgClassName} style={styleObj} onClick={this.picClick}>
		<img src={this.props.data.url} alt={this.props.data.name}/>
		<div className='back' onClick={this.picClick}>
			<p>{this.props.data.desc}</p>
		</div>
	</div>
	)
}
}

class navControl extends React.Component{
	constructor(){
		super();
		this.btnClick = this.btnClick.bind(this);
	}
	btnClick(e){
		if(this.props.arrange.center){
			this.props.turnPic();
		}
		else{
			this.props.center();
		}
	}



	render(){

		let controlName = 'btnCtr';
//图片居中，则显示居中图标
	if(this.props.arrange.center){
		controlName+=this.props.center ? 'center' : '';
	}
//图片翻转，则显示翻转图标
	if(this.props.arrange.front){
		controlName+=this.props.front ? 'front' : '';
	}


		return(
	<span className={controllerName} onClick={this.btnClick}></span>
			)
	}
}



export default class picShow extends React.Component{

constructor(){
	super();
	this.Contans={
		centerPos:{
			left:0,
			top:0
		},
		hPosRange:{
			leftSecX:[0,0],
			rightSecX:[0,0],
			Y:[0,0]
		}
	}
	this.state={
		imgArr:[]
	}

}

//翻转图片
		turnPic(index) {
			return()=>{
			let imgArr = this.state.imgArr;
			imgArr[index].front=!imgArr[index].front;
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
		      YRangeMax = 600-350/2,
		      YRangeMin = 350/2;


//产生随机数
		let picRandom = (max,min) => Math.floor(Math.random()*(max-min)+min),
			degRandom = () => {(Math.random()>0.5?"":"-")+Math.ceil(Math.random()*30)};

//中心图片
let imgCenterArr = imgArr.splice(index,1);
imgCenterArr[0]={
	pos:{
		left:485,
		top:150
	},
	rotate:0,
	front:true
};
//左右区域图片
		let length = imgArr.length;
		for(let i=0;i<length;i++){
			if(i<length/2){
				imgArr[i]={
				center:false,
				rotate:degRandom(),
				pos:{
					left:picRandom(lXRangeMax,lXRangeMin),
					 top:picRandom(YRangeMax,YRangeMin)
				}
			}
			}		
			else{
				imgArr[i]={
				center:false,
				rotate:degRandom(),
				pos:{left:picRandom(rXRangeMax,rXRangeMin),
					 top:picRandom(YRangeMax,YRangeMin)
				}
			}
			}
		}
		//将取出的中心图片再添加回数组
		imgArr.splice(index,0,imgCenterArr[0]);

}
center(index){
	return()=>this.changePosition(index)
}
componentDidMount(){
	changePosition(0);
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
				front:false,
				center:false
			};
		}
		imgShow.push(<ImgShow data={value} key={index} arrange={this.state.imgArr[index]} front={this.turnPic(index)} center={this.center(index)}/>);
		btnShow.push(<btnShow key={index} arrange={this.state.imgArr[index]} inverse={this.turnPic(index)} center={this.center(index)}/>)
	})
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
	};
}
picShow.defaultProps = {
};