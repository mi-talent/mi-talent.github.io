;
document.addEventListener("DOMContentLoaded", function(){
  makeCustomCursor();
  makeMainScreenSlider();
  makeNavigation();
  makePortfolioSlider();
  makeMediaLinksSlider();
  customVideoControls();
  appendVideoSrcBySize();
  barbaNavigation();
  showSearchForm();
  AOS.init();
});


//Custom Cursor
function makeCustomCursor() {
  var clientX = -100;
  var clientY = -100;
  var customCursor = document.querySelector('.cursor');
  customCursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
  var initCursor = function() {
    document.addEventListener('mousemove', function(e){
      clientX = e.clientX;
      clientY = e.clientY;
    })

    var render = function() {
      customCursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
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
      customCursor.classList = ['cursor'];
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

//Screen Slider
function makeMainScreenSlider(){
// Params
let mainSliderSelector = '.main-slider',
    navSliderSelector = '.nav-slider',
    interleaveOffset = 0.5,
    direction;

    // (function (){
    //   if(window.matchMedia('(max-width: 600px)').matches){
    //     direction = 'vertical';
    //   } else {
    //     direction = 'horizontal';
    //   }
    // }());

// Main Slider
let mainSliderOptions = {
      // loop: true,
      speed: 1000,
      // loopAdditionalSlides: 10,
      // direction: direction,
      // grabCursor: true,
      direction: 'vertical',//
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
      //!!!!!
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
      },
      on: {
        init: function(){
          //this.autoplay.stop();
        },
        imagesReady: function(){
          this.el.classList.remove('loading');
          //this.autoplay.start();
        },
        /*
        slideChangeTransitionEnd: function(){
          let swiper = this,
              captions = swiper.el.querySelectorAll('.caption');
          for (let i = 0; i < captions.length; ++i) {
            captions[i].classList.remove('show');
          }
          swiper.slides[swiper.activeIndex].querySelector('.caption').classList.add('show');

          let btns = swiper.el.querySelectorAll('.swiper-link');
          for (let i = 0; i < btns.length; ++i) {
            btns[i].classList.remove('show');
          }
          swiper.slides[swiper.activeIndex].querySelector('.swiper-link').classList.add('show');
        },*/
        progress: function(){
          let swiper = this;
          for (let i = 0; i < swiper.slides.length; i++) {
            let slideProgress = swiper.slides[i].progress,
                innerOffset = swiper.width * interleaveOffset,
                innerTranslate = slideProgress * innerOffset;
            swiper.slides[i].querySelector(".slide-bgimg").style.transform =
              "translate3d(" + -innerTranslate/2 + "px, 0, 0)";
          }
        },
        touchStart: function() {
          let swiper = this;
          for (let i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = "";
          }
        },
        setTransition: function(speed) {
          let swiper = this;
          for (let i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = speed + "ms";
            swiper.slides[i].querySelector(".slide-bgimg").style.transition =
              speed * 1.5 + "ms";
          }
        }
      }

    };
// $(window).on('load resize', detectDirectionSlider);
let mainSlider = new Swiper(mainSliderSelector, mainSliderOptions);


// Navigation Slider
let navSliderOptions = {
      loopAdditionalSlides: 10,
      speed:1000,
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
let navSlider = new Swiper(navSliderSelector, navSliderOptions);

// Matching sliders
mainSlider.controller.control = navSlider;
navSlider.controller.control = mainSlider;
};

//Nav
function makeNavigation() {
var navBtn = document.getElementById('toggle-navigation-btn'),
    mainNav = document.getElementById('main-nav'),
    navItems = mainNav.querySelectorAll('.main-nav__item-wrap'),
    closeBtn = document.querySelector('.main-nav__close-btn'),
    screenToAnimation,
    screenWidth = $(window).width();
// navBtn.addEventListener('mouseenter', setWillChange);

navBtn.onclick = function() {
  var tl = new TimelineMax({
    onComplete: function() {
      mainNav.classList.add('main-nav_show')
    }
  });
  tl
  .to(mainNav, .5,{x: 0, opacity: 1})
};
// function setWillChange(){
//   console.log('will')
//   mainNav.style.willChange = 'transform, opacity'
//   screenToAnimation.style.willChange = 'transform, top'
// }

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

//Parallax


//Slider
function makePortfolioSlider() {
  $('.js-portfolio-slider ').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 600,
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
      screenWidth = $(window).width(),
      screenHeight = $(window).height();
  Barba.Dispatcher.on('linkClicked', function(el) {
      lastElementClicked = el;
      barbaOverlay = document.querySelector('.barba-overlay');
      // !!!!!!!!!!!!!!!!!
      // parentElementClicked = el.closest('.swiper-slide');
      // contentBlock = parentElementClicked.querySelector('.content');
      // captionString = parentElementClicked.querySelector('.caption');
      // slideBg = parentElementClicked.querySelector('.slide-bgimg');
      // socialLinks = document.querySelector('.mainSlider__social');
      // navSlides = document.querySelector('.mainSlider__navWrap');
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
        parentElementClicked = lastElementClicked.closest('.swiper-slide');
        contentBlock = parentElementClicked.querySelector('.content');
        captionString = parentElementClicked.querySelector('.caption');
        slideBg = parentElementClicked.querySelector('.slide-bgimg');
        scroll = document.querySelector('.swiper-scrollbar');
        socialLinks = document.querySelector('.mainSlider__social');
        navSlides = document.querySelector('.mainSlider__navWrap');

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

    // zoom: function() {
    //   return new Promise(function(t) {
    //     var tl = new TimelineMax();
    //       tl.to('body', 1, {y:100, onComplete: function(){
    //         t();
    //       }});
    //   })
    // },

    showNewPage: function() {
      var tl = new TimelineMax({
        onComplete: function() {
          barbaOverlay.style.visibility = 'hidden';
        }
      });
      barbaOverlay.classList.remove('barba-overlay_moveToTop');
      tl.fromTo(barbaOverlay, 1.3, {scaleY: 1}, {scaleY: 0});
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
    // if (Barba.HistoryManager.prevStatus().namespace === 'profile') {
    //   transitionObj = BackTransition;
    // }
    if (Barba.HistoryManager.prevStatus().namespace === 'profile') {
      transitionObj = BackTransition;
    }
    return transitionObj;
  };

  var SingleProfile = Barba.BaseView.extend({
      namespace: 'profile',
  //     onEnter: function() {
  //     console.log('enter');
  // },
      onEnterCompleted: function() {
        makeCustomCursor();
        customVideoControls();
        appendVideoSrcBySize();
        makePortfolioSlider();
        showSearchForm();
        // addCustomCursorToSlick();
        AOS.init();
        // makeNavigation();
      }
  });
  var MainPage = Barba.BaseView.extend({
      namespace: 'mainPage',
      onEnterCompleted: function() {
        makeCustomCursor();
        makeMainScreenSlider();
        makeNavigation();
        customVideoControls();
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
        // barbaNavigation();
      }
  });

  SingleProfile.init();
  MainPage.init();
  NewsPage.init();
  BlogPage.init();

  Barba.Pjax.start();
};
