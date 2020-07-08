import React , {Component} from 'react'

import {StyleSheet,
    Text,
    View,
    Image,
    FlatList, 
    Dimensions, 
    TouchableOpacity,
    Modal, 
    TextInput,
PanResponder,
Animated,
ScrollView} from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

class Post extends Component {


    constructor(props){
        super(props)
            this.state={
            data:null,
            visible:false,
            comments:[],
            pan : new Animated.ValueXY()
            }
            this.panResponder = PanResponder.create({    //Step 2
                onStartShouldSetPanResponder : () => true,
                onPanResponderMove           : Animated.event([null,{ //Step 3
                   
                    dy : this.state.pan.y,
                    
                }],),
                onMoveshouldSetPanResponder : () =>true,
                onPanResponderRelease        : (e, gesture) => {
                    console.log(gesture)
                  
                   const y=gesture.dy/height
                   console.log(y)
                    if((y)>0.7 || y<-0.7){
                        
                       this.togglemodal(false,[])
                     this.state.pan.setValue({x:0,y:0})
                    
                    }
                    else
                    Animated.spring(            
                        this.state.pan,        
                        {toValue:{y:0,x:0}}     
                    ).start();
                },
               
         
            });
            
        }
    

    componentDidMount (){
this.load_data();
    }

    async load_data (){

try{
    const res=await fetch('http://codejudge-artifacts.s3.amazonaws.com/images/q-110/data.json');
   const response= await res.json();
    this.setState ({
        data:response
    })
    
}
catch(err){
console.log(err);
}
}

togglemodal = (visible,comments) =>{
this.state.comments=[];
    this.setState({
visible:visible,
comments:comments
    })
}
    render() {

const el =(item)=> {
    return(
        <View style={{backgroundColor:'white',marginBottom:'5%'}}>
    <View style={styles.postheading}>
        <Image style={styles.dp} source={require('./assets/dp.jpeg')} />

        <View>
        <Text style={{paddingTop:'5%'}}>
        Rahul </Text>
        <View style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={{color:'grey'}}>{item.index} h </Text>
        <Entypo name='dot-single' color='grey' />
        <Fontisto name='earth'  color='grey' />
        <Text style={{color:'grey'}}> New Delhi , India </Text>
        </View>
   
        </View>
        <Entypo style={{paddingLeft:'30%',paddingTop:"3%"}} 
        size={20}
        name='dots-three-horizontal' color='grey' />
       
       </View>
       <View style={styles.post}>
       <Text>{item.item.post}</Text> 
        </View>
        <View>
            <Image style={styles.postimage} source={require('./assets/dp.jpeg')} />
        </View>
        <View style={styles.reactions}>
            <View style={styles.icons}>
            <AntDesign name='like1' color='white' size={10} />
            
            </View>
            <View style={styles.heart}>
            <AntDesign name='heart' color='white' size={10} />
            
            </View>
            <View  >
            <FontAwesome5 name='laugh-squint' color='black' style={styles.laugh} size={15} />
            
            </View>
            <Text style={{color:'grey',padding:'1.5%',fontSize:12}}> 60 </Text>
            <View style={{paddingLeft:'30%',flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
           
            <Text style={{color:'grey',padding:'0.5%',fontSize:12}}>{item.item.comments.length} comments </Text>
            <Entypo name='dot-single' color='grey' />
            <Text style={{color:'grey',padding:'0.5%',fontSize:12}}>{item.index} shares </Text>
            </View>  
        </View>
        <View style={styles.border}>
     
            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <AntDesign name='like2' color='grey' size={24}  style={{padding:'2%'}}/>
                <Text style={{color:'grey'}}>Like</Text>
                </View>
          <TouchableOpacity
          style={{flexDirection:'row',alignItems:'center'}}
          onPress={()=>this.togglemodal(true,item.item.comments)}
          >
          <MaterialCommunityIcons name='comment-outline' size={23} color='grey' style={{padding:'3%'}}/>
                <Text style={{color:'grey'}}>Comment</Text>
          </TouchableOpacity>
        <View style={{flexDirection:'row',alignItems:'center'}}>
         <MaterialCommunityIcons name='share-outline' size={23} 
          color='grey'
          style={{padding:'2%'}}/>
         <Text style={{color:'grey',padding:'2%'}}>Share</Text>
         </View>
            </View>
       </View>
    )
}
        return(
            <View style={{backgroundColor:'#f2f2f2'}}>
                
                   
        <FlatList
        data={this.state.data}
     
         style={{padingBottom:'10%'}}
        renderItem={(item)=>el(item)}
        keyExtractor={(index)=>{}}
        />
        <Modal
        animated={true}
  transparent={true}
        visible={this.state.visible}
        style={{flex:1}}
        onRequestClose={()=>this.togglemodal(false,[])}
        >
           
            <View
          style={{backgroundColor:'#00000080'}}
       
            >
                 <Animated.View
                 {...this.panResponder.panHandlers}
                 style={[this.state.pan.getLayout()]}>
                <View
                style={{backgroundColor:'white'}}
                >
     <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:0.5}}>
         <View style={styles.reactions}>
            <View style={styles.icons}>
            <AntDesign name='like1' color='white' size={10} />
            
            </View>
            <View style={styles.heart}>
            <AntDesign name='heart' color='white' size={10} />
            
            </View>
            <View  >
            <FontAwesome5 name='laugh-squint' color='black' style={styles.laugh} size={15} />
            
            </View> 
            <Text style={{paddingLeft:'1%'}}>10k</Text>
            <AntDesign name='right' color='black' size={24}  style={{paddingLeft:'2%'}}/>  
            </View> 
            <AntDesign name='like2' color='grey' size={24}  style={{paddingLeft:width/2}}/>
            </View>  
            <ScrollView
      
            style={{marginBottom:'40%'}}> 
        {this.state.comments.map((item,index)=>{
 return(
    <View
   
     style={{flexDirection:'row',alignItems:'flex-start',padding:'2%'}}>
       
                    <View style={styles.postheading}>
<Image style={styles.dp} source={require('./assets/dp.jpeg')} />

</View>
<View>
<Text 
style={{}}>
Rahul </Text>
        <Text style={{marginRight:'18%'}} >{item}</Text>
        <View style={{flexDirection:'row'}}>
        <Text style={{color:'grey'}} >{index} m</Text>
        <Text style={{color:'grey',fontWeight:'bold',paddingLeft:'5%',paddingRight:'5%'}} >Like</Text>
        <Text style={{color:'grey',fontWeight:'bold'}} >Reply</Text>
        </View>
        </View>
  
        </View>
  )
        })}
           </ScrollView>
        
                </View>
                
            </Animated.View>
            </View>
            
        </Modal>
        </View>
        )
    }
}

const width=Dimensions.get('window').width
const height=Dimensions.get('window').height

const styles=StyleSheet.create({
    postheading:{
        flexDirection:'row',
        alignItems:'flex-start'
    },
    dp:{
        height:50,
        width:50,
        borderRadius:25,
        margin:'2%',
      
    },
    post:{
       padding:'2.5%' 
    },
    postimage:{
      width:Dimensions.get('window').width
    },
    reactions:{
      padding:'2.5%',
      flexDirection:'row',
      alignItems:'center',

    },
    icons:{
        backgroundColor:'#384AC9' ,
        borderRadius:10,
        height:20,
        width:20,
        justifyContent:'center',
        alignItems:'center',
  
    },
    heart:{
        backgroundColor:'#f36365' ,
        borderRadius:10,
        height:20,
        width:20,
        justifyContent:'center',
        alignItems:'center',
   
    },
    laugh:{
        backgroundColor:'yellow',
        borderRadius:15,
        height:20,
        width:20,
        paddingLeft:'0.5%',
        paddingTop:'0.5%'
    },
    border:{
        borderBottomWidth:0.5,
        borderBottomColor:'grey',
      marginLeft:'3.5%',
      marginRight:'3.5%',
      marginBottom:'2.5%'
    }
   
})
export default Post
