/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
	/* This is our first test suite - a test suite just contains
	 * a related set of tests. This suite is all about the RSS
	 * feeds definitions, the allFeeds variable in our application.
	 */
	describe('RSS Feeds', function() {
		/* This is our first test - it tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty. Experiment with this before you get started on
		 * the rest of this project. What happens when you change
		 * allFeeds in app.js to be an empty array and refresh the
		 * page?
		 */
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		/* A test that loops through each feed in the allFeeds object and
		 * ensures it has a URL defined and that the URL is not empty.
		 */
		function defineLoop (data) {
			it(data + ' is defined and not empty', function() {
				expect(data).toBeDefined();
				expect(data.length).not.toBe(0);
			});
		}

		allFeeds.forEach(function(el, i) {
			defineLoop(el.url);
		});

		/* A test that loops through each feed in the allFeeds object and ensures it
		 * has a name defined and that the name is not empty.
		 */
		allFeeds.forEach(function(el, i) {
			defineLoop(el.name);
		});

		/* A test that loops through each feed in the allFeeds object and
		 * ensures that it has a valid URL.
		 * http://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-an-url
		 */
		function validUrl(str) {
			var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
			'(\\#[-a-z\\d_]*)?$','i'); // fragment locator
			if(!pattern.test(str)) {
				return false;
			} else {
				return true;
			}
		}

		function urlValidTest(url) {
			it(url + ' is a valid URL', function() {
				expect(validUrl(url)).toEqual(true);
			});
		}

		allFeeds.forEach(function(el, i) {
			urlValidTest(el.url);
		});
	});

	/* A test suite that tests the menu to be hidden by default
	* and it is able to toggle its visiblity by clicking on the
	* menu icon.
	*/
	describe('The Menu' , function() {

		/* A test that ensures the menu element is hidden by default. */
		it('is hidden by default', function() {
			expect($( 'body' ).hasClass( 'menu-hidden' )).toEqual(true);
		});

		/* A test that ensures the menu changes visibility when the menu
		 * icon is clicked. This test should have two expectations:
		 * does the menu display when clicked and does it hide when clicked
		 * again.
		 */
		it('is able to toggle visibility by clicking menu icon', function() {
			var menuIconLink = $('.menu-icon-link');
			menuIconLink.click();
			expect($( 'body' ).hasClass( 'menu-hidden' )).toEqual(false);
			menuIconLink.click();
			expect($( 'body' ).hasClass( 'menu-hidden' )).toEqual(true);
		});
	});

	/* A test suite for testing initial entries being loaded */
	describe('Initial Entries' , function() {

		/* It is a test that ensures when the loadFeed function is called
		 * and completes its work, there is at least a single .entry
		 * element within the .feed container.
		 */
		var feedContainer = $('.feed');

		beforeEach(function(done) {
			 loadFeed(0, function() {
				 done();
			 });
		});

		it('after loadFeed function is called and completes its work, there is at least a single entry element within the feed container', function(done) {
			expect(feedContainer.children().length ? true : false).toEqual(true);
			done();
		});
	});

	/* A test suite for testing that it actually gets new content */
	describe('New Feed Selection' , function() {

		/* A test that ensures when a new feed is loaded by the loadFeed
		 * function that the content actually changes.
		 */
		var oldEntry;
		var newEntry;
		var index = 1;
		/* Before each of the test functions are called, it loads the old entry
		 * and new entry.
		 */
		beforeEach(function(done) {
			loadFeed(index - 1, function() {
				oldEntry = $('.entry-link').attr("href");
			});
			loadFeed(index, function() {
				newEntry = $('.entry-link').attr("href");
				done();
			});
		});

		/* After each time the test functions are called, the index increases by one
		 */
		afterEach(function(done) {
			index++;
			done();
		});

		function newFeeds() {
			it('index [' + (i-1) + '] and [' + i + '] are different', function(done) {
				console.log(oldEntry + ' !== ' + newEntry);
				expect(oldEntry !== newEntry).toEqual(true);
				done();
			});
		}

		for(var i = 1; i < allFeeds.length; i++) {
			newFeeds();
		}
	});
}());
