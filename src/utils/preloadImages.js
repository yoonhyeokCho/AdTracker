export const preloadImages = (items) => {
  const promises = items.flatMap((item) => {
    return ["contentImg", "profileImg"]
      .filter((key) => item[key])
      .map((key) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve;
          img.src = item[key];
        });
      });
  });
  return Promise.all(promises);
};
