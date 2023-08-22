"use strict";

const initLazyLoad = () => {
    const lazyItems = document.querySelectorAll('[data-lozad]');

    if (!lazyItems) return;

    lazyItems.forEach(item => {
        const lazyObserver = lozad(item);

        lazyObserver.observe();
    })
}

const initHeader = () => {
    const header = document.querySelector('.site-header');

    if (!header) return;

    setTimeout(setPaddingForPage, 300);
    animateHeader();
    setScrollingHeader();

    function setScrollingHeader() {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop;

            if (scrollTop > 0) {
                header.classList.add('is-scrolling');
            } else {
                header.classList.remove('is-scrolling');
            }
        })
    }

    function animateHeader() {
        let lastScrollTop;

        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop;

            if (scrollTop > lastScrollTop && scrollTop !== 0) {
                header.classList.add('is-scroll-down');
            } else {
                header.classList.remove('is-scroll-down');
            }

            lastScrollTop = scrollTop;
        })
    }

    function setPaddingForPage() {
        const page = document.querySelector('.page');

        if (!page) return;

        page.style.paddingTop = `${header.clientHeight - 1}px`;
    }
}

const initSelectors = () => {
    const selectors = document.querySelectorAll('.selector');

    if (!selectors) return;

    selectors.forEach(selector => {
        new Selector(selector);
    })
}

const initTabs = () => {
    const tabsContainers = document.querySelectorAll('[data-tabs]');

    if (!tabsContainers);

    tabsContainers.forEach(tabContainer => {
        const tabs = tabContainer.querySelectorAll('[data-tab]');
        const tabcontents = tabContainer.querySelectorAll('[data-tabcontent]');

        tabs.forEach(tab => {
            const tabValue = tab.dataset.tab;

            tab.addEventListener('click', () => {
                const tabTabcontent = findTabTabcontent(tabValue);

                removeActiveClasses(tabs);
                removeActiveClasses(tabcontents);

                tab.classList.add('is-active');
                tabTabcontent.classList.add('is-active');

                if (AOS) {
                    AOS.init();
                }
            })
        })

        function findTabTabcontent(value) {
            const tabTabcontent = Array.from(tabcontents).find(tabcontent => tabcontent.dataset.tabcontent === value);

            return tabTabcontent;
        }

        function removeActiveClasses(array) {
            array.forEach(item => item.classList.remove('is-active'));
        }
    })

}

const initAos = () => {
    if (AOS) {
        AOS.init();
    }
}

const initBurgerMenu = () => {
    const burger = document.querySelector(".burger");
    const header = document.querySelector('.site-header');
    const headerPanel = header?.querySelector(".site-header__panel");

    if (!burger || !headerPanel || !header) return;

    const headerAnchors = header.querySelectorAll('[data-anchor]');

    if (window.matchMedia('(max-width: 1200px)').matches) {
        setTimeout(() => {
            setHeightHeaderPanel();
            setTopHeaderPanel();
        }, 300)
        closeBurgerOnAnchorsClick();
    }

    burger.addEventListener("click", (e) => {
        burger.classList.toggle('is-active');
        headerPanel.classList.toggle("is-active");
        document.body.classList.toggle("lock");
    });

    function setHeightHeaderPanel() {
        headerPanel.style.height = `${window.innerHeight - header.clientHeight}px`;
    }

    function setTopHeaderPanel() {
        headerPanel.style.top = `${header.clientHeight}px`;
    }

    function closeBurgerOnAnchorsClick() {
        headerAnchors.forEach(anchor => {
            anchor.addEventListener('click', () => {
                closeBurgerMenu();
            });
        })
    }

    function closeBurgerMenu() {
        burger.classList.remove('is-active');
        headerPanel.classList.remove("is-active");
        document.body.classList.remove("lock");
    }
}

const initAnchors = () => {
    const anchors = document.querySelectorAll('[data-anchor]')

    if (!anchors) return;

    anchors.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            let href = this.getAttribute('href').substring(1);

            const scrollTarget = document.getElementById(href);

            const topOffset = 72;
            const elementPosition = scrollTarget.getBoundingClientRect().top;
            const offsetPosition = elementPosition - topOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        })
    })
}

const initScrollTop = () => {
    const scrollToTopBtns = document.querySelectorAll('[data-scroll-top]');

    if (!scrollToTopBtns) return;

    scrollToTopBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        })
    })
}

const initCheckboxes = () => {
    const checkboxes = document.querySelectorAll('.checkbox');

    if (!checkboxes) return;

    checkboxes.forEach(checkbox => {
        const checkboxInput = checkbox.querySelector('.checkbox__input');
        const checkboxIndicator = checkbox.querySelector('.checkbox__indicator');

        checkboxInput.addEventListener('input', (e) => {
            if (checkboxInput.checked) {
                checkboxIndicator.classList.add('is-checked');
            } else {
                checkboxIndicator.classList.remove('is-checked');
            }
        })
    })
}

const initFiles = () => {
    const files = document.querySelectorAll('[data-file]');

    if (!files) return;

    files.forEach(file => {
        const fileInput = file.querySelector('input');
        const fileSuccess = file.querySelector('.file__success');

        fileInput.addEventListener('change', () => {
            const fileInputFiles = fileInput.files;

            if (fileInputFiles.length > 0) {
                fileSuccess.classList.add('is-visible');
            } else {
                fileSuccess.classList.remove('is-visible');
            }
        })
    })
}

const initVacancies = () => {
    const vacancies = document.querySelectorAll('[data-vacancie]');

    if (!vacancies) return;

    const feedbackIcon = document.querySelector('.feedback__icon');
    const feedbackIconImg = document.querySelector('.feedback__icon img');

    vacancies.forEach(vacancie => {
        vacancie.addEventListener('click', () => {
            setCurrentVacancie(vacancie);
        });
    })

    function setCurrentVacancie(vacancie) {
        const targetCategory = vacancie.dataset.vacancie.trim();
        const targetImg = vacancie.querySelector('.vacancies__item-icon img').dataset.src;
        const feedbackCategoriesOptions = document.querySelectorAll('.feedback-form__item--category .selector__option');

        feedbackIconImg.setAttribute('src', targetImg);
        feedbackIcon.classList.remove('is-hidden');
        feedbackCategoriesOptions.forEach(option => {
            const category = option.dataset.value.trim();

            if (category === targetCategory) {
                option.click();
            }
        })
    }
}

const changeIconOnCategorySelect = () => {
    const categoriesDropdown = document.querySelector('.feedback-form__item--category .selector__dropdown');

    if (!categoriesDropdown) return;

    const feedbackIcon = document.querySelector('.feedback__icon');
    const feedbackIconImg = document.querySelector('.feedback__icon img');

    const simplePersonImg = 'images/blocks/job/person-simple.svg';
    const personImg = 'images/blocks/job/person.svg';

    categoriesDropdown.addEventListener('click', (e) => {
        const category = e.target;
        const categoryValue = category.dataset.value;

        feedbackIcon.classList.remove('is-hidden');

        if (categoryValue === 'Arbeitskraft') {
            feedbackIconImg.src = simplePersonImg;
        } else {
            feedbackIconImg.src = personImg;
        }
    })
}

const setCategories = () => {
    const categories = Array.from(document.querySelectorAll('.vacancies__body.is-active [data-vacancie]'))
        .map(item => item.dataset.vacancie);

    if (!categories) return;

    const categoriesSelectorDropdown = document.querySelector('.feedback-form__item--category .selector__dropdown');

    categoriesSelectorDropdown.innerHTML = '';
    categories.forEach(category => {
        categoriesSelectorDropdown.append(createOptionCategories(category));
    })
}


function createOptionCategories(category) {
    const optionNode = document.createElement('div');
    optionNode.classList.add('selector__option');
    optionNode.setAttribute('data-select', 'option');
    optionNode.setAttribute('data-value', category);
    optionNode.textContent = category;

    return optionNode;
}

const initCookies = () => {
    initCookieOptions();
    initCookieWarning();

    function initCookieOptions() {
        const cookie = document.querySelector('.cookie');

        if (!cookie) return;

        const cookieOptions = cookie.querySelectorAll('.switcher__checkbox');
        const cookieAccept = cookie.querySelector('[data-cookie-accept]');
        const cookieProhibit = cookie.querySelector('[data-cookie-prohibit]');
        const cookieSave = cookie.querySelector('[data-cookie-save]');
        const cookieWarning = document.querySelector('.cookie-warning');

        cookieAccept.addEventListener('click', handleCookieAccept);
        cookieProhibit.addEventListener('click', handleCookieProhibit);
        cookieSave.addEventListener('click', handleCookieSave);

        setAcceptedCookiesOptions();

        function setAcceptedCookiesOptions() {
            cookieOptions.forEach(option => {
                const { name } = option;
                const cookieOption = getCookie(name);

                if (!!cookieOption) {
                    option.checked = true;
                }
            })
        }

        function handleCookieAccept() {
            cookieOptions.forEach(option => {
                const { name } = option;

                option.checked = true;
                setCookie(name, true);
                cookieWarning.classList.add('is-hidden');
            })
        }

        function handleCookieProhibit() {
            cookieOptions.forEach(option => {
                const { name } = option;


                option.checked = false;
                setCookie(name, false);
            })
            setCookie('cookie-accept', false);
        }

        function handleCookieSave() {
            let isCookiesUncheck = false;

            cookieOptions.forEach(option => {
                const { name, checked } = option;

                if (checked) {
                    setCookie(name, true);
                    isCookiesUncheck = true;
                    cookieWarning.classList.add('is-hidden');
                } else {
                    setCookie(name, false)
                }
            })

            if (isCookiesUncheck) {
                setCookie('cookie-accept', false)
            }
        }
    }

    function initCookieWarning() {
        const cookieWarning = document.querySelector('.cookie-warning');

        if (!cookieWarning) return;

        const cookieAccept = cookieWarning.querySelector('[data-accept-cookie]');
        const cookieProhibit = cookieWarning.querySelector('[data-prohibit-cookie]');
        const cookieOptionsAccept = document.querySelector('[data-cookie-accept]');

        cookieAccept.addEventListener('click', handleCookieAccept)
        cookieProhibit.addEventListener('click', handleCookieProhibit)

        checkAcceptCookie();

        function checkAcceptCookie() {
            const isAcceptCookie = getCookie('cookie-accept');
            const isNecessaryCookie = getCookie('necessary-cookie');
            const isMediaCookie = getCookie('media-cookie');
            const isCalculatorCookie = getCookie('calculator-cookie');

            if (isAcceptCookie !== 'true' && isNecessaryCookie !== 'true' && isMediaCookie !== 'true' && isCalculatorCookie !== 'true') cookieWarning.classList.remove('is-hidden');
        }

        function handleCookieAccept() {
            setCookie('cookie-accept', true);
            cookieWarning.classList.add('is-hidden');
            cookieOptionsAccept.click();
        }

        function handleCookieProhibit() {
            setCookie('cookie-accept', 'false')
            cookieWarning.classList.add('is-hidden')
        }
    }
}

function setCookie(name, value, days = 1) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    const matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function initPopups() {
    const overlay = document.querySelector(".overlay");

    if (!overlay) return;

    initCloseModalsOnClickOverlay();

    const popups = document.querySelectorAll("[data-popup]");
    const popupBtns = document.querySelectorAll("[data-popup-btn]");

    if (!popupBtns) return;

    popupBtns.forEach((btn) => {
        const popup = overlay.querySelector(`[data-popup=${btn.dataset.popupBtn}]`);

        btn.addEventListener("click", (e) => {
            e.preventDefault();
            openModal(popup);
        });
    });

    popups.forEach((popup) => {
        const popupCloses = popup.querySelectorAll("[data-popup-close]");

        if (popupCloses) {
            popupCloses.forEach((close) => {
                close.addEventListener("click", (e) => {
                    closeModal(popup);
                });
            });
        }
    });

    function openModal(popup) {
        overlay.classList.remove("is-hidden");
        popup.classList.remove("is-hidden");
        document.body.classList.add("lock");
    }

    function closeModal(popup) {
        const popupVideos = popup.querySelectorAll('video');

        if (popupVideos) stopPopupVideos(popupVideos);

        overlay.classList.add("is-hidden");
        popup.classList.add("is-hidden");
        document.body.classList.remove("lock");
    }

    function stopPopupVideos(videos) {
        videos.forEach(video => video.pause());
    }

    function initCloseModalsOnClickOverlay() {
        const overlayChilds = Array.from(overlay.querySelectorAll("*"));

        overlay.addEventListener("click", (e) => {
            const { target } = e;

            if (!contains(overlayChilds, target)) {
                if (popups) {
                    popups.forEach((popup) => {
                        closeModal(popup);
                    });
                }
                document.body.classList.remove("lock");
                overlay.classList.remove("is-visible");
            }
        });
    }
}

function contains(array, item) {
    return array.includes(item);
}

window.addEventListener("DOMContentLoaded", (e) => {
    initPopups();
    initCookies();
    setCategories();
    changeIconOnCategorySelect();
    initVacancies();
    initFiles();
    initScrollTop();
    initLazyLoad();
    initAnchors();
    initBurgerMenu();
    initHeader();
    initSelectors();
    initTabs();
    initAos();
    initCheckboxes();
});
