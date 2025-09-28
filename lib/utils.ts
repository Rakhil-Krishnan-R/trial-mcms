export function generateTeamCodes(prefix: string, count: number) {
  const codes: string[] = [];
  for (let i = 1; i <= count; i++) {
    codes.push(`${prefix}${i}`);
  }
  return codes;
}

export function canViewScores(allStatuses: string[]) {
  return allStatuses.every((s) => s === "Completed");
}
