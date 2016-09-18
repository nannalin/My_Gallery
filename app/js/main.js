window.onload = function() {
	"use strict";
	var jsonData;
	// load json file and get data
	load("../images.json", function(data) {
		jsonData = data;
		// loop through each data to get image URLs
		for (var key in jsonData) {
			// get an image URL
			var imageSrc = jsonData[key];
			// create an image element and add it to a container
			addImgToDiv(imageSrc, "image-container");
		}	
	});	

	// load file and return data from file
	function load(file, callback) {    
	    // create a new instance of a XMLHttpRequest 
	    var xobj = new XMLHttpRequest();
	    xobj.overrideMimeType("application/json");
	    xobj.open('GET', file, true);
	    xobj.onreadystatechange = function() {
	        if (xobj.readyState !== 4) return true;
	        if (xobj.status === 200) {
	        	// get content of the response text
	            callback(JSON.parse(xobj.responseText));      
	        } else { //if (xobj.status === 404) or file not found
	            // create an error text element
	            var errorText = document.createElement('p');
	            errorText.className = "error-text";
	            errorText.innerHTML = "Oops! we cannot find a file to load images!";
	            // append error text to a containor
	            document.getElementById("image-container").appendChild(errorText);
	        }
	    }
	    xobj.send(null);
	}

	function addImgToDiv(imgSrc, ParentIdName) {
		//create an img element
		var img = document.createElement("img");
		// set src of an image
		img.src = imgSrc; 
		img.setAttribute("draggable", "true");
		// create drag and drop events of an image
		img.setAttribute("ondragenter", "dragenter(event)");
		img.setAttribute("ondragstart", "dragstart(event)");
		// append an image to a container
		document.getElementById(ParentIdName).appendChild(img);
	}		
};



