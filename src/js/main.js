function hamb() {
  var element = document.getElementById("hamb");
  if (element.classList[1] == "fa-bars"){element.classList.remove("fa-bars"); element.classList.add("fa-times");} else{
  if(element.classList[1] == "fa-times"){element.classList.remove("fa-times"); element.classList.add("fa-bars");}
  }

  var element2 = document.getElementById("shit");
  if (element2.classList[1] == "d-none"){element2.classList.remove("d-none"); element2.classList.add("d-block");} else{
  if (element2.classList[1] == "d-block"){element2.classList.remove("d-block"); element2.classList.add("d-none");} 
}
}

function langchange(){
 document.getElementById('lang').submit();
 console.log('lang submit clicked');
}

function howto1st() {
   var element = document.getElementById("howto1");
   element.classList.remove("d-none");
   var element = document.getElementById("howto2");
   element.classList.add("d-none");
   var element = document.getElementById("howto3");
   element.classList.add("d-none");
   var element = document.getElementById("howto4");
   element.classList.add("d-none");

   var element = document.getElementById("howto1btn");
   element.classList.add("howtoactive");
   var element = document.getElementById("howto2btn");
   element.classList.remove("howtoactive");
   var element = document.getElementById("howto3btn");
   element.classList.remove("howtoactive");
   var element = document.getElementById("howto4btn");
   element.classList.remove("howtoactive");
}
function howto2st() {
   var element = document.getElementById("howto2");
   element.classList.remove("d-none");
   var element = document.getElementById("howto1");
   element.classList.add("d-none");
   var element = document.getElementById("howto3");
   element.classList.add("d-none");
   var element = document.getElementById("howto4");
   element.classList.add("d-none");

   var element = document.getElementById("howto2btn");
   element.classList.add("howtoactive");
   var element = document.getElementById("howto1btn");
   element.classList.remove("howtoactive");
   var element = document.getElementById("howto3btn");
   element.classList.remove("howtoactive");
   var element = document.getElementById("howto4btn");
   element.classList.remove("howtoactive");
}

function howto3st() {
   var element = document.getElementById("howto3");
   element.classList.remove("d-none");
   var element = document.getElementById("howto1");
   element.classList.add("d-none");
   var element = document.getElementById("howto2");
   element.classList.add("d-none");
   var element = document.getElementById("howto4");
   element.classList.add("d-none");

   var element = document.getElementById("howto3btn");
   element.classList.add("howtoactive");
   var element = document.getElementById("howto1btn");
   element.classList.remove("howtoactive");
   var element = document.getElementById("howto2btn");
   element.classList.remove("howtoactive");
   var element = document.getElementById("howto4btn");
   element.classList.remove("howtoactive");
}

function howto4st() {
   var element = document.getElementById("howto4");
   element.classList.remove("d-none");
   var element = document.getElementById("howto1");
   element.classList.add("d-none");
   var element = document.getElementById("howto2");
   element.classList.add("d-none");
   var element = document.getElementById("howto3");
   element.classList.add("d-none");

   var element = document.getElementById("howto4btn");
   element.classList.add("howtoactive");
   var element = document.getElementById("howto1btn");
   element.classList.remove("howtoactive");
   var element = document.getElementById("howto2btn");
   element.classList.remove("howtoactive");
   var element = document.getElementById("howto3btn");
   element.classList.remove("howtoactive");
}

function arrowChange() {
	var element = document.getElementById("ar1");
	element.classList.remove("fa-caret-up");
	element.classList.add("fa-caret-down");
}

jQuery(window).scroll(function(){
         var $sections = $('section');
	$sections.each(function(i,el){
        var top  = $(el).offset().top-100;
        var bottom = top +$(el).height();
        var scroll = $(window).scrollTop();
        var id = $(el).attr('id');
    	if( scroll > top && scroll < bottom){
            $('a.active').removeClass('active');
			$('a[href="#'+id+'"]').addClass('active');

        }
    })
 });

$("nav").on("click","a", function (event) {
        // исключаем стандартную реакцию браузера
        event.preventDefault();
 
        // получем идентификатор блока из атрибута href
        var id  = $(this).attr('href'),
 
        // находим высоту, на которой расположен блок
            top = $(id).offset().top;
         
        // анимируем переход к блоку, время: 800 мс
        $('body,html').animate({scrollTop: top}, 800);
    });

function copy() {
  var copyText = document.getElementById("addr_str");
  copyText.select();
  document.execCommand("copy");
  $("#copyBtn").html('Скопировано!')
  
}

function copy_two() {
  var copyText = document.getElementById("addr_str2");
  copyText.select();
  document.execCommand("copy");
  $("#copyBtn2").html('Скопировано!')
}