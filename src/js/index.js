import React from "react";
import ReactDOM from "react-dom";
import PicShow from "./picShow";
export default class MainIndex extends React.Component{
  render(){
    return (
      <div>
      <PicShow/>
      </div>
    );
  };
}
ReactDOM.render(
	<MainIndex/> , document.getElementById("picshow")
	);