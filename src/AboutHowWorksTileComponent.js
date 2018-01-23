import React, { Component } from 'react';

class AboutHowWorksTileComponent extends Component {
  render() {
      
    return (
        <div className="col-md-3">
                <div className="box_home" id={this.props.id}>
                    <span>{this.props.stepNum}</span>
                    <h4>{this.props.title}</h4>
                    <p>
                        {this.props.details}
                    </p>
                </div>
            </div>
    ) 
  }
}

export default AboutHowWorksTileComponent;

