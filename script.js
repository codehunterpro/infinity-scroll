// Unsplash API
const imageContainer = document.querySelector(".image-container");
const loader = document.querySelector(".loader");

let count = 10;
let totalImage = 0;
let loadedImage = 0;
let ready = false;
loader.hidden = false;

const apiKey = `cVj6wJsnpBlGvUX5Vg0g9anrxu3FVZrljiqaSARyseU`;
const APIurl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//helper function---------------------------------------
const setAttribute = function (element, attribute) {
  for (const key in attribute) {
    element.setAttribute(key, attribute[key]);
  }
};

//Data call function----------------------------------------
const getPhotos = async function () {
  try {
    const res = await fetch(APIurl);
    if (!res.ok) throw new Error("somethig went wrong :(");
    const data = await res.json();

    //calling display photo function
    displayPhotos(data);

    //occurs image is loaded;
    ImageLoaded();

    //calling loadmore function
    loadMore(data);
  } catch (err) {
    console.log(err.message);
  }
};

//Rendering Data on Display function--------------------------------
const displayPhotos = function (data) {
  data.forEach((photos) => {
    //1) creating elements <a> </a>
    const el = document.createElement("a");

    setAttribute(el, {
      href: photos.links.download,
      target: "_blank",
    });

    //2) creating elements <img src="jfsldfjds", title="this is title" >
    const img = document.createElement("img");
    setAttribute(img, {
      class: "image",
      src: photos.urls.regular,
      title: "Click and Download HD IMAGE",
    });

    //3) img {child element} parsing in the {el} parent element
    el.appendChild(img);

    //4) el {child element} parsing  in the {imageContainer} parent Element
    imageContainer.appendChild(el);
  });
};

//Infinity Load Function------------------------------------
const loadMore = function () {
  window.addEventListener("scroll", function () {
    if (
      window.scrollY + window.innerHeight >=
        document.body.offsetHeight - 1000 &&
      ready
    ) {
      getPhotos();
    }
  });
};

//function Activate When all images are loaded--------------------
const ImageLoaded = function () {
  const images = document.querySelectorAll(".image");
  totalImage = images.length;
  console.log(images);
  images.forEach((img) => {
    img.addEventListener("load", function () {
      loadedImage++;
      if (totalImage === loadedImage) {
        ready = true;
        loader.hidden = true;
        console.log("image has been loaded");
      }
    });
  });
};

//INITIAL CALL
getPhotos();
