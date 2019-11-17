


if (window.File && window.FileReader && window.FileList && window.Blob) 
	{
		// Great success! All the File APIs are supported.
	} else 
	{
		alert('The File APIs are not fully supported in this browser.');
	}
 
	function handleFileSelect(evt) {
		evt.stopPropagation();
		evt.preventDefault();

		var files = evt.target.files || evt.dataTransfer.files; // FileList object.
		var file = files[0];

		// this creates the FileReader and reads stuff as text
		var fr = new FileReader();
		fr.onload = parse;
		fr.readAsText(file);

		// this is the function that actually parses the file
		// and populates the table
		function parse()
		{
			var table = document.getElementById('emps');
			var employees = fr.result.split('\n'); var c = 0;
			for (var i in employees)
			{
				var employee = employees[i].split(',');
				if (employee.length == 3)
				{
					var row = document.createElement('tr');
					row.innerHTML = "<td>" + employee.join("</td><td>") + "</td>";
					table.appendChild(row);
					c++;
				}
			}
			document.getElementById('result').innerHTML = '<span>Added ' + c + ' employees from file: ' + file.name + '</span>';
		}
	}

	function handleDragOver(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
	}
	
	// yeah, I know this is not quite right
	window.onload = function()
	{
		// Setup the dnd listeners.
		var dropZone = document.getElementById('drop_zone');
		dropZone.addEventListener('dragover', handleDragOver, false);
		dropZone.addEventListener('drop', handleFileSelect, false);

		document.getElementById('files').addEventListener('change', handleFileSelect, false);
	}
	