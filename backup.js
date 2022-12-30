import React, { Component } from 'react';
import "./styles.css";
import WheelComponent from "react-wheel-of-prizes";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Container, Button, Modal, Table } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props)

  }


  render() {
    return (
      <div>

        <Row>
          <Col xs={2}> 

            
          </Col>

          <Col xs={2}></Col>

          <Col xs={4}>
          <h1 style={{textAlign:"center"}}> Velkommen til</h1>
          <h1 style={{textAlign:"center"}}> <b>SHOT GAMES</b></h1>

            <Wheel
            />
          </Col>

          <Col xs={2}>
            <h1>Regler:</h1>
            <h2>Taber dit hold, skal du tage et shot, simpelt!</h2>
          </Col>

          <Col xs={2}></Col>

        </Row>

      </div>
    );
  }
}


class Wheel extends Component {
  constructor(props) {
    super(props)

    const challenges = [
      'Gæt en røv bøgse-edition',
      'Hvor godt suger du',
      'Papir kamp',
      'Hvad vejer den',
      'x',
      'x',
      'Sejeste Yoga pose',
      'x']

    this.state = { resetWheel: true, challenges, team: null, timer: 0 }

    setInterval(() => {
      if(this.state.timer > 0){
        this.setState({timer: this.state.timer-1})
      }
    }, 1000);

  }

  resetWheel = () => {
    this.setState({ resetWheel: !this.state.resetWheel, pickTeams: false })
  }

  onFinished = (winner) => {

    let teams = {
      'Hvor godt suger du': {
        hold1: '',
        hold2: ''
      },  'Gæt en røv bøgse edition': {
        hold1: '',
        hold2: ''
      },  'Papir kamp': {
        hold1: '',
        hold2: ''
      }, 'Hvad vejer den': {
        hold1: '',
        hold2: ''
      }, 'x': {
        hold1: '',
        hold2: ''
      },  'x': {
        hold1: '',
        hold2: ''
      }, 'Sejeste Yoga pose': {
        hold1: '',
        hold2: ''
      }, 'x': {
        hold1: '',
        hold2: ''
      }
    }

    for (let i = 0; i < this.state.challenges.length; i++) {
      if (this.state.challenges[i] == winner) {
        this.state.challenges.splice(i, 1)

      }

    }
    this.setState({ team: teams[winner], chosenChallenge: winner, timer: 10, pickTeams: true })

  }

  render() {

    if (!this.state.resetWheel) {
      setTimeout(this.setState({ resetWheel: true }), 500);
    }

    if (!this.state.resetWheel) return (
      <Button onClick={() => this.resetWheel}> Reset me</Button>
    )

    const segments = this.state.challenges
    const seg_colors = [
      "#EE4040",
      "#F0CF50",
      "#815CD1",
      "#3DA5E0",
      "#34A24F",
      "#F9AA1F",
      "#EC3F3F",
      "#FF9000",
      "#34A24F",
      "#F0CF50",
      "#F9AA1F",
      "#EE4040",
      "#3DA5E0",
    ];

    return (
      <>

        
<Button onClick={this.resetWheel}> Reset wheel</Button>
        
        {(() => {
          if(this.state.timer > 0 && this.state.pickTeams){
            return(

              <>
          <h1>.. Vælger holder .. !</h1>
          <h2>Gør jer klar!</h2>
          <h2>{this.state.timer}</h2>
          </>
          )
          }
        })()}
 

        {(() => {
          if (this.state.team && this.state.timer == 0 && this.state.pickTeams) {
            return (
              <>

                <h2>Udfording: <b>{this.state.chosenChallenge}</b></h2>

                <h3>Hold 1</h3>
                <h4>{this.state.team.hold1}</h4>

                <h3>Hold 2</h3>
                <h4>{this.state.team.hold2}</h4>
              </>
            )
          }

        })()}

        <WheelComponent
          segments={segments}
          segColors={seg_colors}
          onFinished={(winner) => this.onFinished(winner)}
          primaryColor='black'
          contrastColor='white'
          buttonText='Spin'
          size={290}
          upDuration={100}
          downDuration={1000}
          fontFamily='Arial'
        />

      </>

    )
  }
}




export default App;