import { AnimationController, Animation, createAnimation } from '@ionic/angular';

export const enterAnimation = (baseEl: HTMLElement, opts?: any): Animation => {
  const DURATION = 500;
  const animationCtrl = new AnimationController();
  if (opts.direction === 'forward') {
    return animationCtrl
      .create()
      .addElement(opts.enteringEl)
      .duration(DURATION)
      .easing('ease-in-out')
      .fromTo('transform', "translateX(100%)", "translateX(0%)")
      .fromTo('opacity',0,1)
  } else {
    const rootAnimation = animationCtrl
      .create()
      .addElement(opts.enteringEl)
      .duration(DURATION)
      .fromTo('position', 'fixed', 'fixed')
      .fromTo('transform', "translateX(100%)", "translateX(0%)")
      .fromTo('offset', 0, 1)
      .fromTo('z-index', 999999,999999)
      .fromTo('opacity',0,1)
    const leavingAnimation = animationCtrl
      .create()
      .addElement(opts.leavingEl)
      .duration(DURATION)
      .fromTo('transform', "translateX(+)", "translateX(0%)")
      .fromTo('offset', 0, 1)
      .fromTo('z-index', 999999,999999)
      .fromTo('opacity',0,1)
    return animationCtrl.create().addAnimation([leavingAnimation,rootAnimation]);
  }
};

export const getIonPageElement = (element: HTMLElement) => {
  if (element.classList.contains('ion-page')) {
    return element;
  }

  const ionPage = element.querySelector(
    ':scope > .ion-page, :scope > ion-nav, :scope > ion-tabs'
  );
  if (ionPage) {
    return ionPage;
  }
  // idk, return the original element so at least something animates
  // and we don't have a null pointer
  return element;
};

export function pageTransition(_: HTMLElement, opts: any) {
  const DURATION = 300;

  // root animation with common setup for the whole transition
  const rootTransition = createAnimation()
    .duration(opts.duration || DURATION)
    .easing('cubic-bezier(0.65, 0, 0.35, 1)');

  // ensure that the entering page is visible from the start of the transition
  const enteringPage = createAnimation()
    .addElement(getIonPageElement(opts.enteringEl))
    .beforeRemoveClass('ion-page-invisible');

  // create animation for the leaving page
  const leavingPage = createAnimation().addElement(
    getIonPageElement(opts.leavingEl)
  );

  // actual customized animation
  if (opts.direction === 'forward') {
    enteringPage.fromTo('transform', 'translateX(100%)', 'translateX(0)');
    leavingPage.fromTo('opacity', '1', '0.25');
  } else {
    leavingPage.fromTo('transform', 'translateX(0)', 'translateX(100%)');
    enteringPage.fromTo('opacity', '0.25', '1');
  }

  // include animations for both pages into the root animation
  rootTransition.addAnimation(enteringPage);
  rootTransition.addAnimation(leavingPage);
  return rootTransition;
}