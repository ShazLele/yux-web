import React from "react";
"use strict";
export default class PreLoader extends React.Component {
    render() {
        let size = this.props.size || '';
        let color = this.props.color || 'red';
        return (
            <div className="loading">
                <div className={`preloader-wrapper ${size} active`}>
                    <div className={`spinner-layer spinner-${color}-only`}>
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div>
                        <div className="gap-patch">
                            <div className="circle"></div>
                        </div>
                        <div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
