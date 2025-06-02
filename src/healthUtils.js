export function calculateBMI(weight, height) {
  if (!weight || !height || weight <= 0 || height <= 0) return null;
  return weight / (height * height);
}

export function getBMICategory(bmi) {
  if (bmi < 18.5) return { category: "น้ำหนักต่ำกว่าเกณฑ์ (ผอม)", advice: "", color: "" };
  if (bmi < 23) return { category: "น้ำหนักปกติ", advice: "", color: "" };
  if (bmi < 25) return { category: "น้ำหนักเกิน", advice: "", color: "" };
  if (bmi < 30) return { category: "โรคอ้วนระดับ 1", advice: "", color: "" };
  return { category: "โรคอ้วนระดับ 2", advice: "", color: "" };
}

export function calculateBMR(weight, height, age, gender) {
  if (gender === "male") {
    return 88.362 + (13.397 * weight) + (4.799 * height * 100) - (5.677 * age);
  } else {
    return 447.593 + (9.247 * weight) + (3.098 * height * 100) - (4.330 * age);
  }
}

export function calculateBodyFat(bmi, age, gender) {
  if (gender === "male") {
    return (1.20 * bmi) + (0.23 * age) - 16.2;
  } else {
    return (1.20 * bmi) + (0.23 * age) - 5.4;
  }
}

export function calculateWater(weight) {
  return weight * 0.03;
}

export function calculateProtein(weight) {
  return { min: weight * 1, max: weight * 1.5 };
}

export function calculateTDEE(bmr) {
  return Math.round(bmr * 1.2);
}