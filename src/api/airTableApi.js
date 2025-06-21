import axios from "axios";

const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME;
const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;

export const saveClickToAirtable = async ({ id, adId, type }) => {
  console.error(AIRTABLE_TABLE_NAME);
  try {
    const response = await axios.post(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`,
      {
        records: [
          {
            fields: {
              ID: id,
              "Type-Ad": adId,
              TimeStamp: new Date().toISOString(),
              Type: type,
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Airtable 저장 성공:", response.data);
  } catch (error) {
    console.error("❌ Airtable 저장 실패:", error);
  }

  console.log("🔑 Using Airtable Key:", import.meta.env.VITE_AIRTABLE_API_KEY);
  console.log(
    "📦 Posting to:",
    `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${
      import.meta.env.VITE_AIRTABLE_TABLE_NAME
    }`
  );
};
