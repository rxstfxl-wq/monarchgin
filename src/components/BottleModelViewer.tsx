import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface BottleModelViewerProps {
  productId?: string;
  productName: string;
  expression: string;
  fallbackImage: string;
  defaultModelUrl?: string;
}

export const BottleModelViewer: React.FC<BottleModelViewerProps> = ({
  fallbackImage,
  defaultModelUrl = '/Media/bottle.fbx',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animationFrameId: number;
    let isDisposed = false;

    // 1. Scene & Renderer setup
    const scene = new THREE.Scene();

    const width = container.clientWidth || 460;
    const height = 520;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(0, 0.15, 3.2);

    // 3. Orbit Controls
    const controls = new OrbitControls(camera, canvas);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.8;
    controls.minDistance = 1.3;
    controls.maxDistance = 5.0;
    controls.maxPolarAngle = Math.PI / 2 + 0.08; // Allow viewing slightly from below
    controls.target.set(0, 0, 0);

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff7ec, 1.4);
    scene.add(ambientLight);

    // Key Light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(3, 4, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    // Fill Light (soft cool botanical fill)
    const fillLight = new THREE.DirectionalLight(0xecf3f7, 1.2);
    fillLight.position.set(-3, 2, 2);
    scene.add(fillLight);

    // Rim Light (sharp glass edge definition)
    const rimLight = new THREE.DirectionalLight(0xfff1dc, 2.6);
    rimLight.position.set(0, 3, -3);
    scene.add(rimLight);

    // Bottom Bounce Light
    const bounceLight = new THREE.DirectionalLight(0xe1c9b0, 0.8);
    bounceLight.position.set(0, -3, 0);
    scene.add(bounceLight);

    // Soft Contact Shadow Plane underneath bottle
    const shadowGeo = new THREE.PlaneGeometry(1.6, 1.6);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const ctx = shadowCanvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, 'rgba(38, 38, 33, 0.35)');
      gradient.addColorStop(0.5, 'rgba(38, 38, 33, 0.12)');
      gradient.addColorStop(1, 'rgba(38, 38, 33, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.96;
    scene.add(shadowMesh);

    // 5. Texture Loader for Label
    const textureLoader = new THREE.TextureLoader();
    let labelTexture: THREE.Texture | null = null;
    textureLoader.load(
      '/Media/Classic.jpg',
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
        labelTexture = tex;
      },
      undefined,
      (err) => console.warn('Label texture load note:', err)
    );

    // 6. Loading Manager & FBX Loader
    const manager = new THREE.LoadingManager();
    manager.setURLModifier((url) => {
      if (url.includes('Classic.jpg')) return '/Media/Classic.jpg';
      return url;
    });
    manager.onError = (url) => {
      console.warn('Non-fatal texture warning:', url);
    };

    const fbxLoader = new FBXLoader(manager);
    fbxLoader.setResourcePath('/Media/');

    const targetUrl = defaultModelUrl || '/Media/bottle.fbx';

    fbxLoader.load(
      targetUrl,
      (fbx) => {
        if (isDisposed) return;

        // Auto-center & normalize scale
        const box = new THREE.Box3().setFromObject(fbx);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const scale = 1.9 / maxDim;

        fbx.scale.multiplyScalar(scale);
        fbx.position.sub(center.clone().multiplyScalar(scale));
        fbx.position.y += 0.02; // Fine tune ground alignment

        // Apply high-end PBR materials to FBX meshes
        fbx.traverse((child: any) => {
          if (!child.isMesh) return;

          child.castShadow = true;
          child.receiveShadow = true;

          const meshName = (child.name || '').toLowerCase();
          const matName = (child.material?.name || '').toLowerCase();

          // Glass Bottle Body
          if (meshName.includes('bottle') || matName.includes('bottle') || matName.includes('glass')) {
            child.material = new THREE.MeshPhysicalMaterial({
              name: 'CrystalGlassBottle',
              color: new THREE.Color(0xffffff),
              transmission: 0.94,
              opacity: 1,
              transparent: true,
              roughness: 0.03,
              ior: 1.52,
              thickness: 0.08,
              specularIntensity: 1.0,
              specularColor: new THREE.Color(0xffffff),
            });
          }
          // Glass Stopper Cap
          else if (meshName.includes('stopper') || meshName.includes('cap')) {
            child.material = new THREE.MeshPhysicalMaterial({
              name: 'CutGlassStopper',
              color: new THREE.Color(0xfcfcfc),
              transmission: 0.96,
              opacity: 1,
              transparent: true,
              roughness: 0.02,
              ior: 1.54,
              thickness: 0.1,
              specularIntensity: 1.2,
            });
          }
          // Paper Label
          else {
            child.material = new THREE.MeshStandardMaterial({
              name: 'CottonPaperLabel',
              color: new THREE.Color(0xffffff),
              map: labelTexture || child.material?.map || null,
              roughness: 0.72,
              metalness: 0.04,
              side: THREE.DoubleSide,
            });
          }
        });

        scene.add(fbx);
        setIsLoading(false);
      },
      undefined,
      (err) => {
        console.error('FBX Load error:', err);
        if (!isDisposed) {
          setIsLoading(false);
          setLoadError('Could not load bottle.fbx');
        }
      }
    );

    // 7. Responsive Resizing
    const handleResize = () => {
      if (!container || !canvas) return;
      const newWidth = container.clientWidth;
      camera.aspect = newWidth / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 8. Animation loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      controls.dispose();
      renderer.dispose();
    };
  }, [defaultModelUrl]);

  const toggleAutoRotate = () => {
    if (controlsRef.current) {
      const next = !isRotating;
      controlsRef.current.autoRotate = next;
      setIsRotating(next);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* 3D Bottle Canvas Container */}
      <div
        ref={containerRef}
        className="relative w-full rounded-2xl overflow-hidden shadow-[0_20px_45px_rgba(38,38,33,0.18)] border border-[#262621]/15"
        style={{
          height: '520px',
          background: 'radial-gradient(circle, #f6efe6 0%, #dfd0be 100%)',
        }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full block cursor-grab active:cursor-grabbing"
          style={{ width: '100%', height: '520px' }}
        />

        {/* Minimalist Top Badges: 3D Indicator & Auto-Rotate Toggle */}
        <div className="absolute top-3 left-3 flex items-center gap-2 z-10 pointer-events-auto">
          <span className="px-2.5 py-1 text-[10px] uppercase font-sans tracking-[0.2em] font-medium bg-[#262621]/85 text-[#E1C9B0] backdrop-blur-md rounded-sm flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#AD6230] animate-pulse" />
            3D Interactive
          </span>

          <button
            type="button"
            onClick={toggleAutoRotate}
            title={isRotating ? 'Pause rotation' : 'Resume rotation'}
            className={`px-2.5 py-1 text-[10px] uppercase font-sans tracking-widest backdrop-blur-md transition-colors rounded-sm border ${
              isRotating
                ? 'bg-[#646A48] text-[#E1C9B0] border-[#646A48]'
                : 'bg-[#F6EDE3]/90 text-[#262621] border-[#262621]/20 hover:bg-[#F6EDE3]'
            }`}
          >
            {isRotating ? '⟳ Rotating' : '▶ Spin'}
          </button>
        </div>

        {/* Subtle Gesture Hint Overlay */}
        <div className="absolute top-3 right-3 z-10 pointer-events-none">
          <span className="px-2 py-1 text-[9px] uppercase font-sans tracking-[0.16em] bg-[#262621]/60 text-[#E1C9B0] backdrop-blur-sm rounded-sm">
            Drag to Orbit · Scroll to Zoom
          </span>
        </div>

        {/* Minimalist Loading Indicator */}
        {isLoading && (
          <div className="absolute inset-0 bg-[#F6EDE3]/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-20">
            <div className="w-8 h-8 border-2 border-[#646A48] border-t-transparent rounded-full animate-spin mb-3" />
            <div className="text-xs font-serif uppercase tracking-widest text-[#262621]">
              Rendering 3D Bottle…
            </div>
          </div>
        )}

        {/* Fallback if load fails */}
        {loadError && !isLoading && (
          <div className="absolute inset-0 bg-[#F6EDE3]/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20">
            <div className="max-w-xs space-y-3">
              <div className="w-24 h-36 mx-auto relative opacity-90">
                <img
                  src={fallbackImage}
                  alt="Bottle preview"
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              </div>
              <div className="text-xs font-serif uppercase tracking-widest text-[#262621] font-semibold">
                Studio Bottle View
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
