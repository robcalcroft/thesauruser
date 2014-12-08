/* ** thesauruser 2014-12-08 - DO NOT EDIT; FILE AUTO GENERATED ** */
"use strict";
var thesauruser = thesauruser || {};

thesauruser = {
	author: "Rob Calcroft",
	version: "1.0",
	/**
	 * Starts the various watchers
	 * for the app etc.
	 */
	init: function() {

		// When the page loads start
		// the tasks/watchers
		$(document).ready($.proxy(function() {

			// Watch the main input for changes
			$('#main-search').change($.proxy(function(e) {
				var word = $(e.currentTarget).val();

				// If the input is empty just ignore it
				if(!word) {
					return false;
				}
				// Send off the word in the input box
				// to the APU
				this.getSynonyms(word, this.renderSynonyms);
			}, this))
		}, this))
	},

	/**
	 * Uses the API to retrieve an
	 * array of synonyms based on 
	 * the word given
	 * 
	 * @param {String} word The word
	 * to search the API for
	 * 
	 * @param {function} callback The
	 * callback to call after the API
	 * returns it's response.
	 */
	getSynonyms: function(word, callback) {

		// Call the API to grab the synonyms
		// from the backend
		$.getJSON('/api/thesaurus/' + word, callback)

		// If it fails show an error
		.fail(function(err) {
			debugger;
			swal("Oops", err.responseJSON.message, "error")
		})
	},


	/**
	 * Renders the list of synomyns to
	 * the page below the search box
	 *
	 * @param {Array} synomyns The 
	 * array of synonyms returned by
	 * the API
	 */
	renderSynonyms: function(response) {
		var $resultsContainer = $('.results-container'),
			synonyms          = response.words,
			synLen            = synonyms.length,
			resultTpl, i;

		// Clear existing values			
		$resultsContainer
				.html('')
					.delay(500)
						.fadeIn();

		// Fade in container
		$('.results').fadeIn(200, function() {

			// Add items to the DOM
			for (i = synLen - 1; i >= 0; i--) {
				$resultsContainer.append("<div class='result'>" + synonyms[i] + "</div>")
			};

			var $results = $('.result'),
				resLen   = $results.length,
				j, speed;

			// Calculates the best speed
			// of transition fadeIn to use
			// based on how many results
			// there are
			if(resLen > 10) {
				speed = 100;
			} 
			else if(resLen > 20) {
				speed = 50;
			}
			else {
				speed = 200;
			}

			// Fade each one in, one after
			// another
			for (j = resLen - 1; j >= 0; j--) {
				$($results[j]).delay(speed*j).fadeIn();
			};
		})

	}
}