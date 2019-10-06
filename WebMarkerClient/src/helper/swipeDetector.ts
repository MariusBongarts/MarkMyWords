import { Swipe } from "../types/swipe";

export type Updater = (swipe: Swipe) => void;
export type Unsubscribe = () => void;

/**
 * This class can be subscribed to detect swipes on mobile devices
 *
 * @author Marius Bongarts
 *
 * @method subscribe This method can be subscribed to be notified of touch events
 *
 * @export
 * @class SwipeDetector
 */
export class SwipeDetector {
  private listeners: Updater[] = [];
  private clientXStart!: number;
  private clientXEnd!: number;

  // Detects swipeRight and left due to x and y client position
  constructor() {
    window.addEventListener('touchstart', (e: TouchEvent) => this.clientXStart = e.changedTouches[0].clientX);
    window.addEventListener('touchend', (e: TouchEvent) => {
      this.clientXEnd = e.changedTouches[0].clientX;
      const diff = this.clientXStart - this.clientXEnd;
      if (diff <= -50) {
        this.notifyListeners('swipeRight');
      }
      if (diff >= 50) {
        this.notifyListeners('swipeLeft');
      }
    });
  }

  subscribe(listener: Updater): Unsubscribe {
    this.listeners.push(listener);
    return () => { // unsubscribe function
      this.listeners = this.listeners.filter(other => other !== listener);
    };
  }

  private notifyListeners(swipe: Swipe) {
    this.listeners.forEach(listener => listener(swipe));
  }

}

export const requestUpdater = new SwipeDetector();
