import React from 'react';
import './App.css';
import $ from 'jquery';
import './loader.js';
import 'jquery-bracket/dist/jquery.bracket.min.css';
import 'jquery-bracket/dist/jquery.bracket.min.js';

class App extends React.Component {
  componentDidMount() {
    $(function() {
      $.ajax({
        url: "http://localhost:5000/data",
        success: data => {
          let brackets = {
            teams : [],
            results : []
          };
          if (data.type === 'unlocked') {
            const count = data.content.count;
            let teamCount = 1;
            for (; teamCount < count; teamCount*=2) {
              console.log(teamCount, count);
            }
            console.log('round# ', teamCount);
            for (let i = 0; i < teamCount; i+=2) {
              brackets.teams.push([]);
            }
            let half = teamCount / 2;
            let indexStart = 0;
            let indexHalf = half;
            for (let i = 0; i < half; i++) {
              brackets.teams[i].push([`Spot #${indexStart+1}`]);
              brackets.teams[i].push([`Spot #${indexHalf+1}`]);
              indexStart++;
              indexHalf++;
            }
          } else if (data.type === 'locked') {
            const count = data.content.count;
            const teams = data.content.teams;
            let teamCount = 1;
            for (; teamCount < count; teamCount*=2) {
              console.log(teamCount, count);
            }
            console.log('round# ', teamCount);
            for (let i = 0; i < teamCount; i+=2) {
              brackets.teams.push([]);
            }
            let half = teamCount / 2;
            let indexStart = 0;
            let indexHalf = half;
            for (let i = 0; i < half; i++) {
              brackets.teams[i].push(teams[indexStart]);
              if (!teams[indexHalf]) {
                teams[indexHalf] = null;
              } 
              brackets.teams[i].push(teams[indexHalf]);
              indexStart++;
              indexHalf++;
            }
          }
          $('#bracket').bracket({
            teamWidth: 128,
            init: brackets,
          });
        },
        error: e => {
          console.log('error', e);
        },
      });
    });
  }

  render() {
    return (
      <div id="bracket"/>
    );
  }
}

export default App;
