/**
 * @author Phull, Raghuveer
 */

// I have created a global contacts object because i will be playing with this object the whole time. 
// I choose it to be global because i know all the operations i have to do will be related to contacts. So, i could easily manipulate this object and reuse it.
var contacts = [ ];


// I have given three types of tracking. Mouse hover, key press and mouse click. More could be added based on different event types.
function tracking( ) {
	var content = document.getElementById( 'contents' );
	var tracking = document.getElementById( 'tracking' );

	content.addEventListener( "mouseover", function( ) {
		return tracking.innerHTML += '<label style="color:red">Mouse is Hovering Over! <label><br>';
	} );
	content.addEventListener( "click", function( ) {
		return tracking.innerHTML += '<label style="color:blue">Who Clicked the mouse ?<label><br>';
	} );
	content.addEventListener( "keypress", function( ) {
		return tracking.innerHTML += '<label style="color:aqua">Looks like somebody is pressing some keys..<label><br>';
	} );

}

// Hiding the add menu as default and only when this funtion is called, make it visible.
function displayAddMenu( ) {
	var addMenu = document.getElementById( 'add-menu' );
	addMenu.style.display = 'block';
}

// Since I have used global contacts object, i am manipulating json object based on array index to be removed. It could be done
// in a better way using jquery, but this is what i could think of as an alternative of using only javascript. Given more time,
// I guess this can be done inline. But for now, I have a seperate function for this.
function removeFromJSON( input ) {
	var length = contacts.length;
	var newJson = [ ];

	for ( var i = 0; i < length; i++ ) {
		if ( i !== input ) {
			newJson.push( contacts[ i ] );
		}
	}

	printTable( newJson ); // recreating the table again so that changes are reflected immediately
	contacts = newJson; // Re assigning the newly manipulated json to original contacts object for future
	hideAll( );
}

// Function for dynamically printing the table. Depends on global contacts object
function printTable( input ) {
	var length = input.length;

	var myTable = "<thead> ";
	myTable += "<th>First Name</th>";
	myTable += "<th>Last Name</th>";
	myTable += "<th>Contact Number</th>";
	myTable += "<th>Remove</th>";
	myTable += "</thead>";
	myTable += "<tbody>";

	for ( var i = 0; i < length; i++ ) {
		myTable += "<tr>";
		myTable += "<td>" + input[ i ].first_name + "</td>";
		myTable += "<td>" + input[ i ].last_name + "</td>";
		myTable += "<td>" + input[ i ].contact_number + "</td>";
		myTable += "<td> <input type='button' value='remove' onclick='removeFromJSON(" + i + ")' /></td>";
		myTable += "</tr>";
	}

	myTable += "</tbody>";

	var table = document.getElementById( 'contact' );
	table.innerHTML = myTable;
	return true;
}

// This was not requested but i thought it would be good to have some basic validation for inputs.
function validate( input, type ) {

	console.log( input + " " + type );
	if ( input.length < 0 ) {
		return false;
	}

	var valid = {
		"number" : function( input ) {
			var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
			// Copy pasted reg ex from google.com
			if ( input.match( phoneno ) ) {
				return input;
			} else {
				var newprompt = prompt( 'The input is not like phone number. Please enter phone number again..' );
				return validate( newprompt, 'number' );
			}

		},
		"text" : function( input ) {
			var letters = /^[a-zA-Z]+$/;
			//console.log (input.match(letters));
			if ( input.match( letters ) ) {
				return input;
			} else {
				var newprompt = prompt( 'The input is not text. Please enter text value again..' );
				return validate( newprompt, 'text' );
			}
		},
		"default" : function( ) {
			alert( 'Invalid input type..' );
			return false;
		}
	};

	return valid[type]( input );
}

// Fetching the values from input text boxes and populating the contacts objects
function addContact( ) {
	var first = validate( document.getElementById( 'first-name' ).value, 'text' );
	var last = validate( document.getElementById( 'last-name' ).value, 'text' );
	var contactNumber = validate( document.getElementById( 'contact-number' ).value, 'number' );

	contacts.push( {
		first_name : first,
		last_name : last,
		contact_number : contactNumber
	} );

	// clearing up the input for next iteration 
	document.getElementById( 'first-name' ).value = '';
	document.getElementById( 'last-name' ).value = '';
	document.getElementById( 'contact-number' ).value = '';

	hideAll( ); // hide the box as soon as one entry is done.
}

// Exporting contacts to read only text area
function exportContacts( ) {
	var textArea = document.getElementById( 'text-area' );
	var json = JSON.stringify( contacts );
	textArea.value = json;
}

// importing contacts based on the entry in text area. A validation could be done to check if the input is of json type or not.
// I will extend this further.
function importContacts( ) {
	var textArea = document.getElementById( 'import-area' );
	var json = JSON.parse( textArea.value );
	contacts = json;
	printTable( contacts );
}

// Storing data in local storage. It could be stored in Cookie as well but i dont think thats what you were looking for in bonus question
function persistContacts( ) {
	var data = JSON.stringify( contacts );
	
	if (typeof(Storage) != "undefined") {
		localStorage.removeItem('persist'); // Unsetting before creating a new item
		localStorage.setItem( 'persist', data );	
		console.log (data);
	} else {
		console.log ("Your browser does not support local storage");
	}
	
}

// Loading Persisted Data
function loadPersistedContacts( ) {
	var storedData =  localStorage.getItem( 'persist' ) ;
	console.log( 'stored data is: ' + storedData );
	document.getElementById( 'persist-area' ).value = storedData ;

}

// Function called on page load to hide the add menu. Also called within code to hide things time to time.
// Since this is at page load, tracking function is added here.
function hideAll( ) {
	var addMenu = document.getElementById( 'add-menu' );
	addMenu.style.display = 'none';
	printTable( contacts );

	tracking(); // Could be called outside of hideAll also but then we have to make sure that the div used in tracking function is available before this code is hit.
}

