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
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
        // test that ensures the menu changes visibility when the menu icon is clicked.
        it('changes visibility when menu icon is clicked', function() {
            var menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
        it('is hidden when link in feedList is clicked', function() {
            $('body').toggleClass('menu-hidden');
            var feedList = $('.feed-list');
            feedList.find('a').first().click();
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
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
            loadFeed(0, done);
        });
        it('At least one feed exists when loaded', function() {
            expect($('.feed').find('.entry').length).not.toBe(0);
        });
    });
    // test suite about New Feed Selection
    describe('New Feed Selection', function() {
        /* test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * loadFeed() is asynchronous.
         */
        var content, newContent;

        beforeEach(function(done) {
            // load 1st time, use parameter 1 now and 0 in 2nd load so that the page is in original state after test
            loadFeed(1, function() {
                content = $('.feed').text(); // get 1st content when 1st load completes
                loadFeed(0, function() { // load 2nd time
                    newContent = $('.feed').text(); // get 2nd content when 2nd load completes
                    done(); // the asynchronous function is done
                });
            });
        });

        it('Content changes when new feed loaded', function() {
            expect(newContent).not.toBe(content);
        });
    });

    // future test suite about preview window
    describe('Preview Window', function() {
        // test that when a feed link is clicked, a preview window is displayed
        xit('is displayed when a feed link is clicked', function() {
            $('.entry-link').first().click();
            expect($('.preview-window').first().hasClass('displayed')).toBeTruthy();
        });
    });
}());