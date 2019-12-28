$(function() {
 // Handler for .ready() called.
var cwrd = '';
var suggestions = [];		
		// $.getJSON( "/api/predict", function( data ) {
			// console.log(data);			
		// });		

var input = document.getElementById("predict");
var txt = document.getElementById("txt");



function goNext(inStr){
	input.value = "";
	txt.textContent += " " + inStr;
	cwrd = inStr;
	console.log("next", inStr);	
	$('#predict').focus();
}
		
		
$(function(){


$('#atinput').keydown(function( event ) {
		  if ( event.which == 13 ) {
			console.log("enter");
			var sent = $("#atinput").val();
			if (sent) {
				console.log("send text");
				$.get( "/api/attn", {data:sent} , function( data ) {
					console.log("get image");
				  $(".attn").attr("src", "data:image/png;base64, "+data);				  					  
				});
			}

		  }
		});

  $(".navbar-nav li").click(function (e) {
    e.preventDefault();
	var that = $(this);
	var clicked = that.attr("id");
    
	if (clicked === "navmain" || clicked === "navattn"){
		$(".navbar-nav>li").removeClass("active")
		that.addClass("active");
		$('.maintab').toggleClass("d-none");
		$('.attntab').toggleClass("d-none");
	} 
  });

})		
		
		$( "#predict" ).keydown(function( event ) {
		  if ( event.which == 13 ) {
			console.log("enter");
			goNext($(this).val());
			$.getJSON( "/api/predict", { data:cwrd },  function( data ) {
					console.log("predict!");					
					suggestions = data["sentence"];							  					  
				});
		  }
		});

		autocomplete({
			input: input,
			minLength: 0,
			showOnFocus: true,
			fetch: function(text, update) {
				text = text.toLowerCase();
				console.log("text", text);
				// you can also use AJAX requests instead of preloaded data
				// var suggestions = countries.filter(n => n.label.toLowerCase().startsWith(text))
				update(suggestions);			
			},
			onSelect: function(item) {
				console.log("select", input.value.length, $('#predict').val(),  $('#predict').val().length);
				if (!$('#predict').val()) {
					goNext(item.label);
				}
			}
		});

});

