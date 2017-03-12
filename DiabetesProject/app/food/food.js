function getResult(userInput) {
	var storedSearchItem;

	$.ajax({
		type: 'GET',
		async: false,
		url: 'https://api.nutritionix.com/v1_1/search/'+userInput+'?'+
		'fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat%2Cnf_cholesterol%2Cnf_sodium%2Cnf_sugars%2Cnf_protein&appId=29bde95b&appKey=b87cf0e17faa0683b968ce5971ffd8bc',
		success: function(d) {
			storedSearchItem = d.hits;
		}
	});

	storedSearchItem.map(function(item) {


		var x = item.fields
		//x.nf_serving_size_unit,
		//localStorage.setItem('serving_size_unit',x.nf_serving_size_unit);
		console.log(x.item_name);
		console.log(x.nf_serving_size_qty);
		console.log(x.nf_calories);
		console.log(x.nf_sugars);
		console.log(x.nf_total_fat);
		console.log(x.nf_cholesterol);
		console.log(x.nf_sodium);
		console.log(x.nf_protein);
		localStorage.setItem('item_name',x.item_name);
		localStorage.setItem('serving_size_qty',x.nf_serving_size_qty);
		localStorage.setItem('calories',x.nf_calories);
		localStorage.setItem('sugars',x.nf_sugars);
		localStorage.setItem('total_fat',x.nf_total_fat);
		localStorage.setItem('cholesterol1',x.nf_cholesterol);
		localStorage.setItem('sodium',x.nf_sodium);
		localStorage.setItem('protein',x.nf_protein);

	});
}

function searchValue() {
	var formVal = document.getElementById('searchBar').value;
	getResult(formVal);
}

$('#searchForm').submit(function(e) {
	e.preventDefault();
});