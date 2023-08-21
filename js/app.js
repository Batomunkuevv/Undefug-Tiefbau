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

                updateCategoriesSelector(tabTabcontent);
                hideFeedbackIcon();
                removeActiveClasses(tabs);
                removeActiveClasses(tabcontents);

                tab.classList.add('is-active');
                tabTabcontent.classList.add('is-active');

                if (AOS) {
                    AOS.init();
                }
            })
        })

        function updateCategoriesSelector(tabcontent) {
            const categoriesSelectorToggler = document.querySelector('.feedback-form__item--category .selector__toggler');
            const categoriesSelectorInput = document.querySelector('.feedback-form__item--category .selector__input');
            const categoriesSelectorDropdown = document.querySelector('.feedback-form__item--category .selector__dropdown');
            const categories = Array.from(tabcontent.querySelectorAll('[data-vacancie]')).map(item => item.dataset.vacancie);

            categoriesSelectorDropdown.innerHTML = '';
            categoriesSelectorToggler.textContent = 'Wählen Sie ein Stellenangebot';
            categoriesSelectorInput.value = '';

            categories.forEach(category => {
                categoriesSelectorDropdown.append(createOptionCategories(category));
            })
        }

        function hideFeedbackIcon(){
            const feedIcon = document.querySelector('.feedback__icon');

            if(!feedIcon) return;

            feedIcon.classList.add('is-hidden');
        }

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


window.addEventListener("DOMContentLoaded", (e) => {
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
