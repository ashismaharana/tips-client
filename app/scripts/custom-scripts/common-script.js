//freewall
function callFreeWall(selector){
    // console.log(freeWall);
    // var wall = new freewall("#freewall");
    var wall = new freewall(selector);

    wall.reset({

        selector: '.brick',
        cellW: 240,
        cellH: 'auto',
        gutterY: 15,
        gutterX: 15,
        // animate: true,
        delay: 0, 
        fixSize: null, // resize + adjust = fill gap;

        // rightToLeft: true,
        // keepOrder: true,
        // draggable: true,
        // cacheSize: true, // caches the original size of block;

	    onResize: function() {
	        console.log("Hi onResize");
	        wall.fitWidth();
	    },
        // onLoad: function() {
        //     console.log("Hi onResize");
        //     wall.fitWidth();
        // },

        onGapFound:function(gap, setting) {

        }
        // if('freewall-category' = id){
        //     alert('freewall-category')
        // animate: true,

        // }
  	});

        // wall.reset({

        //      onGapFound:function(gap, setting) {

        //      }
        // });
  		 wall.container.find('.brick').load(function() {
			// debugger;
			console.log('brick')
			wall.fitWidth();
		});
  		  wall.fitWidth();

}
