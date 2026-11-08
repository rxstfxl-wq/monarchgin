import React from 'react';

export interface ModelViewerElement extends HTMLElement {
  src: string;
  autoRotate: boolean;
  cameraOrbit: string;
  cameraTarget: string;
  fieldOfView: string;
  model?: {
    materials: Array<{
      name: string;
      pbrMetallicRoughness: {
        baseColorFactor: number[];
        baseColorTexture?: {
          setTexture: (texture: any) => void;
        };
      };
    }>;
  };
  createTexture: (url: string) => Promise<any>;
  dismissPoster?: () => void;
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          id?: string;
          src?: string;
          alt?: string;
          'camera-controls'?: boolean | string;
          'touch-action'?: string;
          'auto-rotate'?: boolean | string;
          'auto-rotate-delay'?: string | number;
          'rotation-per-second'?: string;
          'camera-orbit'?: string;
          'camera-target'?: string;
          'field-of-view'?: string;
          'shadow-intensity'?: string | number;
          'shadow-softness'?: string | number;
          exposure?: string | number;
          'tone-mapping'?: string;
          ar?: boolean | string;
          'ar-modes'?: string;
          poster?: string;
          loading?: 'auto' | 'lazy' | 'eager';
          reveal?: 'auto' | 'interaction' | 'manual';
          style?: React.CSSProperties;
          ref?: React.Ref<any>;
        },
        HTMLElement
      >;
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}
