import { saveClickToAirtable } from "../api/airTableApi";

export function trackAdClick(name, email, gender, type, adId) {
  saveClickToAirtable({
    id: name,
    adId: adId,
    type: type,
  });
}
