const { execFileSync } = require('node:child_process');

const projectId = 'PVT_kwHODv9qYc4BpBJQ';
const fieldId = 'PVTF_lAHODv9qYc4BpBJQzhnn55M';
const deadline = '2026-11-01';

const items = [
  'PVTI_lAHODv9qYc4BpBJQzhD_o5I',
  'PVTI_lAHODv9qYc4BpBJQzhD_o8s',
  'PVTI_lAHODv9qYc4BpBJQzhD_pAY',
  'PVTI_lAHODv9qYc4BpBJQzhD_pFM',
  'PVTI_lAHODv9qYc4BpBJQzhD_pJc',
  'PVTI_lAHODv9qYc4BpBJQzhD_pNE',
  'PVTI_lAHODv9qYc4BpBJQzhD_pT4',
  'PVTI_lAHODv9qYc4BpBJQzhD_pac',
  'PVTI_lAHODv9qYc4BpBJQzhD_pfQ',
  'PVTI_lAHODv9qYc4BpBJQzhD_poA',
  'PVTI_lAHODv9qYc4BpBJQzhD_pqk',
  'PVTI_lAHODv9qYc4BpBJQzhD_pwA'
];

console.log('Setting Deadline (2026-11-01) across all Project #5 items...');

for (const itemId of items) {
  const query = `
    mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!, $date: Date!) {
      updateProjectV2ItemFieldValue(input: {
        projectId: $projectId
        itemId: $itemId
        fieldId: $fieldId
        value: { date: $date }
      }) {
        projectV2Item { id }
      }
    }
  `;

  try {
    execFileSync('gh', [
      'api',
      'graphql',
      '-f', `query=${query}`,
      '-F', `projectId=${projectId}`,
      '-F', `itemId=${itemId}`,
      '-F', `fieldId=${fieldId}`,
      '-F', `date=${deadline}`
    ], { encoding: 'utf8' });
    console.log(`[✓] Deadline successfully set for item: ${itemId}`);
  } catch (err) {
    console.error(`[!] Failed for ${itemId}:`, err.message);
  }
}

console.log('All 12 items in Project #5 now have their Deadline column set to 2026-11-01!');
