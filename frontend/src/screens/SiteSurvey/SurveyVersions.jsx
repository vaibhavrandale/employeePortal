import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function SurveyVersions({
  id,
  selectedVersion,
  setSelectedVersion,
}) {
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    async function fetchVersions() {
      try {
        const response = await axios.get(
          `/api/survey/sitesurveys/version/${id}`
        );
        setVersions(response.data.versions);
        console.log(response.data.versions);
      } catch (error) {
        console.error('Error fetching survey versions:', error);
      }
    }
    fetchVersions();
  }, [id]);

  // const handleSelectChange = (event) => {
  //   const selectedVersionId = event.target.value;
  //   // Call the onSelectVersion function with the selected version id
  //   onSelectVersion(selectedVersionId);
  // };

  return (
    <div>
      <h3>Survey Versions</h3>
      <select
        value={selectedVersion}
        onChange={(e) => setSelectedVersion(e.target.value)}
      >
        <option value="">Select a version</option>
        {versions.map((version) => (
          <option key={version._id} value={version._id}>
            Version {version.versionNumber}
          </option>
        ))}
      </select>
    </div>
  );
}
