import { formDataServer } from "./settings";

export const sendCaptureImage = async (formData: FormData) => {
  try {
    await formDataServer.post(
      "uploadFile",
      { file: formData },
      {
        transformRequest: [
          function () {
            return formData;
          },
        ],
      }
    );
  } catch (error) {
    console.log("[AXIOS ERROR] ", error);
  }
};
