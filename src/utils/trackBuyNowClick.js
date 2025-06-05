export function trackBuyNowClick(name, type, adId) {
  saveClickToAirtable({
    id: name,
    adId: adId,
    type: type,
    buyNowClicked: true, // 새로운 필드
  });
}
