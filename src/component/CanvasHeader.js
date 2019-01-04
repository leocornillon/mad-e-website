import React from "react";

import Bubble from "../models/Bubble";
import {BUBBLE_NUMBER, HEADER_SIZE} from "../utils/constantes";
import {
    PRIMARY_COLOR,
    SECONDARY_COLOR,
    PRIMARY_BUBBLE_GRADIENT_COLOR,
    SECONDARY_BUBBLE_GRADIENT_COLOR
} from "../utils/colors";


export default class CanvasHeader extends React.Component {

    canvas;
    ctx;
    innerWidth;
    innerHeight;
    bubbleList;

    getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    componentDidMount() {

        // First initialization
        this.initializeCanvas();
        this.initializeBubbleList();

        // Set a listener on the mouse to move bubbles
        this.canvas.addEventListener("mousemove", this.mouseListener);

        // Set the window listener
        window.addEventListener("resize", () => {
            this.initializeCanvas();
            this.initializeBg();
            this.drawLines();
            this.drawBubbles();
        });

        // Start the bubbles animation
        window.requestAnimationFrame(this.renderFrame);
    }

    // Initialize the canvas with default values
    initializeCanvas = () => {
        // Set variables
        this.innerWidth = document.documentElement.clientWidth;
        this.innerHeight = document.documentElement.clientHeight * HEADER_SIZE;

        // Set Canvas size
        this.canvas = this.refs.canvas;
        this.canvas.width = this.innerWidth;
        this.canvas.height = this.innerHeight;

        // Set default canvas style
        this.canvas.style.top = 0;
        this.canvas.style.left = 0;
        this.canvas.style.position = 'absolute';
        //this.canvas.style.backgroundImage = `radial-gradient(${SECONDARY_COLOR}, ${PRIMARY_COLOR})`;

        // Get context
        this.ctx = this.canvas.getContext("2d");
    };

    // Initialize the background with a small gradient
    initializeBg = () => {

        // Set the radial gradient
        const radgrad = this.ctx.createRadialGradient(this.innerWidth, this.innerHeight * 2.5, 1, this.innerWidth, this.innerHeight * 2.5, this.innerHeight * 3);
        radgrad.addColorStop(0, SECONDARY_COLOR);
        radgrad.addColorStop(0.8, PRIMARY_COLOR);
        radgrad.addColorStop(1, PRIMARY_COLOR);


        // Fill the gradient
        this.ctx.fillStyle = radgrad;
        this.ctx.fillRect(0, 0, this.innerWidth, this.innerHeight);
    };

    // Create the bubble list
    initializeBubbleList = () => {

        this.bubbleList = [];

        for(let i = 0; i < BUBBLE_NUMBER; i++){
            const vx = this.getRandomInt(1,100) > 50 ? this.getRandomInt(10, 70) / 300 : -this.getRandomInt(10, 70) / 300;
            const vy = this.getRandomInt(1,100) > 50 ? this.getRandomInt(10, 70) / 300 : -this.getRandomInt(10, 70) / 300;
            const newBubble = new Bubble(
                this.getRandomInt(85, 250),
                this.getRandomInt(0, this.innerWidth),
                this.getRandomInt(0, this.innerHeight),
                vx,
                vy,
                vx,
                vy,
                this.getRandomInt(1,360),
                0.97
            );
            this.bubbleList.push(newBubble);
        }
    };

    drawBubbles = () => {

        this.ctx.save();
        this.ctx.globalCompositeOperation = 'overlay';

        this.bubbleList.forEach((bubble) => {

            // Create radient for the bubble
            const radBubble = this.ctx.createRadialGradient(
                bubble.x + (bubble.diameter / 2) * Math.cos(bubble.gradientAngle),
                bubble.y + (bubble.diameter / 2) * Math.sin(bubble.gradientAngle),
                1,
                bubble.x + (bubble.diameter / 2) * Math.cos(bubble.gradientAngle),
                bubble.y + (bubble.diameter / 2) * Math.sin(bubble.gradientAngle),
                bubble.diameter
            );

            // The center is violet, and the stroke orange
            radBubble.addColorStop(0, SECONDARY_BUBBLE_GRADIENT_COLOR);
            radBubble.addColorStop(1, PRIMARY_BUBBLE_GRADIENT_COLOR);

            // Render the bubble
            this.ctx.fillStyle = radBubble;

            this.ctx.beginPath();
            this.ctx.arc(bubble.x, bubble.y, bubble.diameter, 0, Math.PI * 2, true);
            this.ctx.fill();
        });

        this.ctx.restore();

    };

    drawLines = () => {

        this.ctx.save();
        this.ctx.globalCompositeOperation = 'lighten';

        this.bubbleList.forEach((bubble, index) => {

            // Get the previous bubble
            const oldBubble = index === 0 ? bubble : this.bubbleList[index - 1];

            //Create the gradient
            const linearGradient = this.ctx.createLinearGradient(oldBubble.x, oldBubble.y, bubble.x, bubble.y);
            linearGradient.addColorStop(0, SECONDARY_BUBBLE_GRADIENT_COLOR);
            linearGradient.addColorStop(0.5, PRIMARY_BUBBLE_GRADIENT_COLOR);
            linearGradient.addColorStop(1, SECONDARY_BUBBLE_GRADIENT_COLOR);
            this.ctx.strokeStyle = linearGradient;

            this.ctx.beginPath();
            this.ctx.moveTo(oldBubble.x, oldBubble.y);
            this.ctx.lineTo(bubble.x, bubble.y);
            this.ctx.stroke();

        });

        this.ctx.restore();
    };

    drawText = () => {

        this.ctx.save();
        this.ctx.fillStyle = 'white';

        const x = this.innerWidth > 1200 ? (this.innerWidth - 1200) / 2 : 20;

        this.ctx.font = "bold 48px 'Sarabun'";
        let txt = this.ctx.measureText('Mad ');
        this.ctx.fillText('Mad ', x, this.innerHeight * 0.15);

        this.ctx.font = "italic 48px 'Sarabun";
        this.ctx.fillText('(e)', x + txt.width, this.innerHeight * 0.15);

        this.ctx.font = "43px 'Sarabun'";
        txt = this.ctx.measureText('La ');
        this.ctx.fillText('La ', x, this.innerHeight * 0.45);

        this.ctx.font = "italic bold 43px 'Sarabun'";
        this.ctx.fillText('folle ', x + txt.width, this.innerHeight * 0.45);
        txt = this.ctx.measureText('folle       ');

        this.ctx.font = "43px 'Sarabun'";
        this.ctx.fillText('manufacture qui traduit', x + txt.width, this.innerHeight * 0.45);

        this.ctx.fillText('vos idées en image', x, this.innerHeight * 0.45 + 60);

        this.ctx.restore();

    };

    moveBubbles = () => {
      this.bubbleList.forEach((bubble) => {

          // Move the bubble
          bubble.x += bubble.vx;
          bubble.y += bubble.vy;

          // Bounce on walls
          bubble.vx = (bubble.x >= this.innerWidth - 1 || bubble.x <= 1) ? - bubble.vx : bubble.vx;
          bubble.vy = (bubble.y >= this.innerHeight - 1 || bubble.y <= 1) ? - bubble.vy : bubble.vy;

          // Avoid teleporting behind the wall ang getting stuck
          if(bubble.x > this.innerWidth - 1) bubble.x = this.innerWidth - 2;
          if(bubble.x < 1) bubble.x = 2;
          if(bubble.y > this.innerHeight - 1) bubble.y = this.innerHeight - 2;
          if(bubble.y < 1) bubble.y = 2;

          // Deccelarate the bubble, but no more than original speed
          bubble.vx = Math.abs(bubble.vx) <= Math.abs(bubble.vxOriginal) ? bubble.vx : bubble.vx * bubble.friction;
          bubble.vy = Math.abs(bubble.vy) <= Math.abs(bubble.vyOriginal) ? bubble.vy : bubble.vy * bubble.friction;

      })
    };

    mouseListener = (event) => {

        this.bubbleList.forEach((bubble) => {

            // Compute the distance between the cursor and the center of the bubble
            const position = Math.sqrt( Math.pow(event.x - bubble.x, 2) + Math.pow(event.y - bubble.y, 2) );

            // If the distance is less than the diameter, we are in the bubble
            if(position < bubble.diameter) {

                // Gettting the equation of the line between the position and the center (y = mx + p)
                const m = (event.y - bubble.y) / (event.x - bubble.y);
                const p = bubble.y - m * bubble.x;

                // Getting the coordinates of the intersections between the previous line and the bubble
                const A = Math.pow(m,2) + 1;
                const B = 2*m*p - 2*m*bubble.y - 2*bubble.x;
                const C = Math.pow(p,2) + Math.pow(bubble.x,2) + Math.pow(bubble.y,2) - 2*p*bubble.y - Math.pow(bubble.diameter, 2);
                const xCircle1 = (-B + Math.sqrt(Math.pow(B, 2) - 4*A*C)) / 2*A;
                const xCircle2 = (-B - Math.sqrt(Math.pow(B, 2) - 4*A*C)) / 2*A;
                const yCircle1 = m*xCircle1 + p;
                const yCircle2 = m*xCircle2 + p;

                // Getting the correct intersection on the bubble and the associate momentum
                const length1 = Math.sqrt(Math.pow(xCircle1 - event.x, 2) + Math.pow(yCircle1 - event.y, 2));
                const length2 = Math.sqrt(Math.pow(xCircle2 - event.x, 2) + Math.pow(yCircle2 - event.y, 2));
                const xCircle = length1 > length2 ? xCircle1 : xCircle2;
                const yCircle = length1 > length2 ? yCircle1 : yCircle2;
                let momentumX = xCircle - event.x;
                let momentumY = yCircle - event.y;

                // Check if the momentum is not somehow incoherent
                if(momentumX > 0 && momentumX > 500) momentumX = 100;
                if(momentumX < 0 && momentumX < -500) momentumX = -100;
                if(momentumY > 0 && momentumY > 500) momentumY = 100;
                if(momentumY < 0 && momentumY < -500) momentumY = -100;

                // Add the momentum to the bubble
                bubble.vx += (momentumX / (3 * bubble.diameter));
                bubble.vy += (momentumY / (3 * bubble.diameter));
            }
        });

    };

    renderFrame = () => {

        // Clear the layout
        this.ctx.clearRect(0,0, this.innerWidth, this.innerHeight);

        // Draw the Background
        this.initializeBg();

        // Draw bubbles
        this.drawBubbles();

        // Draw lines
        this.drawLines();

        // Draw text
        this.drawText();

        //Compute new bubbles position
        this.moveBubbles();

        window.requestAnimationFrame(this.renderFrame);
    };

    render() {
        return <canvas ref="canvas" />;
    }
}