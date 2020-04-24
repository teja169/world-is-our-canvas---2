var canavs;
var database;

var drawing = []

function setup() {
    canvas = createCanvas(1060,500);
    canvas.parent('canvascontainer');
    database = firebase.database()
    background(26, 242, 73);
    var clearbutton = select('#clearbutton');

    // clearbutton.mousePressed(clearDrawing());

}

var db_drawing = []

function mouseDragged() {

    var point = {
        x: mouseX,
        y: mouseY
    }
    drawing.push(point);
    var drawingRef = database.ref('drawing')
    drawingRef.set({
        "d": drawing
    })
}

function draw() {
    readData()
    beginShape();
    stroke(255);
    strokeWeight(4);
    noFill();
    for (var i = 0; i < db_drawing.length; i++) {
        vertex(db_drawing[i].x, db_drawing[i].y);
        endShape();
    }

    // Text("To draw lines, make a point where u want to start and click on canvas to draw it",500,700);

}

function readData() {
    database.ref('drawing/').on('value', (data) => {
        db_drawing = data.val().d
    })
}

// function clearDrawing() {
//     db_drawing = []
//     var drawingRef = database.ref('drawing')
//     drawingRef.set({
//         "d": []
//     })
// }

// function clearDrawing() {
//     db_drawing = [];
//     var adaRef = database.ref('d/');
//     adaRef.remove();
// }