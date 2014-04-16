<?php
/**
* Template Name: Teambuilder
* Description: Pokemon Gen 6 Teambuilder for Wordpress. Written by JTK from http://www.teammagma.net
*/ 
get_header();
?>

<div id="inner_content_section" style="padding: 15px 0;">
	<div id="selector-column" class="col-md-3">
		<div class="input-group col-md-12">
			<span class='input-group-addon'>
				<img id="pkmn1img" src='/wp-content/themes/Magma_6_2013/teambuilder/media/pokemon/icons/0.png'/>
			</span>
			<input id="pkmn1input" type="text" class="form-control" placeholder="Pokemon #1">
		</div>
		<div class="input-group col-md-12">
			<span class='input-group-addon'>
				<img id="pkmn2img" src='/wp-content/themes/Magma_6_2013/teambuilder/media/pokemon/icons/0.png'/>
			</span>
			<input id="pkmn2input" type="text" class="form-control" placeholder="Pokemon #2">
		</div>
		<div class="input-group col-md-12">
			<span class='input-group-addon'>
				<img id="pkmn3img" src='/wp-content/themes/Magma_6_2013/teambuilder/media/pokemon/icons/0.png'/>
			</span>
			<input id="pkmn3input" type="text" class="form-control" placeholder="Pokemon #3">
		</div>
		<div class="input-group col-md-12">
			<span class='input-group-addon'>
				<img id="pkmn4img" src='/wp-content/themes/Magma_6_2013/teambuilder/media/pokemon/icons/0.png'/>
			</span>
			<input id="pkmn4input" type="text" class="form-control" placeholder="Pokemon #4">
		</div>
		<div class="input-group col-md-12">
			<span class='input-group-addon'>
				<img id="pkmn5img" src='/wp-content/themes/Magma_6_2013/teambuilder/media/pokemon/icons/0.png'/>
			</span>
			<input id="pkmn5input" type="text" class="form-control" placeholder="Pokemon #5">
		</div>
		<div class="input-group col-md-12">
			<span class='input-group-addon'>
				<img id="pkmn6img" src='/wp-content/themes/Magma_6_2013/teambuilder/media/pokemon/icons/0.png'/>
			</span>
			<input id="pkmn6input" type="text" class="form-control" placeholder="Pokemon #6">
		</div>
		<button onclick="usernoise.window.show()" class="btn btn-danger col-md-12">Send feedback!</button>

	</div>

	<div id="typeChartResults" class="col-md-9" style="float: right;"></div>
</div>

<?php get_footer(); ?>