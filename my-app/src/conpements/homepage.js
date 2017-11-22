import React, { Component } from 'react';
import ReactSlider from "./reactslider";

import "../css/homepage.css";

class homePage extends Component{
	constructor(props) {
        super(props);
        this.state = {};
        
    }
    render(){
    	return (
    		<div className="hompage">
    			<div className="left">left</div>
    			<div className="mid">
    				
					<div className="reactslider">
						<ReactSlider />
					</div>
    			</div>
    			<div className="right">right</div>
    		</div>
    		)
    }
}
export default homePage;