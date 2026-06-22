import 'cropperjs/dist/cropper.min.css';

let cropper = null;
let croppedDataURL = null;

const imageInput = document.getElementById('imageInput');
const image = document.getElementById('image');
const fileInfo = document.getElementById('fileInfo');
const cropBtn = document.getElementById('cropBtn');
const downloadBtn = document.getElementById('downloadBtn');
const resultSection = document.getElementById('resultSection');
const resultImage = document.getElementById('resultImage');

imageInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 300 * 1024) {
        alert('Размер файла превышает 300 КБ. Пожалуйста, выберите другое изображение.');
        this.value = '';
        return;
    }

    fileInfo.textContent = `📁 ${file.name} (${(file.size / 1024).toFixed(1)} КБ)`;

    const reader = new FileReader();
    reader.onload = function (event) {
        const src = event.target.result;
        image.src = src;

        if (cropper) {
            cropper.destroy();
            cropper = null;
        }

        image.onload = function () {
            cropper = new Cropper(image, {
                aspectRatio: NaN,
                viewMode: 1,
                dragMode: 'crop',
                autoCropArea: 0.8,
                cropBoxMovable: true,
                cropBoxResizable: true,
                background: false,
                responsive: true,
                checkOrientation: false,
            });

            cropBtn.disabled = false;
            downloadBtn.disabled = true;
            resultSection.style.display = 'none';
        };

        if (image.complete) {
            image.onload();
        }
    };

    reader.readAsDataURL(file);
});

cropBtn.addEventListener('click', function () {
    if (!cropper) return;

    croppedDataURL = cropper.getCroppedCanvas({
        width: 300,
        height: 300,
        imageSmoothingQuality: 'high',
    }).toDataURL('image/png');

    resultImage.src = croppedDataURL;
    resultSection.style.display = 'block';
    downloadBtn.disabled = false;
});

downloadBtn.addEventListener('click', function () {
    if (!croppedDataURL) return;

    const link = document.createElement('a');
    link.download = `cropped-image-${Date.now()}.png`;
    link.href = croppedDataURL;
    link.click();
});

cropBtn.disabled = true;
downloadBtn.disabled = true;
resultSection.style.display = 'none';
