import {
  calculateBMI,
  getBMICategory,
  calculateBMR,
  calculateBodyFat,
  calculateWater,
  calculateProtein,
  calculateTDEE
} from './healthUtils.js';

describe('Health Utils', () => {
  test('calculateBMI should return correct BMI', () => {
    expect(calculateBMI(70, 1.75)).toBeCloseTo(22.857, 2);
    expect(calculateBMI(50, 1.60)).toBeCloseTo(19.53, 2);
    expect(calculateBMI(90, 1.80)).toBeCloseTo(27.78, 2);
  });

  test('getBMICategory should return correct category', () => {
    expect(getBMICategory(17).category).toBe("น้ำหนักต่ำกว่าเกณฑ์ (ผอม)");
    expect(getBMICategory(21).category).toBe("น้ำหนักปกติ");
    expect(getBMICategory(24).category).toBe("น้ำหนักเกิน");
    expect(getBMICategory(27).category).toBe("โรคอ้วนระดับ 1");
    expect(getBMICategory(32).category).toBe("โรคอ้วนระดับ 2");
  });

  test('calculateBMR should return correct BMR for male', () => {
    expect(calculateBMR(70, 1.75, 25, "male")).toBeCloseTo(1724.05, 2); // แก้ไขค่าตรงนี้
  });

  test('calculateBMR should return correct BMR for female', () => {
    expect(calculateBMR(55, 1.60, 30, "female")).toBeCloseTo(1321.96, 2); // แก้ไขค่าตรงนี้
  });

  test('calculateTDEE should return correct TDEE', () => {
    expect(calculateTDEE(1500)).toBe(1800);
    expect(calculateTDEE(2000)).toBe(2400);
  });

  test('calculateWater should return correct water intake', () => {
    expect(calculateWater(70)).toBeCloseTo(2.1, 2);
    expect(calculateWater(50)).toBeCloseTo(1.5, 2);
  });

  test('calculateProtein should return correct protein range', () => {
    expect(calculateProtein(70)).toEqual({ min: 70, max: 105 });
    expect(calculateProtein(50)).toEqual({ min: 50, max: 75 });
  });

  test('calculateBodyFat should return correct %Body Fat for male', () => {
    expect(calculateBodyFat(22, 25, "male")).toBeCloseTo(15.95, 2);
  });

  test('calculateBodyFat should return correct %Body Fat for female', () => {
    expect(calculateBodyFat(22, 25, "female")).toBeCloseTo(26.75, 2);
  });
});