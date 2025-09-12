function openTab(evt, TabName) {
  var tabContainer = evt.currentTarget.closest(".box");
  if (!tabContainer) return;

  var tabBgColor = tabContainer.getAttribute("data-tab-bg-color") || "#2039b8";
  var tabFontColor = tabContainer.getAttribute("data-tab-font-color") || "#fff";
  var activeTabColor = tabContainer.getAttribute("data-active-tab-color") || "#d3dee7";
  var activeTabFontColor = tabContainer.getAttribute("data-active-tab-font-color") || "#2140b7";
  var tabBorderWidth = tabContainer.getAttribute("data-tab-border-width") || "2px";
  var tabBorderStyle = tabContainer.getAttribute("data-tab-border-style") || "solid";
  var tabBorderColor = tabContainer.getAttribute("data-tab-border-color") || "#23928b";
  var tabBorderRadius = tabContainer.getAttribute("data-tab-border-radius") || "0px";
  var activeTabNoBorder = tabContainer.getAttribute("data-active-tab-no-border") === "true";
  var bgColor = tabContainer.getAttribute("data-bg-color") || "#fff8f3";

  var tabsRow = tabContainer.querySelector(".tabss");
  var isUnderline = tabsRow?.classList.contains("underline-active");
  var isHStyle2  = tabsRow?.classList.contains("hstyle-2");
  var isHStyle1  = tabsRow?.classList.contains("hstyle-1");   // ★ NEW
  var isStyle2   = tabsRow?.classList.contains("style-2");
  tabContainer.style.background = bgColor;

  var tabcontent = tabContainer.querySelectorAll(".tabcontent");
  var tablinks = tabContainer.querySelectorAll(".tablinks");

  for (var i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    tabcontent[i].classList.remove("active");
  }

  var target = document.getElementById(TabName);
  if (target) {
    target.style.display = "block";
    target.classList.add("active");
    if (typeof Prism !== "undefined") {
      Prism.highlightAllUnder(target);
    }
  }

  // Reset all tabs
  tablinks.forEach(function(b){
    b.classList.remove("active");
    if (isUnderline) {
      b.style.background = "transparent";
      b.style.color = tabFontColor;
      b.style.border = "none";
      b.style.borderRadius = "0";
      b.style.marginBottom = "0";
    } else if (isHStyle2) {
      b.style.background = "#eeeeee";
      b.style.color = tabFontColor;
       b.style.removeProperty("border");
      b.style.marginBottom = "0";
    } else if (isHStyle1) {                      // ★ NEW
      b.style.background = "transparent";
      b.style.color = tabFontColor;
      b.style.removeProperty("border");         // no inline border
      b.style.marginBottom = "0";
    } else if (isStyle2) {                 
      b.style.background = tabBgColor;
      b.style.color = tabFontColor;
      b.style.removeProperty("border");             
      b.style.borderRadius = "0";
      b.style.marginBottom = "0";
    } else {
      b.style.background = tabBgColor;
      b.style.color = tabFontColor;
      b.style.border = tabBorderWidth + " " + tabBorderStyle + " " + tabBorderColor;
      b.style.borderRadius = tabBorderRadius;
      b.style.marginBottom = "0";
    }
  });

  if (evt && evt.currentTarget) {
    evt.currentTarget.classList.add("active");
    if (isUnderline) {
      evt.currentTarget.style.background = "transparent";
      evt.currentTarget.style.color = activeTabFontColor;
      evt.currentTarget.style.border = "none";
      evt.currentTarget.style.borderRadius = "0";
      evt.currentTarget.style.marginBottom = "0";
    } else if (isHStyle2) {
      evt.currentTarget.style.background = "#ffffff";
      evt.currentTarget.style.color = activeTabFontColor;
      evt.currentTarget.style.removeProperty("border");   
      evt.currentTarget.style.marginBottom = "0px";
    } else if (isHStyle1) {                       // ★ NEW
      evt.currentTarget.style.background = "transparent";
      evt.currentTarget.style.color = activeTabFontColor;
      evt.currentTarget.style.removeProperty("border");  // no inline border
      evt.currentTarget.style.marginBottom = "0";
    } else if (isStyle2) {                   
      evt.currentTarget.style.background = activeTabColor; 
      evt.currentTarget.style.color = activeTabFontColor;
      evt.currentTarget.style.removeProperty("border");
      evt.currentTarget.style.borderRadius = "0";
      evt.currentTarget.style.marginBottom = "0";
    } else {
      evt.currentTarget.style.background = activeTabColor;
      evt.currentTarget.style.color = activeTabFontColor;
      if (activeTabNoBorder) {
        evt.currentTarget.style.border = "none";
      } else {
        evt.currentTarget.style.border = tabBorderWidth + " " + tabBorderStyle + " " + tabBorderColor;
      }
      evt.currentTarget.style.borderRadius = tabBorderRadius;
      evt.currentTarget.style.marginBottom = "0";
    }
  }
}

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".box").forEach(function(box) {
    var firstTab = box.querySelector(".tablinks");
    if (firstTab) firstTab.click();
  });
});
