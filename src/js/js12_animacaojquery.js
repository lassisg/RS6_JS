$("#objecto").animate({
    left: "+=1000",
    width: 300
  }, 10000, function() {
    // Animation complete.
    console.log("Terminou a animação!");
  });