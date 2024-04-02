$(document).ready(function() {
    $('.scroll_top').click(function() {
        $("html, body").animate({ scrollTop: 0 }, 200);
        return false;

    });

});

$(window).scroll(function() {
    if ($(window).scrollTop() == 0) {

        window.location.reload(false);
    }
});

// change the text in the button on click
function handleClick() {
    const btn = document.getElementById('about');
    const initialText = 'About';


    if (btn.textContent.includes(initialText)) {
        btn.textContent = 'Back';
    } else {
        btn.textContent = initialText;
    }
}

//////projekte filtern
filterSelection("all")

function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("filterDiv");
    if (c == "all") c = "";
    // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
    }
}

// Show filtered elements
function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
    // init with element
    var grid = document.querySelector('.grid');
    var msnry = new Masonry(grid, {
        // options...
        itemSelector: '.grid-item',
        columnWidth: 6,
        gutterWidth: 6
    });

  


}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

// Add active class to the current control button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}