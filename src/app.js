import {
    calculateBMI,
    getBMICategory,
    calculateBMR,
    calculateBodyFat,
    calculateWater,
    calculateProtein,
    calculateTDEE
} from './healthUtils.js';

function getInputValues() {
    return {
        weight: parseFloat(document.getElementById("weight").value),
        height: parseFloat(document.getElementById("height").value),
        // age: parseInt(document.getElementById("age").value),
        // gender: document.getElementById("gender").value
    };
}

function renderDashboard(data) {
    document.getElementById("dashboard").innerHTML = `
    <div class="grid grid-cols-1 gap-4">
        <div class="p-4 rounded-lg shadow bg-gray-50">
            <div class="text-lg font-bold mb-1">BMI: <span class="${data.bmiInfo.color}">${data.bmiText}</span></div>
            <div class="font-semibold ${data.bmiInfo.color}">${data.bmiInfo.category}</div>
            <div class="text-sm mt-1">${data.bmiInfo.advice}</div>
        </div>
        <div class="p-4 rounded-lg shadow bg-gray-50 flex flex-wrap gap-4 justify-between">
            <div>
                <div class="font-semibold">แคลอรี่ที่ควรได้รับ/วัน</div>
                <div class="text-blue-600 text-xl">${data.tdee} kcal</div>
            </div>
            <div>
                <div class="font-semibold">น้ำที่ควรดื่ม/วัน</div>
                <div class="text-blue-400 text-xl">${data.water} ลิตร</div>
            </div>
            <div>
                <div class="font-semibold">โปรตีนที่ควรได้รับ/วัน</div>
                <div class="text-green-600 text-xl">${data.proteinMin} - ${data.proteinMax} กรัม</div>
            </div>
        </div>
        <div class="p-4 rounded-lg shadow bg-gray-50 flex flex-wrap gap-4 justify-between">
            <div>
                <div class="font-semibold">BMR (Basal Metabolic Rate)</div>
                <div class="text-purple-600 text-xl">${data.bmr} kcal</div>
            </div>
            <div>
                <div class="font-semibold">% Body Fat (ประมาณ)</div>
                <div class="text-pink-600 text-xl">${data.bodyFat}%</div>
            </div>
        </div>
    </div>
    `;
}

document.getElementById("calculate").addEventListener("click", function() {
    const { weight, height, age, gender } = getInputValues();

    if (!weight || !height || weight <= 0 || height <= 0) {
        document.getElementById("dashboard").innerHTML = `<div class="text-red-500 text-center">กรุณากรอกน้ำหนักและส่วนสูงให้ถูกต้อง</div>`;
        alert('Please enter valid height and weight');
        return;
    }

    const heightInMeter = height / 100;
    const bmi = calculateBMI(weight, heightInMeter);
    const bmiText = bmi.toFixed(2);
    const bmiInfo = getBMICategory(bmi);
    const water = calculateWater(weight).toFixed(2);
    const protein = calculateProtein(weight);
    const proteinMin = protein.min.toFixed(1);
    const proteinMax = protein.max.toFixed(1);
    const bmr = calculateBMR(weight, heightInMeter, age, gender).toFixed(0);
    const tdee = calculateTDEE(bmr);
    const bodyFat = calculateBodyFat(bmi, age, gender).toFixed(1);

    renderDashboard({ bmiText, bmiInfo, water, proteinMin, proteinMax, bmr, tdee, bodyFat });

    const resultDiv = document.getElementById('result');
    const bmiValue = document.getElementById('bmi-value');
    const bmiCategory = document.getElementById('bmi-category');

    bmiValue.textContent = bmi.toFixed(1);

    // Show result card
    resultDiv.classList.remove('hidden');

    // Set BMI category
    if (bmi < 18.5) {
        bmiCategory.textContent = 'Underweight';
        resultDiv.className = 'bg-blue-50 rounded-xl p-6';
    } else if (bmi < 24.9) {
        bmiCategory.textContent = 'Normal';
        resultDiv.className = 'bg-green-50 rounded-xl p-6';
    } else if (bmi < 29.9) {
        bmiCategory.textContent = 'Overweight';
        resultDiv.className = 'bg-yellow-50 rounded-xl p-6';
    } else {
        bmiCategory.textContent = 'Obese';
        resultDiv.className = 'bg-red-50 rounded-xl p-6';
    }
});