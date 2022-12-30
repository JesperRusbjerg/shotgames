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

          <Col xs={2}></Col>
          <Col xs={4}>
            <h1 style={{ textAlign: "center" }}> Velkommen til</h1>
            <h1 style={{ textAlign: "center" }}> <b>SHOT GAMES</b></h1>

          </Col>

          <Col xs={2}>
            <h1>Regler:</h1>
            <h2>Taber dit hold, skal du tage et shot, simpelt!</h2>
          </Col>

        </Row>

        <Row>

          <Wheel />





        </Row>

      </div>
    );
  }
}


class Wheel extends Component {
  constructor(props) {
    super(props)

    const challenges = [
      'Gæt en røv bøgse edition',
      'Hvor godt suger du',
      'Papir kamp',
      'Hvad vejer den',
      'Kort tårn',
      'Hammerslag',
      'Sejeste Yoga pose',
      'Over eller under']

    this.state = { resetWheel: true, challenges, team: null, timer: 0 }

    setInterval(() => {
      if (this.state.timer > 0) {
        this.setState({ timer: this.state.timer - 1 })
      }
    }, 1000);

  }

  resetWheel = () => {
    this.setState({ resetWheel: !this.state.resetWheel, pickTeams: false })
  }

  onFinished = (winner) => {

    let teams = {
      'Hvor godt suger du': {
        hold1: 'Cat, Masha, Maria, Lindsey, Maja, Linette, Nanna',
        hold2: 'Johnny, Sebber, Patrick, Agnes, Jakob, Oliver, Frede',
        dommer: 'Jesper'
      }, 'Gæt en røv bøgse edition': {
        hold1: 'Johnny, Oliver, Frede',
        hold2: 'Lindsey, Jakob, Sebber',
        dommer: 'Patrick, Nanna'
      }, 'Papir kamp': {
        hold1: 'Johnny, Frede, Masha, Lindsey',
        hold2: 'Patrick, Jakob, Sebber, Linette',
        dommer: 'Maja, Agnes'
      }, 'Hvad vejer den': {
        hold1: 'Maja, Patrick, Linette, Nanna, Cat',
        hold2: 'Lindsey, Johnny, Maria, Frede, Sebber',
        dommer: 'Jakob, Agnes'
      }, 'Kort tårn': {
        hold1: 'Cat, Agnes, Maria, Maja',
        hold2: 'Masha, Sebber, Johnny, Lindsey',
        dommer: 'Linette, Frede'
      }, 'Hammerslag': {
        hold1: 'Sebber, Maja, Lindsey, Oliver, Johnny',
        hold2: 'Linette, Nanna, Maria, Jakob, Agnes',
        dommer: 'Jesper'
      }, 'Sejeste Yoga pose': {
        hold1: 'Patrick, Johnny, Masha',
        hold2: 'Linette, Lindsey, Agnes',
        dommer: 'Maria, Sebber'
      }, 'Over eller under': {
        hold1: 'Lindsey, Oliver, Sebber, Maja, Frede',
        hold2: 'Patrick, Masha, Cat, Nanna, Maria',
        dommer: 'Jesper'
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

    console.log(this.state)

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

        <Row>

          <Col xs={4}></Col>
          <Col xs={2}>
            <Button onClick={this.resetWheel}> Reset wheel</Button>
          </Col>

          <Col xs={3}>



            {(() => {
              if (this.state.team && this.state.timer == 0 && this.state.pickTeams) {
                return (
                  <>

                    <h2><b>Udfording:</b> </h2>
                    <h2><b>{this.state.chosenChallenge}</b></h2>
                    <h3>Hold 1:</h3>
                    <h4>{this.state.team.hold1}</h4>

                    <h3>Hold 2:</h3>
                    <h4>{this.state.team.hold2}</h4>

                    <h3> DOMMER: </h3>
                    <h4>{this.state.team.dommer}</h4>
                  </>
                )
              }
            })()}

            {(() => {
              if (this.state.timer > 0 && this.state.pickTeams) {
                return (

                  <>
                    <h1>.. Vælger holder .. !</h1>
                    <h1><b>UDFORDRING:</b> {this.state.chosenChallenge}</h1>
                    <h2>Gør jer klar!</h2>
                    <h2>{this.state.timer}</h2>
                  </>
                )
              }
            })()}
          </Col>

          <Col xs={3}></Col>
        </Row>

        <Row>

          <Col xs={3}></Col>
          <Col xs={6}>

          <WheelComponent
            segments={segments}
            segColors={seg_colors}
            onFinished={(winner) => this.onFinished(winner)}
            primaryColor='black'
            contrastColor='white'
            buttonText='Spin'
            size={290}
            // upDuration={100}
            // downDuration={1000}
            fontFamily='Arial'
            />
            </Col>
          <Col xs={3}></Col>
        </Row>
      
      </>

    )
  }
}




export default App;