
function getDirections() {
    window.open('https://maps.app.goo.gl/pyvW19VEdimNmBQ56', '_blank');
}

// Tab switching
document.getElementById('homeTab').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('gallery').style.display = 'none';
    document.getElementById('hero').style.display = 'block';
    document.getElementById('about').style.display = 'block';
    document.getElementById('mechanics').style.display = 'block';
    document.getElementById('contact').style.display = 'block';
    this.classList.add('active');
    document.getElementById('galleryTab').classList.remove('active');
});

document.getElementById('galleryTab').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('gallery').style.display = 'block';
    document.getElementById('hero').style.display = 'none';
    document.getElementById('about').style.display = 'none';
    document.getElementById('mechanics').style.display = 'none';
    document.getElementById('contact').style.display = 'none';
    this.classList.add('active');
    document.getElementById('homeTab').classList.remove('active');
});

// Upload button triggers hidden file input click
document.getElementById('uploadBtn').addEventListener('click', function() {
    document.getElementById('fileInput').click();
});

// File upload handler
document.getElementById('fileInput').addEventListener('change', function(e) {
    var files = e.target.files;
    if (files.length === 0) return;

    var spinner = document.querySelector('.spinner');
    spinner.style.opacity = '1';

    var uploadStatus = document.getElementById('uploadStatus');
    var galleryContainer = document.getElementById('galleryContainer');
    var uploadedCount = 0;

    // Clear previous status
    uploadStatus.textContent = '';

    var processFile = function(file) {
        return new Promise(function(resolve, reject) {
            if (file.type.startsWith('image/')) {
                var reader = new FileReader();
                reader.onload = function(event) {
                    var newItem = document.createElement('div');
                    newItem.className = 'gallery-item';
                    newItem.innerHTML = '<img src="' + event.target.result + '" alt="Uploaded image" />';
                    galleryContainer.prepend(newItem);
                    resolve();
                };
                reader.onerror = function() {
                    reject(new Error('Failed to read file: ' + file.name));
                };
                reader.readAsDataURL(file);
            } else {
                // Skip non-image files
                resolve();
            }
        });
    };

    // Process files sequentially to avoid race conditions
    var processAll = async function() {
        try {
            for (var i = 0; i < files.length; i++) {
                await processFile(files[i]);
                uploadedCount++;
            }
            uploadStatus.textContent = 'Successfully uploaded ' + uploadedCount + ' file(s)';
        } catch (error) {
            uploadStatus.textContent = 'Upload failed: ' + error.message;
        } finally {
            spinner.style.opacity = '0';
            document.getElementById('fileInput').value = '';
        }
    };

    processAll();
});

// Floating contacts toggle
function toggleContacts(person) {
    var options = document.getElementById(person + '-options');
    var isVisible = window.getComputedStyle(options).display === 'flex';
    var allOptions = document.querySelectorAll('.contact-options');
    allOptions.forEach(function(opt) {
        opt.style.display = 'none';
    });
    options.style.display = isVisible ? 'none' : 'flex';
}

