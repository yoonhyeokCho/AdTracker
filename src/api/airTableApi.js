import axios from "axios";

const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME;
const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;

const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;
const headers = {
  Authorization: `Bearer ${AIRTABLE_API_KEY}`,
  "Content-Type": "application/json",
};

export const saveClickToAirtable = async ({ id, adId, type }) => {
  try {

    const res = await axios.post(
      airtableUrl,
      {
        records: [
          {
            fields: {
              ID: id,
              "Type-Ad": adId,
              TimeStamp: new Date().toISOString(),
              Type: type,
              detail_click_count: 0,
            },
          },
        ],
      },
      { headers }
    );

    console.log("ow 저장 성공:", res.data);
  } catch (error) {
    console.error("저장 실패:", error.response?.data || error.message);
  }
};

export const incrementClickCount = async (id, adId, type) => {
  try {
    const filter = `AND({ID}="${id}", {Type-Ad}="${adId}")`;
    console.log("🔍 Filter query:", filter);

    const getRes = await axios.get(
      `${airtableUrl}?filterByFormula=${encodeURIComponent(filter)}&sort[0][field]=TimeStamp&sort[0][direction]=desc&maxRecords=1`,
      { headers }
    );

    const record = getRes.data.records[0];
    console.log("📦 Fetched record:", record);

    if (!record) {
      console.warn("⚠️ Record not found, 새로 생성", id, adId);

      await axios.post(
        airtableUrl,
        {
          records: [
            {
              fields: {
                ID: id,
                "Type-Ad": adId,
                Type: type,
                TimeStamp: new Date().toISOString(),
                detail_click_count: 1,
              },
            },
          ],
        },
        { headers }
      );

      return;
    }

    const current = Number(record.fields.detail_click_count) || 0;
    const nextCount = current + 1;

    const patchRes = await axios.patch(
      airtableUrl,
      {
        records: [
          {
            id: record.id,
            fields: {
              detail_click_count: nextCount,
            },
          },
        ],
      },
      { headers }
    );

    console.log("count 업데이트 성공:", patchRes.data);
  } catch (error) {
    console.error("count 실패:", error.response?.data || error.message);
  }
};
