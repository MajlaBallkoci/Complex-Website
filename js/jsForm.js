const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('fjalekalimi');
const password2 = document.getElementById('fjalekalimi2');
const tel = document.getElementById('tel');

form.addEventListener('submit', e => {
	e.preventDefault();	
	kontrolloInputet();
	
});

function kontrolloInputet() {
	// trim to remove the whitespaces
	const usernameVlera = username.value.trim();
	const emailVlera = email.value.trim();
	const fjalekalimiVlera = fjalekalimi.value.trim();
	const fjalekalimi2Vlera = fjalekalimi2.value.trim();
	let flag = false;
	
	if(usernameVlera === '') {
		setErrorFor(username, 'Username nuk duhet te jete bosh');
		flag= false;
	} else {
		setSuccessFor(username);
		flag = true;
	}

	if(emailVlera === '') {
		setErrorFor(email, 'Emaili nuk duhet te jete bosh');
		flag= false;
	} else if (!isEmail(emailVlera)) {
		setErrorFor(email, 'Emaili nuk eshte i sakte');
		flag= false;
	} else {
		setSuccessFor(email);
		flag = flag && true;
	}

	if(tel.value === '') {
		setErrorFor(tel, 'Numri nuk mund te jete bosh');
		flag= false;
	} else if (!isPhone(tel.value)) {
		setErrorFor(tel, 'Numri nuk eshte i sakte');
		flag= false;
	} else {
		setSuccessFor(tel);
		flag = flag && true;
	}
	
	if(fjalekalimiVlera === '') {
		setErrorFor(fjalekalimi, 'Fjalkalimi nuk mund te jete bosh');
		flag= false;
	} else {
		setSuccessFor(fjalekalimi);
		flag = flag && true;
	}
	
	if(fjalekalimi2Vlera === '') {
		setErrorFor(fjalekalimi2, 'Fjalkalimi nuk mund te jete bosh');
		flag= false;
	} else if(fjalekalimiVlera !== fjalekalimi2Vlera) {
		setErrorFor(fjalekalimi, 'Fjalekalimet nuk jane njelloj');
		setErrorFor(fjalekalimi2, 'Fjalekalimet nuk jane njelloj');
		flag= false;
	} else{
		setSuccessFor(fjalekalimi2);
		flag = flag && true;
	}

	if(!RadioButtonSelected())
	{
		let error = document.getElementById('err_msg');
		error.style.display = 'block';
		error = document.getElementById('err_icon');
		error.style.display = 'block';
		flag= false;
	}
	else
	{
		let error = document.getElementById('err_msg');
		error.style.display = 'none';
		error = document.getElementById('err_icon');
		error.style.display = 'none';
		flag = flag && true;
	}

	if(!Boxchecked())
	{
		var element = document.getElementById("liste");
        element.style.borderColor = "red";
		let error = document.getElementById('err_msg_list');
		error.style.display = 'block';
		flag= false;
	}
	else{
		var element = document.getElementById("liste");
        element.style.borderColor = "#2ecc71";
		let error = document.getElementById('err_msg_list');
		error.style.display = 'none';
		flag = flag && true;
	}

	if (flag)
		window.location.href = 'rregjistrimi.html';

}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'elementet error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'elementet success';
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function isPhone(phone) {
return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone);
}

function RadioButtonSelected(){
	var radios = document.getElementsByName("gjinia");
	var flag = false
	for (var i = 0, len = radios.length; i < len; i++) {
		 if (radios[i].checked) {
			 flag = true;
			 break
		 }
	}
	
	return flag;
}



function Boxchecked() {
    var datalist = document.getElementById('liste');
    var browserChildren = document.getElementById('kombesia').children

    var flag = false
    for(let i = 0; i < browserChildren.length; i++){
        flag = browserChildren[i].value === datalist.value || flag
    }

	return flag;
}

//drag and drop
// getElementById
function $id(id) {
	return document.getElementById(id);
}

//
// output information
function Output(msg) {
	var m = $id("messages");
	m.innerHTML = msg;
}
// call initialization file
if (window.File && window.FileList && window.FileReader) {
	Init();
}

//
// initialize
function Init() {

	var fileselect = $id("fileselect"),
		filedrag = $id("filedrag"),
		submitbutton = $id("submitbutton");

	// file select
	fileselect.addEventListener("change", FileSelectHandler, false);

	// is XHR2 available?
	var xhr = new XMLHttpRequest();
	if (xhr.upload) {
	
		// file drop
		filedrag.addEventListener("dragover", FileDragHover, false);
		filedrag.addEventListener("dragleave", FileDragHover, false);
		filedrag.addEventListener("drop", FileSelectHandler, false);
		filedrag.style.display = "block";
		
		// remove submit button
		submitbutton.style.display = "none";
	}

}
// file drag hover
function FileDragHover(e) {
	e.stopPropagation();
	e.preventDefault();
	e.target.className = (e.type == "dragover" ? "hover" : "");
}
// file selection
function FileSelectHandler(e) {

	// cancel event and hover styling
	FileDragHover(e);

	// fetch FileList object
	var files = e.target.files || e.dataTransfer.files;

	// process all File objects
	for (var i = 0, f; f = files[i]; i++) {
		ParseFile(f);
	}

}
function ParseFile(file) {

	Output(
		"<p>File information: <strong>" + file.name +
		"</strong> type: <strong>" + file.type +
		"</strong> size: <strong>" + file.size +
		"</strong> bytes</p>"
	);
	
}

