document.addEventListener("DOMContentLoaded", function () {
    fetch("/components/header.html")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        document.getElementById("header-container").innerHTML = data;
        setActiveHeader(); // Set the active link after header insertion
      })
      .catch(error => console.error("Error loading the header:", error));
  });
  
  function setActiveHeader() {
    const navLinks = document.querySelectorAll("#navmenu a");
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;
    
    navLinks.forEach(link => {
      const linkHref = link.getAttribute("href");
      
      // If it's an anchor-only link, check against the hash.
      if (linkHref.startsWith("#")) {
        if (currentHash === linkHref) {
          link.classList.add("active");
        }
      } else {
        // Otherwise, create a URL object to check the pathname.
        const linkUrl = new URL(link.href, window.location.origin);
        if (linkUrl.pathname === currentPath) {
          link.classList.add("active");
        }
      }
    });
  }
  