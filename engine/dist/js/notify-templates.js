function nError(title, message, url){
$.notify({
	title: '<i class="fas fa-times"></i> <b>'+title+'</b>',
	message: message,
	url: url,
	target: '_blank'
},{
	type: 'danger',
	placement: {
		from: "bottom",
		align: "left"
	}
});;
}

function nWarning(title, message, url){
$.notify({
	title: '<i class="fas fa-exclamation-triangle"></i> <b>'+title+'</b>',
	message: message,
	url: url,
	target: '_blank'
},{
	type: 'warning',
	placement: {
		from: "bottom",
		align: "left"
	}
});;
}

function nInfo(title, message, url){
$.notify({
	title: '<i class="fas fa-info-circle"></i> <b>'+title+'</b>',
	message: message,
	url: url,
	target: '_blank'
},{
	type: 'info',
	placement: {
		from: "bottom",
		align: "left"
	}
});;
}

function nSuccess(title, message, url){
$.notify({
	title: '<i class="fas fa-check-circle"></i> <b>'+title+'</b>',
	message: message,
	url: url,
	target: '_blank'
},{
	type: 'success',
	placement: {
		from: "bottom",
		align: "left"
	}
});;
}
