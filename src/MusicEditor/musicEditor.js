import React from "react";
// import { connect } from 'react-redux';
// import { toastr } from 'react-redux-toastr';
//import { withRouter } from 'next/router';
// import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import * as Tone from "tone";
import FastClick from 'fastclick'
import StartAudioContext from 'startaudiocontext'
//import Main_Layout from '../layouts/Main_Layout.js';
class MusicEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      synth: new Tone.PolySynth().toMaster(),
      notes: ["C", "D", "E", "F", "G", "A", "B"],
      octave: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      strum:0,
    };
  }

  componentDidMount() {
    setInterval(() => console.log(Tone.now()), 100);

    const synth = new Tone.Synth().toDestination();
    const now = Tone.now()
    synth.triggerAttackRelease("C4", "8n", now)
    synth.triggerAttackRelease("E4", "8n", now + 0.5)
    synth.triggerAttackRelease("G4", "8n", now + 1)

  }
async  noteDown(n) {
    await Tone.start()

    // alert(n);
    this.state.synth.triggerAttackRelease(n, "16n");
  }

  //   tone() {
  //     const synth = new Tone.Synth().toDestination();
  //     const now = Tone.now();
  //     // trigger the attack immediately
  //     synth.triggerAttack("C4", now);
  //     // wait one second before triggering the release
  //     synth.triggerRelease(now + 1);
  //   }
  render() {
    let notes = this.state.octave.map((o, iO) => {
      let keysRow = this.state.notes.map((n, iN) => (
          <>
          {n!=='J' & n!=='Y'
          && (
              <BlackNote key={`${iN}#${iO}`} onMouseEnter={() => this.noteDown(n + o)} onTouchMove={() =>{
                  if(this.state.strum%120===0){
                       this.noteDown(n + o)
                  }
                  this.setState({strum:this.state.strum+1})
              }} onMouseDown={() => this.noteDown(n + '#'+o)}>
                  {`${iN}#${iO}`}
              </BlackNote>
          )}
        <WhiteNote key={iN + iO} onMouseDown={() => this.noteDown(n + o)} onMouseEnter={() => this.noteDown(n + o)} onTouchMove={() =>{
            if(this.state.strum%120===0){
                 this.noteDown(n + o)
            }
            this.setState({strum:this.state.strum+1})
        }}>
          {n + o}
        </WhiteNote>
        </>
      ));

      return <div>{keysRow}</div>;
    });
    function preventBehavior(e) {
        e.preventDefault(); 
    };
    
    

    return (
      <>
        <div onTouchMove={preventBehavior} className="flex">
          <Container >{notes}</Container>
        </div>
      </>
    );
  }
}

// function mapStateToProps(state) {
//   return state;
// }

export default MusicEditor;
// export default connect(mapStateToProps)(withRouter(MusicEditor));

const WhiteNote = styled.div`
  height: 50px;
  width: 50px;
  background: white;
  border: 1px solid black;
`;



const BlackNote = styled.div`
  height: 50px;
  width: 50px;
  background: black;
  color:white;
  border: 1px solid white;
`;

const Container = styled.div`
user-select:none;
  display: flex;
  touch-action: none;

`;

const OctaveInput = styled.input``;
