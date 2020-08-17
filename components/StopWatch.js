import React, {Fragment, useContext} from "react";
import { store } from '../components/store';
import WorkoutList from '../components/workouts/';
import {LargeCard} from '../components/workouts/largeCard'
const LocalState =()=>{
  const globalState = useContext(store);
  const { dispatch } = globalState;
 // dispatch({type: 'ACTIVE_TIME', payload:'sdfdsdsfds'})
  console.log('shit',globalState)
  return ''
}
class Stopwatch extends React.Component {
  constructor(props) {
    console.log(props)
    super(props);
    this.state = {
      secondsElapsed:0,
      exercises: this.props.exercises.exerciseList
    }
    this.activityState = "activity"
    this.text = "work out time, lets do this"
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.activateExercise = this.activateExercise.bind(this)
    this.cluster = 0; 
    this.activeExercise = {};
    
    // dispatch state to store
    
  }

  getSeconds() {
    return ('0' + this.state.secondsElapsed  % 60).slice(-2)
  }
  getMinutes() {
    return Math.floor(this.state.secondsElapsed / 60)
  }
  times = x => f => {
    if (x > 0) {
      f()
      times (x - 1) (f)
    }
  }
  activateExercise(){
    console.log('console',this.state.exercises)
    debugger 
      if(this.state.exercises){
        this.activeExercise = this.state.exercises.slice(0,1);
        let time = this.getMinutes();
        return <LargeCard exercise={this.state.exercises[this.getMinutes()]} key={this.state.exercises[this.getMinutes()].uid} />
      }
       
  }
  start() {
    const that = this;
    this.incrementer = setInterval(function() {
      if(that.getSeconds() >= 40){
        that.activityState = "notActive"
        that.text = "rest for 20 seconds"

      }
      if(that.getSeconds() < 40){
        that.activityState = "activity"   
        that.text = "work out time, lets do this"
   
      }
      // CLUSTER
      let cluster = [];
        cluster = that.state.exercises.slice(1,4);
      if(that.getMinutes() === 9){
        that.cluster = that.state.secondsElapsed + 1;
        cluster = that.exercises.slice(3,6);
        
      }
      if(that.getMinutes() === 18){
        that.cluster = that.state.secondsElapsed + 1
      }
      if(that.getMinutes() === 27){
        that.cluster = that.state.secondsElapsed + 1
      }
      if(that.getMinutes() === 36){
        that.cluster = that.state.secondsElapsed + 1
      }

        that.setState({secondsElapsed:(that.state.secondsElapsed + 1)})
        
        
      },1000)

      
  }

  stop() {
    clearInterval(this.incrementer)
  }

render(){ 


  return (
    <Fragment>
      
      <section className="timer">
        <LocalState/>
        <div 
          className="floating-text"
          style={{height: '600px'
          }}>
          <div className="w-33">
            <h1>cluster: <em>{this.cluster}</em></h1>
            <h2>{this.text}</h2>
            <button className="btn btn-success" onClick={this.start}>Start Workout</button>
            <button className="btn btn-danger" onClick={this.stop}>Stop Workout</button>
          </div>
          <div className="w-33">
            <h1 style={{
              textAlign: 'center',
              fontSize: '10rem'
            }} className={this.activityState + ' big'}>{this.getMinutes()}:{this.getSeconds()}</h1>
          </div> 
          <div className="w-33" style={{
            clear:'both',
            display:'block',
            }}>
            {this.activateExercise()}
          </div>
          
          
        </div>
        
      </section>
      <WorkoutList timer={this.getMinutes()} />
      <style jsx>
                        {`
                        h1{
                          font-family: 'EB Garamond', serif;
                        }
                        .w-33 {
                          width: 33%;
                          padding: 15px;
                        }
                        .floating-text {
                          margin:0 0px 0px;
                          padding:0; 
                          border: 0;
                          minHeight:850px;
                          position: relative;
                          background:transparent;
                          display: flex;
                        }
                        .big{ font-size:100px;}
                        body{
                          font-family: 'EB Garamond', serif;
                        }
                        .timer.container {
                          text-align: center;
                        }
                        .notActive{
                          color: red;
                        }
                        .activity{
                          color: green;
                        }
                        `}
                      </style>
    </Fragment>
    
  )
}
 
}
export default Stopwatch;