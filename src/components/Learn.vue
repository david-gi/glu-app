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
								For gluten sufferers, each accidental gluten ingestion (glutening) can build upon each other, and can take up to 3 months to fully recover!
								<br><br>
								So those gluten-free labeled treats next to a cafe's cash register? Well their often made in the same bakery as their non-gluten-free treats and are therefore, <i> not gluten free.</i> 
								<br>

								<br><strong class="text-primary">The tragedy of Celiac's testing</strong><br>
								Celiac's disease can be diagnosed in three ways (listed in order of accuracy).
								<ul>
									<li><strong>Diet confirmed:</strong><br>
									Try a gluten-free diet, if it works, you have celiac's, probably. Of course being actually gluten-free is really difficult at first and diets often fail.</li>
									<li><strong>Blood test confirmed:</strong><br>
									Doctor tests you blood to see if your body reacts to gluten. Results aren't super accurate and you must have enough gluten in your diet for them to even work.</li>
									<li><strong>Biopsy Confirmed:</strong><br>
									Gastrointestinologists cut a tiny hole out of your upper instestines to test for gluten-related damage. 
									It is the most accurate way to diagnose, though again, you'll need to have been consuming gluten for months for it to work.
									</li>
								</ul>
								While testing is getting better and better, and doctor's are getting more aware - mis-testing and mis-diagnosis happens.
								As such, many Celiac's sufferers are left confused and untreated - and often treated as hypocondriacs unfairly. 
								Given the difficulty of testing as well as the cost and intensity of biopsies, doctor's will often recommend a gluten-free diet and leave it at that.
								<br><br>
								The results are still out but this may be part of the equation of gluten-intolerance (and possibly IBS).
								If you are undiagnosed but convinced gluten is a problem for you, you're not crazy but now you are informed.
								<br>
								<br><strong class="text-primary">Fad and Marketing Labeling</strong><br>
								That brings us to the world of marketing... Gluten-free living is being sold as a lifestyle choice regardless of an underlying disorder. Which leads to gluten-free labeling that is ignorant of gluten contamination.
								This makes gluten-free diets even harder and while gluten-free labels are become more controlled, we're not there yet.
								<br><br>
								Why is it being marketed as a health diet? As stated in the video above, gluten-free diets are by coincidence healthier.
								It forces you to cut out most heavily processed foods, reduces high glycemic carbs from breads/beer/pizza and gets you to be aware of what you are eating.
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
