// シャッフル関数（ランダム順表示用）
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  // ジャンルごとのサブタイトルマップ
  const genreTitles = {
    missionary: "繋がることでしか伝えられない、静かな支配。",
    backshot: "背中越しに伝わる、無言の本音。",
    cowgirl: "静かに揺れる、支配と服従の狭間。",
  }; 
  
  fetch('./data/slides.json')
    .then(res => res.json())
    .then(originalSlides => {
        const urlParams = new URLSearchParams(window.location.search);
        const selectedGenre = urlParams.get("genre");
      
        const filteredSlides = selectedGenre
          ? originalSlides.filter(slide =>
              slide.genre.includes(selectedGenre)
            )
          : originalSlides;
      
        const slides = shuffle([...filteredSlides]);
      
      let index = 0;
      let intervalId = null;
  
      const container = document.getElementById('slide-container');
      const pauseBtn = document.getElementById('pause-btn');
      const playBtn = document.getElementById('play-btn');
      const prevBtn = document.getElementById('prev-btn');
      const nextBtn = document.getElementById('next-btn');
      const fanzaLink = document.getElementById('fanza-link');
      const subtitleEl = document.getElementById('genre-subtitle');
  
      // ジャンルからサブタイトルを設定（最初の画像のジャンル使用）
      const subtitleText = genreTitles[selectedGenre] || "";
      if (subtitleEl) {
        subtitleEl.textContent = subtitleText;
      }
      
  
      function showSlide() {
        const slide = slides[index];
        container.innerHTML = `
          <div class="slide-box">
            <img src="./img/${slide.src}" class="slide-img">
          </div>
        `;
        fanzaLink.href = slide.link;
      }
  
      function startSlideshow() {
        stopSlideshow();
        intervalId = setInterval(() => {
          let nextIndex = (index + 1) % slides.length;
      
          // 連続同一スライドを防ぐ（同じインデックスなら飛ばす）
          if (slides.length > 1 && slides[nextIndex].src === slides[index].src) {
            nextIndex = (nextIndex + 1) % slides.length;
          }
      
          index = nextIndex;
          showSlide();
        }, 3000);
      }
      
  
      function stopSlideshow() {
        if (intervalId !== null) {
          clearInterval(intervalId);
          intervalId = null;
        }
      }
  
      pauseBtn.addEventListener('click', () => {
        stopSlideshow();
        pauseBtn.style.display = "none";
        playBtn.style.display = "inline-block";
      });
  
      playBtn.addEventListener('click', () => {
        startSlideshow();
        playBtn.style.display = "none";
        pauseBtn.style.display = "inline-block";
      });
  
      prevBtn.addEventListener('click', () => {
        index = (index - 1 + slides.length) % slides.length;
        showSlide();
      });
  
      nextBtn.addEventListener('click', () => {
        index = (index + 1) % slides.length;
        showSlide();
      });
  
      showSlide();
      startSlideshow();
    });
  

