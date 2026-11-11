$(window).scroll(function(){
	handleTopNavAnimation();
});

$(window).load(function(){
	handleTopNavAnimation();
});

function handleTopNavAnimation() {
	var top=$(window).scrollTop();

	if(top>10){
		$('#site-nav').addClass('navbar-solid'); 
	}
	else{
		$('#site-nav').removeClass('navbar-solid'); 
	}
}

/*
 * SmoothScroll
*/

smoothScroll.init();

$(document).ready(function() {
    var currentSlide = 1;
    var totalSlides = $('.intro-slide').length;
    var slideInterval = 3000; 
    var timer;

    function goToSlide(slideIndex) {
        if (slideIndex > totalSlides) slideIndex = 1;
        if (slideIndex < 1) slideIndex = totalSlides;

        $('.intro-slide').removeClass('active');
        $('.bg-slide').removeClass('active');

        $('.intro-slide[data-slide="' + slideIndex + '"]').addClass('active');
        $('.bg-slide[data-slide="' + slideIndex + '"]').addClass('active');

        currentSlide = slideIndex;
    }

    function startTimer() {
        timer = setInterval(function() {
            goToSlide(currentSlide + 1);
        }, slideInterval);
    }

    function resetTimer() {
        clearInterval(timer);
        startTimer();
    }

    $('#nextSlide').click(function() {
        goToSlide(currentSlide + 1);
        resetTimer();
    });

    $('#prevSlide').click(function() {
        goToSlide(currentSlide - 1);
        resetTimer();
    });

    startTimer();
});

$('.accordion-card').on('click hover', function() {
    $('.accordion-card').removeClass('active');
    $(this).addClass('active');
});

$(document).ready(function() {

    $('.porto-item').on('click', function(e) {
        var card = $(this);

        var title = card.data('title');
        var category = card.data('category');
        var desc = card.data('desc');
        
        var rawImages = card.attr('data-images');
        var imagesArray = rawImages ? rawImages.split(',') : [];

        $('#modalTitle').text(title);
        $('#modalCategory').text(category);
        $('#modalDesc').text(desc);

        var $carouselInner = $('#modalCarouselInner');
        var $carouselIndicators = $('#modalCarouselIndicators');
        
        // Kosongkan slider lama
        $carouselInner.empty();
        $carouselIndicators.empty();

        if (imagesArray.length > 0) {
            $.each(imagesArray, function(index, imgUrl) {
                var cleanUrl = $.trim(imgUrl);
                var activeClass = (index === 0) ? 'active' : '';

                $carouselInner.append(
                    '<div class="item ' + activeClass + '">' +
                        '<img src="' + cleanUrl + '" alt="' + title + ' - Foto ' + (index + 1) + '">' +
                    '</div>'
                );

                $carouselIndicators.append(
                    '<li data-target="#modalPortfolioCarousel" data-slide-to="' + index + '" class="' + activeClass + '"></li>'
                );
            });

            if (imagesArray.length <= 1) {
                $('#modalPortfolioCarousel .carousel-control, #modalPortfolioCarousel .carousel-indicators').hide();
            } else {
                $('#modalPortfolioCarousel .carousel-control, #modalPortfolioCarousel .carousel-indicators').show();
            }
        }

        $('#portfolioModal').modal('show');

        var $carousel = $('#modalPortfolioCarousel');
        $carousel.carousel('pause');
        $carousel.removeData('bs.carousel');
        $carousel.carousel({
            interval: false
        });
    });

});

document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.testimonial-track');
  const prevBtn = document.querySelector('.testimonial-nav.prev');
  const nextBtn = document.querySelector('.testimonial-nav.next');
  const dots = document.querySelectorAll('.testimonial-dots span');
  const cards = document.querySelectorAll('.testimonial-card');

  if (!track || cards.length === 0) return;

  const scrollTrack = (direction) => {
    const cardWidth = cards[0].offsetWidth + 24; // Width + gap
    track.scrollBy({
      left: direction === 'next' ? cardWidth : -cardWidth,
      behavior: 'smooth'
    });
  };

  if (nextBtn) nextBtn.addEventListener('click', () => scrollTrack('next'));
  if (prevBtn) prevBtn.addEventListener('click', () => scrollTrack('prev'));

  const updateDots = () => {
    const scrollPosition = track.scrollLeft;
    const cardWidth = cards[0].offsetWidth + 24;
    
    const activeIndex = Math.round(scrollPosition / cardWidth);

    dots.forEach((dot, index) => {
      if (index === activeIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  };

  track.addEventListener('scroll', updateDots);

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      const cardWidth = cards[0].offsetWidth + 24;
      track.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth'
      });
    });
  });

  let autoPlayInterval = setInterval(() => {
    // Jika sudah di paling ujung kanan, kembali ke awal
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      scrollTrack('next');
    }
  }, 5000);

  const wrapper = document.querySelector('.testimonial-wrapper');
  if (wrapper) {
    wrapper.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    wrapper.addEventListener('mouseleave', () => {
      autoPlayInterval = setInterval(() => {
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollTrack('next');
        }
      }, 5000);
    });
  }
});