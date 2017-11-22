import React, { Component } from 'react';
import "../css/reactslider.css";
const imgUrl = [
	{"url":require("../images/dakar.jpg"),"alt":"1","title":"我是第一张"},
	{"url":require("../images/london.jpg"),"alt":"3","title":"我是第二张"},
	{"url":require("../images/monaco.jpg"),"alt":"4","title":"我是第三张"}
];
function callBack(){
	
}
//轮播设置
const slideConfig = {
	width:800,
	height:400,
	speed:3000,
	curritem: 0,
	isShowTitle: true,
	callback:callBack
}


//返回轮播项的长度
function retAllLen(imgArr){
	return imgArr.length;
}
//计算总长度
function retAllWidth(imgArr){
	var len = imgArr.length;
	var width = slideConfig.width;
	return len*width
}

class reactSlider extends Component{
	Timer="";
	constructor(props) {
        super(props);
        var allWidth = retAllWidth(imgUrl);
        var liwidth = slideConfig.width;
        var allLen = retAllLen(imgUrl);
        var curritem = slideConfig.curritem;
        var height = slideConfig.height;
        this.state = {width:allWidth,liwidth:liwidth,liheight:height,allLen:allLen,curritem:curritem,isShowTitle:false};
        
    }
    doCallback() {
    	var call = slideConfig.callback;
		if(typeof call == "function"){
				call();
		}
    }
    removeClass(domArr){
    	for(var i=0;i<domArr.length;i++){
    		domArr[i].classList.remove("curritem");
    	}
    }

    addClass(dom,classname){
    	dom.classList.add(classname);
    }
    slidefun(){
    	var currItem = document.querySelector(".curritem");
    	var index = currItem.getAttribute("index");
    	const itemWidth = this.state.liwidth;
    	const slideWid = index*itemWidth;
    	var slider = document.querySelector(".sliderul");
		currItem.classList.remove("curritem");
		var nextslide = currItem.nextSibling;
		if(nextslide==null){
			slider.style.transition ="all .3s";
			slider.style.left = 0;
			currItem.parentNode.firstElementChild.classList.add("curritem");
			this.isShowTitle();
			return false;
		}
		nextslide.classList.add("curritem");
		this.isShowTitle();
		slider.style.transition ="all .8s";
		slider.style.left = -slideWid+"px";
		this.doCallback();

    }
    componentDidMount(){//组件加载完成后执行的函数
    	this.isShowTitle();
    	this.Timer = setInterval(()=>this.slidefun(),slideConfig.speed);
    }
    isShowTitle(){
    	const isShow = slideConfig.isShowTitle;
    	if(isShow){
    		this.setState({"isShowTitle":true});
    		this.chanageTitle();
    	}else{
    		this.setState({"isShowTitle":false});
    	}

    }

    chanageTitle(){
    	var currItem = document.querySelector(".curritem");
		var title = currItem.getAttribute("title");
		var slideTitle = document.querySelector(".slidetitle");
		slideTitle.innerHTML = title;
    }
    navMouseOver(e){
    	const _target = e.target;
    	var Nodes = _target.parentNode.childNodes;
		this.removeClass(Nodes);
		e.target.classList.add("curritem");
    	var index = _target.getAttribute("index")-1;
    	const itemWidth = this.state.liwidth;
    	const slideWid = index*itemWidth;
    	var slider = document.querySelector(".sliderul");
    	slider.style.transition ="all .5s";
		slider.style.left = -slideWid+"px";
		this.isShowTitle();
		this.doCallback();
    }
    startTimer(e){
    	this.Timer = setInterval(()=>this.slidefun(),slideConfig.speed);
    }
    stopTimer(e){
    	clearInterval(this.Timer);
    }
	render() {
		const _this = this;
		return (
			<div className="sliderwrap" style={{width:_this.state.liwidth,height:_this.state.liheight}} onMouseOver={(e)=>_this.stopTimer(e)} onMouseLeave={(e)=>_this.startTimer(e)}>
				<ul className="sliderul" style={{width:_this.state.width}}>
				{
					imgUrl.map(function(val,index){
						var url = val.url;
						return (
								<li key={index} index={index} style={{width:_this.state.liwidth}}>
									<img src={val.url} alt={val.alt}/>
								</li>
							)
					})
				}	
				</ul>
				<div className="navbar">
					{
						imgUrl.map(function(val,index){
							if(index == _this.state.curritem ){
								return (
									<span className="navbaritem curritem" index={index+1} onMouseOver={(e)=>_this.navMouseOver(e)} key={index} title={val.title}></span>
								)
							}
							return (
								<span className="navbaritem" index={index+1} onMouseOver={(e)=>_this.navMouseOver(e)} key={index} title={val.title}></span>
							)
						})
					}
				</div>
				<div className="slidetitle" style={{display:_this.state.isShowTitle?"block":"none"}}></div>
			</div>
			)
	}
}
export default reactSlider;