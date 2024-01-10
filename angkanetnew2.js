jQuery(function($) {
	
	var mouseDownState, eraseState, curColor;
	
	// Clearing the Design
	$("#clear").click(function() {
		rows = $("#gridSize").val().split(",")[0];
		cols = $("#gridSize").val().split(",")[1];
		buildGrid(rows, cols);
	});
		
	 $("#btnSubmit").click(function(){
		$(".angkas").css("background", "");
		$(".angkasx").css("background", "");
	}); 
	
	// Drawing functionality
	$("#drawing-table").delegate("td", "mousedown", function() {
		mouseDownState = true;
		$el = $(this);
	    if (eraseState) {
	    	$el.removeAttr("style");
	    } else {
	    	$el.css("background", curColor);
	    }
	}).delegate("td", "mouseenter", function() {
		if (mouseDownState) {
			$el = $(this);
		    if (eraseState) {
		    	$el.removeAttr("style");
		    } else {
		    
		    	// DRAWING ACTION
		    	$el.css("background", curColor);
		    }
		}
	});
	$("html").bind("mouseup", function() {
		mouseDownState = false;
	});
	
	// Erasing functionality through OPTION key
	$(document).keydown(function(event) {
		if (event.keyCode == 18) {
			eraseState = true;
			$(".selected").addClass("previous");
			$(".color").removeClass("selected");
			$(".eraser").addClass("selected");
			
		}
	}).keyup(function(event) {
		if (event.keyCode == 18) {
			eraseState = false;
			$(".color").removeClass("selected");
			$(".previous").addClass("selected").removeClass("previous");
			$("." + curColor).addClass("selected");
		}
	});
	
	// Color selection swatches
	$("#color-selector").delegate(".color", "click", function() {
		
		$el = $(this);
		var pulledVal = $el.attr("data-color");
		
		if (pulledVal == 'eraser') {
			eraseState = true;
		} else {
			eraseState = false;
			curColor = pulledVal;
		}
		
		$(".color").removeClass("selected");
		$(this).addClass("selected");
	});
	
	// Tracing Functionality
	$("#tracing-image-form").submit(function() {
		
			var url = $("#fileLocation").val();
						
			$("<div />", {

				id: "tracing-image"
			
			}).appendTo("#table-wrap");
			
			$("#drawing-table").css("opacity", 0.5);
			$("#toggle-tracing-mode").show(); 
			$("#tracing-image-form").remove();
			tracingMode = true;	
						
			return false;
	
		});
	
	$("#toggle-tracing-mode").click(function() {
	
		if (tracingMode) {
			$("#tracing-image").css("visibility", "hidden");
			$(this).html("Toggle Tracing Mode On");
			$("#drawing-table").css("opacity", 1);
			tracingMode = false;
		} else {
			$("#tracing-image").css("visibility", "visible");
			$(this).html("Toggle Tracing Mode Off");
			$("#drawing-table").css("opacity", 0.5);
			tracingMode = true;
		}
	
	});
	
	$('.color input').ColorPicker({
		onSubmit: function(hsb, hex, rgb, el) {
		
			var $swatch = $(el).parent();
			var newColor = "#" + hex;
			
			$(".color").removeClass("selected");
			$("." + $swatch.attr("data-color")).css("background", newColor).addClass("selected");
			$swatch.attr("data-color", newColor);
			curColor = newColor;
			    		    		
		},
		onBeforeShow: function () {
			$(this).ColorPickerSetColor(this.value);
		}
	});
    
	$("#get-html-button").click(function() {
		$("#the-html").val("<table style='width: 100%; border-collapse: collapse;'>" + $("#drawing-table").html() + "</table>");
	});	

});