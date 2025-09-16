export function timeOfTheDay() {
  const now = new Date(Date.now());
  const hour = now.getHours();

  if (hour < 12) return "morning";
  else if (hour < 16) return "afternoon";
  else return "evening";
}
