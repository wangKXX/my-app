import React, { Component } from 'react';
import './List.css';
import listData from "./data/list.config.json";
class List extends Component{
	constructor(props) {
        super(props);
        this.state = {
        	listitem: [],
        	left:0,
        	width:0
        };
        
    }
    removeClass(domArr){
    	for(var i=0;i<domArr.length;i++){
    		domArr[i].classList.remove("selected");
    	}
    }

    addClass(dom,classname){
    	dom.classList.add(classname);
    }
	hoverdown(e){
		
		var _target = e.target;
		var index = _target.getAttribute("index");
		var left = _target.offsetLeft;
		var width = _target.offsetWidth;
		var Nodes = _target.parentNode.childNodes;
		this.removeClass(Nodes);
		e.target.classList.add("selected");
		this.setState({
			listitem:listData[index],
			left:left,
			width:width,
			checkclass:"slidedown"
		});
	}
	hoverout(e){
		this.setState({
			checkclass:""
		});
		e.stopPropagation();
	}
	listOut(e){
		this.setState({
			checkclass:"hide"
		});
		e.stopPropagation();
		
	}
	listOutbreak(e){
		this.setState({
			checkclass:"hide"
		});
		var _target = e.target;
		var href = window.location.href;
		href = href.substring(0,href.indexOf("/"));
		window.location.href =href +"app"
		e.stopPropagation();
	}
	render(){
		const ListData = listData.navdata;
		var listItem = this.state.listitem;
		var _this = this;
		return (
			<div className="header-wrap">
				<ul className="navul">
					{
						ListData.map(function(value,key){
							return (
									<li className="lipadding" key={value.key} onMouseOver={(e) => _this.hoverdown(e)} onMouseOut={(e) => _this.hoverout(e)} index = {value.key}>{value.value}</li>
								)
						})
					}
				</ul>
				<div className={"listitem-wrap" + " "+ _this.state.checkclass} style={{left:_this.state.left,width:_this.state.width}} onMouseLeave={(e)=>_this.listOut(e)}>
					<ul>
					{
						listItem.map(function(value,key){
							return (<li key={key} onClick={(e)=>_this.listOutbreak(e)}>{value}</li>)
						})
					}	
					</ul>
				</div>
			</div>
			)   
	}
}
export default List;