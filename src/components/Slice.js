import React, {Component} from 'react';
import {Path} from 'react-native-svg';
import * as shape from 'd3-shape';
const d3 = {shape}; 



class Slice extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.arcGenerator = d3.shape.arc()
            .outerRadius(100)
            .padAngle(0)
            .innerRadius(0);
    }

    createPieArc = (index,  data) => {
        const Angle = 2*Math.PI;
        const arcs = d3.shape.pie()
            .value(1)
            .startAngle(0)
            .endAngle(Angle)
            (data);

        let arcData = arcs[index];
        console.log( arcData)

        return this.arcGenerator(arcData);
    };


    render() {
        const { color, index, data } = this.props;
        let val = data[index].number;

        return (
  
            <Path
                d={this.createPieArc(index,  data)}
                fill={color}
            />
        )

    }
}


export default Slice