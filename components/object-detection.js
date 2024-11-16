"use client";

import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { load as cocoSSDload } from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import { renderPrediction } from "@/utils/render-predictions";

const ObjectDetection = () => {
  const webCamRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  let detectInterval;

  const runCoco = async () => {
    setIsLoading(true);
    const net = await cocoSSDload();
    setIsLoading(false);

    detectInterval = setInterval(() => {
      runObjectDetection(net);
    }, 200);
  };

  const runObjectDetection = async (net) => {
    const video = webCamRef.current?.video;
    const canvas = canvasRef.current;

    if (canvas && video?.readyState === 4) {
      const { videoWidth, videoHeight } = video;
      canvas.width = videoWidth;
      canvas.height = videoHeight;
      const context = canvas.getContext("2d");
      const predictions = await net.detect(video);
      context.clearRect(0, 0, canvas.width, canvas.height);
      renderPrediction(predictions, context);
    }
  };

  useEffect(() => {
    runCoco();

    return () => {
      if (detectInterval) {
        clearInterval(detectInterval);
      }
    };
  }, []);

  return (
    <div className="mt-8">
      {isLoading ? (
        <div className="gradient-text">Loading AI Model</div>
      ) : (
        <div className="relative flex justify-center items-center gradient p-0.5 rounded">
          <Webcam
            ref={webCamRef}
            className="lg:h-[450px] rounded-md w-full"
            muted
            mirrored
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 z-10 w-full lg:h-[450px]"
          />
        </div>
      )}
    </div>
  );
};

export default ObjectDetection;
