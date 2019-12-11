// 'use strict'
let sel;
let val;

let happy;
let sad;
let angry;
let anxious;

let anx = 100;

let sound;

let h = 200;
let wi = 16;
let x;
let xspacing = 16; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 100.0; // Height of wave
let period = 500.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave

let bg = 0;
let r = 255;
let g = 255;
let b = 255;

let bass;
let mid;
let treble;
let mapBass;
let mapMid;
let mapTreble;

let a = 2;

function preload() {
  happy = loadSound('assets/happy.mp3');
  sad = loadSound('assets/sad.mp3');
  angry = loadSound('assets/angry.mp3');
  anxious = loadSound('assets/anx.mp3');


}

function setup() {
  createCanvas(windowWidth, windowHeight);
  createSpan('How are you feeling today?');
  sel = createSelect();
  sel.option('');
  sel.option('Anxious');
  sel.option('Happy');
  sel.option('Sad');
  sel.option('Angry');
  sel.changed(setMood);
  // Initiate the FFT object
   fft = new p5.FFT();

    // Run the analysis, while the audio is playing


  sound = new p5.Oscillator();
  sound.setType('sine');
  sound.amp(.1, 1);
  sound.freq(0);
  w = width + 16;
  dx = (500 / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));

}

function draw() {
  console.log(a);

  background(bg);
  calcWave();
  renderWave();

  anx = anx + 2;

  if (val == 'Happy') {
    wi = 16;
    h = 16;
    sound.freq(map(yvalues[floor(yvalues.length / 2)], -100, 100, 400, 1000));
  } else if (val == 'Sad') {
    wi = 16;
    h = 16;
    sound.freq(map(yvalues[floor(yvalues.length / 2)], -100, 100, 200, 800));
  } else if (val == 'Angry') {
    wi = 16;
    h = 16;
    sound.freq(map(yvalues[floor(yvalues.length / 2)], -100, 100, 100, 700));
  }else if (val == 'Anxious') {
    wi = 16;
    h = 16;
    a = a + 20;
    sound.freq(map(yvalues[floor(yvalues.length / 2)], -100, 100, 200, 700));
  }


  // Define in how many pieces you want to divide the circle
  var pieces = 32;

  // Circle's radius
  var radius = 200;

  // Move the origin to the center of the canvas
  translate( width/2, height/2 );

  // The centered circle
  fill(0);
  stroke( 139, 69, 19);
  ellipse( 0, 0, radius );
  noFill();
  ellipse( 0, 0, radius*2.22);
  fill(255,255,255);
  stroke(0);
  ellipse( 0, 0, radius/2);
  fill(0);

  ellipse( 35, -20, radius/5);


  fill(0);



  // For each piece draw a line
  for(let i = 0; i < pieces; i++ ) {

    // Rotate the point of origin
    rotate( TWO_PI / pieces );

    // Draw the red lines
    strokeWeight(05);

    stroke(255,149,0);
    line( 10, radius/2, 0, radius );

    //Optionally also draw to the opposite direction
    stroke(235, 175, 76);
    line( -10, radius/2, 0, radius );
  }
  let spectrum = fft.analyze();
  bass    = fft.getEnergy("bass");
  mid     = fft.getEnergy("mid");
  treble  = fft.getEnergy("treble");

  mapBass     = map(bass, 0, 255, -100, 100 );
  mapMid      = map(mid, 0, 255, -150, 150 );
  mapTreble   = map(treble, 0, 255, -200, 200 );
for( i = 0; i < pieces; i++ ) {

  rotate( TWO_PI / pieces );
  stroke(128, 128, 0);
  // Draw the bass lines
  line( mapBass, radius/2, 0, radius );
  stroke(107,71,1);

  // Draw the mid lines
  line( mapMid, radius/2, 0, radius );
  stroke(255,149,0);

  // Draw the treble lines
  line( mapTreble, radius/2, 0, radius );

}
}

function setMood() {
  val = sel.value();
  if (val == '') {
    wi = 16;
    h = 200;
    r = 0;
    g = 0;
    b = 0;
    sound.stop();
    happy.stop();
    angry.stop();
    anxious.stop();

    dx = (500 / period) * xspacing;
  } else if (val == 'Happy') {
    sound.start();
    happy.play();
    anxious.stop();
    angry.stop();
    r = 255;
    g = 255;
    b = 0;
    dx = (6 / period) * xspacing;

  } else if (val == 'Sad') {
    sound.start();
    sad.play();
    happy.stop();
    angry.stop();
    anxious.stop();

    r = 0;
    g = 0;
    b = 255;
    dx = (8 / period) * xspacing;

  } else if (val == 'Angry') {
    sound.start();
    angry.play();
    happy.stop();
    sad.stop();
    anxious.stop();

    dx = (4 / period) * xspacing;
    r = 255;
    g = 0;
    b = 0;
  }else if (val == 'Anxious') {
    sound.start();
    anxious.play();
    angry.stop();
    happy.stop();
    sad.stop();
    dx = (2 / a) * xspacing;
    r = 100;
    g = 100;
    b = 100;
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
  fill(r, g, b);
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < yvalues.length; x++) {
    ellipse(x * xspacing, height / 2 + yvalues[x], wi, h);
    // for (let l =  yvalues.length/2;) {
    //   fill(255)
    // }
  }
}
