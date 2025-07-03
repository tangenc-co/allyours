"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface CurvedSliderProps {
  className?: string;
  options?: {
    speed?: number;
    gap?: number;
    curve?: number;
    direction?: number;
  };
  images: string[];
  minHeight?: string | number;
}

const CurvedSlider: React.FC<CurvedSliderProps> = ({
  className = "mdw-curved-slider",
  options = { speed: 30, gap: 10, curve: 12, direction: -1 },
  images,
  minHeight = "100vh",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scene = useRef<THREE.Scene | null>(null);
  const camera = useRef<THREE.PerspectiveCamera | null>(null);
  const renderer = useRef<THREE.WebGLRenderer | null>(null);
  const planes = useRef<THREE.Mesh[]>([]);
  const animationId = useRef<number | null>(null);
  const offset = useRef(0);

  // Drag control refs
  const isDragging = useRef(false);
  const dragLastX = useRef(0);
  const dragVelocity = useRef(0);

  const getWidth = (gap: number) => 1 + gap / 100;

  const getPlaneWidth = (el: HTMLElement, cam: THREE.PerspectiveCamera) => {
    const vFov = (cam.fov * Math.PI) / 180;
    const height = 2 * Math.tan(vFov / 2) * cam.position.z;
    const aspect = el.clientWidth / el.clientHeight;
    const width = height * aspect;
    return el.clientWidth / width;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;

    scene.current = new THREE.Scene();

    // Setup Camera
    const cam = new THREE.PerspectiveCamera(
      75,
      el.clientWidth / el.clientHeight,
      0.1,
      20
    );
    cam.position.z = 2;
    camera.current = cam;

    // Setup Renderer
    const rend = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    rend.setSize(el.clientWidth, el.clientHeight);
    rend.setPixelRatio(window.devicePixelRatio);
    renderer.current = rend;

    while (el.firstChild) el.removeChild(el.firstChild);
    el.appendChild(rend.domElement);

    // Geometry with reduced height (0.6)
    const geometry = new THREE.PlaneGeometry(1, 0.58, 20, 20);

    // Calculate plane spacing and image tiling
    const planeSpace = getPlaneWidth(el, cam) * getWidth(options.gap ?? 10);

    // Number of times images repeat to fill width plus some extra
    const totalImageCount =
      Math.ceil(el.clientWidth / planeSpace) + 1 + images.length;

    const initialOffset = Math.ceil(el.clientWidth / (2 * planeSpace) - 0.5);

    // Prepare image list with repetition for seamless loop
    const allImages = [...images];
    for (let i = images.length; i < totalImageCount; i++) {
      allImages.push(images[i % images.length]);
    }

    planes.current = [];

    // Load textures and create planes
    allImages.forEach((imgSrc, i) => {
      const loader = new THREE.TextureLoader();
      loader.load(imgSrc, (texture: THREE.Texture) => {
        const material = new THREE.ShaderMaterial({
          uniforms: {
            tex: { value: texture },
            curve: { value: options.curve ?? 12 },
          },
          vertexShader: `
            uniform float curve;
            varying vec2 vertexUV;
            void main(){
                vertexUV = uv;
                vec3 newPosition = position;
                float distanceFromCenter = abs(modelMatrix * vec4(position, 1.0)).x;
                newPosition.y *= 1.0 + (curve/100.0)*pow(distanceFromCenter,2.0);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
            }
          `,
          fragmentShader: `
            uniform sampler2D tex;
            varying vec2 vertexUV;
            void main(){
                gl_FragColor = texture2D(tex, vertexUV);
            }
          `,
        });

        const plane = new THREE.Mesh(geometry, material);
        // Initially position planes (will be updated in animate)
        planes.current[i] = plane;
        scene.current?.add(plane);
      });
    });

    // Pointer (mouse/touch) event handlers for drag control
    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      dragLastX.current = e.clientX;
      dragVelocity.current = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - dragLastX.current;
      dragLastX.current = e.clientX;

      offset.current -= deltaX * 0.01; // sensitivity tweak here
      dragVelocity.current = deltaX;
    };

    const onPointerUp = () => {
      isDragging.current = false;
    };

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    let previousTime = 0;
    const AUTO_SCROLL_SPEED = options.speed ?? 30;
    const DRAG_DECAY = 0.95;

    const totalWidth = getWidth(options.gap ?? 10) * images.length;

    // Animation Loop
    const animate = (currentTime: number) => {
      if (!scene.current || !renderer.current || !camera.current) return;

      const timePassed = currentTime - previousTime;

      if (!isDragging.current) {
        offset.current +=
          (options.direction ?? -1) * timePassed * 0.00001 * AUTO_SCROLL_SPEED;

        dragVelocity.current *= DRAG_DECAY;
        offset.current -= dragVelocity.current * 0.05;
      }

      // Wrap offset to keep it between 0 and totalWidth
      offset.current %= totalWidth;
      if (offset.current < 0) offset.current += totalWidth;

      // Update each plane position to loop seamlessly
      planes.current.forEach((plane, i) => {
        if (!plane) return;
        const basePosition = (i - initialOffset) * getWidth(options.gap ?? 10);
        let x = (basePosition + offset.current) % totalWidth;
        if (x < 0) x += totalWidth;

        // Center around zero
        x -= totalWidth / 2;
        plane.position.x = x;
      });

      renderer.current.render(scene.current, camera.current);
      previousTime = currentTime;
      animationId.current = requestAnimationFrame(animate);
    };

    animationId.current = requestAnimationFrame(animate);

    // Handle resizing
    const onResize = () => {
      if (!containerRef.current || !camera.current || !renderer.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.current.aspect = width / height;
      camera.current.updateProjectionMatrix();

      renderer.current.setSize(width, height);
    };

    window.addEventListener("resize", onResize);

    // Cleanup on unmount
    return () => {
      if (animationId.current) cancelAnimationFrame(animationId.current);
      window.removeEventListener("resize", onResize);

      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);

      planes.current.forEach((plane) => {
        if (plane.material instanceof THREE.ShaderMaterial) {
          plane.material.dispose();
          if (plane.material.uniforms.tex.value)
            (plane.material.uniforms.tex.value as THREE.Texture).dispose();
        }
        plane.geometry.dispose();
        scene.current?.remove(plane);
      });
      renderer.current?.dispose();
      if (containerRef.current) {
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
      }
    };
  }, [images, options]);

  return (
    <>
      <style jsx>{`
        .${className} {
          position: relative;
          height: ${typeof minHeight === "number" ? `${minHeight}px` : minHeight};
          overflow: hidden;
          width: 100%;
          touch-action: pan-y;
          user-select: none;
        }
        .${className} canvas {
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
      `}</style>
      <div ref={containerRef} className={className} />
    </>
  );
};

export default CurvedSlider;
