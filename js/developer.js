const steps = document.querySelectorAll('.development__step');

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 50 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

function changeHighlight() {
    if(steps.length === 0) return;
    let isSet = false
    const setArray = [];
    for (let i = 0; i < steps.length; i++) {
        if (isInViewport(steps[i]) && !isSet) {
            setArray.push(true);
            isSet = true;
        } else {
            setArray.push(false);
        }
    }
    if(!isSet) {
        setArray[0] = true;
        setArray[steps.length - 1] = true;
    }
    for(let i =0; i < setArray.length; i++) {
        if(setArray[i]) {
            steps[i].classList.add('development__step--highlighted');
        } else {
            steps[i].classList.remove('development__step--highlighted');
        }
    }
}
window.addEventListener('scroll', () => {
    changeHighlight();
});

const processLines = [...document.getElementsByClassName('development-mobile__line')];
const lastLine = document.querySelector('.main-process__item:last-child .main-process__description');

const getVisible = function (div) {
    const scrollPercent = window.scrollY - div.offsetTop;
    return (scrollPercent);
};

window.onscroll = () => {
    if (window.innerWidth >= 768) {
        processLines.slice(0, -1).map((el) => {
            el.style.height = `min(${getVisible(el) + 300}px, 100%)`
            if (getVisible(el) > -300) {
                el.style.setProperty('--h', '5px');
            } else {
                el.style.setProperty('--h', '0');
            }
        })

        processLines.slice(-1).map((el) => {
            el.style.height = `min(${getVisible(el) + 300}px, 100%)`
            console.log(getVisible(lastLine))
            if (getVisible(lastLine) + lastLine.clientHeight > -620) {
                el.style.setProperty('--h', '5px');
            } else {
                el.style.setProperty('--h', '0');
            }
        })
    }

};