function prettyFile(file, parentDiv){
  let elmnt = fetch(file)
  .then( response => response.text())
  .then( (text) => {
    text = replaceAll(text, "<", "&lt;")
    text = replaceAll(text, ">", "&gt;")
    return text
  })
  .then( (text) => {
    let js = document.createElement('pre')
    js.setAttribute('class', 'prettyprint')
    js.innerHTML = text
    document.getElementById(parentDiv).prepend(js)
  })
}


function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}


// function goTo(page) {
//   var i;
//   var x = document.getElementsByClassName("pages");
//   for (i = 0; i < x.length; i++) {
//     x[i].style.display = "none";
//   }
//   document.getElementById(page).style.display = "block";
// }


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