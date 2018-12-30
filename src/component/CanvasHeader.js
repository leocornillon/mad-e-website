import React from "react";

import Bubble from "../models/Bubble";
import {BUBBLE_NUMBER, HEADER_SIZE} from "../utils/constantes";
import {orange, violet, orangeTransparent, violetTransparent} from "../utils/colors";


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
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight * HEADER_SIZE;

        // Set Canvas size
        this.canvas = this.refs.canvas;
        this.canvas.width = this.innerWidth;
        this.canvas.height = this.innerHeight;

        // Set default canvas style
        this.canvas.style.top = 0;
        this.canvas.style.left = 0;
        this.canvas.style.zIndex = -1;
        this.canvas.style.position = 'absolute';
        this.canvas.style.backgroundColor = violet;

        console.log('Canvas', this.canvas);

        // Get context
        this.ctx = this.canvas.getContext("2d");
    };

    // Initialize the background with a small gradient
    initializeBg = () => {

        // Set the radial gradient
        const radgrad = this.ctx.createRadialGradient(this.innerWidth, this.innerHeight * 2.5, 1, this.innerWidth, this.innerHeight * 2.5, this.innerHeight * 3);
        radgrad.addColorStop(0, orange);
        radgrad.addColorStop(1, violet);


        // Fill the gradient
        this.ctx.fillStyle = radgrad;
        this.ctx.fillRect(0, 0, this.innerWidth, this.innerHeight);
    };

    // Create the bubble list
    initializeBubbleList = () => {

        this.bubbleList = [];
        const vx = Math.random() > 0.5 ? this.getRandomInt(10, 100) / 200 : -this.getRandomInt(10, 100) / 200;
        const vy = Math.random() < 0.5 ? this.getRandomInt(10, 100) / 200 : -this.getRandomInt(10, 100) / 200;

        for(let i = 0; i < BUBBLE_NUMBER; i++){
            const newBubble = new Bubble(
                this.getRandomInt(85, 250),
                this.getRandomInt(0, this.innerWidth),
                this.getRandomInt(0, this.innerHeight),
                vx,
                vy,
                vx,
                vy,
                0.97
            );
            this.bubbleList.push(newBubble);
        }
    };

    drawBubbles = () => {

        this.ctx.save();

        this.bubbleList.forEach((bubble) => {

            // Create radient for the bubble
            const radBubble = this.ctx.createRadialGradient(
                bubble.x - 40,
                bubble.y - 40,
                30,
                bubble.x,
                bubble.y,
                bubble.diameter
            );

            // The center is violet, and the stroke orange
            radBubble.addColorStop(0, violetTransparent);
            radBubble.addColorStop(1, orangeTransparent);

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
        this.ctx.strokeStyle = orangeTransparent;
        this.ctx.beginPath();

        this.bubbleList.forEach((bubble, index) => {
           if(index === 0){
               this.ctx.moveTo(bubble.x, bubble.y);
           } else {
               this.ctx.lineTo(bubble.x, bubble.y);
           }
        });

        this.ctx.stroke();
        this.ctx.restore();
    };

    moveBubbles = () => {
      this.bubbleList.forEach((bubble) => {

          // Move the bubble
          bubble.x += bubble.vx;
          bubble.y += bubble.vy;

          // Change direction on walls
          bubble.vx = (bubble.x >= this.innerWidth - 1 || bubble.x <= 1) ? - bubble.vx : bubble.vx;
          bubble.vy = (bubble.y >= this.innerHeight - 1 || bubble.y <= 1) ? - bubble.vy : bubble.vy;

          // Stop on the wall
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

                // Gettting the equa tion of the line between the position and the center (y = mx + p)
                const m = (event.y - bubble.y) / (event.x - bubble.y);
                const p = bubble.y - m * bubble.x;

                // Getting the coordinates of the point on the circle
                const A = Math.pow(m,2) + 1;
                const B = 2*m*p - 2*m*bubble.y - 2*bubble.x;
                const C = Math.pow(p,2) + Math.pow(bubble.x,2) + Math.pow(bubble.y,2) - 2*p*bubble.y - Math.pow(bubble.diameter, 2);
                const xCircle1 = (-B + Math.sqrt(Math.pow(B, 2) - 4*A*C)) / 2*A;
                const xCircle2 = (-B - Math.sqrt(Math.pow(B, 2) - 4*A*C)) / 2*A;
                const yCircle1 = m*xCircle1 + p;
                const yCircle2 = m*xCircle2 + p;

                // Getting the correct point on the circle and the associate momentum
                const length = Math.sqrt(Math.pow(xCircle1 - event.x, 2) + Math.pow(yCircle1 - event.y, 2));
                let momentumX, momentumY;
                if(length > bubble.diameter) {
                    momentumX = xCircle1 - event.x;
                    momentumY = yCircle1 - event.y;
                } else {
                    momentumX = xCircle2 - event.x;
                    momentumY = yCircle2 - event.y;
                }

                // Add the momentum at the bubble
                bubble.vx += (momentumX / (3*bubble.diameter));
                bubble.vy += (momentumY / (3*bubble.diameter));
            }
        });

    };

    renderFrame = () => {

        // Clear the layout
        this.ctx.fillRect(0,0, this.innerWidth, this.innerHeight);

        // Draw the Background
        this.initializeBg();

        // Draw lines
        this.drawLines();

        // Draw bubbles
        this.drawBubbles();

        //Compute new bubbles position
        this.moveBubbles();

        window.requestAnimationFrame(this.renderFrame);
    };

    render() {
        return <canvas ref="canvas" />;
    }
}