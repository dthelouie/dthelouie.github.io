$(document).ready(function() {
	var supportTouch = $.support.touch,
            scrollEvent = "touchmove scroll",
            touchStartEvent = supportTouch ? "touchstart" : "mousedown",
            touchStopEvent = supportTouch ? "touchend" : "mouseup",
            touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
    $.event.special.swipeupdown = {
        setup: function() {
            var thisObject = this;
            var $this = $(thisObject);
            $this.bind(touchStartEvent, function(event) {
                var data = event.originalEvent.touches ?
                        event.originalEvent.touches[ 0 ] :
                        event,
                        start = {
                            time: (new Date).getTime(),
                            coords: [ data.pageX, data.pageY ],
                            origin: $(event.target)
                        },
                        stop;

                function moveHandler(event) {
                    if (!start) {
                        return;
                    }
                    var data = event.originalEvent.touches ?
                            event.originalEvent.touches[ 0 ] :
                            event;
                    stop = {
                        time: (new Date).getTime(),
                        coords: [ data.pageX, data.pageY ]
                    };

                    // prevent scrolling
                    if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                        event.preventDefault();
                    }
                }
                $this
                        .bind(touchMoveEvent, moveHandler)
                        .one(touchStopEvent, function(event) {
                    $this.unbind(touchMoveEvent, moveHandler);
                    if (start && stop) {
                        if (stop.time - start.time < 1000 &&
                                Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                                Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                            start.origin
                                    .trigger("swipeupdown")
                                    .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                        }
                    }
                    start = stop = undefined;
                });
            });
        }
    };
    $.each({
        swipedown: "swipeupdown",
        swipeup: "swipeupdown"
    }, function(event, sourceEvent){
        $.event.special[event] = {
            setup: function(){
                $(this).bind(sourceEvent, $.noop);
            }
        };
    });
    
	game = new Game("0000000000000000")

	updateGrid = function(game){
		var row = $('#game-container').children().first()
		for (var rowIndex = 0; rowIndex < row.parent().children().length; rowIndex++){
		var cell = row.children().first()
			for (var cellIndex = 0; cellIndex < row.children().length; cellIndex++){
				if (game.board[rowIndex][cellIndex] == 0){
					cell.html("")
					cell.removeClass('tile-2 tile-4 tile-8 tile-16 tile-32 tile-64 tile-128 tile-256 tile-512 tile-1024 tile-2048 tile-super')
					cell.addClass('tile-0')
				} else {
					cell.html(game.board[rowIndex][cellIndex].toString())
					cell.removeClass('tile-0 tile-2 tile-4 tile-8 tile-16 tile-32 tile-64 tile-128 tile-256 tile-512 tile-1024 tile-2048 tile-super')
					cell.addClass("tile-" + game.board[rowIndex][cellIndex].toString())
				}
				cell = cell.next()
			}
			row = row.next()
		}
	}

	updateGrid(game)

	$(document).keyup(function(e){
		e.preventDefault();
		if (e.which == 37) {
			game.left()
			updateGrid(game);
		} else if (e.which == 38) {
			game.up()
			updateGrid(game);
		} else if (e.which == 39) {
			game.right()
			updateGrid(game);
		} else if (e.which == 40) {
			game.down()
			updateGrid(game);
		} else if (e.which == 82){
			game = new Game("0000000000000000")
			updateGrid(game);
		}
	})


	$(document).on("swipeleft", function(){
		game.left()
		updateGrid(game)
	})
	$(document).on("swiperight", function(){
		game.right()
		updateGrid(game)
	})
	$(document).on("swipeup", function(){
		game.up()
		updateGrid(game)
	})
	$(document).on("swipedown", function(){
		game.down()
		updateGrid(game)
	})

});
