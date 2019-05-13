function prettyFile(file, parentDiv) {
  let elmnt = fetch(file)
    .then(response => response.text())
    .then((text) => {
      text = replaceAll(text, "<", "&lt;")
      text = replaceAll(text, ">", "&gt;")
      return text
    })
    .then((text) => {
      let js = document.createElement('pre')
      js.setAttribute('class', 'prettyprint')
      js.innerHTML = text
      document.getElementById(parentDiv).prepend(js)
    })
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function showHideDiv(ele) {
  var srcElement = document.getElementById(ele);
  if (srcElement != null) {
    if (srcElement.style.display == "block") {
      srcElement.style.display = 'none';
    }
    else {
      srcElement.style.display = 'block';
    }
    return false;
  }
}

function loadscript(url) {
  var script = document.createElement("script");  // create a script DOM node
  script.src = url;  // set its src to the provided URL

  document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}