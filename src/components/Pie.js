import React, { Component } from 'react';
import { AppRegistry, StyleSheet, ScrollView , StatusBar, Text, View, PixelRatio } from 'react-native';
import { Circle, Svg, G } from 'react-native-svg';
import  Slice  from './Slice';
import  { connect } from 'react-redux'

class Pie extends Component {
    state = {
        width: ''
    }

    onLayout = (e) => {
        this.setState({
          width: e.nativeEvent.layout.width,
        })
      }
    
    createListOfColors = () => {
        const { selectedTopics } = this.props
        console.log( selectedTopics )
        const colors = selectedTopics.map(() => {
           return { color: `#${((1<<24)*Math.random()|0).toString(16)}`}
        });
        return colors
        //return demoData = [{ color: '#0d2f51'}, { color: '#28BD8B' }, { color: '#F66A6A' }, { color: '#28BD8B' }, { color: '#F66A6A' }];
    }  


    render() {
       
        //"#"+((1<<24)*Math.random()|0).toString(16)
        
        const index = 0
        const w = this.state.width

        return (
            <View style={styles.containerStyle} onLayout={this.onLayout}>    
            <Svg
                width={w}
                //style={styles.pieSVG}
                height={w}
                viewBox={`${-w/2} ${-w/2} ${w} ${w}`}
            >
                <G>
                    {
                        this.createListOfColors().map( (item, index) =>{
                        return (
                                <Slice
                                    index={index}
                                    color={item.color}
                                    data={this.createListOfColors()}
                                    key={'slice' + index}
                                />
                        )
                    })
                    }
                </G>
            </Svg>
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    
      
    },
    pieSVG: {
        backgroundColor: 'red',
        flex: 1,
        
    }
}

const mapStateToProps = state => { return { category: state.cat.category } };

export default connect(mapStateToProps, {})(Pie);