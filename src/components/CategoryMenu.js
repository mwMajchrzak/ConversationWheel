// import React, { Component } from 'react';
// import {  AppRegistry, Text, Picker, View, StyleSheet } from 'react-native';
// import SelectedCategory from './SelectedCategory';



// class Category extends Component {
//     constructor(){
//         super()
//         this.state = {
//         }
//       }

//     updateCategory= (category) => {
//        this.setState({ category: category })
//     }



//     render() {
//         return (
//             <View>
//             <Picker selectedValue = {this.state.category} onValueChange = {this.updateCategory}>
//                <Picker.Item label = "Steve" value = "steve" />
//                <Picker.Item label = "Ellen" value = "ellen" />
//                <Picker.Item label = "Maria" value = "maria" />
//             </Picker>
//          </View>
//         )
//     }
// };
// export default Category;








import React, { Component, componentWillMount } from 'react';
import {  Text,  View, TouchableOpacity, Button, Navigator } from 'react-native';
import SelectedCategory from './SelectedCategory';
import CategoriesList from './CategoriesList';
import Icon from 'react-native-vector-icons/Feather';


class CategoryMenu extends Component {

    state = {
            category: 'Select Category', 
    }

    updateCategory = (category) => {
       this.setState({ category: category })
       this.props.toggleMenu();
    };

    onButtonPress = () => {
        console.log('tuuuuuu', this.props)
        // const { navigate } = this.props.navigation;
        // return navigate('LogInForm')
    } 

    createButton() {
        return (
            <TouchableOpacity  style={styles.containerCreateButton} >
                <Icon 
                    style={styles.IconCircleStyle} 
                    type="Feather" 
                    name="plus-circle"  
                    size={20} 
                />  
                <Button 
                    style={styles.textStyle} 
                    title="Create new category" 
                    onPress={this.props.onCreateButtonPress}
                /> 
            </TouchableOpacity>
        );    
    }

 
    showMenu = () => {
        
        console.log('props in categorymenu', this.props.categoriesObject )
        if (this.props.isMenuOpen === true ) {
            return (
                <View style={styles.containerCategoriesList}>
                    <CategoriesList 
                        updateCategory={this.updateCategory} 
                        categories={this.state.categories}
                        selectedCategory={this.state.category}
                        categoriesObject={this.props.categoriesObject}
                    />
                    {this.createButton()}
                </View>
        
            )    
        }
    }    
    

    // createList = () => {
    //     const Data = Array.from(this.props.categoriesObject);
    //     const list = Data.map(function(object) {
    //         return object.category;
    //     });
    //     return console.log(list);
    // }
    render() {
        
        
        return (
        <View style={styles.containerCategoryMenu} >
                <SelectedCategory  
                    isMenuOpen={this.props.isMenuOpen} 
                    onPress={this.props.toggleMenu}  
                    selectedValue={this.state.category}
                />
                {this.showMenu()}
            
         </View>
        )
    }
}
const styles = {
    containerCategoryMenu: {
        width: '70%',
        position: 'absolute',
        top: '35%',
        alignSelf: 'center',
        alignItems: 'space-around',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'grey',
        zIndex: 60
        
        
    },
    containerCategoriesList: {
        alignSelf: 'center',
        width: '100%',
        //backgroundColor: 'green',
        padding: 0,
        margin: 0
    },
    containerCreateButton: {
        margin: 0,
        padding: 0,    
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        height: 50,
       // backgroundColor: 'green'
    },
    textStyle: {
        alignSelf: 'center',
        fontSize: 17
    },
    IconCircleStyle: {
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        left: 15,
        opacity: 0.7
    },
    
}
export default CategoryMenu;





// import React, { Component } from 'react';
// import {  AppRegistry, Text, Picker, View, StyleSheet } from 'react-native';
// 



// class Category extends Component {
//     state = { 
//         category:''
//     }

//     updateCategory= (category) => {
//        this.setState({ category: category })
//     }


//   _getOptionList() {
//     return this.refs['OPTIONLIST'];
//   }

//     render() {
//         return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <Select
//               width={250}
//               ref="SELECT1"
//               optionListRef={this._getOptionList.bind(this)}
//               defaultValue="Select a Province in Canada ..."
//               onSelect={this.updateCategory.bind(this)}>
//               <Option value = {{id : "alberta"}}>Alberta</Option>
//               <Option>British Columbia</Option>
//               <Option>Manitoba</Option>
//               <Option>New Brunswick</Option>
//               <Option>Newfoundland and Labrador</Option>
//               <Option>Northwest Territories</Option>
//               <Option>Nova Scotia</Option>
//               <Option>Nunavut</Option>
//               <Option>Ontario</Option>
//               <Option>Prince Edward Island</Option>
//               <Option>Quebec</Option>
//               <Option>Saskatchewan</Option>
//               <Option>Yukon</Option>
//             </Select>
  
//             <Text>Selected Canada's province: {this.state.canada}</Text>
            
//             <OptionList ref="OPTIONLIST"/>
//         </View>
//         )
//     }
// };
// export default Category;



// import React, { Component } from 'react';
// import {  AppRegistry, Text, Picker, View, StyleSheet } from 'react-native';
// import DropdownMenu from 'react-native-dropdown-menu';

// class Category extends Component {
 
//   constructor(props) {
//     super(props);
//     this.state = {
//       text: ''
//     };
//   }
  
//   render() {
//     var data = [["C", "Java", "JavaScript", "PHP"], ["Python", "Ruby"], ["Swift", "Objective-C"]];
//     return (
//       <View style={{flex: 1}}>
//         <View style={{height: 64}} />
//         <DropdownMenu
//           style={{flex: 1}}
//           bgColor={'white'}
//           tintColor={'#666666'}
//           activityTintColor={'green'}
//           // arrowImg={}      
//           // checkImage={}   
//           // optionTextStyle={{color: '#333333'}}
//           // titleStyle={{color: '#333333'}} 
//           // maxHeight={300} 
//           handler={(selection, row) => this.setState({text: data[selection][row]})}
//           data={data}
//         >
 
//           <View style={{flex: 1}}>
//             <Text>
//               {this.state.text} is the best language in the world
//             </Text>
//           </View>
 
//         </DropdownMenu>
//       </View>
//     );
//   };
// }  

//   export default Category;







// import React, { Component } from 'react';
// import {Select, Option} from "react-native-chooser";
 
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';
 
// class Category extends Component {
 
//   constructor(props) {
//     super(props);
//     this.state = {value : "Select Category"}
//   }
//   onSelect(value, label) {
//     this.setState({value : value});
//   }
 
//   render() {
//     return (
//       <View style={styles.container}>
//         <Select 
//             onSelect = {this.onSelect.bind(this)}
//             defaultText  = {this.state.value}
//             style = {styles.selectedCategoryStyle}
//             textStyle = {{}}
//             //backdropStyle  = {{backgroundColor : "#d3d5d6"}}
//            // optionListStyle = {{backgroundColor : "#F5FCFF"}}
//           >
//           <Option value = {{name : "azhar"}}>Azhar</Option>
//           <Option value = "johnceena">Johnceena</Option>
//           <Option value = "undertaker">Undertaker</Option>
//           <Option value = "Daniel">Daniel</Option>
//           <Option value = "Roman">Roman</Option>
//           <Option value = "Stonecold">Stonecold</Option>
 
//         </Select>
//       </View>
//     );
//   }
// }

// const styles = {
//     selctedCategoryStyle: {
//         borderWidth : 1,
//         borderColor : "green",
//         width: 300,
//         flex: 1,
       
        
//       },

//       container: {
//           backgroundColor: 'gray',
//           flex: 1,
//           alignItems: 'center',
//           justifyContent: 'space-around'
//       }
// }

// export default Category;