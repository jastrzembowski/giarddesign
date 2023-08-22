document.addEventListener("DOMContentLoaded", function () {
  const searchIcon = document.querySelector(".search-icon");
  const searchInput = document.querySelector(".search-input");

  searchIcon.addEventListener("click", function () {
    if (window.innerWidth > 1000) {
      searchInput.classList.toggle("visible");
    }
    if (searchInput.classList.contains("visible")) {
      searchInput.focus();
    } else {
      searchInput.blur();
    }
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const accessKey = "9dPyK9QCdTsCvTf_7-GAv6mJA719SdYA7G2imhjYkMI";
  const perPage = 10;
  let page = 1;
  let lastAddedPicture = null;
  const gallery = document.querySelector(".gallery");
  const showMoreButton = document.getElementById("show-more-button");

  async function fetchImages() {
    if (lastAddedPicture) {
      lastAddedPicture.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos/?client_id=${accessKey}&query=garden&per_page=${perPage}&page=${page}`
      );

      const data = await response.json();
      data.results.forEach((image) => {
        const imgElement = document.createElement("img");
        imgElement.src = image.urls.regular;
        imgElement.alt = image.alt_description;
        gallery.appendChild(imgElement);
        lastAddedPicture = imgElement;
      });

      page++;

      const macy = new Macy({
        container: ".gallery",
        trueOrder: false,
        waitForImages: false,
        margin: 10,
        columns: 3,
        breakAt: {
          400: 2,
          700: 3,
          1100: 4,
        },
        margin: {
          x: 20,
          y: 20,
        },
      });
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }

  fetchImages();

  showMoreButton.addEventListener("click", fetchImages);
});

document.addEventListener("DOMContentLoaded", function () {
  const scrollToTopButton = document.getElementById("scrollToTopButton");

  window.onscroll = function () {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      scrollToTopButton.style.display = "block";
    } else {
      scrollToTopButton.style.display = "none";
    }
  };

  scrollToTopButton.addEventListener("click", function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const parallaxBg = document.querySelector(".about-bg");
  window.addEventListener("scroll", function () {
    const scrollPercentage =
      (window.scrollY / (document.body.clientHeight - window.innerHeight)) *
      100;
    const translateX = -scrollPercentage * 1.6;
    parallaxBg.style.transform = `translateX(${translateX}%)`;
  });
});
