var ecouteEnCours = false;
var menuOuvert = false;
var titleBefore = document.title;

jQuery(document).ready(function($) 
{
	//INCLU DANS LE TEMPLATE DE BASE ET RASSEMBLER DANS CE FICHIER (FICHIER skip-link-focus-fix.JS)
	var is_webkit = navigator.userAgent.toLowerCase().indexOf( 'webkit' ) > -1,
	    is_opera  = navigator.userAgent.toLowerCase().indexOf( 'opera' )  > -1,
	    is_ie     = navigator.userAgent.toLowerCase().indexOf( 'msie' )   > -1;

	if ( ( is_webkit || is_opera || is_ie ) && 'undefined' !== typeof( document.getElementById ) ) 
	{
		var eventMethod = ( window.addEventListener ) ? 'addEventListener' : 'attachEvent';
		window[ eventMethod ]( 'hashchange', function() {
			var element = document.getElementById( location.hash.substring( 1 ) );

			if ( element ) {
				if ( ! /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) )
					element.tabIndex = -1;

				element.focus();
			}
		}, false );
	}
	
	//INCLU DANS LE TEMPLATE DE BASE ET RASSEMBLER DANS CE FICHIER (FICHIER custom.JS)
	$(".header-search-icon").click(function(){
		$("#masthead .search-form").slideToggle('slow', function(){
			if($("#masthead .search-form").is(":visible"))
			{
				$("#masthead .search-form .search-field").focus();
			}
		});
	});
		
	$(window).bind('scroll', function(e) {
		header_image_effect();
	});
	
	$(window).bind('touchmove', function(e) { 
		header_image_effectmove(e);
	});

	//INCLU DANS LE TEMPLATE DE BASE ET RASSEMBLER DANS CE FICHIER (FICHIER Navigation.JS)
	var container, button, menu;
	container = document.getElementById( 'site-navigation' );
	if ( ! container )
		return;

	button = container.getElementsByTagName( 'h1' )[0];
	if ( 'undefined' === typeof button )
		return;

	menu = container.getElementsByTagName( 'ul' )[0];
	// Hide menu toggle button if menu is empty and return early.
	if ( 'undefined' === typeof menu ) {
		button.style.display = 'none';
		return;
	}

	if ( -1 === menu.className.indexOf( 'nav-menu' ) )
		menu.className += 'nav-menu';

	button.onclick = function() {
		if ( -1 !== container.className.indexOf( 'main-small-navigation' ) )
		{
			container.className = container.className.replace( 'main-small-navigation', 'main-navigation' );
			menuOuvert = false;
		}
		else
		{
			container.className = container.className.replace( 'main-navigation', 'main-small-navigation' );
			menuOuvert = true;
		}
	};
	
	$("#content").click(function()
	{
		if(menuOuvert)
		{
			$("#site-navigation h1").click();
		}
	});
		
	$(window).resize(function() {
		if($(window).width()>1007 && menuOuvert)
		{
			$("#site-navigation h1").click();
			$(".expand-menu").each(function() 
			{
				$(this).parent().find( "ul.sub-menu" ).removeAttr( 'style' );
			});
		}		
	});

	//DEVELOPPER PAR PFSM999
	$(document).on('click', ".saison", function() {
		var rel = $(this).attr('rel');
		if($(this).hasClass('close'))
		{
			$("."+rel).show();
			$(this).removeClass('close').addClass('open');
			$(this).removeClass('fa-chevron-circle-down').addClass('fa-chevron-circle-up');
		}
		else{
			$("."+rel).hide();
			$(this).removeClass('open').addClass('close');
			$(this).removeClass('fa-chevron-circle-up').addClass('fa-chevron-circle-down');
		}
	});
	$('.menu-item').hover(  
		function() 
		{  
			$(this).addClass('hover');  
		},  
		function() 
		{  
			$(this).removeClass('hover');  
		}  
	);
	
	$('.menunav-menu>li').live('keyup', function(e) {
		if (e.keyCode == 9) {
			e.preventDefault();
			$('.menunav-menu>li').removeClass("hover");
			$(this).addClass('hover');
		}
	});
	
	$('.menunav-menu>li>.sub-menu>li').live('keyup', function(e) {
		if (e.keyCode == 9) {
			e.preventDefault();
			$('.menunav-menu>li>.sub-menu>li').removeClass("hover");
			$(this).addClass('hover');
		}
	});
	
	$('.menunav-menu>li>.sub-menu>li>.sub-menu>li').live('keyup', function(e) {
		if (e.keyCode == 9) {
			e.preventDefault();
			$('.menunav-menu>li>.sub-menu>li>.sub-menu>li').removeClass("hover");
			$(this).addClass('hover');
		}
	});

	
	$(".episode_title, .episode_box .fa-angle-down, .episode_box > div:first-of-type").click(function()
	{
		var numSel = $(this).attr('rel');
		if(!$("."+numSel).is(":visible"))
		{
			$("."+numSel).removeClass("episode_hide");
			$(".i_"+numSel).removeClass("fa-angle-down").addClass("fa-angle-up");
		}
		else
		{
			$("."+numSel).addClass("episode_hide");
			$(".i_"+numSel).removeClass("fa-angle-up").addClass("fa-angle-down");
		}
	});

	animationEnCours = false;
	$(".widget-synops-open").click(function()
	{
		if(animationEnCours)
			return;
		if(!$(".widget").hasClass("widget-synops-open-aready"))
		{
			animationEnCours = true;
			$(".widget").addClass("widget-synops-open-aready").animate({"right":"0px"}, "fast",function() {animationEnCours = false;});
			$(".widget-synops-open > i").removeClass("fa-chevron-circle-left").addClass("fa-chevron-circle-right");
			$(".widget-synops-open").addClass("widget-synops-open-areadyclose");
		}
		else
		{
			$(".panel-item").removeClass("selected-item");
			$('.panel-item[rel="nofollow self"]').addClass("selected-item");
			$(".widget-synops").not("#widget-1").addClass("widget-hide");
			$("#widget-1").removeClass("widget-hide");
			animationEnCours = true;
			$(".widget").animate({"right":"-300px"}, "fast", function() 
			{
				animationEnCours = false;
				$(".widget").removeClass("widget-synops-open-aready")
				$(".widget-synops-open > i").removeClass("fa-chevron-circle-right").addClass("fa-chevron-circle-left");
				$(".widget-synops-open").removeClass("widget-synops-open-areadyclose");
			});
		}
	});
	
	$(".panel-item").click(function()
	{
		$(".panel-item").not(this).removeClass("selected-item");
		$(this).addClass("selected-item");
		var numSel = $(this).attr('rel');
		$(".widget-synops").not("#widget-"+numSel).addClass("widget-hide");
		$("#widget-"+numSel).removeClass("widget-hide");
	});
	
	$(".event-nextmonth").live("click",function()
	{
		$(this).addClass("calendrier-click");
		jQuery.post(
			ajaxurl,
			{
				'action': 'event_month',
				'month': moisDeb+1,
				'year': anneDeb
			},
			function(response){
				if(moisDeb == 12)
				{
					moisDeb=1;
					anneDeb++;
				}
				else
				{
					moisDeb++;
				}
				$('.tab-calendrier').html(response);
			}
		);
	});
	$(".event-previousmonth").live("click",function()
	{
		$(this).addClass("calendrier-click");
		jQuery.post(
			ajaxurl,
			{
				'action': 'event_month',
				'month': moisDeb-1,
				'year': anneDeb
			},
			function(response){
				if(moisDeb == 0)
				{
					moisDeb=12;
					anneDeb--;
				}
				else
				{
					moisDeb--;
				}
				$('.tab-calendrier').html(response);
			}
		);
	});
	
	$(".nav-next").hover(function() {
		$("#next_post").addClass("previous_next_post_hover");
	},function() {
		$("#next_post").removeClass("previous_next_post_hover");
	});
	
	$(".nav-previous").hover(function() {
		$("#previous_post").addClass("previous_next_post_hover");
	},function() {
		$("#previous_post").removeClass("previous_next_post_hover");
	});
	
	$(".event-item").click(function()
	{
		var numSel = $(this).attr('rel');
		if($("#irl-widget-"+numSel).is(":visible"))
		{
			$("#irl-widget-"+numSel).slideToggle();
			$(this).children("i").removeClass("fa-arrow-circle-up");
			$(this).children("i").addClass("fa-arrow-circle-down");
		}
		else
		{
			$("#irl-widget-"+numSel).hide();
			$("#irl-widget-"+numSel).removeClass("widget-hide");
			$("#irl-widget-"+numSel).slideToggle();
			$(this).children("i").removeClass("fa-arrow-circle-down");
			$(this).children("i").addClass("fa-arrow-circle-up");
		}
	});	
	
	$("#jquery_jplayer_1").bind($.jPlayer.event.play, function()
	{
		ecouteEnCours = true;
		var current 	= myPlaylist.current;
        var playlist 	= myPlaylist.playlist;		
		$(".fa-play").removeClass("fa-play").addClass("fa-pause");
		$.each(playlist, function (index, obj) {
		   if (index == current) {
				document.title = '\u25B6 ' + obj.title + " | " + titleBefore;
			} // if condition end
		});
	});
	
	$("#jquery_jplayer_1").bind($.jPlayer.event.pause, function()
	{
		$(".fa-pause").removeClass("fa-pause").addClass("fa-play");
		document.title = titleBefore;
		ecouteEnCours = false;
	});
	
	$( ".comments-page" ).change(function() {
		loadComment();
		var newUrl = 'http://' + window.location.hostname + window.location.pathname + "?cpage=" + this.value+"#comments";
		$(location).attr('href',newUrl);
	});
	
	$(".comment-navigation .nav-nav a").click(function()
	{
		loadComment();
	});
	
	$(".expand-menu").click(function()
	{
		$(this).parent().find( "ul.sub-menu" ).first().toggle();
		if($(this).find( "i" ).hasClass("fa-chevron-circle-down"))
		{
			$(this).find( "i" ).removeClass("fa-chevron-circle-down").addClass("fa-chevron-circle-up");
		}
		else
		{
			$(this).find( "i" ).removeClass("fa-chevron-circle-up").addClass("fa-chevron-circle-down");
		}
	});
	
	$(".expand-menu").each(function() {
		if(!$(this).parent().find( "ul.sub-menu" ).length)
		{
			$(this).find( "i" ).hide();
		}
	});
});

window.onbeforeunload = function(e) {
	var e = e || window.event;
	if(ecouteEnCours)
	{
		// For IE and Firefox
		if (e) 
		{
			e.returnValue = 'Attention !\nVous êtes en train d\'écouter un fichier audio.\nEn changeant de page, l\'écoute s\'arrêtera !';
		}
		return 'Attention !\nVous êtes en train d\'écouter un fichier audio.\nEn changeant de page, l\'écoute s\'arrêtera !';
	}
}

function loadComment()
{
	jQuery(".nav-nav").hide();
	jQuery(".nav-load").show();
}

function header_image_effect() {
	var scrollPosition = jQuery(window).scrollTop();
	jQuery('#parallax-bg').css('top', (0 - (scrollPosition * .2)) + 'px');
}

function header_image_effectmove(e) {
	var scrollPosition = jQuery(window).scrollTop();
	jQuery('#parallax-bg').css('top', (0 - (scrollPosition * .2)) + 'px');
}