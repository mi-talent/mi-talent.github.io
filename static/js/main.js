;
document.addEventListener("DOMContentLoaded", function(){
  svg4everybody();
  barbaNavigation();
});


//Screen Slider
function makeMainScreenSlider(index){
// Params
var mainSliderSelector = '.main-slider',
    navSliderSelector = '.nav-slider',
    interleaveOffset = 0.5,
    initialSlide = index;


// Main Slider
var mainSliderOptions = {
      speed: 1000,
      direction: 'vertical',
      initialSlide: initialSlide,
      watchSlidesProgress: true,
      mousewheel: {
        invert: true
      },
      keyboard: {
        enabled: true,
        onlyInViewport: false
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
      },
      on: {
        imagesReady: function(){
          this.el.classList.remove('loading');
        },
        progress: function(){
          var swiper = this;
          for (var i = 0; i < swiper.slides.length; i++) {
            var slideProgress = swiper.slides[i].progress,
                innerOffset = swiper.width * interleaveOffset,
                innerTranslate = slideProgress * innerOffset;
            swiper.slides[i].querySelector(".slide-bgimg").style.transform =
              "translate3d(" + -innerTranslate/2 + "px, 0, 0)";
          }
        },
        touchStart: function() {
          var swiper = this;
          for (var i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = "";
          }
        },
        setTransition: function(speed) {
          var swiper = this;
          for (var i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = speed + "ms";
            swiper.slides[i].querySelector(".slide-bgimg").style.transition =
              speed * 1.5 + "ms";
          }
        }
      }

    };

var mainSlider = new Swiper(mainSliderSelector, mainSliderOptions);


// Navigation Slider
var navSliderOptions = {
      loopAdditionalSlides: 10,
      speed:1000,
      initialSlide: initialSlide,
      direction: 'vertical',
      slidesPerView: 5,
      spaceBetween: 20,
      centeredSlides : true,
      touchRatio: 0.2,
      slideToClickedSlide: true,
      on: {
        imagesReady: function(){
          document.querySelector('.swiper-nav-wrap').classList.remove('loading');
        },
        click: function(){
          mainSlider.autoplay.stop();
        }
      }
    };
var navSlider = new Swiper(navSliderSelector, navSliderOptions);

// Matching sliders
mainSlider.controller.control = navSlider;
navSlider.controller.control = mainSlider;
};

//Custom Cursor
function makeCustomCursor() {
  var clientX = -100;
  var clientY = -100;
  var customCursor = document.querySelector('.cursor');
  customCursor.style.cssText = "transform: translate(" + clientX + "px," + clientY + "px)";
  var initCursor = function() {
    document.addEventListener('mousemove', function(e){
      clientX = e.clientX;
      clientY = e.clientY;
    })

    var render = function() {
      customCursor.style.cssText = "transform: translate(" + clientX + "px," + clientY + "px)";
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  };
  var initHovers = function() {
    var handleMouseEnter = function(e) {
      var currentTarget = e.currentTarget;
      customCursor.classList.add("cursor_" + currentTarget.getAttribute('data-cursor'))
      isStuck = true;
    };
    var handleMouseLeave = function() {
      customCursor.className = '';
      customCursor.classList.add('cursor');
      isStuck = false;
    };

    var hoveredItems = document.querySelectorAll(".interactive");
    [].forEach.call(hoveredItems, function(item){
      item.addEventListener("mouseenter", handleMouseEnter);
      item.addEventListener("mouseleave", handleMouseLeave);
    });
  }

  if('ontouchstart' in document.documentElement){
    customCursor.style.display = 'none';
  } else {
    initCursor();
    initHovers();
  }
};

//Nav
function makeNavigation() {
var navBtn = document.getElementById('toggle-navigation-btn'),
    mainNav = document.getElementById('main-nav'),
    navItems = mainNav.querySelectorAll('.main-nav__item-wrap'),
    closeBtn = document.querySelector('.main-nav__close-btn'),
    screenToAnimation,
    screenWidth = $(window).width();
navBtn.onclick = function() {
  var tl = new TimelineMax({
    onComplete: function() {
      mainNav.classList.add('main-nav_show')
    }
  });
  tl
  .to(mainNav, .5,{x: 0, opacity: 1})
};

function closeNav(){
  var tlClose = new TimelineMax({
    onStart: function() {
      mainNav.classList.remove('main-nav_show')
    }
  });
  tlClose
  .to(mainNav, .5,{x: screenWidth * 1.2, opacity: 0}, '+=1')
}

closeBtn.addEventListener("click", closeNav);
[].forEach.call(navItems, function(item) {
  item.addEventListener("click", closeNav);
});
};

//Slider
function makePortfolioSlider() {
  $('.js-portfolio-slider ').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
};
function makeMediaLinksSlider() {
  $('.js-medialinks-slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
};

//CUSTOM VIDEO CONTROLS
function customVideoControls() {
  var video = document.getElementById('video'),
      videoPlayBtn = document.getElementById('playBtn'),
      videoPauseBtn = document.getElementById('pauseBtn'),
      videoPoster = document.querySelector('.video__poster');
      video.controls = false;
      videoPlayBtn.onclick = function() {
        videoPoster.classList.add('video__poster_hidden');
        this.classList.add('video__playBtn_hidden');
        videoPauseBtn.classList.remove('video__pauseBtn_hidden');
        video.play();
      };

  videoPauseBtn.onclick = function() {
    videoPoster.classList.remove('video__poster_hidden');
    this.classList.add('video__pauseBtn_hidden');
    videoPlayBtn.classList.remove('video__playBtn_hidden');
    video.pause();
  };
};

//VIDEO SRC BY SCREEN SIZE
function appendVideoSrcBySize() {
  var videoBox = $('#video');
  if($(window).width() <= 600){
    videoBox.append("<source type='video/mp4' src='static/video/testimonials-video-xs.mp4' />")
  } else {
    videoBox.append("<source type='video/mp4' src='static/video/testimonials-video-lg.mp4' />")
  }
}

//SHOW SEARCH FORM
function showSearchForm() {
  var showFormButtons = document.querySelectorAll('.search-form');
  [].forEach.call(showFormButtons, function(item) {
    var overlayBtn = item.querySelector('.search-form__overlay');
    if(overlayBtn){
      overlayBtn.onclick = function(){
        item.classList.add('search-form_visible')
      }
    }
  })
}

//SHOW MORE BTN
function showMorePics(){
  var itemToShow = $('.portfolio__item');
  var btn = $('#showMore');
  if($(window).width() > 600){
    $(itemToShow).show();
    $(btn).hide();
  } else {
    $(itemToShow).slice(0, 4).show();
    $(btn).click(function(){
      $('.portfolio__item:hidden').slice(0, 4).show("slow");
      if($('.portfolio__item:hidden').length == 0){
        $('#showMore').hide("slow");
      }
    })
  }
};

//Barba.js
function barbaNavigation(){
  var lastElementClicked,
      parentElementClicked,
      socialLinks,
      navSlides,
      contentBlock,
      captionString,
      slideBg,
      scroll,
      barbaOverlay,
      screenWidth,
      screenHeight,
      initialSlide;
  Barba.Dispatcher.on('linkClicked', function(el) {
      lastElementClicked = el;
      barbaOverlay = document.querySelector('.barba-overlay');
    });
  var CustomTransition = Barba.BaseTransition.extend({
    start: function() {
      Promise.all([this.newContainerLoading, this.zoom()]).then(
        this.showNewPage.bind(this)
      );
    },

    zoom: function() {
      var deferred = Barba.Utils.deferred();
      var tl = new TimelineMax({
        onComplete: function() {
          deferred.resolve();
        }
      });
      if($(lastElementClicked).hasClass('swiper-link')){
        var target = lastElementClicked;
        while(!target.classList.contains('swiper-slide')){
            target = target.parentNode;
        }
        document.body.style.overflow = 'hidden';
        parentElementClicked = target;
        contentBlock = parentElementClicked.querySelector('.content');
        captionString = parentElementClicked.querySelector('.caption');
        slideBg = parentElementClicked.querySelector('.slide-bgimg');
        scroll = document.querySelector('.swiper-scrollbar');
        socialLinks = document.querySelector('.mainSlider__social');
        navSlides = document.querySelector('.mainSlider__navWrap');
        screenWidth = $(window).width();
        screenHeight = $(window).height();

        tl
        .to(socialLinks,.9,{ease: Expo.easeOut, left: -(screenWidth/100 * 5)}, 0)
        .to(navSlides,.9,{ease: Expo.easeOut, x: 100, opacity: 0}, 0)
        .to(scroll,1,{opacity: 0}, 0)
        .to(captionString,.3,{y: 20, opacity: 0})
        .to(contentBlock,.7,{top: 51, scale: 1.3, left: (screenWidth/100 * 16)})
        .to(lastElementClicked, .5,{opacity: 0})
        .to(slideBg,1,{top: 104, width: screenWidth/100 * 70, height: screenWidth/100 * 39.37, left: screenWidth/100 * 15}, '-=.2')
      } else {
        barbaOverlay.classList.add('barba-overlay_moveToTop');
        barbaOverlay.style.visibility = 'visible';
        tl.to(barbaOverlay, 1.3, {scaleY: 1, trasformOrigin: '50% top'});
      }
      return deferred.promise;
    },
    showNewPage: function() {
      var tl = new TimelineMax({
        onComplete: function() {
          barbaOverlay.style.visibility = 'hidden';
        }
      });
      document.body.style.overflow = 'auto';
      if(barbaOverlay) {
        barbaOverlay.classList.remove('barba-overlay_moveToTop');
        tl.fromTo(barbaOverlay, 1.3, {scaleY: 1}, {scaleY: 0});
      }
      this.done();
    }
  });

  var BackTransition = Barba.BaseTransition.extend({
    start: function() {
      Promise.all([this.newContainerLoading, this.zoom()]).then(
        this.showNewPage.bind(this)
      );
    },

    zoom: function() {
      var deferred = Barba.Utils.deferred();
      container = document.querySelector('.barba-container');
      initialSlide = container.getAttribute('data-slide');
      var tl = new TimelineMax({
        onComplete: function() {
          deferred.resolve();
        }
      });
      tl.to(container,.8,{opacity:0})
      return deferred.promise;
    },

    showNewPage: function() {
      this.done();
    }
  });

  Barba.Pjax.getTransition = function() {
    var transitionObj = CustomTransition;
    if (Barba.HistoryManager.prevStatus().namespace === 'profile') {
      transitionObj = BackTransition;
    }
    return transitionObj;
  };

  var SingleProfile = Barba.BaseView.extend({
      namespace: 'profile',
      onEnterCompleted: function() {
        makeCustomCursor();
        customVideoControls();
        appendVideoSrcBySize();
        makePortfolioSlider();
        showSearchForm();
        makeNavigation();
        AOS.init();
      }
  });
  var MainPage = Barba.BaseView.extend({
      namespace: 'mainPage',
      onEnterCompleted: function() {
        makeCustomCursor();
        makeMainScreenSlider(initialSlide);
        makeNavigation();
        showSearchForm();
        AOS.init();
      }
  });
  var NewsPage = Barba.BaseView.extend({
      namespace: 'news',
      onEnterCompleted: function() {
        makeCustomCursor();
        showSearchForm();
        AOS.init();
        makeNavigation();
        showMorePics();
      }
  });
  var BlogPage = Barba.BaseView.extend({
      namespace: 'blog',
      onEnterCompleted: function() {
        makeCustomCursor();
        showSearchForm();
        makeNavigation();
        customVideoControls();
        appendVideoSrcBySize();
        makeMediaLinksSlider();
      }
  });
  var ContactsPage = Barba.BaseView.extend({
      namespace: 'contacts',
      onEnterCompleted: function() {
        makeCustomCursor();
        makeNavigation();
        showSearchForm();
        AOS.init();
      }
  });

  SingleProfile.init();
  MainPage.init();
  NewsPage.init();
  BlogPage.init();
  ContactsPage.init();

  Barba.Pjax.start();
};
