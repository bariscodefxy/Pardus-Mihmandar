export type CommandRisk = {
  level: 'low' | 'medium' | 'high';
  reasons: string[];
};

const highRiskPatterns = [
  /\bsudo\b/,
  /\bsu\b/,
  /\brm\b/,
  /\brmdir\b/,
  /\bchmod\b/,
  /\bchown\b/,
  /\bdd\b/,
  /\bmkfs\b/,
  /\bfdisk\b/,
  /\bparted\b/,
  /\bmount\b/,
  /\bumount\b/,
  /systemctl\s+(disable|stop)/,
  /apt\s+(remove|purge)/,
  /\/etc\//,
  /\/boot\//
];

export function classifyCommandRisk(command: string): CommandRisk {
  const reasons = highRiskPatterns
    .filter((pattern) => pattern.test(command))
    .map((pattern) => `Matched risky pattern: ${pattern.source}`);

  if (reasons.length > 0) {
    return { level: 'high', reasons };
  }

  if (command.trim().length === 0) {
    return { level: 'low', reasons: ['No command entered.'] };
  }

  return { level: 'medium', reasons: ['Command should be explained before execution.'] };
}
