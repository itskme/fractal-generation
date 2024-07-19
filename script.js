const canvas = document.getElementById('fractal-canvas');
const ctx = canvas.getContext('2d');

// Fractal functions
function mandelbrot(x, y, maxIter) {
    let zx = x;
    let zy = y;
    let iter = 0;
    while (zx * zx + zy * zy < 4 && iter < maxIter) {
        let temp = zx * zx - zy * zy + x;
        zy = 2 * zx * zy + y;
        zx = temp;
        iter++;
    }
    return iter;
}

function julia(x, y, maxIter) {
    let zx = x;
    let zy = y;
    let iter = 0;
    while (zx * zx + zy * zy < 4 && iter < maxIter) {
        let temp = zx * zx - zy * zy + 0.285; // Julia set parameters
        zy = 2 * zx * zy + 0.01;
        zx = temp;
        iter++;
    }
    return iter;
}

function sierpinski(x, y, size, depth) {
    if (depth === 0) return;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size, y);
    ctx.lineTo(x + size / 2, y + size * Math.sqrt(3) / 2);
    ctx.closePath();
    ctx.fillStyle = `hsl(${depth * 10}, 100%, 50%)`;
    ctx.fill();
    sierpinski(x, y, size / 2, depth - 1);
    sierpinski(x + size / 2, y, size / 2, depth - 1);
    sierpinski(x + size / 4, y + size * Math.sqrt(3) / 4, size / 2, depth - 1);
}

// Generate fractal patterns
function generateFractal(pattern) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    switch (pattern) {
        case 'mandelbrot':
            for (let x = 0; x < canvas.width; x++) {
                for (let y = 0; y < canvas.height; y++) {
                    let iter = mandelbrot((x - canvas.width / 2) / 200, (y - canvas.height / 2) / 200, 100);
                    ctx.fillStyle = `hsl(${iter * 10}, 100%, 50%)`;
                    ctx.fillRect(x, y, 1, 1);
                }
            }
            break;
        case 'julia':
            for (let x = 0; x < canvas.width; x++) {
                for (let y = 0; y < canvas.height; y++) {
                    let iter = julia((x - canvas.width / 2) / 200, (y - canvas.height / 2) / 200, 100);
                    ctx.fillStyle = `hsl(${iter * 10}, 100%, 50%)`;
                    ctx.fillRect(x, y, 1, 1);
                }
            }
            break;
        case 'sierpinski':
            sierpinski(canvas.width / 2, canvas.height / 2, canvas.width / 2, 8);
            break;
        default:
            console.error(`Unknown pattern: ${pattern}`);
    }
}

// Initialize and generate the first fractal
generateFractal('mandelbrot');

