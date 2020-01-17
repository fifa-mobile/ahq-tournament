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
        url: "https://yuulye.herokuapp.com/data",
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
              brackets.teams.push([`Team #${i+1}`, `Team #${i+2}`]);
            }
          }
          $('#bracket').bracket({
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
