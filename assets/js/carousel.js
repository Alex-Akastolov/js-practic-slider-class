class Carousel {
    constructor(object) {
        const settings = this._initConfig(object);
        this.container = document.querySelector(settings.containerID);
        this.slides = this.container.querySelectorAll(settings.slideID);
        this.interval = settings.interval;
        this.isPlaying = settings.isPlaying;
    }

    _initConfig(paramsObject) {
        const defaultSettings = {
            containerID: '#carousel',
            slideID: '.item',
            interval: 2000,
            isPlaying: true
        }

        if (paramsObject) {
            defaultSettings.containerID = paramsObject.containerID || defaultSettings.containerID
            defaultSettings.slideID = paramsObject.slideID || defaultSettings.slideID
            defaultSettings.interval = paramsObject.interval || defaultSettings.interval
            defaultSettings.isPlaying = paramsObject.isPlaying || defaultSettings.isPlaying
        }

        return defaultSettings
    }
    _initProps() {
        this.currentSlide = 0;
        this.slidesLength = this.slides.length;
        this.CODE_LEFT_ARROW = 'ArrowLeft';
        this.CODE_RIGHT_ARROW = 'ArrowRight';
        this.CODE_Space = 'Space';

        this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
        this.FA_PLAY = '<i class="fas fa-play-circle"></i>';
        this.FA_PREV = '<i class="fas fa-angle-left"></i>';
        this.FA_NEXT = '<i class="fas fa-angle-right"></i>';
    }

    _initControls() {
        const controls = document.createElement('div');
        const PAUSE = `<span class="control control-pause" id="pause">${this.FA_PAUSE}</span>`;
        const PREV = `<span class="control control-prev" id="prev">${this.FA_PREV}</span>`;
        const NEXT = `<span class="control control-next" id="next">${this.FA_NEXT}</span>`;

        controls.setAttribute('class', 'controls');
        controls.innerHTML = PAUSE + PREV + NEXT;
        this.container.append(controls);
        this.pauseBtn = document.querySelector('#pause');
        this.prevBtn = document.querySelector('#prev');
        this.nextBtn = document.querySelector('#next');
    }

    _initIndicators() {
        const indicators = document.createElement('div');
        indicators.setAttribute('class', 'indicators');

        for (let i = 0, n = this.slidesLength; i < n; i++) {
            const indicator = document.createElement('div');
            indicator.setAttribute('class', i !== 0 ? 'indicator' : 'indicator active');
            indicator.dataset.slideTo = `${i}`;
            indicator.innerHTML = `Slide ${i + 1}`;
            indicators.append(indicator);
        }
        this.container.append(indicators);
        this.indicatorContainer = this.container.querySelector('.indicators');
        this.indicators = this.indicatorContainer.querySelectorAll('.indicator');
    }

    _tick() {
        this.timerID = setInterval(() => this._goToNext(), this.interval)
    }

    _pressKey(e) {
        if (e.code === this.CODE_LEFT_ARROW) this.prev()
        if (e.code === this.CODE_RIGHT_ARROW) this.next()
        if (e.code === this.CODE_Space) this.pausePlay()
    }

    _goToNth(n) {
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicators[this.currentSlide].classList.toggle('active');
        this.currentSlide = (n + this.slidesLength) % this.slidesLength;
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicators[this.currentSlide].classList.toggle('active');
    }

    _goToNext() {
        this._goToNth(this.currentSlide + 1);
    }
    _goToPrev() {
        this._goToNth(this.currentSlide - 1);
    }
    _pause() {
        clearInterval(this.timerID);
        this.isPlaying = false;
        this.pauseBtn.innerHTML = this.FA_PLAY;
    }
    _play() {
        this.isPlaying = true;
        this.pauseBtn.innerHTML = this.FA_PAUSE;
        this._tick();
    }

    _initListeners() {
        this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
        this.prevBtn.addEventListener('click', this.prev.bind(this));
        this.nextBtn.addEventListener('click', this.next.bind(this));

        this.indicatorContainer.addEventListener('click', this._indicate.bind(this));
        document.addEventListener('keydown', this._pressKey.bind(this));
    }
    _indicate(e) {

        const target = e.target;
        if (target && target.classList.contains('indicator')) {
            this._goToNth(+target.dataset.slideTo);
            this._pause();
        };
    }

    pausePlay() {
        this.isPlaying ? this._pause() : this._play()
    }

    prev() {
        this._goToPrev();
        this._pause();
    }

    next() {
        this._goToNext();
        this._pause();
    }

    init() {
        this._initProps();
        this._initControls();
        this._initIndicators();
        this._initListeners();
        this._tick();
    }
}


export default Carousel;
