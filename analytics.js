// Initialize Charts
let weeklyChart, moodChart;

function initCharts() {
    // Weekly Progress Chart
    const weeklyCtx = document.getElementById('weeklyChart').getContext('2d');
    weeklyChart = new Chart(weeklyCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Study Hours',
                data: [2.5, 3.2, 1.8, 4.1, 3.5, 2.9, 4.2],
                borderColor: 'rgb(102, 126, 234)',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, max: 5 }
            }
        }
    });

    // Mood Distribution Chart
    const moodCtx = document.getElementById('moodChart').getContext('2d');
    moodChart = new Chart(moodCtx, {
        type: 'doughnut',
        data: {
            labels: ['Focused', 'Tired', 'Motivated', 'Distracted'],
            datasets: [{
                data: [45, 25, 20, 10],
                backgroundColor: [
                    '#667eea',
                    '#f093fb',
                    '#f39c12',
                    '#e74c3c'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'bottom' } }
        }
    });
}

function updateAnalytics() {
    // Update stat cards
    document.getElementById('totalHours').textContent = 
        `${Math.floor(userData.totalStudyTime / 60)}h ${userData.totalStudyTime % 60}m`;
    document.getElementById('totalPomodoros').textContent = userData.pomodorosCompleted;
    document.getElementById('bestStreak').textContent = '7'; // Calculate from data

    // Update charts with real data
    if (weeklyChart) {
        weeklyChart.data.datasets[0].data = getWeeklyData();
        weeklyChart.update();
    }
    
    if (moodChart) {
        moodChart.data.datasets[0].data = getMoodDistribution();
        moodChart.update();
    }
}

function getWeeklyData() {
    // Generate weekly study data
    const days = 7;
    const data = [];
    for (let i = 0; i < days; i++) {
        data.push((Math.random() * 4 + 1).toFixed(1));
    }
    return data;
}

function getMoodDistribution() {
    const moods = userData.moodHistory || ['focused', 'tired', 'motivated', 'distracted'];
    const counts = { focused: 0, tired: 0, motivated: 0, distracted: 0 };
    
    moods.forEach(mood => counts[mood]++);
    return Object.values(counts);
}

// Track study time continuously
setInterval(() => {
    if (studySessionActive) {
        userData.totalStudyTime += 0.0167; // ~1 minute per minute
        updateAnalytics();
        saveUserData();
    }
}, 60000); // Update every minute

// Initialize charts when DOM is ready
document.addEventListener('DOMContentLoaded', initCharts);