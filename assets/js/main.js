let isFirstCall = true;
setRoomLines()
document.addEventListener('mousemove', setRoomLines);
document.addEventListener('resize', setRoomLines);


function setRoomLines(){

    let container = document.querySelector(".content");
    const lineOverlay = document.getElementById('lineOverlay');
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    let newX, newY;
    if (isFirstCall) {
        newX = (vw - containerWidth) / 5*2;
        newY = (vh - containerHeight) / 5*2;
        isFirstCall = false; // Update flag
    } else {
        newX = (event.clientX / vw) * (vw - containerWidth);
        newY = (event.clientY / vh) * (vh - containerHeight);
    }

    container.style.left = `${newX}px`;
    container.style.top = `${newY}px`;

    // Clear previous lines
    lineOverlay.innerHTML = '';

    // Calculate corners of the container
    const corners = [
        { x: newX, y: newY }, // Top-left
        { x: newX + containerWidth, y: newY }, // Top-right
        { x: newX, y: newY + containerHeight }, // Bottom-left
        { x: newX + containerWidth, y: newY + containerHeight } // Bottom-right
    ];

    // Viewport corners
    const viewportCorners = [
        { x: 0, y: 0 }, // Top-left
        { x: vw, y: 0 }, // Top-right
        { x: 0, y: vh }, // Bottom-left
        { x: vw, y: vh } // Bottom-right
    ];

    // Draw lines from container corners to viewport corners
    corners.forEach((corner, index) => {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', corner.x);
        line.setAttribute('y1', corner.y);
        line.setAttribute('x2', viewportCorners[index].x);
        line.setAttribute('y2', viewportCorners[index].y);
        line.setAttribute('stroke', '#757300');
        line.setAttribute('stroke-width', '1');
        lineOverlay.appendChild(line);
    });
}
