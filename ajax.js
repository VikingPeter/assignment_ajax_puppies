
function getPupsList() {

	var $pupList = $('.index-puppies');

	$.ajax({
		url: "https://rocky-dusk-3509.herokuapp.com/puppies.json",
		type: "GET",
		dataType: "json",
		success: function( json ) {
			for (var i = 0; i < json.length; i++) {
				var puppy = json[i].breed.name + " named " + json[i].name
				appendPup("[" + json[i].id + "] " + puppy, "li id=" + json[i].name, $pupList);
				appendPup("Adopt!", "a class='delete' href='#' data-id=" + json[i].id, $('li').last())
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

function deletePup( puppyId ) {
	$.ajax({

	  url: "https://rocky-dusk-3509.herokuapp.com/puppies/" + puppyId + ".json",

	  type: "DELETE",
	  dataType: "json",
	  contentType: "application/json",

	  data: JSON.stringify({ id:puppyId }),

	  success: function( json ) {
	  	$('span').text(json.name + " was adopted!");
	  	refreshPupsList();
	  },
	  error: function( xhr, status, errorThrown ) {
	  	$(".flash").text(status).addClass("error");
	  	console.log( "Error: " + errorThrown );
	  	console.log( "Status: " + status );
	  	console.dir( xhr );
	  }
	})
}

function refreshPupsList() {
	$("li").remove();
	getPupsList();
}




$(document).ready(function() {
	getPupsList();
	getBreedsList();
	$("form").submit(function(e){
		sendPup();
		e.preventDefault();
	});

	$("#refresh").click(function(){
		refreshPupsList();
	});

	$("ul").click('.delete', function(event){
		puppyId = $(event.target).data('id')
		deletePup(puppyId);
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