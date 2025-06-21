import { saveClickToAirtable, incrementClickCount } from "../api/airTableApi";

export function trackAdClick(id, type, adId) {
  saveClickToAirtable({
    id,
    adId,
    type,
  });
}

export function trackAdDetailClick(id, type, adId) {
  return incrementClickCount(id, adId, type);
}