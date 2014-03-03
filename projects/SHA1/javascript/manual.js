

function show(elementID) {

    var element = document.getElementById(elementID);
    if (!element) {
        alert("no such element");
        return;
    }

    var pages = document.getElementsByClassName('page'); //getting the total number of pages with a class of page

    for(var i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    }

    element.style.display = 'block';

}


function showDiv(elem) {
	
	var elem = document.getElementById(elem);
    elem.style.display = 'block';
}


function hideDiv(elem) {

	var elem = document.getElementById(elem);	
    elem.style.display = 'none';
}