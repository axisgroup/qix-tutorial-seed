module.exports = function(element, layout, genericObject) {
    var titleDiv = element.querySelector(".filter-title");
    var ul = element.querySelector("ul");
    ul.innerHTML = "";

    // Replace the existing content of the filter with the title of the filter
    titleDiv.innerHTML = layout.qListObject.qDimensionInfo.qFallbackTitle;

    // Get the data from the List Object
    var data = layout.qListObject.qDataPages[0].qMatrix;

    // Loop through the data and create the filter list
    data.forEach(function(e) {
        var li = document.createElement("li");
        li.innerHTML = e[0].qText;
        li.setAttribute("class", e[0].qState);

        // Click function to select
        li.addEventListener("click", function(evt) {
            genericObject.selectListObjectValues("/qListObjectDef", [e[0].qElemNumber], true);
        });

        ul.appendChild(li);

    });
};