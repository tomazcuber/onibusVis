

var minlat =  -23.2, maxlat = -22.8; // Original bounds of the minimum bounding rect
var minlon = -43.8, maxlon =  -43.12;

var screensize = 100000; // data quantized into this grid


var data = null;
var timeinterval = 1;

var svg = d3.select("#canvas");
var width = parseInt (svg.attr("width"));
var height = parseInt (svg.attr("height"));
height = 400;

console.log (width, height);

d3.json("resources/trajectories.json" , function(d) {
	data = d;
	visualize();
})

function visualize() {

    var selected = [];
    for (var ordem in data) {
    	var traj = data[ordem];
    	if (traj [timeinterval] != undefined) {
    		selected.push (traj [timeinterval]);
    	}
    }

	svg.selectAll ("circle").remove();

    svg.selectAll ("circle").data (selected)
    	.enter()
    	.append ("circle")  	
    	.attr ("class" , "onibus")
    	.attr ("r", 2)
    	.attr ("cx" , function (d) { 
    		var x =  d[1] / screensize * width;
    		return x;
    	})
    	.attr ("cy" , function (d) { 
    		var y = d[0] / screensize * height;
    		return y;
    	});
}

svg.on("mousedown", function () {
	var pos = d3.mouse(this);
	timeinterval = parseInt (pos[0] / width * (24 * 12));
	console.log (pos, timeinterval);
	visualize();
});

