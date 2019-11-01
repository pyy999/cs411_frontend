import Particles from 'react-particles-js';
import React, { Component } from 'react';


const ParticlesWrap = () => {

return(<Particles
  params={{
      "particles": {
          "line_linked": {
                      "color":"#FFFFFF"
                      },
          "number": {
              "value": 20
          },
          "size": {
              "value": 10
          }
      },
      "interactivity": {
          "events": {
              "onhover": {
                  "enable": true,
                  "mode": "repulse"
              }
          }
      }
  }}
style={{
        width: '100%',
        background: `rgba(100, 100, 100, 1)` 
 }}
/>

  )

}
export default ParticlesWrap;



