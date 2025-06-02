import { saveClickToAirtable } from "../api/airTableApi";

export function trackAdClick(name, type, adId) {
  saveClickToAirtable({
    id: name,
    adId: adId,
    type: type,
  });
}
