"use client";

export default function AddRandomFile({ access_token }) {
  const addRandomFile = async () => {
    const newFileMetadata = {
      name: `RandomFile-${Math.random() * 100}.txt`, // Generate a random name
      mimeType: "text/plain",
    };

    const fileBody = new Blob(["This is a random file"], {
      type: "text/plain",
    });

    const form = new FormData();
    form.append(
      "metadata",
      new Blob([JSON.stringify(newFileMetadata)], { type: "application/json" })
    );
    form.append("file", fileBody);

    const fileResponse = await fetch(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        body: form,
      }
    ).then((res) => res.json());

    console.log({ fileResponse });
  };

  return <button onClick={addRandomFile}>Add Random File</button>;
}
