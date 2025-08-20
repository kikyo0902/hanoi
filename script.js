// =================== Ngôn ngữ ===================
const langMap = {vi:'vi', ja:'ja', en:'en', ko:'ko', ne:'ne', ms:'ms', ph:'ph'};

// Lấy ngôn ngữ đã lưu hoặc theo máy
let lang = localStorage.getItem('selectedLang') 
            || langMap[(navigator.language || navigator.userLanguage).slice(0,2)] 
            || 'vi';

function setLanguage(l) {
  document.querySelectorAll('[data-lang]').forEach(el => {
    el.classList.remove('active');
    if(el.getAttribute('data-lang') === l) el.classList.add('active');
  });
  const select = document.getElementById('language-select');
  if(select) select.value = l;
  localStorage.setItem('selectedLang', l); // lưu vĩnh viễn
}

// Khởi tạo ngôn ngữ
setLanguage(lang);

// Dropdown đổi ngôn ngữ
document.getElementById('language-select')?.addEventListener('change', e => {
  setLanguage(e.target.value);
});

// =================== Fade-in section ===================
const sections = document.querySelectorAll('.section');
window.addEventListener('scroll', () => {
  sections.forEach(sec => {
    if(sec.getBoundingClientRect().top < window.innerHeight - 100) {
      sec.classList.add('visible');
    }
  });
});

// =================== Carousel auto scroll ===================
const carousel = document.querySelector('.news-carousel');
if(carousel) {
  setInterval(()=>{ carousel.scrollBy({left:310, behavior:'smooth'}); }, 3000);
}

// =================== Scroll xuống section "sukien" khi click .book-row ===================
const playButton = document.querySelector('.book-row');
if(playButton){
  playButton.addEventListener('click', function(e) {
    e.preventDefault();
    const section = document.getElementById('sukien');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  });
}

// =================== Video click ===================
const video = document.querySelector('.history-video');
if(video){
  document.body.addEventListener('click', () => {
    video.muted = false;
    video.play();
  });
}

// =================== Nav links ===================
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    const dataLang = this.getAttribute('data-lang');

    if (href.includes('#') && !href.startsWith('#')) {
      e.preventDefault();
      const parts = href.split('#');
      const page = parts[0];        // ví dụ "thủ đô.html"
      const sectionId = parts[1];   // ví dụ "sukien" hoặc "vanhoa"

      // Lưu section và ngôn ngữ vào localStorage
      localStorage.setItem('scrollToSection', sectionId);
      if(dataLang) localStorage.setItem('selectedLang', dataLang);

      // Chuyển sang trang
      window.location.href = page;
    }
  });
});

// =================== Khi trang chính load ===================
window.addEventListener('DOMContentLoaded', () => {
  const sectionId = localStorage.getItem('scrollToSection');
  const selectedLang = localStorage.getItem('selectedLang');

  // Scroll tới section nếu có
  if (sectionId) {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    localStorage.removeItem('scrollToSection'); // chỉ dùng 1 lần
  }

  // Chuyển ngôn ngữ
  if (selectedLang) setLanguage(selectedLang);
});
// Lắng nghe click trên tất cả culture-item
document.querySelectorAll('.culture-item').forEach(item => {
  item.addEventListener('click', function() {
    const href = this.getAttribute('data-href');
    const lang = this.getAttribute('data-lang');

    // Lưu ngôn ngữ đã chọn vào localStorage vĩnh viễn
    if(lang) localStorage.setItem('selectedLang', lang);

    // Mở trang con
    if(href) window.location.href = href;
  });
});

// Khi trang load, tự động set ngôn ngữ đã lưu
window.addEventListener('DOMContentLoaded', () => {
  const selectedLang = localStorage.getItem('selectedLang') || 'vi';
  document.querySelectorAll('[data-lang]').forEach(el => {
    el.classList.remove('active');
    if(el.getAttribute('data-lang') === selectedLang) el.classList.add('active');
  });

  // Đồng bộ dropdown nếu có
  const langSelect = document.getElementById('language-select');
  if(langSelect) langSelect.value = selectedLang;
});
