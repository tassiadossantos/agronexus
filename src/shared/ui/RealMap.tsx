import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Marker {
  lat: number;
  lng: number;
  label: string;
  color?: string;
  popup?: string;
}

interface MapProps {
  center: [number, number];
  zoom?: number;
  markers?: Marker[];
  className?: string;
  height?: string;
}

export function RealMap({ center, zoom = 12, markers = [], className = '', height = '400px' }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center,
      zoom,
      zoomControl: false,
      attributionControl: false,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
    }).addTo(map);

    const style = document.createElement('style');
    style.textContent = `
      .leaflet-popup-content-wrapper {
        background: rgba(15,23,42,0.95) !important;
        border: 1px solid rgba(0,240,255,0.15) !important;
        border-radius: 12px !important;
        box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(0,240,255,0.08) !important;
        backdrop-filter: blur(12px) !important;
        color: #e2e8f0 !important;
      }
      .leaflet-popup-tip {
        background: rgba(15,23,42,0.95) !important;
        border: 1px solid rgba(0,240,255,0.15) !important;
        border-top: none !important;
        border-left: none !important;
      }
      .leaflet-popup-close-button {
        color: #64748b !important;
        font-size: 18px !important;
      }
      .leaflet-popup-close-button:hover {
        color: #00f0ff !important;
      }
      .leaflet-control-zoom a {
        background: rgba(15,23,42,0.9) !important;
        color: #94a3b8 !important;
        border: 1px solid rgba(0,240,255,0.1) !important;
        width: 32px !important;
        height: 32px !important;
        line-height: 32px !important;
        font-size: 14px !important;
        transition: all 0.2s !important;
      }
      .leaflet-control-zoom a:hover {
        background: rgba(0,240,255,0.1) !important;
        color: #00f0ff !important;
        border-color: rgba(0,240,255,0.3) !important;
      }
      .leaflet-control-zoom {
        border: none !important;
        box-shadow: 0 4px 16px rgba(0,0,0,0.3) !important;
        border-radius: 10px !important;
        overflow: hidden !important;
      }
      .leaflet-control-attribution {
        background: rgba(6,9,15,0.7) !important;
        color: #475569 !important;
        font-size: 9px !important;
        border-radius: 4px 0 0 0 !important;
      }
      .leaflet-control-attribution a {
        color: #64748b !important;
      }
    `;
    document.head.appendChild(style);

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapInstance.current) return;

    mapInstance.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) mapInstance.current!.removeLayer(layer);
    });

    markers.forEach((m) => {
      const color = m.color || '#22c55e';
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
          width:28px;height:28px;border-radius:50%;
          background:${color};border:3px solid white;
          box-shadow:0 2px 8px rgba(0,0,0,0.3);
          display:flex;align-items:center;justify-content:center;
          font-size:12px;color:white;font-weight:bold;
        "></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      L.marker([m.lat, m.lng], { icon })
        .addTo(mapInstance.current!)
        .bindPopup(m.popup || m.label);
    });

    if (markers.length === 1) {
      mapInstance.current.setView(center, zoom);
    } else if (markers.length > 1) {
      const bounds = L.latLngBounds(markers.map((m) => [m.lat, m.lng] as [number, number]));
      mapInstance.current.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [markers, center, zoom]);

  useEffect(() => {
    if (mapInstance.current) {
      mapInstance.current.setView(center, zoom);
    }
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      style={{ height, width: '100%' }}
      className={`rounded-2xl overflow-hidden ${className}`}
    />
  );
}
