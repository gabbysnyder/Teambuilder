<?php
/**
* Template Name: Teambuilder
* Description: Pokemon Gen 6 Teambuilder for Wordpress. Written by JTK from http://www.teammagma.net
*/ 
get_header();
?>

<div id="inner_content_section" style="padding: 15px 0;">
	<div id="selector-column" class="col-md-3">
		<!-- Pokemon picker goes here -->
		<div id="pkmn1" class="input-group col-md-12 pkmnContainer" moreInfo="hidden">
			<span class='input-group-addon'>
				<img src='media/pokemon/icons/0.png'/>
			</span>
			<input type="text" class="form-control" placeholder="Pokemon #1" style="border-right: 0px" pokemon="0">
			<span class='input-group-addon validationCell'></span>
		</div>
		<div id="pkmn1collapsesummary" class="pkmnCollapse collapseSummary" pokemon="0">
			<h6 class="text-center"></h6>
		</div>
		<div id="pkmn1collapse" class="pkmnCollapse collapse col-md-12 col-xs-12" pokemon="0">
			<select class="form-control">
  				<option selected="selected">Select Ability</option>
			</select>
			<div id="moveContainer">
				<input class="form-control" placeholder="Move #1" move="0">
				<input class="form-control" placeholder="Move #2" move="1">
				<input class="form-control" placeholder="Move #3" move="2">
				<input class="form-control" placeholder="Move #4" move="3">
			</div>
			<span style="float: right;">Hide more info</span>
		</div>

		<div id="pkmn2" class="input-group col-md-12 pkmnContainer" moreInfo="hidden">
			<span class='input-group-addon'>
				<img src='/wp-content/themes/smart-magma/media/pokemon/icons/0.png'/>
			</span>
			<input type="text" class="form-control" placeholder="Pokemon #2" style="border-right: 0px" pokemon="1">
			<span class='input-group-addon validationCell'></span>
		</div>
		<div id="pkmn2collapsesummary" class="pkmnCollapse collapseSummary" pokemon="1">
			<h6 class="text-center"></h6>
		</div>
		<div id="pkmn2collapse" class="pkmnCollapse collapse col-md-12 col-xs-12" pokemon="1">
			<select class="form-control" pokemon="0">
  				<option selected="selected">Select Ability</option>
			</select>
			<div id="moveContainer">
				<input class="form-control" placeholder="Move #1" move="0">
				<input class="form-control" placeholder="Move #2" move="1">
				<input class="form-control" placeholder="Move #3" move="2">
				<input class="form-control" placeholder="Move #4" move="3">
			</div>
			<span style="float: right;">Hide more info</span>
		</div>

		<div id="pkmn3" class="input-group col-md-12 pkmnContainer" moreInfo="hidden">
			<span class='input-group-addon'>
				<img src='media/pokemon/icons/0.png'/>
			</span>
			<input type="text" class="form-control" placeholder="Pokemon #3" style="border-right: 0px" pokemon="2">
			<span class='input-group-addon validationCell'></span>
		</div>
		<div id="pkmn3collapsesummary" class="pkmnCollapse collapseSummary" pokemon="2">
			<h6 class="text-center"></h6>
		</div>
		<div id="pkmn3collapse" class="pkmnCollapse collapse col-md-12 col-xs-12" pokemon="2">
			<select class="form-control" pokemon="0">
  				<option selected="selected">Select Ability</option>
			</select>
			<div id="moveContainer">
				<input class="form-control" placeholder="Move #1" move="0">
				<input class="form-control" placeholder="Move #2" move="1">
				<input class="form-control" placeholder="Move #3" move="2">
				<input class="form-control" placeholder="Move #4" move="3">
			</div>
			<span style="float: right;">Hide more info</span>
		</div>

		<div id="pkmn4" class="input-group col-md-12 pkmnContainer" moreInfo="hidden">
			<span class='input-group-addon'>
				<img src='media/pokemon/icons/0.png'/>
			</span>
			<input type="text" class="form-control" placeholder="Pokemon #4" style="border-right: 0px" pokemon="3">
			<span class='input-group-addon validationCell'></span>
		</div>
		<div id="pkmn4collapsesummary" class="pkmnCollapse collapseSummary" pokemon="3">
			<h6 class="text-center"></h6>
		</div>
		<div id="pkmn4collapse" class="pkmnCollapse collapse col-md-12 col-xs-12" pokemon="3">
			<select class="form-control" pokemon="0">
  				<option selected="selected">Select Ability</option>
			</select>
			<div id="moveContainer">
				<input class="form-control" placeholder="Move #1" move="0">
				<input class="form-control" placeholder="Move #2" move="1">
				<input class="form-control" placeholder="Move #3" move="2">
				<input class="form-control" placeholder="Move #4" move="3">
			</div>
			<span style="float: right;">Hide more info</span>
		</div>

		<div id="pkmn5" class="input-group col-md-12 pkmnContainer" moreInfo="hidden">
			<span class='input-group-addon'>
				<img src='media/pokemon/icons/0.png'/>
			</span>
			<input type="text" class="form-control" placeholder="Pokemon #5" style="border-right: 0px" pokemon="4">
			<span class='input-group-addon validationCell'></span>
		</div>
		<div id="pkmn5collapsesummary" class="pkmnCollapse collapseSummary" pokemon="4">
			<h6 class="text-center"></h6>
		</div>
		<div id="pkmn5collapse" class="pkmnCollapse collapse col-md-12 col-xs-12" pokemon="4">
			<select class="form-control" pokemon="0">
  				<option selected="selected">Select Ability</option>
			</select>
			<div id="moveContainer">
				<input class="form-control" placeholder="Move #1" move="0">
				<input class="form-control" placeholder="Move #2" move="1">
				<input class="form-control" placeholder="Move #3" move="2">
				<input class="form-control" placeholder="Move #4" move="3">
			</div>
			<span style="float: right;">Hide more info</span>
		</div>

		<div id="pkmn6" class="input-group col-md-12 pkmnContainer" moreInfo="hidden">
			<span class='input-group-addon'>
				<img src='media/pokemon/icons/0.png'/>
			</span>
			<input type="text" class="form-control" placeholder="Pokemon #6" style="border-right: 0px" pokemon="5">
			<span class='input-group-addon validationCell'></span>
		</div>
		<div id="pkmn6collapsesummary" class="pkmnCollapse collapseSummary" pokemon="5">
			<h6 class="text-center"></h6>
		</div>
		<div id="pkmn6collapse" class="pkmnCollapse collapse col-md-12 col-xs-12" pokemon="5">
			<select class="form-control" pokemon="0">
  				<option selected="selected">Select Ability</option>
			</select>
			<div id="moveContainer">
				<input class="form-control" placeholder="Move #1" move="0">
				<input class="form-control" placeholder="Move #2" move="1">
				<input class="form-control" placeholder="Move #3" move="2">
				<input class="form-control" placeholder="Move #4" move="3">
			</div>
			<span style="float: right;">Hide more info</span>
		</div>
		<div id="url-column" class="col-md-12">
		<div class="input-group col-md-12">
 			<span class="input-group-addon teamUrlAddon">
 				<span class="glyphicon glyphicon-link" style="width: 32px"></span>
 			</span>
			<input id="teamUrl" type="text" class="form-control" placeholder="Link to this Team" data-toggle="tooltip" title="Link to this Team">
		</div>
	</div>

	<div id="fidget-column" class="col-md-12">
		<div class="input-group col-md-12">
			<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown">
    			<span id="metagameButtonText">Select Metagame</span>
    			<span class="caret"></span>
  			</button>
 			<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
    			<li role="presentation"><a role="menuitem" tabindex="-1" href="#" id="vgc14">VGC 2014</a></li>
   				<li role="presentation" class="divider"></li>
    			<li role="presentation"><a role="menuitem" tabindex="-1" href="#" id="nofilter">Remove Metagame Filtering</a></li>
  			</ul>
			<div style="float: right">
				<button id="fidget" type="button" class="btn btn-default" data-toggle="button">Enable Fidget Mode</button>
  			</div>
		</div>
	</div>

	<div id="changelog" class="col-md-12">
		<div class="panel panel-default">
			<div class="panel-heading">
				<a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
					Updates - Last updated on 10/25/2014
				</a>
			</div>
			<div id="collapseOne" class="panel-collapse collapse">
				<div class="panel-body" style="max-height:350px; overflow-y:auto;">
					<dl>
  						<dt>10/25/2014</dt>
  						<dd>Fixed Mr. Mime</dd>
  						<dd>Added VGC 2014 metagame validation - a checkmark will show up next to a pokemon if it's VGC2014 legal, and a x will show up if it's not.</dd>
  						<dd>Added this helpful little updates box.</dd>
					</dl>
					<i class='fa fa-heart' style='color: red'></i>JTK
					</br><small style="text-align: center">found a bug or have a feature request? let me know <a href="https://twitter.com/iBidoof">@iBidoof</a></small>
				</div>
			</div>
		</div>
	</div>
	</div>

	<!-- try adding tabs here -->
	<div id="rightHandContainer" class="col-md-9" style="float: right;">
		<ul class="nav nav-tabs" role="tablist">
  			<li role="presentation" class="active"><a href="#home" role="tab" data-toggle="tab">Type Resistances</a></li>
  			<li role="presentation"><a href="#profile" role="tab" data-toggle="tab">Type Coverage</a></li>
		</ul>

		<!-- Tab panes -->
		<div class="tab-content">
  			<div role="tabpanel" class="tab-pane active" id="home">
  				<div id="typeChartResults" class="col-md-12" style="float: right; padding-top:20px;"></div>
  				<div class="panel panel-default" style="border-top:none; border-top-left-radius: 0px;">
  					<div id="colorKey" class="panel-body">
    					<div class="col-md-3">
    						<div class="square strong-green"></div>
    						<h5 style="display: inline-block;">Definitely Balanced</br><small>Your team has plenty of coverage for this type.</small></h5>
    					</div>
    					<div class="col-md-3">
    						<div class="square green"></div>
    						<h5 style="display: inline-block;">Probably Balanced</br><small>Your team might be lacking some coverage, but is probably okay.</small></h5>
    					</div>
    					<div class="col-md-3">
    						<div class="square red"></div>
    						<h5 style="display: inline-block;">Probably Unbalanced</br><small>Your team could be weak in this area - it's worth looking into.</small></h5>
    					</div>
    					<div class="col-md-3">
    						<div class="square strong-red"></div>
    						<h5 style="display: inline-block;">Definitely Unbalanced</br><small>Your team is missing coverage in this area.</small></h5>
    					</div>
  					</div>
				</div>
  			</div>
  			<div role="tabpanel" class="tab-pane" id="profile">
  				<div id="moveChartResults" class="col-md-12" style="float: right; padding-top:20px;"></div>
  				<div class="panel panel-default" style="border-top:none; border-top-left-radius: 0px;">
  					<div id="colorKey" class="panel-body">
    					<div class="col-md-3">
    						<div class="square green"></div>
    						<h5 style="display: inline-block;">You've got coverage!</br><small>You have a move of this type.</small></h5>
    					</div>
  					</div>
				</div>
  			</div>
		</div>
	</div>
</div>

<?php get_footer(); ?>