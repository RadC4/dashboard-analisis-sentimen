document.addEventListener('DOMContentLoaded', function () {
    // Word Frequency by Sentiment
    var ctx1 = document.getElementById('word-frequency').getContext('2d');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['mk', 'putus', '2024', 'hasil', 'pilpres', 'terima', 'sengketa', 'milu', 'dukung', 'sidang', 'kait', 'prabowogibran', 'presiden', 'jadi', 'semua'],
            datasets: [{
                label: 'Word Frequency',
                data: [1516, 1496, 616, 574, 392, 262, 223, 216, 174, 169, 167, 156, 154, 152, 144],
                backgroundColor: '#FF5733'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Klasisfikasi
    var ctx2 = document.getElementById('review-classification').getContext('2d');
    new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Visualisasi Sentimen TextBlob'],
            datasets: [{
                label: 'Sentimen',
                data: [577, 231, 518],
                backgroundColor: ['#FF5733', '#333333', '#666666']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Bar chart Sentiment
    var ctx3 = document.getElementById('barChart').getContext('2d');
    new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: ['positif', 'negatif', 'netral'],
            datasets: [{
                label: 'Klasifikasi Naive Bayes Classifier',
                data: [524, 149, 653],
                backgroundColor: ['#FF5733', '#333333', '#666666']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Count'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Sentiment'
                    }
                }
            }
        }
    });
    // Total Score by Word
    var ctx4 = document.getElementById('total-score-by-word').getContext('2d');
    new Chart(ctx4, {
        type: 'bar',
        data: {
            labels: ['akurasi'],
            datasets: [{
                label: 'Akurasi Test',
                data: [0.7986425339366516],
                backgroundColor: '#FF5733'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
    document.getElementById('word-cloud').innerHTML = '<p>Visualisasi Cloudwords</p>';

    //table sentiment
    document.getElementById('csvFileInput').addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                complete: function (results) {
                    const data = results.data;
                    const tableBody = document.querySelector('#csv-table tbody');

                    function highlightText(text, searchTerm) {
                        if (!searchTerm) return text;
                        const regex = new RegExp(`(${searchTerm})`, 'gi');
                        return text.replace(regex, '<span class="highlight">$1</span>');
                    }

                    function renderTableRows(data, searchTerm = '') {
                        tableBody.innerHTML = '';
                        data.forEach(row => {
                            const tr = document.createElement('tr');

                            const fullTextTd = document.createElement('td');
                            fullTextTd.innerHTML = highlightText(row.full_text || '', searchTerm);
                            tr.appendChild(fullTextTd);

                            const tweetEnglishTd = document.createElement('td');
                            tweetEnglishTd.innerHTML = highlightText(row.tweet_english || '', searchTerm);
                            tr.appendChild(tweetEnglishTd);

                            const klasifikasiNaiveBayesTd = document.createElement('td');
                            klasifikasiNaiveBayesTd.innerHTML = highlightText(row.klasifikasi_naive_bayes || '', searchTerm);
                            tr.appendChild(klasifikasiNaiveBayesTd);

                            const tanggalTweetTd = document.createElement('td');
                            tanggalTweetTd.innerHTML = highlightText(row.tanggal_tweet || '', searchTerm);
                            tr.appendChild(tanggalTweetTd);

                            tableBody.appendChild(tr);
                        });
                    }

                    renderTableRows(data);

                    // Search Input Handling
                    const searchInput = document.getElementById('search-input');
                    searchInput.addEventListener('input', function (event) {
                        const searchTerm = event.target.value.toLowerCase();
                        const filteredData = data.filter(row => 
                            (row.full_text && row.full_text.toLowerCase().includes(searchTerm)) ||
                            (row.tweet_english && row.tweet_english.toLowerCase().includes(searchTerm)) ||
                            (row.klasifikasi_naive_bayes && row.klasifikasi_naive_bayes.toLowerCase().includes(searchTerm)) ||
                            (row.tanggal_tweet && row.tanggal_tweet.toLowerCase().includes(searchTerm))
                        );
                        renderTableRows(filteredData, searchTerm);
                    });
                }
            });
        }
    });
});