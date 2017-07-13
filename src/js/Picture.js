import React from "react";
import ReactDOM from "react-dom";


export default class Picture extends React.Component{
	constructor(){
			super();
			this.picClick=this.picClick.bind(this);
		}
picClick(e){
	if(this.props.arrange.iscenter){
		this.props.front();
	}
	else{
		this.props.center();
	}
}

		
	render(){
//设置样式 图片位置 旋转角度 
let styleObj={};
if (this.props.arrange.pos){
	styleObj = this.props.arrange.pos;
}
if(this.props.arrange.rotate){
	styleObj.transform = "rotate("+this.props.arrange.rotate+"deg)"
}
if(this.props.arrange.iscenter){
	styleObj.zIndex = 1;
}
//图片翻转添加翻转class
let imgClassName = 'pic';
imgClassName += this.props.arrange.back ? ' picback' : '';





return(
	<div className={imgClassName} style={styleObj} onClick={this.picClick}>
		<div className='img'>
			<img src={this.props.data.url} alt={this.props.data.name}/>
			</div>
			<div className='backshow' >
				<p>{this.props.data.desc}</p>
			</div>
		</div>
	)
}
}
