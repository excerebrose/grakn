
$('#mysidebar').height($(".nav").height());


$( document ).ready(function() {

    //this script says, if the height of the viewport is greater than 800px, then insert affix class, which makes the nav bar float in a fixed
    // position as your scroll. if you have a lot of nav items, this height may not work for you.
    var h = $(window).height();
    //console.log (h);
    if (h > 800) {
        $( "#mysidebar" ).attr("class", "nav affix");
    }
    // activate tooltips. although this is a bootstrap js function, it must be activated this way in your theme.
    $('[data-toggle="tooltip"]').tooltip({
        placement : 'top'
    });

    /**
     * AnchorJS
     */
    anchors.add('h2,h3,h4,h5');

    $('[data-toggle="popover"]').popover({
        placement : 'top',
        trigger: 'hover',
        html: true
    });

});

// needed for nav tabs on pages. See Formatting > Nav tabs for more details.
// script from http://stackoverflow.com/questions/10523433/how-do-i-keep-the-current-tab-active-with-twitter-bootstrap-after-a-page-reload
$(function() {
    var json, tabsState;
    $('a[data-toggle="pill"], a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        var href, json, parentId, tabsState;

        tabsState = localStorage.getItem("tabs-state");
        json = JSON.parse(tabsState || "{}");
        parentId = $(e.target).parents("ul.nav.nav-pills, ul.nav.nav-tabs").attr("id");
        href = $(e.target).attr('href');
        json[parentId] = href;

        return localStorage.setItem("tabs-state", JSON.stringify(json));
    });

    tabsState = localStorage.getItem("tabs-state");
    json = JSON.parse(tabsState || "{}");

    $.each(json, function(containerId, href) {
        return $("#" + containerId + " a[href=" + href + "]").tab('show');
    });

    $("ul.nav.nav-pills, ul.nav.nav-tabs").each(function() {
        var $this = $(this);
        if (!json[$this.attr("id")]) {
            return $this.find("a[data-toggle=tab]:first, a[data-toggle=pill]:first").tab("show");
        }
    });
});

$( document ).ready(function() {
    // Navbar Logic
    var hamburgerBtn = $('#hamburger-btn');
    var hamburgerMenu = $('#hamburger-menu');
    var hamburgerSecondaryMenu = $('#hamburger-menu-secondary');
    var hamburgerSecondaryMenuBack = $('#hamburger-menu-secondary-back');
    var hamburgerExpanded = false;
    var secondaryExpanded = false;

    hamburgerBtn.click(function() {
        hamburgerExpanded = !hamburgerExpanded;
        if(hamburgerExpanded) {
            hamburgerBtn.addClass("is-active");
            hamburgerMenu.addClass("navigation-bar__hamburger--open")
        }
        else {
            hamburgerBtn.removeClass("is-active");
            hamburgerMenu.removeClass("navigation-bar__hamburger--open");
            if(secondaryExpanded) {
                hamburgerSecondaryMenu.removeClass('navigation-bar__hamburger__secondary--open');
                $("a").remove('.navigation-bar__link__removable');
                secondaryExpanded = false;
            }
        }
    })

    var hamburgerParentButtons = $('.navigation-bar__hamburger__link');

    hamburgerParentButtons.click(function() {
        var links = $(this).data('links');
        Object.keys(links).forEach(function(link) {
            var linkAddr = links[link];
            hamburgerSecondaryMenu.append('<a class="navigation-bar__link navigation-bar__link__removable" href="' + linkAddr + '">' + link + '</a>');
        });
        hamburgerSecondaryMenu.addClass('navigation-bar__hamburger__secondary--open');
        secondaryExpanded = true;
    });

    hamburgerSecondaryMenuBack.click(function() {
        hamburgerSecondaryMenu.removeClass('navigation-bar__hamburger__secondary--open');
        $("a").remove('.navigation-bar__link__removable');
        secondaryExpanded = false;
    })


    //Footer Subscribe logic
    var footerSubscribeButton = $("#footer-subscribe-btn");
    var footerSubscribeInput = $("#footer-subscribe-input");
    
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }

    footerSubscribeButton.click(function() {
        var inputValue = footerSubscribeInput.val();
        if(validateEmail(inputValue)) {
            $.post(
                "https://grakn.ai/invite/mailchimp",
                {
                    email: inputValue
                }
            );
        }
    })
});