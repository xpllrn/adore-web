# Smooth page transitions

## Goal
Make navigation feel continuous by animating each newly selected page into place while the floating navigation completes its bounce.

## Changes
- Wrap the active page in a route-keyed transition layer so each destination receives a fresh entrance animation.
- Use a short fade with slight vertical movement, timed to feel cohesive with the navigation bounce.
- Preserve the current scroll position during navigation so no visible jump interrupts the transition.
- Respect reduced-motion preferences by disabling movement and shortening the effect.
- Verify the transition between multiple pages at both scrolled and top positions.

## Technical details
- Keep navigation client-side through TanStack Router.
- Key the content wrapper by the current pathname.
- Add semantic page-transition motion styles without changing page content or navigation design.
