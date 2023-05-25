function locoScroll() {
	gsap.registerPlugin(ScrollTrigger);

	// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

	const locoScroll = new LocomotiveScroll({
		el: document.querySelector('#parent'),
		smooth: true,
	});
	// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
	locoScroll.on('scroll', ScrollTrigger.update);

	// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
	ScrollTrigger.scrollerProxy('#parent', {
		scrollTop(value) {
			return arguments.length
				? locoScroll.scrollTo(value, 0, 0)
				: locoScroll.scroll.instance.scroll.y;
		}, // we don't have to define a scrollLeft because we're only scrolling vertically.
		getBoundingClientRect() {
			return {
				top: 0,
				left: 0,
				width: window.innerWidth,
				height: window.innerHeight,
			};
		},
		// LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
		pinType: document.querySelector('#parent').style.transform
			? 'transform'
			: 'fixed',
	});

	// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
	ScrollTrigger.addEventListener('refresh', () => locoScroll.update());

	// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
	ScrollTrigger.refresh();
}
locoScroll();

// gsap.to('.video', {
// 	height: 0,
// 	duration:3,
// });


function loaderwalaeffect(){
	// Moving Loader on Top -100%
    function loaderHide() {
		const loaderTl = gsap.timeline();
			loaderTl.to('.loader', {
				top: '-100%',
				duration: 3,
			})
			.to('.loader',{
				display:"none",
			})
		}


		// Moving Loader-Cursor
		const loader = document.querySelector('.loader');
		const loaderCursor = document.querySelector(".loader-cursor")
		// gsap.set('loader-cursor',{x	Percent: -50 ,yPercent: -50});

		loader.addEventListener("mousemove", (e)=>{
			loaderCursor.style.top =e.pageY + "px";
			loaderCursor.style.left = e.pageX + "px";
			// gsap.to(loaderCursor, 0.7,{x: e.clientX ,y:e.clientY});
		})


		// This will move on top by Clicking on Loader Page
		loader.addEventListener('click', () => {
			loaderHide();
		});

}
loaderwalaeffect();

const introVideo =document.querySelector('.intro-video');
introVideo.addEventListener('mouseenter',()=>{
    introVideo.style.transform = "scale(1)"
})

introVideo.addEventListener('mouseleave', () => {
    introVideo.style.transform = 'scale(.69)';

});


