'use client';

import { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';

interface GraphNode {
  id: string;
  lemma: string;
  language: string;
  languageName: string;
  pos?: string;
  meaning?: string;
}

interface GraphEdge {
  source: string;
  target: string;
  mechanism?: string;
  period?: string;
  sourceRef?: string;
}

interface GraphViewerProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

const LANGUAGE_COLORS: Record<string, string> = {
  id: '#3B82F6', // biru      — Indonesia
  ar: '#10B981', // hijau     — Arab
  nl: '#F59E0B', // kuning    — Belanda
  pt: '#EF4444', // merah     — Portugis
  sa: '#8B5CF6', // ungu      — Sanskerta
  en: '#06B6D4', // cyan      — Inggris
  la: '#EC4899', // pink      — Latin
  zh: '#F97316', // oranye    — Tionghoa
  es: '#84CC16', // lime      — Spanyol
  el: '#6366F1', // indigo    — Yunani
};

export default function GraphViewer({ nodes, edges }: GraphViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<cytoscape.Core | null>(null);

  useEffect(() => {
    if (!containerRef.current || nodes.length === 0) return;

    if (cyRef.current) cyRef.current.destroy();

    cyRef.current = cytoscape({
      container: containerRef.current,
      elements: [
        ...nodes.map((n) => ({
          data: {
            id: n.id,
            label: n.lemma,
            sublabel: n.languageName,
            language: n.language,
            meaning: n.meaning ?? '',
            isSource: n.language === 'id',
          },
        })),
        ...edges.map((e, i) => ({
          data: {
            id: `e${i}`,
            source: e.source,
            target: e.target,
            label: e.mechanism ?? '',
          },
        })),
      ],
      style: [
        // Base node style
        {
          selector: 'node',
          style: {
            'background-color': (ele: cytoscape.NodeSingular) =>
              LANGUAGE_COLORS[ele.data('language')] ?? '#94A3B8',
            label: (ele: cytoscape.NodeSingular) =>
              `${ele.data('label')}\n${ele.data('sublabel')}`,
            'text-valign': 'center',
            'text-halign': 'center',
            color: '#fff',
            'font-size': '11px',
            'font-weight': 'bold',
            width: 75,
            height: 75,
            'text-wrap': 'wrap',
            'text-max-width': '65px',
          },
        },
        // Node Bahasa Indonesia — lebih besar sebagai focal point
        {
          selector: 'node[?isSource]',
          style: {
            width: 95,
            height: 95,
            'font-size': '13px',
            'border-width': 3,
            'border-color': '#1D4ED8',
            'border-opacity': 0.4,
          },
        },
        // Edge style
        {
          selector: 'edge',
          style: {
            width: 2,
            'line-color': '#CBD5E1',
            'target-arrow-color': '#94A3B8',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            label: 'data(label)',
            'font-size': '10px',
            color: '#94A3B8',
            'text-background-color': '#fff',
            'text-background-opacity': 1,
            'text-background-padding': '2px',
          },
        },
        // Selected state
        {
          selector: ':selected',
          style: {
            'border-width': 3,
            'border-color': '#1D4ED8',
          },
        },
        // Hover state
        {
          selector: 'node.hovered',
          style: {
            opacity: 0.85,
            'border-width': 2,
            'border-color': '#fff',
          },
        },
      ],
      layout: {
        name: 'breadthfirst',
        directed: true,
        padding: 40,
        spacingFactor: 1.6,
      },
    });

    // Fit ke container
    cyRef.current.fit(undefined, 40);

    // Hover effect
    cyRef.current.on('mouseover', 'node', (evt) => {
      evt.target.addClass('hovered');
    });
    cyRef.current.on('mouseout', 'node', (evt) => {
      evt.target.removeClass('hovered');
    });

    return () => {
      cyRef.current?.destroy();
    };
  }, [nodes, edges]);

  if (nodes.length === 0) return null;

  // Hanya tampilkan bahasa yang ada di data
  const activeLangs = Object.entries(LANGUAGE_COLORS).filter(([lang]) =>
    nodes.some((n) => n.language === lang)
  );

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800">Visualisasi Graf Etimologi</h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Scroll untuk zoom · Drag untuk navigasi · Klik node untuk seleksi
        </p>
      </div>

      {/* Graf */}
      <div ref={containerRef} className="w-full h-96" />

      {/* Legend */}
      <div className="px-6 py-3 border-t border-gray-100 flex flex-wrap gap-3">
        {activeLangs.map(([lang, color]) => {
          const node = nodes.find((n) => n.language === lang);
          return (
            <span key={lang} className="flex items-center gap-1.5 text-xs text-gray-600">
              <span
                className="w-3 h-3 rounded-full inline-block shrink-0"
                style={{ backgroundColor: color }}
              />
              {node?.languageName ?? lang}
            </span>
          );
        })}
      </div>
    </div>
  );
}