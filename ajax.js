
function getPupsList() {

	var $pupList = $('.index-puppies');

	$.ajax({
		url: "https://rocky-dusk-3509.herokuapp.com/puppies.json",
		type: "GET",
		dataType: "json",
		success: function( json ) {
			for (var i = 0; i < json.length; i++) {
				var puppy = json[i].breed.name + " named " + json[i].name
				appendPup(puppy, "li id=" + json[i].name, $pupList);
			};
		},
	  error: function( xhr, status, errorThrown ) {
	  	$(".flash").text(status).addClass("error").show();
	  }
	});
}

function getBreedsList() {

	var $breedSelect = $('.select-puppies');

	$.ajax({
		url: "https://rocky-dusk-3509.herokuapp.com/breeds.json",
		type: "GET",
		dataType: "json",
		success: function( json ) {
			console.log(json)
			for (var i = 0; i < json.length; i++) {
				appendPup(json[i].name, "option value=" + json[i].id, $breedSelect);
			};
		},
	  error: function( xhr, status, errorThrown ) {
	  	$(".flash").text(status).addClass("error").show();
	  }
	});
}


function appendPup(string, tag, element) {
	element.append("<"+tag+">" + string + "</"+tag+">");
}


function sendPup() {
	$.ajax({

	  url: "https://rocky-dusk-3509.herokuapp.com/puppies.json",

	  type: "POST",
	  dataType: "json",
	  contentType: "application/json",

	  data: JSON.stringify({name:$('.puppy-name').val(),
					 breed_id:$('.select-puppies').val()}),

	  success: function( json ) {
	  	$('span').text(json.name + " created successfully");
	  },
	  error: function( xhr, status, errorThrown ) {
	  	$(".flash").text(status).addClass("error");
	  	console.log( "Error: " + errorThrown );
	  	console.log( "Status: " + status );
	  	console.dir( xhr );
	  }
	})

}

$(document).ready(function() {
	getPupsList();
	getBreedsList();
	$("form").submit(function(e){
		sendPup();
		e.preventDefault();
	});
	$("#refresh").click(function(){
		$("li").remove();
		getPupsList();
	});

	$(document).on("ajaxStart", function() {
		$(".flash").text("Waiting...").addClass("waiting").show();
	});

	$(document).on("ajaxSuccess", function () {
		$(".flash").text("Finished!").addClass("success").show();
		setTimeout(function(){
	    $(".flash").fadeOut("slow");
	    $(".flash").removeClass("success");
		}, 2000)
	});
	$(document).on("ajaxComplete", function() {
	 $(".flash").removeClass("waiting");
	});

});