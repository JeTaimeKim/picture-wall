import React from "react";
import ReactDOM from "react-dom";
export default class NavControl extends React.Component{
	constructor(){
		super();
		this.btnClick = this.btnClick.bind(this);
	}
	btnClick(e){
		if(this.props.arrange.iscenter){
			this.props.front();
		}
		else{
			this.props.center();
		}
	}



	render(){

		let controlName = 'btnCtr';
//图片居中，则添加居中class显示居中图标
	
		controlName+=this.props.arrange.iscenter ? ' center' : '';
	
//图片翻转，则添加翻转class显示翻转图标
	
		controlName+=this.props.arrange.back ? ' back' : '';
	


		return(
	<span className={controlName} onClick={this.btnClick}></span>
			)
	}
}