/**
 * Parse tool information from tool name and description
 * Extracts domain and clean name from tool identifiers
 */
export function parseToolInfo(toolName: string, description?: string) {
  const domain = extractDomainFromToolName(toolName);
  const cleanName = cleanToolName(toolName);

  return {
    domain,
    cleanName,
    description: description || '',
  };
}

/**
 * Extract domain from tool name patterns like "domain_toolName" or "domain:toolName"
 */
function extractDomainFromToolName(toolName: string): string {
  // Match patterns like "domain_toolName" or "domain:toolName"
  const separatorMatch = toolName.match(/^([^_:]+)[_:](.+)$/);

  if (separatorMatch) {
    return separatorMatch[1];
  }

  // Check for URL-like patterns
  try {
    const url = new URL(toolName);
    return url.hostname;
  } catch {
    // Not a valid URL
  }

  return 'unknown';
}

/**
 * Clean tool name by removing domain prefixes
 */
function cleanToolName(toolName: string): string {
  // Remove domain prefix if present
  const cleaned = toolName.replace(/^[^_:]+[_:]/, '');

  // Convert snake_case or kebab-case to Title Case
  return cleaned
    .split(/[_-]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
