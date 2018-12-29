export class ScrollToAnchorService {
    /**
     * [constructor description]
     */
    constructor() {
        // Scroll animation duration
        this.animationDuration = 2000;

        // Get default frontpage
        this.defaultFrontpage = document.querySelector('html').getAttribute('frontpage');

        // Get current URL
        this.currentUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;

        window.addEventListener('load', (event) => {
            const currentPosition = this.startPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

            if (currentPosition >= 10) {
                return;
            }

            const onloadTargets = document.querySelectorAll('[scroll-on-load]');

            if (!onloadTargets[0]) {
                return;
            }

            window.setTimeout(() => {
                this.scroll(onloadTargets[0]);
            }, 200);
        });

        this.links = document.querySelectorAll('a[href]');
        Array.from(this.links, (link) => {
            if (link.href !== this.defaultFrontpage) {
                return;
            }

            link.addEventListener('click', (event) => {
                if (this.href === this.defaultFrontpage) {
                    return;
                }

                event.preventDefault();

                // Fire the scroll method
                this.scroll(document.body);
            });
        });

        // Loop over all found anchors
        Array.from(document.querySelectorAll('a[href*="#"]'), (link) => {
            if (!link.hash) {
                return;
            }

            const targetSurface = document.querySelector(link.hash);

            if (!targetSurface) {
                return;
            }

            // Listen to the click event on the button
            link.addEventListener('click', (event) => {
                event.preventDefault();

                // Fire the scroll method
                this.scroll(targetSurface);
            });
        });

        // Listen to events that we want to interupt the scroll animation
        Array.from(('DOMMouseScroll mousewheel keyup touchstart').split(' '), (event) => {
            window.addEventListener(event, () => {
                // Yes, we want to kill the scroll animation
                this.killAnimation = true;
            }, {
                passive: true
            });
        });
    }

    /**
     * [easing description]
     * @return {[type]} [description]
     */
    easing() {
        let time = (this.currentTime - this.startTime);

        time /= this.animationDuration / 2;

        if (time < 1) {
            return (this.difference / 2 * time * time) + this.startPosition;
        }

        time--;

        return -this.difference / 2 * (time * (time - 2) - 1) + this.startPosition;
    }

    /**
     * [scroll description]
     * @param  {[type]} targetSurface [description]
     */
    scroll(targetSurface) {
        // Get current scroll position
        this.startPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        // Get anchor element document offset
        this.endPosition = Math.round(targetSurface.getBoundingClientRect().top + this.startPosition);

        // Get the total distance required to travel
        this.difference = this.endPosition - this.startPosition;

        // Get a timestamp of when this scroll animation was triggered
        this.startTime = +new Date();

        // Enable animation
        this.killAnimation = false;

        // Fire the scroll animation method
        this.animateScroll();
    }

    /**
     * [animateScroll description]
     * @return {[type]} [description]
     */
    animateScroll() {
        // If the browser doesn't support requestAnimationFrame
        if (typeof window.requestAnimationFrame === 'undefined') {
            return window.scrollTo(0, this.endPosition);
        }

        window.requestAnimationFrame(() => {
            // Kill the animation if required / Escape the loop
            if (this.killAnimation) {
                return false;
            }

            // Get current time (Used in conjunction with this.startTime by the easing method)
            this.currentTime = +new Date();

            // Get updated position
            this.nextPosition = Math.round(this.easing());

            // Have we reached our destination?
            if (this.nextPosition === this.endPosition) {
                // Stop the animation
                this.killAnimation = true;
            }

            // Move to required scroll position
            window.scrollTo(0, this.nextPosition);

            // Fire this same method again
            this.animateScroll();
        });
    }
}
