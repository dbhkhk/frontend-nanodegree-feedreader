/* This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */
/* place all tests within the $() function,
 * since some of these tests may require DOM elements,
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    // test suite about the RSS feeds definitions, the allFeeds variable in our application.
    describe('RSS Feeds', function() {
        // test to make sure that the allFeeds variable has been defined and that it is not empty.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('Each feed has a URL defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });
        /* test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Each feed has a name defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });
    // test suite about the slide menu
    describe('The menu', function() {
        // test that ensures the menu element is hidden by default.
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        // test that ensures the menu changes visibility when the menu icon is clicked.
        it('changes visibility when menu icon is clicked', function() {
            var menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        it('is hidden when link in feedList is clicked', function() {
            $('body').toggleClass('menu-hidden');
            var feedList = $('.feed-list');
            feedList.find('a').first().click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
    // test suite about Initial Entries
    describe('Initial Entries', function() {
        /* test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test involves done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });
        it('At least one feed exists when loaded', function(done) {
            expect($('.feed').find('.entry').length).not.toBe(0);
            done();
        });
    });
    // test suite about New Feed Selection
    describe('New Feed Selection', function() {
        /* test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * loadFeed() is asynchronous.
         */
        var content = $('.feed').find('h2').first().text();
        beforeEach(function(done) {
            loadFeed(1, function() {
                done();
            });
        });
        it('Content changes when new feed loaded', function(done) {
            newContent = $('.feed').find('h2').first().text();
            expect(newContent === content).toBe(false);
            done();
        });
    });
}());