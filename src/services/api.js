// Google Sheets Configuration
// Replace with your Google Sheet ID (found in the sheet URL)
// Example: https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit
const SHEET_ID = '1ukp5YszGX5bn9YB898DssRut0HJOKX16HT_5v9fJshw';

/**
 * Parse Google Sheets Date format: "Date(year, month, day)" to ISO string
 * Note: Google Sheets months are 0-indexed
 */
const parseGoogleDate = (value) => {
  if (!value) return '';

  // If it's already a string date, return as-is
  if (typeof value === 'string' && !value.startsWith('Date(')) {
    return value;
  }

  // Parse Date(year, month, day) format
  const match = String(value).match(/Date\((\d+),(\d+),(\d+)\)/);
  if (match) {
    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10); // 0-indexed
    const day = parseInt(match[3], 10);
    const date = new Date(year, month, day);
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
  }

  return String(value);
};

/**
 * Get value from row, checking multiple possible column names
 */
const getValue = (row, ...keys) => {
  for (const key of keys) {
    if (row[key] !== undefined && row[key] !== null) {
      return row[key];
    }
  }
  return '';
};

/**
 * Fetches data from a Google Sheet tab and parses it into JSON
 * @param {string} sheetName - Name of the sheet tab (e.g., 'Profile', 'Experiences')
 * @returns {Promise<Array>} - Array of objects with column headers as keys
 */
const fetchSheetData = async (sheetName) => {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;

  const response = await fetch(url);
  const text = await response.text();

  // Google Sheets returns JSONP-like response, extract the JSON part
  // Response format: /*O_o*/google.visualization.Query.setResponse({...});
  const jsonString = text.substring(text.indexOf('(') + 1, text.lastIndexOf(')'));
  const json = JSON.parse(jsonString);

  // Check if cols have labels (some sheets have them, some don't)
  const colLabels = json.table.cols.map(col => col.label || '');
  const hasColLabels = colLabels.some(label => label.length > 0);

  const rows = json.table.rows || [];

  let headers;
  let dataRows;

  if (hasColLabels) {
    // Use labels from cols array
    headers = colLabels;
    dataRows = rows;
  } else {
    // First row contains headers
    if (rows.length === 0) return [];
    const headerRow = rows[0];
    headers = headerRow.c.map(cell => (cell && cell.v) ? String(cell.v).trim() : '');
    dataRows = rows.slice(1);
  }

  const data = dataRows.map(row => {
    const obj = {};
    row.c.forEach((cell, index) => {
      if (headers[index]) {
        // Use formatted value (f) if available, otherwise raw value (v)
        let value = '';
        if (cell) {
          value = cell.f !== undefined ? cell.f : (cell.v !== null ? cell.v : '');
        }
        obj[headers[index]] = value;
      }
    });
    return obj;
  });

  return data;
};

/**
 * Fetch profile data (expects single row in Profile sheet)
 */
export const getProfile = async () => {
  const data = await fetchSheetData('Profile');
  if (data.length === 0) {
    throw new Error('No profile data found');
  }

  // Return first row as profile object
  const row = data[0];
  return {
    name: getValue(row, 'name', 'Name'),
    title: getValue(row, 'title', 'Title'),
    bio: getValue(row, 'bio', 'Bio'),
    email: getValue(row, 'email', 'Email'),
    linkedin_url: getValue(row, 'linkedin_url', 'LinkedIn', 'linkedin'),
    github_url: getValue(row, 'github_url', 'GitHub', 'github'),
    resume_url: getValue(row, 'resume_url', 'Resume', 'resume'),
    profile_image_url: getValue(row, 'profile_image_url', 'Image', 'image'),
  };
};

/**
 * Fetch experiences data
 */
export const getExperiences = async () => {
  const data = await fetchSheetData('Experiences');

  return data.map((row, index) => {
    const isCurrent = getValue(row, 'is_current', 'IsCurrent', 'Is Current');
    return {
      id: index + 1,
      company: getValue(row, 'company', 'Company'),
      role: getValue(row, 'role', 'Role'),
      start_date: getValue(row, 'start_date', 'StartDate', 'Start Date'),
      end_date: getValue(row, 'end_date', 'EndDate', 'End Date'),
      description: getValue(row, 'description', 'Description'),
      is_current: isCurrent === true || String(isCurrent).toLowerCase() === 'true',
      order: parseInt(getValue(row, 'order', 'Order') || index, 10),
    };
  }).sort((a, b) => a.order - b.order);
};

/**
 * Fetch education data
 */
export const getEducation = async () => {
  const data = await fetchSheetData('Education');

  return data.map((row, index) => {
    const endYear = getValue(row, 'end_year', 'EndYear', 'End Year');
    return {
      id: index + 1,
      institution: getValue(row, 'institution', 'Institution'),
      degree: getValue(row, 'degree', 'Degree'),
      field: getValue(row, 'field', 'Field'),
      start_year: parseInt(getValue(row, 'start_year', 'StartYear', 'Start Year') || 0, 10),
      end_year: endYear ? parseInt(endYear, 10) : null,
      description: getValue(row, 'description', 'Description'),
      order: parseInt(getValue(row, 'order', 'Order') || index, 10),
    };
  }).sort((a, b) => a.order - b.order);
};

/**
 * Fetch skills data
 */
export const getSkills = async () => {
  const data = await fetchSheetData('Skills');

  return data.map((row, index) => ({
    id: index + 1,
    name: getValue(row, 'name', 'Name'),
    category: getValue(row, 'category', 'Category') || 'other',
    proficiency_level: parseInt(getValue(row, 'proficiency_level', 'Proficiency', 'Proficiency Level') || 80, 10),
    order: parseInt(getValue(row, 'order', 'Order') || index, 10),
  })).sort((a, b) => a.order - b.order);
};

/**
 * Fetch projects data
 */
export const getProjects = async () => {
  const data = await fetchSheetData('Projects');

  return data.map((row, index) => {
    const techStack = getValue(row, 'tech_stack', 'TechStack', 'Tech Stack');
    const featured = getValue(row, 'featured', 'Featured');
    return {
      id: index + 1,
      name: getValue(row, 'name', 'Name'),
      description: getValue(row, 'description', 'Description'),
      tech_stack: techStack ? String(techStack).split(',').map(t => t.trim()).filter(t => t) : [],
      github_url: getValue(row, 'github_url', 'GitHub', 'github'),
      live_url: getValue(row, 'live_url', 'LiveURL', 'Live URL'),
      image_url: getValue(row, 'image_url', 'Image', 'image'),
      featured: featured === true || String(featured).toLowerCase() === 'true',
      order: parseInt(getValue(row, 'order', 'Order') || index, 10),
    };
  }).sort((a, b) => {
    // Featured projects first, then by order
    if (a.featured !== b.featured) return b.featured ? 1 : -1;
    return a.order - b.order;
  });
};

// Default export for backwards compatibility
export default {
  getProfile,
  getExperiences,
  getEducation,
  getSkills,
  getProjects,
};
