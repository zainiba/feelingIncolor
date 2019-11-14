'use strict'
let sel;
let val;

let sound;

let x;
let xspacing = 16; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 100.0; // Height of wave
let period = 500.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave
let bg = 0;
let r; let g; let b;

function setup() {
  createCanvas(windowWidth, windowHeight);
  createSpan('How are you feeling today?');
  sel = createSelect();
  sel.option('');
  sel.option('Happy');
  sel.option('Calm');
  sel.option('Angry');
  sel.changed(setMood);

  sound = new p5.Oscillator();
  sound.setType('sine');
  sound.amp(.1,1);
  sound.freq(0);
  w = width + 16;
  dx = (500 / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));

}

function draw() {
  background(bg);
  calcWave();
  renderWave();


   if (val == 'Happy') {
     sound.freq(map(yvalues[floor(yvalues.length/2)], -100, 100, 400,1000));
   } else if (val == 'Calm') {
     sound.freq(map(yvalues[floor(yvalues.length/2)], -100, 100, 200,800));
     }else if (val == 'Angry') {
       sound.freq(map(yvalues[floor(yvalues.length/2)], -100, 100,100,700));
     }
}

function setMood() {
   val = sel.value();
   if (val == '') {
     r = 255;
     g = 255;
     b = 255;
     sound.stop();
     dx = (500 / period) * xspacing;
    }else if (val == 'Happy') {
    sound.start();
    r = 255;
    g = 255;
    b = 0;
    dx = (6 / period) * xspacing;
  }else if (val == 'Calm') {
    sound.start();
    r = 0;
    g = 0;
    b = 255;
    dx = (8 / period) * xspacing;
  //  amplitude = 50;
  }else if (val == 'Angry') {
    sound.start();
    dx = (4 / period) * xspacing;
    r = 255;
    g = 0;
    b = 0;
  }
}

function calcWave() {
  // Increment theta (try different values for
  // 'angular velocity' here)
  theta += 0.02;

  // For every x value, calculate a y value with sine function
  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * amplitude;
    x += dx;
  }
}

function renderWave() {
  noStroke();
  fill(r,g,b);

  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < yvalues.length; x++) {
    ellipse(x * xspacing, height / 2 + yvalues[x], 16, 16);
    // for (let l =  yvalues.length/2;) {
    //   fill(255)
    // }
  }
}
