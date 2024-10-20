import AddRandomFile from "@/components/AddRandomFile";

const token =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6IjM2OjZiOjRiOmE2OmQ1OmEzOmNmOmI4OjhmOjUxOjRlOjU4OjlkOjdhOjIzOjE0IiwidHlwIjoiSldUIn0.eyJhdWQiOlsiaHR0cHM6Ly9jb2Rlcnlhbi5raW5kZS5jb20vYXBpIl0sImF6cCI6ImEzYzAyYzVhMDA3YzRjN2E5ZTcyOTg1MzgxODFlNDA1IiwiZXhwIjoxNzI5NDY2OTM4LCJndHkiOlsiY2xpZW50X2NyZWRlbnRpYWxzIl0sImlhdCI6MTcyOTM4MDUzOCwiaXNzIjoiaHR0cHM6Ly9jb2Rlcnlhbi5raW5kZS5jb20iLCJqdGkiOiI0NWM0ZWVmNC1iYWM3LTQwYTctYjY3NS05NWI3ZDVlN2FiYjYiLCJzY29wZSI6InJlYWQ6Y29ubmVjdGVkX2FwcHMiLCJzY3AiOltdLCJ2IjoiMiJ9.XWSskMI10Gh2bCeobCT5SnvO7v3FPs3i68jP9wceNXGjVPDr1yik06KxQ1meB0DnSdHYxb3qLVOro0R7dTe4QpWPSuzvMOn71k32Y8o5qXYqRm8sm5Q8P4tjqGRB65ORZ6NWXfdK2LOO5NSkgRLRVEtAC0Ji1lSq3r0iP3VhrHfBwhqk1gtweJUYcQ3xU-3o9yCoWibmWDIz9OPFltBxF9N0HRK5YulAjVjuV5EGycdfPOargG8exGNrUSIbHaKZum-NocS3VuLfA4NWHyA5-nosURYHBRhY0MMLm52SztZ3KuSgPP6ZA3GQ2-ZRtGkp48FrT_ZGpIcYSYrUErjLaA";

const GoogleDriveViewer = async () => {
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const data = await fetch(
    "https://coderyan.kinde.com/api/v1/connected_apps/auth_url?key_code_ref=key-reference&user_id=kp_fc3d313682a14e44845f396487db6762",
    { headers }
  ).then((r) => r.json());

  if (!data) return null;

  const { session_id, url } = data;

  console.log({ url, session_id });

  const { access_token } = await fetch(
    `https://coderyan.kinde.com/api/v1/connected_apps/token?session_id=${session_id}`,
    { headers }
  ).then((r) => r.json());

  const driveHeaders = {
    Accept: "application/json",
    Authorization: `Bearer ${access_token}`,
  };

  const { files } = await fetch("https://www.googleapis.com/drive/v3/files", {
    headers: driveHeaders,
  }).then((r) => r.json());

  console.log({ files });

  return (
    <div className="drive-viewer bg-gray-900 text-white p-4 rounded-md">
      <h2 className="text-xl font-bold mb-4">Google Drive Files</h2>
      <AddRandomFile access_token={access_token} />
    </div>
  );
};

export default GoogleDriveViewer;
