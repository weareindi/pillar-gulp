import detectPassiveEvents from 'detect-passive-events';

export class PageTopService {
    /**
     * Is Page At the Top
     */
    constructor() {
        if (!document.body) {
            return;
        }

        this.isTop();
        document.addEventListener('scroll', () => {
            this.isTop();
        },
        (!detectPassiveEvents.hasSupport ? false : {
            capture: false,
            passive: true
        }));
    }

    /**
     * Run 'at-top' processes
     */
    isTop() {
        document.body.setAttribute('page-top', false);

        if ((document.body.scrollTop) === 0) {
            document.body.setAttribute('page-top', true);
        }
    }
}
