<template>
		<div class="modal fade" id="learnModal" @keypress="closeLearn" tabindex="-1" role="dialog" aria-labelledby="learnModalTitle" aria-hidden="true">
			<div class="modal-dialog modal-lg modal-dialog-centered" role="document">
				<div class="modal-content bg-light border border-primary" 
					style="border-width:6px !important; box-shadow: 0px 0px 20px #666;">
					<div class="modal-header text-white bg-primary rounded-0">
						<h5 class="modal-title" id="learnModalTitle">
							What is Gluten?
						</h5>
						<button type="button" class="close text-light" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body bg-white text-dark">

						<div class="m-n3 p-3 pb-4 text-dark">							
							<iframe class="w-100 rounded" height="300px" title="Video: What is gluten?" type="text/html" allowfullscreen="false" src="https://www.youtube-nocookie.com/embed/25mxf_xUqDQ/?controls=1&amp;enablejsapi=1&amp;modestbranding=1&amp;showinfo=0&amp;origin=https%3A%2F%2Fwww.khanacademy.org&amp;iv_load_policy=3&amp;html5=1&amp;fs=1&amp;rel=0&amp;hl=en&amp;cc_lang_pref=en&amp;cc_load_policy=1&amp;start=0" data-youtubeid="25mxf_xUqDQ" data-translatedyoutubeid="25mxf_xUqDQ" data-translatedyoutubelang="en" tabindex="-1" allow="autoplay" frameborder="0"></iframe>
						</div>

						<p>
							<small>
								<img class="p-1 col-5 col-sm-4 col-lg-3 float-right" style="min-width:100px;" src="/src/assets/peas.jpg"/>
								<strong class="	text-primary">Gluten containing vs Gluten contamination</strong><br>
								We've all seen the gluten-free label on items that were always and naturally gluten-free, so what's the deal? Is it just marketing craze?
								Well believe it or not the small amounts of gluten contamination from food made in facilities that handle grains or flour is enough to affect those with gluten-related disorders.
								<br><br>
								For gluten sufferers, each accidental gluten ingestion (glutening) can build upon each other, and can take victims up to 3 months to fully recover! 
								Gluten does more than lower quality of their lives, it does real harm to the immune system and can result in a number of secondary diseases.
								<br><br>
								So those gluten-free labeled treats next to a cafe's cash register? Well their often made in the same bakery as non-gluten-free treats and are therefore, <i> not gluten free.</i> 
								<i>Extra good labeling: 'Celiac Approved', 'Made in a dedicated facility' and 'Gliadin-Free'</i>
								<br>

								<br><strong class="text-primary">The tragedy of Celiac testing</strong><br>
								Celiac disease can be diagnosed in three ways (listed in order of accuracy).
								<ul>
									<li><strong>Diet confirmed</strong><br>
									Try a gluten-free diet, if it works, you are celiac, probably. Though as stated above, it could also be FODMAP-related. Since truly gluten-free diets are really difficult, dieters often fail unknowingly leading to a false negative.</li>
									<li><strong>Blood test confirmed</strong><br>
									Doctors test you blood to see if your body is reacting to gluten. Results aren't super accurate and doctors & technicians aren't always good at statistics.
									What's more, you must have enough gluten in your diet for them to even work. 
									Eating lots of gluten for several months in order for the test to work is referred to as a  'Gluten Challenge'.</li>
									<li><strong>Biopsy 'Scope' Confirmed</strong><br>
									Gastroenterologists fully sedate you, put a special hose down your throat and stomach then cut a tiny hole out of your upper intestines to test for gluten-related damage. 
									It is the most accurate way to diagnose, though again, you'll need to do a 'Gluten Challenge' for it to work well.
									</li>
								</ul>
								While testing is getting better and better, and doctor's are getting more aware - mis-testing and mis-diagnosis happens.
								As such, many Celiac sufferers are left confused and untreated - and often treated as hypochondriacs unfairly. 
								Given the cost and intensity of biopsies, compounded by the harm of gluten-challenging, doctor's will often recommend a gluten-free diet and leave it at that.
								
								<a target="_blank" href="https://www.celiac.com/articles.html/journal-of-gluten-sensitivity/winter-2011-issue/the-conundrum-of-gluten-sensitivity-why-the-tests-are-often-wrong-r4776/">Read more on this...</a>
								<br><br>
								The results are still out but this may be part of the equation of gluten-intolerance (and possibly IBS).
								If you are undiagnosed but convinced gluten is a problem for you, you're likely not crazy but now you are informed.
								<br>
								<br><strong class="text-primary">Marketing Fads</strong><br>
								That brings us to the world of health marketing... Gluten-free living is being sold as a lifestyle choice regardless of an underlying disorder. Which leads to gluten-free labeling that is ignorant of gluten contamination.
								This makes gluten-free diets even harder and while gluten-free labels are become more controlled, we're not there yet.
								<br><br>
								Why is it being marketed as a health diet? As stated in the video above, gluten-free diets are by coincidence healthier.
								It forces you to cut out most heavily processed foods, reduces high glycemic carbs from breads/beer/pizza and gets you to be aware of what you are eating.
								<br><br>
								<a href='https://www.youtube.com/watch?v=Hxd0msD954I' target="_blank">Learn even more about Celiac Disease here.</a>
								<br><br>
								<strong>We haven't cured gluten-related disorders yet, but we can at least cure the ignorance surrounding it!</strong>
							</small>
						</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary w-25" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex'
    export default {
    	data() {
    		return {
				}
			},
			computed:{
				...mapGetters([
				]),
			},
			methods: {
				open(){
					$("#learnModal").modal({backdrop:false, show: true})
				},
				closeLearn(){
					$("#learnModal").modal("hide")
				}
			}
	}
</script>
<style>
#learnModal{
	font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
