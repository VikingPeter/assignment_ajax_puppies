
function getPupsList() {

	var pupList = $('.index-puppies');

	$.ajax({
		url: "https://rocky-dusk-3509.herokuapp.com/puppies.json",
		type: "GET",
		dataType: "json",
		success: function( json ) {
			for (var i = 0; i < json.length; i++) {
				var puppy = json[i].breed.name + " named " + json[i].name
				appendPup(puppy, "li id=" + json[i].name, pupList);
			};
		},
		error: function( xhr, status, errorThrown ) {
			$('span').text("That didn't work. Not even a little bit.");
		}
	});
}

function getBreedsList() {

	var breedSelect = $('.select-puppies');

	$.ajax({
		url: "https://rocky-dusk-3509.herokuapp.com/breeds.json",
		type: "GET",
		dataType: "json",
		success: function( json ) {
			console.log(json)
			for (var i = 0; i < json.length; i++) {
				appendPup(json[i].name, "option value=" + json[i].id, breedSelect);
			};
		},
		error: function( xhr, status, errorThrown ) {
			$('.flash').text("That didn't work. Not even a little bit.");
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
	  data: $('.puppy-form').serializeArray(),
	  success: function( json ) {
	  	$('span').text(json.name + " created successfully");
	  }
	})

}

$(document).ready(function() {
	getPupsList();
	getBreedsList();
	$('button').click(function(){
		sendPup();
	});
	$('#refresh').click(function(){
		$('li').remove();
		getPupsList();
	});
	$(document).on("ajaxStart", function() {
		$(".flash").text("Waiting...").addClass("waiting");
	});
	$(document).on("ajaxSuccess", function () {
		$(".flash").text("Finished!").addClass("success");
		setTimeout(function(){
	    $(".flash").fadeOut("slow");
		}, 2000)
	});
	$(document).on("ajaxError", function () {
		$(".flash").text(xhr.responseText).addClass("error");
		setTimeout(function(){
	    $(".flash").fadeOut("slow");
		}, 2000)
	});

});