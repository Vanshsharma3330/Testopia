// -1 for Current time is before the quiz start

export default function calculateRemainingTime(
  startTime,
  userStartTime,
  timeLimit,
  lenientTime,
  currentTime,
  alreadyStarted,
) {
  const start = new Date(startTime).getTime();

  const current = new Date(currentTime).getTime();
  const userStart = new Date(userStartTime).getTime();
  // const quizEndTime = start + timeLimit * 1000;
  let leniencyEndTime = start + lenientTime * 1000;

  console.log(
    "all times : ",
    startTime,
    userStartTime,
    timeLimit,
    lenientTime,
    currentTime,
    alreadyStarted,
  );

  // Case 1: If user started quiz already
  if (alreadyStarted) {
    console.log("you alreadyStarted");
    console.log("current is small then leniencyEndTime");

    const elapsedSinceUserStart = Math.floor((current - userStart) / 1000); // In seconds
    console.log("elapsedSinceUserStart:", elapsedSinceUserStart);
    const remainingTime = timeLimit - elapsedSinceUserStart;
    return Math.max(0, remainingTime); // Return remaining time
  }

  // Case 4: If starting after leniencyEndTime
  if (current > leniencyEndTime) {
    return -1;
  }

  return Math.floor(timeLimit); // Full time limit
}
