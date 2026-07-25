import { useCallback, useRef, useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';

interface Props {
  onUpload: (file: File) => void;
  isAnalyzing: boolean;
}

export function ImageUploader({ onUpload, isAnalyzing }: Props) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  }, [handleFile]);

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        className={`
          relative cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300
          ${dragActive ? 'border-[#00f0ff] bg-[rgba(0,240,255,0.05)] scale-[1.01]' : 'border-[rgba(255,255,255,0.08)] hover:border-[rgba(0,240,255,0.3)] hover:bg-[rgba(255,255,255,0.02)]'}
          ${preview ? 'border-[rgba(0,240,255,0.2)]' : ''}
        `}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />

        {preview ? (
          <div className="space-y-3">
            <div className="relative w-full max-w-sm mx-auto aspect-video rounded-xl overflow-hidden border border-[rgba(255,255,255,0.06)]">
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              <button
                onClick={(e) => { e.stopPropagation(); setPreview(null); }}
                className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-[rgba(0,0,0,0.6)] text-white flex items-center justify-center text-sm hover:bg-[rgba(0,0,0,0.8)] border border-[rgba(255,255,255,0.1)]"
              >✕</button>
            </div>
            <p className="text-xs text-[#475569] font-mono">Imagem selecionada. Clique para alterar.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[rgba(0,240,255,0.06)] border border-[rgba(0,240,255,0.12)] flex items-center justify-center">
              <svg className="w-8 h-8 text-[#00f0ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Arraste uma imagem de drone ou satélite</p>
              <p className="text-xs text-[#475569] mt-1 font-mono">ou clique para selecionar • JPG, PNG, TIFF</p>
            </div>
          </div>
        )}
      </div>

      {preview && (
        <Button fullWidth size="lg" loading={isAnalyzing} variant="arc" onClick={() => {
          fetch(preview).then(r => r.blob()).then(blob => {
            const file = new File([blob], 'drone-image.jpg', { type: 'image/jpeg' });
            onUpload(file);
          });
        }}>
          {isAnalyzing ? 'Processando NDVI...' : 'Analisar Imagem (NDVI)'}
        </Button>
      )}
    </div>
  );
}
