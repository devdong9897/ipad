import ipads from '../data/ipads.js';
import navigations from '../data/navigations.js';

// 장바구니  코드!
const basketStarterEl = document.querySelector('header .basket-starter');
const basketEl = basketStarterEl.querySelector('.basket');

basketStarterEl.addEventListener('click', function (event) {
  event.stopPropagation();
  // 해당하는 요소에 특정한 클래스 값이 존재하는지 확인
  if (basketEl.classList.contains('show')) {
    //  basket요소에 show라는 클래스가 있으면 hide
    hideBasket();
  } else {
    // 없으면 show
    showBasket();
  }
});
basketEl.addEventListener('click', function (event) {
  event.stopPropagation();
});

// 화면 전체(window)를 클릭하면 클릭이벤트 실행
// 전체를 클릭하면
window.addEventListener('click', function () {
  // 메뉴모달 닫힘
  hideBasket();
});

function showBasket() {
  basketEl.classList.add('show');
}
function hideBasket() {
  basketEl.classList.remove('show');
}

// 검색 부분 코드!
const headerEl = document.querySelector('header');
// [...] : 전개 연산자
const headerMenuEls = [...document.querySelectorAll('ul.menu > li')];
const searchWrapEl = document.querySelector('.search-wrap');
const searchStarterEl = document.querySelector('.search-starter');
const searchCloserEl = document.querySelector('.search-closer');
const searchShadowEl = document.querySelector('.shadow');
const searchInputEl = searchWrapEl.querySelector('input');
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')];

searchStarterEl.addEventListener('click', showSearch);
searchCloserEl.addEventListener('click', hideSearch);
searchShadowEl.addEventListener('click', hideSearch);

function showSearch() {
  headerEl.classList.add('searchting');
  // documentElement: 문서의 최상위 요소
  document.documentElement.classList.add('fixed');
  // .reverse() : 뒤집기, forEach() 반복처리
  // el: 각 요소 (여기선 각 li태그)
  headerMenuEls.reverse().forEach(function (el, index) {
    //   .4초 안에 순차적으로 사라지는 것이 다 끝나게 만들어준다.
    //  headerMenuEls.length : 배열의 길이 (여기서 숫자 12가 된다.)
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + 's';
  });
  searchDelayEls.forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + 's';
  });
  setTimeout(function () {
    searchInputEl.focus();
  }, 600);
}

function hideSearch() {
  headerEl.classList.remove('searchting');
  document.documentElement.classList.remove('fixed');
  headerMenuEls.reverse().forEach(function (el, index) {
    //   .4초 안에 순차적으로 사라지는 것이 다 끝나게 만들어준다.
    //  headerMenuEls.length : 배열의 길이 (여기서 숫자 12가 된다.)
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + 's';
  });
  searchDelayEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + 's';
  });
  // 원래 상태로 다시 뒤집어줌
  searchDelayEls.reverse();
  // 검색바 종료 될 때 검색창에 작성된 글 초기화 하기
  searchInputEl.value = '';
}

// 요소의 가시성 관찰
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add('show');
  });
});
const infoEls = document.querySelectorAll('.info');
infoEls.forEach(function (el) {
  io.observe(el);
});

// 비디오 재생!
const video = document.querySelector('.stage video');
const playBtn = document.querySelector('.stage .controller--play');
const pauseBtn = document.querySelector('.stage .controller--pause');

playBtn.addEventListener('click', function () {
  video.play();
  // 재생버튼 클릭했으니 재생버튼 클릭시 재생은 사라지고
  playBtn.classList.add('hide');
  // 일시정지 나오기
  pauseBtn.classList.remove('hide');
});
pauseBtn.addEventListener('click', function () {
  video.pause();
  // 일시정지버튼 클릭했으니 일시정지 사라지고 재생나오기
  playBtn.classList.remove('hide');
  pauseBtn.classList.add('hide');
});

// '당신에게 맞는 iPad는?' 렌더링!
const itemsEl = document.querySelector('section.compare .items');
//  ipads는 배열 데이터 이므로...
ipads.forEach(function (ipad) {
  // .createElement(생성하고자하는 요소의 태그이름) : 요소를 자바스크립트를 통해서 생성하는 메소드.
  const itemEl = document.createElement('div');
  itemEl.classList.add('item');

  let colorList = '';
  ipad.colors.forEach(function (color) {
    colorList += `<li style="background-color: ${color};"></li>`;
  });

  // .textContent : 말그대로 글자 내용으로 어떠한 값을 넣어 준다.
  // .innerHTML : 우리가 삽입하는 문자를 실제 HTML구조로 내부에 삽입해준다.
  itemEl.innerHTML = /* html */ `
  <div class="thumbnail">
    <img src="${ipad.thumbnail}" alt="${ipad.name}" />
  </div>
  <ul class="colors">
  ${colorList}  
  </ul>
  <h3 class="name">${ipad.name}</h3>
  <p class="tagline">${ipad.tagline}</p>
  <p class="price">￦${ipad.price.toLocaleString('en-US')}부터</p>
  <button class="btn">구입하기</button>
  <a herf="${ipad.url}" class="link">더 알아보기</a>
  `;

  // .append : 선택된 요소의 마지막에 새로운 요소나 콘텐츠를 추가
  itemsEl.append(itemEl);
});

// footer 부분
const navigationsEl = document.querySelector('footer .navigations');
navigations.forEach(function (nav) {
  const mapEl = document.createElement('div');
  mapEl.classList.add('map');

  let mapList = '';
  nav.maps.forEach(function (map) {
    mapList += /*html*/ `<li>
      <a herf="${map.url}">${map.name}</a>
    </li>`;
  });

  mapEl.innerHTML = /* html */ `
    <h3>
      <span class="text">${nav.title}</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `;

  // html에 있는 .navigations 부분에 마지막으로 넣기
  navigationsEl.append(mapEl);
});

// copyright 부분 날짜
const thisYearEl = document.querySelector('span.this-year');
thisYearEl.textContent = new Date().getFullYear()
