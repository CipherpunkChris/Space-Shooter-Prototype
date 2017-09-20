function colorRect(x, y, width, height, color)
{
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawText(text, x, y, font, color)
{
    context.font = font;
    context.fillStyle = color;
    context.fillText(text, x, y);
}

function colorCircle(x, y, radius, color)
{
    context.beginPath();
    context.fillStyle = color;
    context.arc(x, y, radius, 0, Math.PI*2);
    context.fill();
}
